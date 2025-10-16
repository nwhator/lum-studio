const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

/**
 * Image Compression Script
 * Compresses all images in /public/assets/img/
 * Converts to WebP and optimizes JPG/PNG
 */

// Configuration
const config = {
  inputDir: path.join(__dirname, '../public/assets/img'),
  outputDir: path.join(__dirname, '../public/assets/img/optimized'),
  quality: {
    webp: 85,
    jpeg: 85,
    png: 90,
  },
  sizes: {
    hero: { width: 1920, height: 1080 }, // Hero images
    gallery: { width: 800, height: 600 }, // Gallery images
    thumbnail: { width: 400, height: 300 }, // Thumbnails
  },
};

// Helper to get file size in KB
async function getFileSize(filePath) {
  const stats = await fs.stat(filePath);
  return (stats.size / 1024).toFixed(2);
}

// Process a single image
async function processImage(inputPath, outputPath, options = {}) {
  try {
    const { width, height, quality = 85, format = 'webp' } = options;
    
    let pipeline = sharp(inputPath);
    
    // Resize if dimensions provided
    if (width || height) {
      pipeline = pipeline.resize(width, height, {
        fit: 'cover',
        position: 'center',
      });
    }
    
    // Convert format and compress
    if (format === 'webp') {
      pipeline = pipeline.webp({ quality });
    } else if (format === 'jpeg' || format === 'jpg') {
      pipeline = pipeline.jpeg({ quality, progressive: true });
    } else if (format === 'png') {
      pipeline = pipeline.png({ quality, compressionLevel: 9 });
    }
    
    await pipeline.toFile(outputPath);
    
    const originalSize = await getFileSize(inputPath);
    const optimizedSize = await getFileSize(outputPath);
    const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
    console.log(`   ${originalSize}KB → ${optimizedSize}KB (${savings}% smaller)`);
    
    return { originalSize, optimizedSize, savings };
  } catch (error) {
    console.error(`❌ Error processing ${inputPath}:`, error.message);
    return null;
  }
}

// Recursively find all images
async function findImages(dir, fileList = []) {
  const files = await fs.readdir(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    
    if (stat.isDirectory()) {
      // Skip already optimized directory
      if (!filePath.includes('optimized')) {
        await findImages(filePath, fileList);
      }
    } else {
      // Check if it's an image
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        fileList.push(filePath);
      }
    }
  }
  
  return fileList;
}

// Determine image category based on path
function getImageCategory(filePath) {
  const pathLower = filePath.toLowerCase();
  
  if (pathLower.includes('hero') || pathLower.includes('banner')) {
    return 'hero';
  } else if (pathLower.includes('thumb') || pathLower.includes('sm-')) {
    return 'thumbnail';
  } else if (pathLower.includes('gallery') || pathLower.includes('portfolio')) {
    return 'gallery';
  }
  
  return 'general';
}

// Main compression function
async function compressImages() {
  console.log('🚀 Starting image compression...\n');
  
  try {
    // Create output directory
    await fs.mkdir(config.outputDir, { recursive: true });
    
    // Find all images
    console.log('📁 Scanning for images...');
    const images = await findImages(config.inputDir);
    console.log(`Found ${images.length} images to process\n`);
    
    let totalOriginal = 0;
    let totalOptimized = 0;
    let processed = 0;
    
    // Process each image
    for (const imagePath of images) {
      const relativePath = path.relative(config.inputDir, imagePath);
      const category = getImageCategory(imagePath);
      const ext = path.extname(imagePath);
      const basename = path.basename(imagePath, ext);
      
      // Determine output path and options
      const outputPath = path.join(config.outputDir, relativePath.replace(ext, '.webp'));
      const outputDir = path.dirname(outputPath);
      
      // Create subdirectories
      await fs.mkdir(outputDir, { recursive: true });
      
      // Set compression options based on category
      const options = {
        format: 'webp',
        quality: config.quality.webp,
        ...config.sizes[category],
      };
      
      // Process image
      const result = await processImage(imagePath, outputPath, options);
      
      if (result) {
        totalOriginal += parseFloat(result.originalSize);
        totalOptimized += parseFloat(result.optimizedSize);
        processed++;
      }
      
      console.log(''); // Empty line for readability
    }
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 COMPRESSION SUMMARY');
    console.log('='.repeat(60));
    console.log(`Images processed: ${processed}/${images.length}`);
    console.log(`Total original size: ${totalOriginal.toFixed(2)}KB`);
    console.log(`Total optimized size: ${totalOptimized.toFixed(2)}KB`);
    console.log(`Total savings: ${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%`);
    console.log(`Space saved: ${(totalOriginal - totalOptimized).toFixed(2)}KB`);
    console.log('='.repeat(60));
    console.log(`\n✅ All images compressed and saved to: ${config.outputDir}`);
    console.log('\n💡 Next steps:');
    console.log('1. Review optimized images in /public/assets/img/optimized/');
    console.log('2. Replace original images with optimized versions');
    console.log('3. Update image paths in components to use WebP format');
    console.log('4. Test site on iPhone to verify improvements\n');
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run compression
if (require.main === module) {
  compressImages();
}

module.exports = { compressImages, processImage };
