import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import { join, parse } from 'path';

const INPUT_DIR = 'public/images/novios';
const OUTPUT_DIR = 'public/images/novios-webp';

const PROFILES = {
  hero: { width: 1200, quality: 78 },
  section: { width: 960, quality: 76 },
  gallery: { width: 720, quality: 74 },
};

const FILE_PROFILE = {
  'IMG_8729.jpg': 'hero',
  'IMG_8805.jpg': 'section',
  'IMG_8731.jpg': 'section',
  'IMG_8713.jpg': 'section',
  'IMG_8801.jpg': 'section',
};

async function optimizeFile(filename) {
  const inputPath = join(INPUT_DIR, filename);
  const { name } = parse(filename);
  const profileName = FILE_PROFILE[filename] || 'gallery';
  const profile = PROFILES[profileName];
  const outputPath = join(OUTPUT_DIR, `${name}.webp`);

  try {
    const [inputStat, outputStat] = await Promise.all([
      stat(inputPath),
      stat(outputPath).catch(() => null),
    ]);

    if (outputStat && outputStat.mtimeMs >= inputStat.mtimeMs) {
      return { filename, skipped: true, bytes: outputStat.size };
    }
  } catch {
    return { filename, skipped: true, error: 'missing source' };
  }

  const result = await sharp(inputPath)
    .rotate()
    .resize({ width: profile.width, withoutEnlargement: true })
    .webp({ quality: profile.quality, effort: 4 })
    .toFile(outputPath);

  return { filename, skipped: false, bytes: result.size, profile: profileName };
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const files = (await readdir(INPUT_DIR)).filter((file) => /\.jpe?g$/i.test(file));
  const results = await Promise.all(files.map(optimizeFile));

  const created = results.filter((r) => !r.skipped && !r.error);
  const totalKb = created.reduce((sum, r) => sum + r.bytes, 0) / 1024;

  console.log(`Optimized ${created.length}/${files.length} images -> ${OUTPUT_DIR}`);
  console.log(`Total WebP size: ${totalKb.toFixed(0)} KB`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
