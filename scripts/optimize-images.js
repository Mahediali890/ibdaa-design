const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PROJECTS_DIR = path.join(__dirname, '..', 'src', 'assets', 'images', 'projects');
const LOGO_DIR = path.join(__dirname, '..', 'src', 'assets', 'images', 'logo');

async function optimizeImage(inputPath, maxWidth = 1920, quality = 80) {
  const ext = path.extname(inputPath).toLowerCase();
  const baseName = path.basename(inputPath, ext);
  const dir = path.dirname(inputPath);
  const outputPath = path.join(dir, `${baseName}.jpg`);

  try {
    const metadata = await sharp(inputPath).metadata();
    console.log(`Processing: ${path.basename(inputPath)} (${metadata.width}x${metadata.height}, ${(fs.statSync(inputPath).size / 1024 / 1024).toFixed(1)}MB)`);

    let pipeline = sharp(inputPath);

    if (metadata.width > maxWidth) {
      pipeline = pipeline.resize(maxWidth, null, { withoutEnlargement: true });
    }

    await pipeline
      .jpeg({ quality, mozjpeg: true })
      .toFile(outputPath + '.tmp');

    // If original was PNG, remove PNG and rename
    if (ext === '.png') {
      fs.unlinkSync(inputPath);
    }
    // If output is same path as input (jpeg), we used .tmp
    if (outputPath === inputPath) {
      fs.unlinkSync(inputPath);
    }
    fs.renameSync(outputPath + '.tmp', outputPath);

    const newSize = fs.statSync(outputPath).size;
    console.log(`  -> ${path.basename(outputPath)} (${(newSize / 1024).toFixed(0)}KB)\n`);
  } catch (err) {
    console.error(`Error processing ${inputPath}:`, err.message);
  }
}

async function optimizeLogo(inputPath, maxWidth = 400) {
  try {
    const metadata = await sharp(inputPath).metadata();
    const tmpPath = inputPath + '.tmp';
    console.log(`Processing logo: ${path.basename(inputPath)} (${metadata.width}x${metadata.height})`);

    await sharp(inputPath)
      .resize(maxWidth, null, { withoutEnlargement: true })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(tmpPath);

    fs.unlinkSync(inputPath);
    fs.renameSync(tmpPath, inputPath);

    const newSize = fs.statSync(inputPath).size;
    console.log(`  -> ${(newSize / 1024).toFixed(0)}KB\n`);
  } catch (err) {
    console.error(`Error processing logo ${inputPath}:`, err.message);
  }
}

async function main() {
  console.log('=== Optimizing Project Images ===\n');

  const files = fs.readdirSync(PROJECTS_DIR);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      await optimizeImage(path.join(PROJECTS_DIR, file));
    }
  }

  console.log('\n=== Optimizing Logos ===\n');

  const logoFiles = fs.readdirSync(LOGO_DIR);
  for (const file of logoFiles) {
    if (path.extname(file).toLowerCase() === '.png') {
      await optimizeLogo(path.join(LOGO_DIR, file));
    }
  }

  // Show final totals
  console.log('\n=== Final Sizes ===\n');
  let total = 0;
  const allFiles = fs.readdirSync(PROJECTS_DIR);
  for (const file of allFiles) {
    const size = fs.statSync(path.join(PROJECTS_DIR, file)).size;
    total += size;
    console.log(`  ${file}: ${(size / 1024).toFixed(0)}KB`);
  }
  console.log(`\n  TOTAL: ${(total / 1024 / 1024).toFixed(1)}MB`);
}

main();
