// Records Psalm 23 and John 1:1-14 (BSB) in a few Google Chirp 3 HD voices
// so we can pick the audio Bible voice. Reads the key from GOOGLE_TTS_API_KEY.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const KEY = process.env.GOOGLE_TTS_API_KEY;
if (!KEY) { console.error('GOOGLE_TTS_API_KEY is not set'); process.exit(1); }

// file label, Chirp 3 HD voice, speaking rate
const VOICES = [
  ['Sulafat', 'Sulafat', 1.0],
  ['Vindemiatrix', 'Vindemiatrix', 1.0],
  ['Charon', 'Charon', 1.0],
  ['Algieba', 'Algieba', 1.0],
  ['Algenib', 'Algenib', 1.0],
  ['Umbriel', 'Umbriel', 1.0],
  ['Algenib-slower', 'Algenib', 0.88],
];
const OUT = 'samples/voices';

const book = (b) => JSON.parse(readFileSync(`data/bible/bsb/${b}.json`, 'utf8')).c;
const clean = (s) => s.replace(/\bLORD\b/g, 'Lord').replace(/—/g, ', ');
const psalm = book('psalms')[22].map(clean).join(' ');
const john = book('john')[0].slice(0, 14).map(clean).join(' ');
const text = `Psalm 23. A Psalm of David.\n\n${psalm}\n\nJohn, chapter 1.\n\n${john}`;

mkdirSync(OUT, { recursive: true });
let failed = 0;
for (const [v, voice, rate] of VOICES) {
  const name = `en-US-Chirp3-HD-${voice}`;
  const res = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': KEY },
    body: JSON.stringify({
      input: { text },
      voice: { languageCode: 'en-US', name },
      audioConfig: { audioEncoding: 'MP3', speakingRate: rate },
    }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || !body.audioContent) {
    failed++;
    console.error(`${v}: HTTP ${res.status} ${body.error?.status ?? ''} ${body.error?.message ?? ''}`);
    continue;
  }
  writeFileSync(`${OUT}/${v}.mp3`, Buffer.from(body.audioContent, 'base64'));
  console.log(`${v}: ok`);
}
console.log(`characters per voice: ${text.length}`);
process.exit(failed === VOICES.length ? 1 : 0);
