/**
 * Vite PurgeCSS Plugin
 * Optimizes CSS bundles by removing unused styles
 */

import type { Plugin } from 'vite';
import { PurgeCSS } from 'purgecss';
import path from 'path';
import fs from 'fs';

interface PurgeCSSPluginOptions {
  content?: string[];
  safelist?: {
    standard?: Array<string | RegExp>;
    deep?: Array<string | RegExp>;
    greedy?: Array<string | RegExp>;
  };
}

export function vitePurgeCSS(options: PurgeCSSPluginOptions = {}): Plugin {
  return {
    name: 'vite-plugin-purgecss',
    apply: 'build',
    enforce: 'post',

    async writeBundle(outputOptions, bundle) {
      const outDir = outputOptions.dir || 'dist';

      console.log('\n🧹 Running PurgeCSS...');

      // Find all CSS files in the bundle
      const cssFiles = Object.keys(bundle).filter(
        fileName => fileName.endsWith('.css') && !fileName.endsWith('.min.css')
      );

      if (cssFiles.length === 0) {
        console.log('⚠️  No CSS files found to purge');
        return;
      }

      // Prepare content files for PurgeCSS
      const contentFiles = options.content || [
        'packages/ui/src/**/*.{tsx,jsx,ts,js}',
        'packages/ui/src/kentico-main.ts',
      ];

      // Prepare safelist
      const safelist = {
        standard: [
          // Swiper classes
          /^swiper/,
          // Accessibility utilities
          'sr-only',
          'visually-hidden',
          'focus-visible',
          'skip-link',
          // State classes
          'active',
          'show',
          'fade',
          'disabled',
          'collapse',
          'collapsing',
          ...(options.safelist?.standard || []),
        ],
        deep: [
          // Bootstrap component classes
          /^btn/,
          /^form/,
          /^nav/,
          /^alert/,
          /^card/,
          /^modal/,
          /^dropdown/,
          /^carousel/,
          /^accordion/,
          // ARIA and data attributes
          /^aria-/,
          /^data-/,
          // Brand classes
          /energia/,
          /powerni/,
          ...(options.safelist?.deep || []),
        ],
        greedy: [
          // Bootstrap utilities
          /^(m|p)(t|b|l|r|x|y|s|e)?-/,
          /^text-/,
          /^bg-/,
          /^border-/,
          /^rounded/,
          /^d-/,
          /^flex/,
          /^justify/,
          /^align/,
          /^w-/,
          /^h-/,
          /^position-/,
          /^gap-/,
          /^shadow/,
          /^col/,
          /^row/,
          /^g-/,
          /^container/,
          ...(options.safelist?.greedy || []),
        ],
      };

      let totalSizeBefore = 0;
      let totalSizeAfter = 0;

      for (const cssFile of cssFiles) {
        const fullPath = path.join(outDir, cssFile);

        if (!fs.existsSync(fullPath)) {
          console.log(`⚠️  CSS file not found: ${fullPath}`);
          continue;
        }

        // Get original size
        const sizeBefore = fs.statSync(fullPath).size;
        totalSizeBefore += sizeBefore;

        try {
          // Run PurgeCSS
          const purgeCSSResults = await new PurgeCSS().purge({
            content: contentFiles.map(pattern => path.resolve(pattern)),
            css: [fullPath],
            safelist,
            defaultExtractor: content => {
              // Custom extractor for React className prop
              const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
              const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
              return broadMatches.concat(innerMatches);
            },
          });

          if (purgeCSSResults && purgeCSSResults.length > 0) {
            const purgedCSS = purgeCSSResults[0].css;

            // Write purged CSS back to file
            fs.writeFileSync(fullPath, purgedCSS);

            // Get new size
            const sizeAfter = fs.statSync(fullPath).size;
            totalSizeAfter += sizeAfter;

            const reduction = Math.round(((sizeBefore - sizeAfter) / sizeBefore) * 100);
            const sizeBeforeKB = Math.round((sizeBefore / 1024) * 100) / 100;
            const sizeAfterKB = Math.round((sizeAfter / 1024) * 100) / 100;

            console.log(
              `  ✅ ${cssFile}: ${sizeBeforeKB}KB → ${sizeAfterKB}KB (-${reduction}%)`
            );
          }
        } catch (error) {
          console.error(`  ❌ Error purging ${cssFile}:`, error);
        }
      }

      if (cssFiles.length > 0) {
        const totalReduction = Math.round(
          ((totalSizeBefore - totalSizeAfter) / totalSizeBefore) * 100
        );
        const totalBeforeKB = Math.round((totalSizeBefore / 1024) * 100) / 100;
        const totalAfterKB = Math.round((totalSizeAfter / 1024) * 100) / 100;

        console.log(
          `\n✨ Total CSS: ${totalBeforeKB}KB → ${totalAfterKB}KB (-${totalReduction}%)\n`
        );
      }
    },
  };
}
