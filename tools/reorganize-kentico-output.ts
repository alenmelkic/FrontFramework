/**
 * Reorganize Kentico build output
 * Moves CSS and HTML files into component folders
 */

import fs from 'fs';
import path from 'path';
import { getBrandComponents, isInteractiveComponent } from '../brands.config.js';

export function reorganizeKenticoOutput(distPath: string, brandId: string = 'energia') {
  console.log(`\n📦 Reorganizing ${brandId} component files...`);

  // Get components for this brand from config
  const components = getBrandComponents(brandId);

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
    const hasInteractivity = isInteractiveComponent(component);

    // Delete JS file for non-interactive components
    if (!hasInteractivity) {
      const jsFile = path.join(componentDir, `${component}.min.js`);
      if (fs.existsSync(jsFile)) {
        fs.unlinkSync(jsFile);
        console.log(`🗑️  Removed ${component}.min.js (CSS-only component)`);
      }
    }

    // Create HTML template file
    createHTMLTemplate(componentDir, component, hasInteractivity, brandId);
  }

  console.log('✨ Reorganization complete!\n');
}

function createHTMLTemplate(
  componentDir: string,
  componentName: string,
  includeJS: boolean = false,
  brandId: string = 'energia'
) {
  const htmlPath = path.join(componentDir, `${componentName}.html`);

  const templates: Record<string, string> = {
    button: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Button Component</title>
  <link rel="stylesheet" href="./button.min.css">
</head>
<body class="brand-energia">
  <div class="container my-5">
    <h1>Button Component</h1>

    <!-- Primary Button -->
    <button type="button" class="btn btn-primary">Primary Button</button>

    <!-- Secondary Button -->
    <button type="button" class="btn btn-secondary">Secondary Button</button>

    <!-- Success Button -->
    <button type="button" class="btn btn-success">Success Button</button>

    <!-- Large Button -->
    <button type="button" class="btn btn-primary btn-lg">Large Button</button>

    <!-- Small Button -->
    <button type="button" class="btn btn-primary btn-sm">Small Button</button>

    <!-- Disabled Button -->
    <button type="button" class="btn btn-primary" disabled>Disabled Button</button>
  </div>
</body>
</html>`,

    card: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Card Component</title>
  <link rel="stylesheet" href="./card.min.css">
</head>
<body class="brand-energia">
  <div class="container my-5">
    <h1>Card Component</h1>

    <div class="card" style="width: 18rem;">
      <div class="card-header">Card Header</div>
      <div class="card-body">
        <h5 class="card-title">Card Title</h5>
        <p class="card-text">This is the card body content. You can put any HTML content here.</p>
      </div>
      <div class="card-footer">Card Footer</div>
    </div>
  </div>
</body>
</html>`,

    alert: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alert Component</title>
  <link rel="stylesheet" href="./alert.min.css">
</head>
<body class="brand-energia">
  <div class="container my-5">
    <h1>Alert Component</h1>

    <!-- Success Alert -->
    <div class="alert alert-success" role="alert">
      This is a success alert!
    </div>

    <!-- Warning Alert -->
    <div class="alert alert-warning" role="alert">
      This is a warning alert!
    </div>

    <!-- Dismissible Alert -->
    <div class="alert alert-info alert-dismissible fade show" role="alert">
      This is a dismissible alert!
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  </div>
</body>
</html>`,

    hero: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hero Component</title>
  <link rel="stylesheet" href="./hero.min.css">
</head>
<body class="brand-energia">
  <div class="hero-section text-center py-5" style="background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://via.placeholder.com/1920x600') center/cover;">
    <div class="container">
      <h1 class="display-3 text-white">Welcome to Our Site</h1>
      <p class="lead text-white">Discover amazing features and services</p>
      <div class="mt-4">
        <button class="btn btn-primary btn-lg me-3">Get Started</button>
        <button class="btn btn-outline-light btn-lg">Learn More</button>
      </div>
    </div>
  </div>
</body>
</html>`,

    navbar: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Navbar Component</title>
  <link rel="stylesheet" href="./navbar.min.css">
</head>
<body class="brand-energia">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">FEFramework</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="#">About</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Contact</a></li>
        </ul>
      </div>
    </div>
  </nav>
</body>
</html>`,

    footer: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Footer Component</title>
  <link rel="stylesheet" href="./footer.min.css">
</head>
<body class="brand-energia">
  <footer class="bg-light py-4 mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <p>&copy; 2024 FEFramework. All rights reserved.</p>
        </div>
        <div class="col-md-6 text-end">
          <a href="#" class="me-3">Privacy</a>
          <a href="#" class="me-3">Terms</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </div>
  </footer>
</body>
</html>`,

    forminput: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Form Input Component</title>
  <link rel="stylesheet" href="./forminput.min.css">
</head>
<body class="brand-energia">
  <div class="container my-5">
    <h1>Form Input Component</h1>

    <div class="mb-3">
      <label for="emailInput" class="form-label">Email address</label>
      <input type="email" class="form-control" id="emailInput" placeholder="Enter your email">
    </div>

    <div class="mb-3">
      <label for="nameInput" class="form-label">Name</label>
      <input type="text" class="form-control" id="nameInput" placeholder="Enter your name" required>
    </div>
  </div>
</body>
</html>`,

    formselect: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Form Select Component</title>
  <link rel="stylesheet" href="./formselect.min.css">
</head>
<body class="brand-energia">
  <div class="container my-5">
    <h1>Form Select Component</h1>

    <div class="mb-3">
      <label for="selectInput" class="form-label">Select an option</label>
      <select class="form-select" id="selectInput">
        <option selected>Choose...</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>
    </div>
  </div>
</body>
</html>`,

    modal: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modal Component</title>
  <link rel="stylesheet" href="./modal.min.css">
</head>
<body class="brand-energia">
  <div class="container my-5">
    <h1>Modal Component</h1>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch Modal
    </button>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal Title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Modal body content goes here.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Note: Requires Bootstrap JS for functionality -->
</body>
</html>`,

    carousel: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Carousel Component</title>
  <link rel="stylesheet" href="./carousel.min.css">
</head>
<body class="brand-energia">
  <div class="container my-5">
    <h1>Carousel Component</h1>

    <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="https://via.placeholder.com/800x400?text=Slide+1" class="d-block w-100" alt="Slide 1">
        </div>
        <div class="carousel-item">
          <img src="https://via.placeholder.com/800x400?text=Slide+2" class="d-block w-100" alt="Slide 2">
        </div>
        <div class="carousel-item">
          <img src="https://via.placeholder.com/800x400?text=Slide+3" class="d-block w-100" alt="Slide 3">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <!-- Note: Requires Bootstrap JS or Swiper JS for functionality -->
</body>
</html>`,
  };

  const scriptTag = includeJS
    ? `\n  <script type="module" src="./${componentName}.min.js"></script>`
    : '';

  const html = templates[componentName] || `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${componentName} Component</title>
  <link rel="stylesheet" href="./${componentName}.min.css">
</head>
<body class="brand-energia">
  <div class="container my-5">
    <h1>${componentName.charAt(0).toUpperCase() + componentName.slice(1)} Component</h1>
    <p>HTML template for ${componentName}</p>
  </div>${scriptTag}
</body>
</html>`;

  fs.writeFileSync(htmlPath, html, 'utf-8');
  console.log(`✅ Created ${componentName}.html${includeJS ? ' (with JS)' : ' (CSS only)'}`);
}
