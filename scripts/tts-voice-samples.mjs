// Records Psalm 23 and John 1:1-14 (BSB) in Google Chirp 3 HD, one verse per
// request (as the full Bible would be), uncompressed, joined with short pauses.
// Reads the key from GOOGLE_TTS_API_KEY. Writes WAV; the workflow encodes MP3.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const KEY = process.env.GOOGLE_TTS_API_KEY;
if (!KEY) { console.error('GOOGLE_TTS_API_KEY is not set'); process.exit(1); }

// file label, Chirp 3 HD voice, speaking rate
const TAKES = [
  ['Algenib-HQ', 'Algenib', 1.0],
  ['Algenib-HQ-slower', 'Algenib', 0.88],
];
const OUT = 'samples/voices-hq';
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
for (const [label, voice, rate] of TAKES) {
  const parts = [silence(0.4)];
  for (const [text, gap] of lines) {
    const res = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': KEY },
      body: JSON.stringify({
        input: { text },
        voice: { languageCode: 'en-US', name: `en-US-Chirp3-HD-${voice}` },
        audioConfig: { audioEncoding: 'LINEAR16', sampleRateHertz: RATE, speakingRate: rate },
      }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok || !body.audioContent) {
      console.error(`${label}: HTTP ${res.status} ${body.error?.status ?? ''} ${body.error?.message ?? ''}`);
      process.exit(1);
    }
    parts.push(pcm(Buffer.from(body.audioContent, 'base64')), silence(gap));
    chars += text.length;
  }
  writeFileSync(`${OUT}/${label}.wav`, wavFile(Buffer.concat(parts)));
  console.log(`${label}: ok`);
}
console.log(`characters: ${chars}`);
