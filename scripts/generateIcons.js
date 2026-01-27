import sharp from 'sharp'
import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function generateIcons() {
  const sizes = [192, 512]
  const iconsDir = join(__dirname, '..', 'public', 'icons')

  for (const size of sizes) {
    const svgPath = join(iconsDir, `icon-${size}.svg`)
    const pngPath = join(iconsDir, `icon-${size}.png`)

    try {
      const svgBuffer = readFileSync(svgPath)
      await sharp(svgBuffer).resize(size, size).png().toFile(pngPath)
      console.log(`Generated: icon-${size}.png`)
    } catch (error) {
      console.error(`Error generating icon-${size}.png:`, error.message)
    }
  }

  // Create favicon.ico (simple 32x32 PNG as ICO placeholder)
  const faviconPath = join(__dirname, '..', 'public', 'favicon.ico')
  const svg192Path = join(iconsDir, 'icon-192.svg')
  try {
    const svgBuffer = readFileSync(svg192Path)
    await sharp(svgBuffer).resize(32, 32).png().toFile(faviconPath)
    console.log('Generated: favicon.ico')
  } catch (error) {
    console.error('Error generating favicon:', error.message)
  }
}

generateIcons()
