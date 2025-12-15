const fs = require('fs');
const path = require('path');

const distPath = path.resolve(__dirname, 'Energia.ie/Energia/wwwroot/dist');

console.log('\n📦 Reorganizing component files...');

// Components that have interactive JavaScript functionality
const interactiveComponents = ['modal', 'carousel', 'navbar'];

const components = [
  'alert', 'button', 'card', 'carousel', 'footer',
  'forminput', 'formselect', 'hero', 'modal', 'navbar'
];

for (const component of components) {
  const componentDir = path.join(distPath, 'components', component);

  // Component dir should already exist from JS build
  if (!fs.existsSync(componentDir)) {
    console.warn(`⚠️  Component directory not found: ${componentDir}`);
    continue;
  }

  // Move CSS file from root to component folder
  const cssSource = path.join(distPath, `${component}.min.css`);
  const cssTarget = path.join(componentDir, `${component}.min.css`);

  if (fs.existsSync(cssSource)) {
    fs.renameSync(cssSource, cssTarget);
    console.log(`✅ Moved ${component}.min.css to components/${component}/`);
  }

  // Check if component has interactive functionality
  const isInteractive = interactiveComponents.includes(component);

  // Delete JS file for non-interactive components
  if (!isInteractive) {
    const jsFile = path.join(componentDir, `${component}.min.js`);
    if (fs.existsSync(jsFile)) {
      fs.unlinkSync(jsFile);
      console.log(`🗑️  Removed ${component}.min.js (CSS-only component)`);
    }
  }

  // Create HTML template file
  const htmlPath = path.join(componentDir, `${component}.html`);
  const scriptTag = isInteractive
    ? `\n  <script type="module" src="./${component}.min.js"></script>`
    : '';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${component.charAt(0).toUpperCase() + component.slice(1)} Component</title>
  <link rel="stylesheet" href="./${component}.min.css">
</head>
<body class="brand-energia">
  <div class="container my-5">
    <h1>${component.charAt(0).toUpperCase() + component.slice(1)} Component</h1>
    <p>Component template for ${component}</p>
  </div>${scriptTag}
</body>
</html>`;

  fs.writeFileSync(htmlPath, html, 'utf-8');
  console.log(`✅ Created ${component}.html${isInteractive ? ' (with JS)' : ' (CSS only)'}`);
}

console.log('✨ Reorganization complete!\n');
