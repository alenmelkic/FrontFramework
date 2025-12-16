/**
 * Kentico Build Script
 * Builds component library for Kentico MVC integration
 */

import { build } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { reorganizeKenticoOutput } from './reorganize-kentico-output.js';
import { getBrandConfig, getAvailableBrands, getBrandComponents } from '../brands.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);
const brandArg = args.find(arg => arg.startsWith('--brand='));
const brandId = brandArg ? brandArg.split('=')[1] : 'energia';

// Validate brand
const availableBrands = getAvailableBrands();
if (!availableBrands.includes(brandId)) {
  console.error(`❌ Invalid brand: ${brandId}. Available brands: ${availableBrands.join(', ')}`);
  process.exit(1);
}

// Get brand configuration
const brandConfig = getBrandConfig(brandId);
const kenticoOutputPath = path.resolve(__dirname, '..', brandConfig.outputPath);

console.log('\n🚀 Starting Kentico build...');
console.log(`📦 Brand: ${brandConfig.name}`);
console.log(`🎨 Primary Color: ${brandConfig.colors.primary}`);
console.log(`📁 Output: ${kenticoOutputPath}`);
console.log(`📦 Components: ${getBrandComponents(brandId).length} components\n`);

// Auto-discover components
function discoverComponents() {
  const componentsDir = path.resolve(__dirname, '../packages/ui/src/components');

  if (!fs.existsSync(componentsDir)) {
    console.warn('⚠️  Components directory does not exist yet');
    return [];
  }

  const entries = fs.readdirSync(componentsDir, { withFileTypes: true });

  const components = entries
    .filter(entry => entry.isDirectory())
    .filter(entry => {
      const indexPath = path.join(componentsDir, entry.name, 'index.ts');
      return fs.existsSync(indexPath);
    })
    .map(entry => ({
      name: entry.name,
      path: path.join(componentsDir, entry.name, 'index.ts'),
    }));

  return components;
}

async function buildKentico() {
  try {
    const components = discoverComponents();
    console.log(`📦 Discovered ${components.length} components:`, components.map(c => c.name).join(', '));

    if (components.length === 0) {
      console.warn('⚠️  No components found to build');
    }

    // Set environment variables for the build
    process.env.BRAND = brandId;
    process.env.KENTICO_OUTPUT_PATH = kenticoOutputPath;

    // Build using vite.kentico.config.ts
    const configPath = path.resolve(__dirname, '../packages/ui/vite.kentico.config.ts');

    console.log('\n🔨 Building with Vite...');

    await build({
      configFile: configPath,
      mode: 'production',
    });

    console.log('\n✅ Vite build complete!');

    // Reorganize files into component folders (move CSS, create HTML templates)
    reorganizeKenticoOutput(kenticoOutputPath, brandId);

    // Generate manifest.json
    await generateManifest(components, kenticoOutputPath, brandId);

    // Calculate and display file sizes
    await displayFileSizes(kenticoOutputPath);

    console.log('\n✨ Kentico build complete!\n');
  } catch (error) {
    console.error('\n❌ Build failed:', error);
    process.exit(1);
  }
}


/**
 * Generate manifest.json with component registry and metadata
 */
async function generateManifest(
  components: Array<{ name: string; path: string }>,
  outputPath: string,
  brand: string
) {
  console.log('\n📝 Generating manifest.json...');

  const manifest = {
    version: '1.0.0',
    cssFramework: 'bootstrap',
    brand,
    buildDate: new Date().toISOString(),
    main: {
      js: 'js/main.min.js',
      css: 'css/main.min.css',
    },
    components: components.map(component => {
      const componentName = component.name.toLowerCase();
      const jsPath = path.join(outputPath, `components/${componentName}/${componentName}.min.js`);
      const cssPath = path.join(outputPath, `components/${componentName}/${componentName}.min.css`);

      return {
        name: component.name,
        files: {
          js: `components/${componentName}/${componentName}.min.js`,
          css: fs.existsSync(cssPath)
            ? `components/${componentName}/${componentName}.min.css`
            : null,
        },
        size: {
          js: fs.existsSync(jsPath) ? getFileSize(jsPath) : 0,
          css: fs.existsSync(cssPath) ? getFileSize(cssPath) : 0,
        },
      };
    }),
  };

  const manifestPath = path.join(outputPath, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`✅ Manifest generated: ${manifestPath}`);
}

/**
 * Get file size in KB
 */
function getFileSize(filePath: string): number {
  if (!fs.existsSync(filePath)) return 0;
  const stats = fs.statSync(filePath);
  return Math.round((stats.size / 1024) * 100) / 100; // KB with 2 decimal places
}

/**
 * Display file sizes for all generated files
 */
async function displayFileSizes(outputPath: string) {
  console.log('\n📊 File Sizes:');

  const mainJs = path.join(outputPath, 'js/main.min.js');
  const mainCss = path.join(outputPath, 'css/main.min.css');

  if (fs.existsSync(mainJs)) {
    console.log(`  js/main.min.js: ${getFileSize(mainJs)} KB`);
  }

  if (fs.existsSync(mainCss)) {
    console.log(`  css/main.min.css: ${getFileSize(mainCss)} KB`);
  }

  // List component bundles
  const componentsDir = path.join(outputPath, 'components');
  if (fs.existsSync(componentsDir)) {
    const componentDirs = fs.readdirSync(componentsDir, { withFileTypes: true });

    componentDirs
      .filter(entry => entry.isDirectory())
      .forEach(dir => {
        const jsFile = path.join(componentsDir, dir.name, `${dir.name}.min.js`);
        const cssFile = path.join(componentsDir, dir.name, `${dir.name}.min.css`);

        if (fs.existsSync(jsFile)) {
          const size = getFileSize(jsFile);
          const status = size > 50 ? '⚠️' : '✅';
          console.log(`  ${status} components/${dir.name}/${dir.name}.min.js: ${size} KB`);
        }

        if (fs.existsSync(cssFile)) {
          const size = getFileSize(cssFile);
          const status = size > 50 ? '⚠️' : '✅';
          console.log(`  ${status} components/${dir.name}/${dir.name}.min.css: ${size} KB`);
        }
      });
  }

  console.log('\n📏 Target: <50KB per component bundle');
}

// Run the build
buildKentico();
