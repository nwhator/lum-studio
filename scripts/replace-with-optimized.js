const fs = require('fs').promises;
const path = require('path');

/**
 * Replace Original Images with Optimized Versions
 * 1. Backs up original images
 * 2. Replaces them with optimized WebP versions
 * 3. Generates report of replacements
 */

const config = {
  originalDir: path.join(__dirname, '../public/assets/img'),
  optimizedDir: path.join(__dirname, '../public/assets/img/optimized'),
  backupDir: path.join(__dirname, '../public/assets/img/backup-original'),
};

// Get file size in KB
async function getFileSize(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return (stats.size / 1024).toFixed(2);
  } catch (error) {
    return 0;
  }
}

// Recursively get all files
async function getAllFiles(dir, fileList = []) {
  const files = await fs.readdir(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    
    if (stat.isDirectory()) {
      await getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

// Copy file
async function copyFile(src, dest) {
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.copyFile(src, dest);
}

// Main replacement function
async function replaceWithOptimized() {
  console.log('🚀 Starting image replacement process...\n');
  
  try {
    // Get all optimized images
    console.log('📁 Finding optimized images...');
    const optimizedFiles = await getAllFiles(config.optimizedDir);
    console.log(`Found ${optimizedFiles.length} optimized images\n`);
    
    let replaced = 0;
    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;
    const report = [];
    
    for (const optimizedPath of optimizedFiles) {
      const relativePath = path.relative(config.optimizedDir, optimizedPath);
      const ext = path.extname(relativePath);
      
      // Skip if not an image
      if (!['.webp', '.jpg', '.jpeg', '.png'].includes(ext.toLowerCase())) {
        continue;
      }
      
      // Find corresponding original file
      let originalPath;
      if (ext === '.webp') {
        // Try multiple original extensions
        const baseName = relativePath.replace('.webp', '');
        const possibleExts = ['.jpg', '.jpeg', '.png', '.webp'];
        
        for (const originalExt of possibleExts) {
          const testPath = path.join(config.originalDir, baseName + originalExt);
          try {
            await fs.access(testPath);
            originalPath = testPath;
            break;
          } catch (error) {
            // File doesn't exist, try next extension
          }
        }
      } else {
        originalPath = path.join(config.originalDir, relativePath);
      }
      
      if (!originalPath) {
        console.log(`⚠️  No original found for: ${relativePath}`);
        continue;
      }
      
      try {
        // Get sizes
        const originalSize = await getFileSize(originalPath);
        const optimizedSize = await getFileSize(optimizedPath);
        
        if (parseFloat(originalSize) === 0) {
          continue; // Original doesn't exist
        }
        
        // Backup original
        const backupPath = path.join(config.backupDir, path.relative(config.originalDir, originalPath));
        await copyFile(originalPath, backupPath);
        
        // Replace with optimized
        const newPath = originalPath.replace(path.extname(originalPath), '.webp');
        await copyFile(optimizedPath, newPath);
        
        // Delete old file if extension changed
        if (newPath !== originalPath) {
          await fs.unlink(originalPath);
        }
        
        const savings = ((1 - parseFloat(optimizedSize) / parseFloat(originalSize)) * 100).toFixed(1);
        
        console.log(`✅ ${path.basename(originalPath)} → ${path.basename(newPath)}`);
        console.log(`   ${originalSize}KB → ${optimizedSize}KB (${savings}% smaller)\n`);
        
        totalOriginalSize += parseFloat(originalSize);
        totalOptimizedSize += parseFloat(optimizedSize);
        replaced++;
        
        report.push({
          original: path.basename(originalPath),
          optimized: path.basename(newPath),
          originalSize,
          optimizedSize,
          savings,
        });
        
      } catch (error) {
        console.error(`❌ Error processing ${relativePath}:`, error.message);
      }
    }
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 REPLACEMENT SUMMARY');
    console.log('='.repeat(60));
    console.log(`Images replaced: ${replaced}`);
    console.log(`Total original size: ${totalOriginalSize.toFixed(2)}KB (${(totalOriginalSize / 1024).toFixed(2)}MB)`);
    console.log(`Total optimized size: ${totalOptimizedSize.toFixed(2)}KB (${(totalOptimizedSize / 1024).toFixed(2)}MB)`);
    console.log(`Total savings: ${((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1)}%`);
    console.log(`Space saved: ${(totalOriginalSize - totalOptimizedSize).toFixed(2)}KB (${((totalOriginalSize - totalOptimizedSize) / 1024).toFixed(2)}MB)`);
    console.log('='.repeat(60));
    
    // Save report
    const reportPath = path.join(__dirname, '../public/assets/img/optimization-report.json');
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n✅ Report saved to: ${reportPath}`);
    
    console.log('\n💡 Next steps:');
    console.log('1. ✅ Original images backed up to /public/assets/img/backup-original/');
    console.log('2. ✅ Optimized WebP images now in place');
    console.log('3. 🔄 Run update-image-paths.js to update component imports');
    console.log('4. 🧪 Test site to verify all images load correctly\n');
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run replacement
if (require.main === module) {
  replaceWithOptimized();
}

module.exports = { replaceWithOptimized };
