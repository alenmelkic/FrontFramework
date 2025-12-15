# Using Components in Kentico MVC

Step-by-step guide to using FEFramework components in your Kentico MVC project.

## Step 1: Run Kentico Build

Build the component library for your brand:

```bash
cd FrontFramework
pnpm build:kentico:energia
```

This outputs files to `../Web/wwwroot/dist/`

## Step 2: Include Scripts in Layout

In your Kentico layout file (e.g., `_Layout.cshtml`):

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>@ViewBag.Title</title>

    <!-- FEFramework CSS -->
    <link rel="stylesheet" href="~/dist/css/main.min.css" />
</head>
<body class="brand-energia">

    @RenderBody()

    <!-- FEFramework JavaScript -->
    <script src="~/dist/js/main.min.js"></script>

    @RenderSection("scripts", required: false)
</body>
</html>
```

## Step 3: Use Components in Views

### Method 1: Auto-Mount (Recommended)

Use data attributes for automatic component mounting:

```html title="Home.cshtml"
<div data-component="Hero" data-props='{
  "title": "Welcome to Energia",
  "subtitle": "Powering Irish homes since 1927",
  "backgroundImage": "/images/hero-bg.jpg",
  "primaryAction": {
    "label": "Get Started",
    "onClick": "handleGetStarted"
  }
}'>
  Loading...
</div>

<script>
function handleGetStarted() {
  window.location.href = '/get-started';
}
</script>
```

### Method 2: Manual Mount

Mount components programmatically:

```html title="Contact.cshtml"
<div id="contact-form"></div>

@section scripts {
<script>
  // Wait for FEFramework to load
  document.addEventListener('DOMContentLoaded', function() {
    window.FEFramework.mount('contact-form', 'FormInput', {
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter your email',
      required: true
    });
  });
</script>
}
```

### Method 3: Direct Component Access

Use React components directly:

```html
<div id="app"></div>

@section scripts {
<script src="~/dist/components/button/button.min.js"></script>
<script src="~/dist/components/card/card.min.js"></script>

<script>
  const { Button, Card } = window.FEFramework.components;

  const root = ReactDOM.createRoot(document.getElementById('app'));
  root.render(
    React.createElement(Card, {
      header: 'Welcome',
      body: 'This is a card component',
      footer: React.createElement(Button, {
        variant: 'primary',
        onClick: () => alert('Clicked!')
      }, 'Click Me')
    })
  );
</script>
}
```

## Common Patterns

### Navigation Menu

```html title="_Layout.cshtml"
<div data-component="Navbar" data-props='{
  "brand": "Energia",
  "logo": "/images/energia-logo.svg",
  "links": [
    {"label": "Home", "href": "/"},
    {"label": "Products", "href": "/products"},
    {"label": "About", "href": "/about"},
    {"label": "Contact", "href": "/contact"}
  ],
  "sticky": true,
  "brand": "energia"
}'>
  <nav>Loading navigation...</nav>
</div>
```

### Footer

```html
<div data-component="Footer" data-props='{
  "sections": [
    {
      "title": "Products",
      "links": [
        {"label": "Electricity", "href": "/electricity"},
        {"label": "Gas", "href": "/gas"}
      ]
    },
    {
      "title": "Support",
      "links": [
        {"label": "FAQ", "href": "/faq"},
        {"label": "Contact Us", "href": "/contact"}
      ]
    }
  ],
  "copyright": "© 2024 Energia. All rights reserved.",
  "social": [
    {"platform": "facebook", "url": "https://facebook.com/energia"},
    {"platform": "twitter", "url": "https://twitter.com/energia"}
  ],
  "brand": "energia"
}'>
  <footer>Loading footer...</footer>
</div>
```

### Form with Validation

```html title="ContactForm.cshtml"
@{
    ViewBag.Title = "Contact Us";
}

<div class="container my-5">
    <h1>Contact Us</h1>

    <div id="contact-alert"></div>

    <form id="contact-form">
        <div id="name-input"></div>
        <div id="email-input"></div>
        <div id="subject-select"></div>
        <div id="message-input"></div>
        <div id="submit-button"></div>
    </form>
</div>

@section scripts {
<script src="~/dist/components/form-input/form-input.min.js"></script>
<script src="~/dist/components/form-select/form-select.min.js"></script>
<script src="~/dist/components/button/button.min.js"></script>
<script src="~/dist/components/alert/alert.min.js"></script>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const FE = window.FEFramework;

    // Mount form fields
    FE.mount('name-input', 'FormInput', {
        label: 'Name',
        type: 'text',
        required: true,
        id: 'name'
    });

    FE.mount('email-input', 'FormInput', {
        label: 'Email',
        type: 'email',
        required: true,
        id: 'email'
    });

    FE.mount('subject-select', 'FormSelect', {
        label: 'Subject',
        options: [
            { value: '', label: 'Select a subject' },
            { value: 'billing', label: 'Billing Question' },
            { value: 'support', label: 'Technical Support' },
            { value: 'other', label: 'Other' }
        ],
        required: true,
        id: 'subject'
    });

    FE.mount('message-input', 'FormInput', {
        label: 'Message',
        type: 'text',
        id: 'message',
        required: true
    });

    FE.mount('submit-button', 'Button', {
        variant: 'primary',
        type: 'submit',
        brand: 'energia',
        children: 'Send Message',
        onClick: handleSubmit
    });

    function handleSubmit(e) {
        e.preventDefault();

        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Submit to server
        fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            FE.mount('contact-alert', 'Alert', {
                variant: 'success',
                dismissible: true,
                children: 'Message sent successfully!'
            });
        })
        .catch(error => {
            FE.mount('contact-alert', 'Alert', {
                variant: 'danger',
                dismissible: true,
                children: 'Error sending message. Please try again.'
            });
        });
    }
});
</script>
}
```

### Modal Dialog

```html
<button id="open-modal" class="btn btn-primary">Open Modal</button>

<div id="modal-container"></div>

@section scripts {
<script src="~/dist/components/modal/modal.min.js"></script>
<script src="~/dist/components/button/button.min.js"></script>

<script>
document.getElementById('open-modal').addEventListener('click', function() {
    window.FEFramework.mount('modal-container', 'Modal', {
        isOpen: true,
        title: 'Confirm Action',
        size: 'medium',
        onClose: function() {
            // Clear modal when closed
            document.getElementById('modal-container').innerHTML = '';
        },
        children: React.createElement('div', null,
            React.createElement('p', null, 'Are you sure you want to proceed?'),
            React.createElement('div', { className: 'd-flex gap-2 justify-content-end mt-3' },
                React.createElement(window.FEFramework.components.Button, {
                    variant: 'secondary',
                    onClick: function() {
                        document.getElementById('modal-container').innerHTML = '';
                    }
                }, 'Cancel'),
                React.createElement(window.FEFramework.components.Button, {
                    variant: 'primary',
                    onClick: function() {
                        alert('Confirmed!');
                        document.getElementById('modal-container').innerHTML = '';
                    }
                }, 'Confirm')
            )
        )
    });
});
</script>
}
```

## Partial Views

Create reusable partial views for components:

```html title="_HeroPartial.cshtml"
@model HeroViewModel

<div data-component="Hero" data-props='{
  "title": "@Model.Title",
  "subtitle": "@Model.Subtitle",
  "backgroundImage": "@Model.BackgroundImage",
  "height": "@Model.Height",
  "primaryAction": @Html.Raw(Json.Serialize(Model.PrimaryAction)),
  "brand": "energia"
}'>
  <div>Loading...</div>
</div>
```

Use in views:

```html
@{
    var heroModel = new HeroViewModel {
        Title = "Welcome",
        Subtitle = "Get started today",
        BackgroundImage = "/images/hero.jpg",
        Height = "large",
        PrimaryAction = new { label = "Sign Up", onClick = "handleSignUp" }
    };
}

@Html.Partial("_HeroPartial", heroModel)
```

## Performance Tips

### Load Only Required Components

Instead of loading all components, load only what you need:

```html
<!-- Only load Button and Card -->
<link rel="stylesheet" href="~/dist/components/button/button.min.css" />
<link rel="stylesheet" href="~/dist/components/card/card.min.css" />

<script src="~/dist/js/main.min.js"></script>
<script src="~/dist/components/button/button.min.js"></script>
<script src="~/dist/components/card/card.min.js"></script>
```

### Lazy Loading

Load components on demand:

```js
function loadComponent(name, callback) {
  const script = document.createElement('script');
  script.src = `/dist/components/${name.toLowerCase()}/${name.toLowerCase()}.min.js`;
  script.onload = callback;
  document.head.appendChild(script);
}

// Load modal only when needed
document.getElementById('open-modal').addEventListener('click', function() {
  loadComponent('Modal', function() {
    window.FEFramework.mount('modal-container', 'Modal', { ... });
  });
});
```

## Next Steps

- Understand the [manifest file](./manifest)
- View [integration overview](./overview)
- Explore [component documentation](/docs/components/overview)
