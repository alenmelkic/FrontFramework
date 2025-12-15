import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Get brand from environment variable
const brand = process.env.BRAND || 'energia';

// Get Kentico output path from environment
const kenticoOutputPath = process.env.KENTICO_OUTPUT_PATH || path.resolve(__dirname, '../../dist/kentico');

// Auto-discover components from src/components/
function discoverComponents() {
  const componentsDir = path.resolve(__dirname, 'src/components');

  if (!fs.existsSync(componentsDir)) {
    console.warn('Components directory does not exist yet');
    return [];
  }

  const entries = fs.readdirSync(componentsDir, { withFileTypes: true });

  return entries
    .filter(entry => entry.isDirectory())
    .filter(entry => {
      const indexPath = path.join(componentsDir, entry.name, 'index.ts');
      return fs.existsSync(indexPath);
    })
    .map(entry => ({
      name: entry.name,
      path: path.join(componentsDir, entry.name, 'index.ts'),
    }));
}

const components = discoverComponents();

console.log(`Building Kentico bundles for brand: ${brand}`);
console.log(`Output path: ${kenticoOutputPath}`);
console.log(`Discovered ${components.length} components:`, components.map(c => c.name).join(', '));

// Build entry points for multi-entry build
const entries: Record<string, string> = {
  // Main bundle with all shared code
  'js/main': path.resolve(__dirname, 'src/kentico-main.ts'),
  'css/main': path.resolve(__dirname, 'src/styles/bootstrap/main.scss'),
};

// Add per-component entries
components.forEach(component => {
  const componentName = component.name.toLowerCase();
  entries[`components/${componentName}/${componentName}`] = component.path;
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: kenticoOutputPath,
    emptyOutDir: true,
    rollupOptions: {
      input: entries,
      output: {
        format: 'iife',
        name: 'FEFramework',
        entryFileNames: '[name].min.js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: assetInfo => {
          if (assetInfo.name?.endsWith('.css')) {
            return '[name].min.css';
          }
          // Handle fonts
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name || '')) {
            return 'assets/fonts/[name][extname]';
          }
          // Handle images
          if (/\.(png|jpe?g|svg|gif|webp)$/i.test(assetInfo.name || '')) {
            return 'assets/images/[name][extname]';
          }
          return 'assets/[name][extname]';
        },
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
        inlineDynamicImports: false, // Required for multiple entries
      },
      external: [], // Don't externalize anything - bundle everything
    },
    sourcemap: false, // Disable source maps for production Kentico bundles
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Import brand theme based on environment variable
        additionalData: `@import "@feframework/themes/${brand}/bootstrap.scss";`,
        includePaths: [
          path.resolve(__dirname, '../../node_modules'),
          path.resolve(__dirname, '../themes'),
          path.resolve(__dirname, './src'),
        ],
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@a11y': path.resolve(__dirname, './src/a11y'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@feframework/themes': path.resolve(__dirname, '../themes'),
    },
  },
  define: {
    'process.env.BRAND': JSON.stringify(brand),
  },
});
