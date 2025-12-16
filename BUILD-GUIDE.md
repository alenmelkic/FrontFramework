# FEFramework Build Guide

## Quick Start

### Build All Brands
```bash
npm run build:kentico:all
```
This builds both Energia and PowerNI in sequence.

### Build Single Brand
```bash
# Energia only
npm run build:kentico:energia

# PowerNI only
npm run build:kentico:powerni
```

## What Gets Built

### Energia
- **Location**: `Energia.ie/Energia/wwwroot/dist/`
- **Theme**: Green (#00a651)
- **Components**: 10 components

### PowerNI
- **Location**: `PowerNI.ie/PowerNI/wwwroot/dist/`
- **Theme**: Blue (#0066b3)
- **Components**: 10 components

## Output Structure

Each brand outputs to its own directory:

```
{Brand}.ie/{Brand}/wwwroot/dist/
├── components/
│   ├── alert/
│   │   ├── alert.html
│   │   └── alert.min.css
│   ├── button/
│   │   ├── button.html
│   │   └── button.min.css
│   ├── carousel/
│   │   ├── carousel.html
│   │   ├── carousel.min.css
│   │   └── carousel.min.js      ⚡ Interactive
│   ├── modal/
│   │   ├── modal.html
│   │   ├── modal.min.css
│   │   └── modal.min.js         ⚡ Interactive
│   └── navbar/
│       ├── navbar.html
│       ├── navbar.min.css
│       └── navbar.min.js        ⚡ Interactive
├── chunks/     (Shared JS dependencies)
├── css/        (Global styles)
└── js/         (Main bundle)
```

## Build Process

Each build command does:

1. **Vite Build** - Compiles React components to production bundles
2. **Theme Application** - Applies brand-specific SCSS themes
3. **File Reorganization** - Moves CSS into component folders
4. **JS Cleanup** - Removes JS from CSS-only components
5. **HTML Generation** - Creates usage templates for each component

## Component Types

### CSS-Only Components (7)
No JavaScript required - pure HTML + CSS:
- Alert
- Button
- Card
- Footer
- FormInput
- FormSelect
- Hero

**Output**: `component.html` + `component.min.css`

### Interactive Components (3)
Require JavaScript functionality:
- **Carousel** - Swiper integration (~102 KB)
- **Modal** - Focus trap, ESC key handling (~2.2 KB)
- **Navbar** - Mobile toggle, responsive menu (~1.4 KB)

**Output**: `component.html` + `component.min.css` + `component.min.js`

## Build Times

Typical build times on modern hardware:
- Single brand: ~30-35 seconds
- Both brands: ~60-70 seconds

## Troubleshooting

### Build Fails
```bash
# Clean and rebuild
rm -rf Energia.ie/Energia/wwwroot/dist
rm -rf PowerNI.ie/PowerNI/wwwroot/dist
npm run build:kentico:all
```

### Missing Files
Check that directories exist:
```bash
mkdir -p Energia.ie/Energia/wwwroot/dist
mkdir -p PowerNI.ie/PowerNI/wwwroot/dist
```

### Wrong Brand Colors
Ensure brand environment variable is set correctly. Check:
- `packages/themes/energia/` exists
- `packages/themes/powerni/` exists

### CSS File Size Too Large
Current size: ~225-240 KB per component (includes full Bootstrap)

Future optimization:
- Implement PurgeCSS to remove unused Bootstrap classes
- Expected reduction: 70-80% smaller (~50-60 KB)

## Configuration

### Brand Settings
Edit `brands.config.ts` to:
- Add new brands
- Change output paths
- Modify component lists
- Update brand colors

### Theme Customization
Edit brand theme files:
- `packages/themes/energia/tokens.scss`
- `packages/themes/powerni/tokens.scss`

### Build Scripts
Located in `package.json`:
```json
{
  "scripts": {
    "build:kentico:energia": "cd packages/ui && cmd //c \"set KENTICO_OUTPUT_PATH=../../Energia.ie/Energia/wwwroot/dist&& set BRAND=energia&& npx vite build --config vite.kentico.config.ts\" && cd ../.. && node run-reorganize.js",
    "build:kentico:powerni": "cd packages/ui && cmd //c \"set KENTICO_OUTPUT_PATH=../../PowerNI.ie/PowerNI/wwwroot/dist&& set BRAND=powerni&& npx vite build --config vite.kentico.config.ts\" && cd ../.. && node run-reorganize-powerni.js",
    "build:kentico:all": "npm run build:kentico:energia && npm run build:kentico:powerni"
  }
}
```

## Development Workflow

### 1. Make Changes
Edit components in `packages/ui/src/components/`

### 2. Test in Storybook
```bash
npm run storybook
```

### 3. Build for Kentico
```bash
# Test with one brand first
npm run build:kentico:energia

# If good, build all brands
npm run build:kentico:all
```

### 4. Deploy
Copy from:
- `Energia.ie/Energia/wwwroot/dist/` → Energia website
- `PowerNI.ie/PowerNI/wwwroot/dist/` → PowerNI website

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Build Kentico Components

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build:kentico:all
      - uses: actions/upload-artifact@v3
        with:
          name: kentico-builds
          path: |
            Energia.ie/Energia/wwwroot/dist
            PowerNI.ie/PowerNI/wwwroot/dist
```

## Adding a New Brand

See [BRAND-SYSTEM.md](./BRAND-SYSTEM.md) for detailed instructions.

Quick steps:
1. Add brand config to `brands.config.ts`
2. Create theme files in `packages/themes/{newbrand}/`
3. Create reorganize script `run-reorganize-{newbrand}.js`
4. Add build script to `package.json`
5. Run build: `npm run build:kentico:{newbrand}`

## File Size Reference

### Current Sizes
- Button CSS: ~225 KB (full Bootstrap included)
- Carousel JS: ~102 KB (includes Swiper library)
- Modal JS: ~2.2 KB
- Navbar JS: ~1.4 KB

### Optimization Opportunities
- [ ] PurgeCSS integration (reduce CSS by 70-80%)
- [ ] Swiper tree-shaking (reduce carousel.js)
- [ ] Shared dependency extraction
- [ ] Brotli compression

## Support

For issues or questions:
- Check [BRAND-SYSTEM.md](./BRAND-SYSTEM.md)
- Review [CLAUDE.md](./CLAUDE.md) for project overview
- Check build logs for specific error messages
