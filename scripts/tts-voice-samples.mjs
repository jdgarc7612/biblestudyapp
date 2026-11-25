// Records Psalm 23 and John 1:1-14 (BSB) with Google TTS, one verse per
// request (as the full Bible would be), uncompressed, joined with short pauses.
// Reads the key from GOOGLE_TTS_API_KEY. Writes WAV; the workflow encodes MP3.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createSign } from 'node:crypto';

// Gemini voices need a service account token; Chirp works with the API key.
// Mint a token straight from the service account file (no extra Google APIs needed).
async function saToken(file) {
  const sa = JSON.parse(readFileSync(file, 'utf8'));
  const now = Math.floor(Date.now() / 1000);
  const b64 = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
  const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({
    iss: sa.client_email, scope: 'https://www.googleapis.com/auth/cloud-platform',
    aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600,
  })}`;
  const sig = createSign('RSA-SHA256').update(unsigned).sign(sa.private_key, 'base64url');
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${unsigned}.${sig}` }),
  });
  const b = await r.json().catch(() => ({}));
  if (!b.access_token) { console.error(`token: HTTP ${r.status} ${b.error ?? ''} ${b.error_description ?? ''}`); process.exit(1); }
  return { token: b.access_token, project: sa.project_id };
}
const credFile = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const { token: TOKEN, project: PROJECT } = credFile ? await saToken(credFile) : {};
const KEY = process.env.GOOGLE_TTS_API_KEY;
if (!TOKEN && !KEY) { console.error('No Google credentials set'); process.exit(1); }
const AUTH = TOKEN
  ? { Authorization: `Bearer ${TOKEN}`, ...(PROJECT ? { 'x-goog-user-project': PROJECT } : {}) }
  : { 'X-Goog-Api-Key': KEY };

// Gemini TTS: same Algenib voice, steered by a written direction.
const TAKES = [['Algenib-Gemini-faster', 'Algenib']];
const PROMPT = 'Read this aloud as Holy Scripture: reverent, warm and sincere, at a brisk, natural speaking pace, like a modern audiobook narrator. Keep it flowing; do not slow down, linger or draw out words.';
const FASTER = 1.15; // speaking rate, dropped if the model rejects it
// First model name the API accepts wins (newest first).
const MODELS = ['gemini-3.8-flash-tts-preview', 'gemini-3.8-flash-tts', 'gemini-2.5-flash-tts'];
const OUT = 'samples/voices-gemini';
const RATE = 24000; // Chirp 3 HD native sample rate
const VERSE_GAP = 0.75, SECTION_GAP = 1.6; // seconds

const book = (b) => JSON.parse(readFileSync(`data/bible/bsb/${b}.json`, 'utf8')).c;
const clean = (s) => s.replace(/\bLORD\b/g, 'Lord').replace(/—/g, ', ');
// [text, pause after]
const lines = [
  ['Psalm 23. A Psalm of David.', SECTION_GAP],
  ...book('psalms')[22].map((v) => [clean(v), VERSE_GAP]),
  ['John, chapter 1.', SECTION_GAP],
  ...book('john')[0].slice(0, 14).map((v) => [clean(v), VERSE_GAP]),
];
lines[6][1] = SECTION_GAP; // end of Psalm 23

const silence = (sec) => Buffer.alloc(Math.round(sec * RATE) * 2);
function pcm(wav) { // strip RIFF header, return the data chunk
  let i = 12;
  while (i < wav.length) {
    const id = wav.toString('ascii', i, i + 4), size = wav.readUInt32LE(i + 4);
    if (id === 'data') return wav.subarray(i + 8, i + 8 + size);
    i += 8 + size;
  }
  return wav.subarray(44);
}
function trim(buf) {
  const n = buf.length >> 1, th = 400, keep = Math.round(0.05 * RATE);
  let a = 0, b = n - 1;
  while (a < n && Math.abs(buf.readInt16LE(a * 2)) < th) a++;
  while (b > a && Math.abs(buf.readInt16LE(b * 2)) < th) b--;
  a = Math.max(0, a - keep); b = Math.min(n - 1, b + keep);
  return buf.subarray(a * 2, (b + 1) * 2);
}
function wavFile(data) {
  const h = Buffer.alloc(44);
  h.write('RIFF', 0); h.writeUInt32LE(36 + data.length, 4); h.write('WAVE', 8);
  h.write('fmt ', 12); h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22);
  h.writeUInt32LE(RATE, 24); h.writeUInt32LE(RATE * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34);
  h.write('data', 36); h.writeUInt32LE(data.length, 40);
  return Buffer.concat([h, data]);
}

mkdirSync(OUT, { recursive: true });
let chars = 0;
let rate = FASTER;
const call = (text, voice, model) => fetch('https://texttospeech.googleapis.com/v1/text:synthesize', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', ...AUTH },
  body: JSON.stringify({
    input: { prompt: PROMPT, text },
    voice: { languageCode: 'en-US', name: voice, modelName: model },
    audioConfig: { audioEncoding: 'LINEAR16', sampleRateHertz: RATE, ...(rate ? { speakingRate: rate } : {}) },
  }),
});
let model = null;
for (const m of MODELS) {
  const r = await call('In the beginning.', 'Algenib', m);
  const b = await r.json().catch(() => ({}));
  if (r.ok && b.audioContent) { model = m; break; }
  if (rate && r.status === 400 && !/not supported/.test(b.error?.message ?? '')) {
    console.error(`speakingRate rejected (${b.error?.message ?? ''}); using the direction alone`);
    rate = null;
    const r2 = await call('In the beginning.', 'Algenib', m);
    if (r2.ok) { model = m; break; }
  }
  console.error(`model ${m}: HTTP ${r.status} ${b.error?.status ?? ''} ${b.error?.message ?? ''}`);
}
if (!model) process.exit(1);
console.log(`using model ${model}, speaking rate ${rate ?? 'default'}`);

for (const [label, voice] of TAKES) {
  const parts = [silence(0.4)];
  for (const [text, gap] of lines) {
    let res, body;
    for (let attempt = 0; attempt < 3; attempt++) {
      res = await call(text, voice, model);
      body = await res.json().catch(() => ({}));
      if (res.ok && body.audioContent) break;
      await new Promise((r) => setTimeout(r, 3000));
    }
    if (!res.ok || !body.audioContent) {
      console.error(`${label}: HTTP ${res.status} ${body.error?.status ?? ''} ${body.error?.message ?? ''}`);
      process.exit(1);
    }
    parts.push(trim(pcm(Buffer.from(body.audioContent, 'base64'))), silence(gap));
    chars += text.length;
  }
  writeFileSync(`${OUT}/${label}.wav`, wavFile(Buffer.concat(parts)));
  console.log(`${label}: ok`);
}
console.log(`characters: ${chars}`);
