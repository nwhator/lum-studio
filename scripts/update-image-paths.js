const fs = require('fs').promises;
const path = require('path');

/**
 * Update Image Paths in Components
 * Converts image imports and src paths from .jpg/.png to .webp
 */

const config = {
  srcDir: path.join(__dirname, '../src'),
  publicDir: path.join(__dirname, '../public'),
  extensions: ['.tsx', '.ts', '.jsx', '.js'],
};

// Find all component files
async function findComponentFiles(dir, fileList = []) {
  const files = await fs.readdir(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and .next
      if (!filePath.includes('node_modules') && !filePath.includes('.next')) {
        await findComponentFiles(filePath, fileList);
      }
    } else {
      const ext = path.extname(file);
      if (config.extensions.includes(ext)) {
        fileList.push(filePath);
      }
    }
  }
  
  return fileList;
}

// Update image paths in file content
function updateImagePaths(content) {
  let updated = content;
  let changes = [];
  
  // Pattern 1: Image imports - import img from '/assets/img/file.jpg'
  const importPattern = /(['"`])([^'"`]*\/assets\/img\/[^'"`]*\.(jpg|jpeg|png))(['"`])/g;
  updated = updated.replace(importPattern, (match, quote1, imagePath, ext, quote2) => {
    const newPath = imagePath.replace(/\.(jpg|jpeg|png)$/, '.webp');
    if (newPath !== imagePath) {
      changes.push({ from: imagePath, to: newPath });
      return `${quote1}${newPath}${quote2}`;
    }
    return match;
  });
  
  // Pattern 2: src attributes - src="/assets/img/file.jpg"
  const srcPattern = /src=(['"`])([^'"`]*\/assets\/img\/[^'"`]*\.(jpg|jpeg|png))(['"`])/g;
  updated = updated.replace(srcPattern, (match, quote1, imagePath, ext, quote2) => {
    const newPath = imagePath.replace(/\.(jpg|jpeg|png)$/, '.webp');
    if (newPath !== imagePath) {
      changes.push({ from: imagePath, to: newPath });
      return `src=${quote1}${newPath}${quote2}`;
    }
    return match;
  });
  
  // Pattern 3: backgroundImage: url('/assets/img/file.jpg')
  const bgPattern = /url\((['"`]?)([^'"`\)]*\/assets\/img\/[^'"`\)]*\.(jpg|jpeg|png))(['"`]?)\)/g;
  updated = updated.replace(bgPattern, (match, quote1, imagePath, ext, quote2) => {
    const newPath = imagePath.replace(/\.(jpg|jpeg|png)$/, '.webp');
    if (newPath !== imagePath) {
      changes.push({ from: imagePath, to: newPath });
      return `url(${quote1}${newPath}${quote2})`;
    }
    return match;
  });
  
  return { updated, changes };
}

// Main update function
async function updateComponentPaths() {
  console.log('🚀 Starting component path updates...\n');
  
  try {
    // Find all component files
    console.log('📁 Finding component files...');
    const componentFiles = await findComponentFiles(config.srcDir);
    console.log(`Found ${componentFiles.length} component files\n`);
    
    let filesUpdated = 0;
    let totalChanges = 0;
    const report = [];
    
    for (const filePath of componentFiles) {
      const content = await fs.readFile(filePath, 'utf-8');
      const { updated, changes } = updateImagePaths(content);
      
      if (changes.length > 0) {
        // Write updated content
        await fs.writeFile(filePath, updated, 'utf-8');
        
        filesUpdated++;
        totalChanges += changes.length;
        
        const relativePath = path.relative(config.srcDir, filePath);
        console.log(`✅ ${relativePath}`);
        changes.forEach(change => {
          console.log(`   ${path.basename(change.from)} → ${path.basename(change.to)}`);
        });
        console.log('');
        
        report.push({
          file: relativePath,
          changes: changes,
        });
      }
    }
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 PATH UPDATE SUMMARY');
    console.log('='.repeat(60));
    console.log(`Files updated: ${filesUpdated}`);
    console.log(`Total path changes: ${totalChanges}`);
    console.log('='.repeat(60));
    
    if (filesUpdated > 0) {
      // Save report
      const reportPath = path.join(__dirname, '../public/assets/img/path-update-report.json');
      await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
      console.log(`\n✅ Report saved to: ${reportPath}`);
      
      console.log('\n💡 Next steps:');
      console.log('1. ✅ All component paths updated to .webp');
      console.log('2. 🧪 Test site: npm run dev');
      console.log('3. 🔍 Check browser console for any missing images');
      console.log('4. 📱 Test on iPhone to verify improvements\n');
    } else {
      console.log('\n✅ No paths needed updating (already using WebP or no image paths found)\n');
    }
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run update
if (require.main === module) {
  updateComponentPaths();
}

module.exports = { updateComponentPaths };
