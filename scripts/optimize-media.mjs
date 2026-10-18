import { spawnSync } from 'node:child_process';
import { copyFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import ffmpeg from 'ffmpeg-static';
import sharp from 'sharp';
const input = path.resolve(process.argv[2] || 'public/demo-reel.mp4');
await mkdir('tmp', { recursive: true });
function run(args) {
  const result = spawnSync(
    ffmpeg,
    ['-hide_banner', '-loglevel', 'error', ...args],
    { stdio: 'inherit' },
  );
  if (result.status !== 0) throw new Error('FFmpeg failed.');
}
run([
  '-i',
  input,
  '-vf',
  'scale=1280:-2,fps=24',
  '-c:v',
  'libx264',
  '-preset',
  'medium',
  '-crf',
  '23',
  '-c:a',
  'aac',
  '-b:a',
  '96k',
  '-movflags',
  '+faststart',
  '-y',
  'tmp/demo-reel.optimized.mp4',
]);
run(['-ss', '4.7', '-i', input, '-frames:v', '1', '-y', 'tmp/demo-poster.png']);
await sharp('tmp/demo-poster.png')
  .resize(1280)
  .webp({ quality: 82 })
  .toFile('public/demo-poster.webp');
const before = (await stat(input)).size;
const after = (await stat('tmp/demo-reel.optimized.mp4')).size;
await copyFile('tmp/demo-reel.optimized.mp4', 'public/demo-reel.mp4');
console.log(
  `Video: ${(before / 1048576).toFixed(2)} MiB → ${(after / 1048576).toFixed(2)} MiB. Fast-start metadata enabled.`,
);
