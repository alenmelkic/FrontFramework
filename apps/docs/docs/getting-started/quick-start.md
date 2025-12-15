# Quick Start

Build your first page with FEFramework components in minutes.

## Basic Setup

### 1. Import Styles

In your main entry file (e.g., `main.tsx` or `App.tsx`):

```tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import '@feframework/ui/dist/ui.css';
```

### 2. Import Components

```tsx
import { Button, Card, Hero } from '@feframework/ui';
```

### 3. Use Components

```tsx
function HomePage() {
  return (
    <>
      <Hero
        title="Welcome to FEFramework"
        subtitle="Enterprise multi-brand component library"
        backgroundImage="/hero-bg.jpg"
        primaryAction={{
          label: 'Get Started',
          onClick: () => console.log('Get started clicked'),
        }}
      />

      <div className="container my-5">
        <div className="row">
          <div className="col-md-4">
            <Card
              header="Accessible"
              body="WCAG 2.1 AA compliant components out of the box"
            />
          </div>
          <div className="col-md-4">
            <Card
              header="Multi-Brand"
              body="Switch between Energia and PowerNI themes instantly"
            />
          </div>
          <div className="col-md-4">
            <Card
              header="TypeScript"
              body="Fully typed for better developer experience"
            />
          </div>
        </div>
      </div>
    </>
  );
}
```

## Brand Theming

### Energia Theme

```tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import '@feframework/themes/energia/bootstrap.scss';

function App() {
  return (
    <div className="brand-energia">
      <Button variant="primary" brand="energia">
        Energia Button
      </Button>
    </div>
  );
}
```

### PowerNI Theme

```tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import '@feframework/themes/powerni/bootstrap.scss';

function App() {
  return (
    <div className="brand-powerni">
      <Button variant="primary" brand="powerni">
        PowerNI Button
      </Button>
    </div>
  );
}
```

## Form Example

Build a complete form with validation:

```tsx
import { useState } from 'react';
import { FormInput, FormSelect, Button, Alert } from '@feframework/ui';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit}>
      {submitted && (
        <Alert variant="success" dismissible onDismiss={() => setSubmitted(false)}>
          Form submitted successfully!
        </Alert>
      )}

      <FormInput
        label="Name"
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <FormInput
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <FormSelect
        label="Subject"
        value={formData.subject}
        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        options={[
          { value: '', label: 'Select a subject' },
          { value: 'support', label: 'Technical Support' },
          { value: 'sales', label: 'Sales Inquiry' },
          { value: 'feedback', label: 'Feedback' },
        ]}
        required
      />

      <Button type="submit" variant="primary">
        Submit
      </Button>
    </form>
  );
}
```

## Modal Example

Create an interactive modal dialog:

```tsx
import { useState } from 'react';
import { Modal, Button } from '@feframework/ui';

function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        size="medium"
      >
        <p>Are you sure you want to proceed?</p>
        <div className="d-flex gap-2 justify-content-end mt-3">
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {
            // Handle confirmation
            setIsOpen(false);
          }}>
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
}
```

## Next Steps

- Explore [all components](/docs/components/overview)
- Learn about [theming](/docs/theming/overview)
- Check out [Storybook](http://localhost:6006) for interactive examples
- Read about [accessibility](/docs/accessibility/overview) features

## Common Patterns

### Layout with Navbar and Footer

```tsx
import { Navbar, Footer } from '@feframework/ui';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        brand="FEFramework"
        links={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ]}
      />

      <main className="flex-grow-1">
        {children}
      </main>

      <Footer
        variant="default"
        sections={[
          {
            title: 'Products',
            links: [
              { label: 'Features', href: '/features' },
              { label: 'Pricing', href: '/pricing' },
            ],
          },
        ]}
        copyright="© 2024 FEFramework"
      />
    </div>
  );
}
```

### Image Carousel

```tsx
import { Carousel } from '@feframework/ui';

function Gallery() {
  const slides = [
    { content: <img src="/image1.jpg" alt="Slide 1" /> },
    { content: <img src="/image2.jpg" alt="Slide 2" /> },
    { content: <img src="/image3.jpg" alt="Slide 3" /> },
  ];

  return (
    <Carousel
      slides={slides}
      autoplay
      autoplayDelay={3000}
      navigation
      pagination
      aria-label="Image gallery"
    />
  );
}
```
