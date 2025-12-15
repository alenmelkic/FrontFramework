import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Enterprise Multi-Brand Component Library`}
      description="FEFramework is an enterprise-grade React component library with multi-brand support, built on Bootstrap 5 and WCAG 2.1 AA compliant.">
      <main>
        <div className="container" style={{padding: '4rem 0'}}>
          <div className="row">
            <div className="col col--8 col--offset-2" style={{textAlign: 'center'}}>
              <h1 style={{fontSize: '3rem', marginBottom: '1rem'}}>
                FEFramework
              </h1>
              <p style={{fontSize: '1.5rem', color: '#666', marginBottom: '2rem'}}>
                Enterprise Multi-Brand Component Library
              </p>
              <p style={{fontSize: '1.125rem', marginBottom: '2rem'}}>
                10 production-ready React components. Multi-brand theming. WCAG 2.1 AA accessible. Built on Bootstrap 5.
              </p>
              <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem'}}>
                <Link
                  className="button button--primary button--lg"
                  to="/docs/getting-started/installation">
                  Get Started
                </Link>
                <Link
                  className="button button--secondary button--lg"
                  to="/docs/components/overview">
                  View Components
                </Link>
              </div>
            </div>
          </div>

          <div className="row" style={{marginTop: '4rem'}}>
            <div className="col col--4">
              <div style={{textAlign: 'center', padding: '2rem'}}>
                <h3>🎨 Multi-Brand</h3>
                <p>Switch between Energia and PowerNI themes. Create custom brand themes with ease.</p>
              </div>
            </div>
            <div className="col col--4">
              <div style={{textAlign: 'center', padding: '2rem'}}>
                <h3>♿ Accessible</h3>
                <p>WCAG 2.1 AA compliant. Tested with screen readers. Full keyboard navigation.</p>
              </div>
            </div>
            <div className="col col--4">
              <div style={{textAlign: 'center', padding: '2rem'}}>
                <h3>🧪 Tested</h3>
                <p>80%+ code coverage. Unit tests. Accessibility tests. Visual regression tests.</p>
              </div>
            </div>
          </div>

          <div className="row" style={{marginTop: '3rem'}}>
            <div className="col col--4">
              <div style={{textAlign: 'center', padding: '2rem'}}>
                <h3>📘 TypeScript</h3>
                <p>Fully typed for better developer experience and fewer bugs.</p>
              </div>
            </div>
            <div className="col col--4">
              <div style={{textAlign: 'center', padding: '2rem'}}>
                <h3>🚀 Kentico Ready</h3>
                <p>Export system for Kentico MVC. IIFE bundles. Auto-mount support.</p>
              </div>
            </div>
            <div className="col col--4">
              <div style={{textAlign: 'center', padding: '2rem'}}>
                <h3>⚡ Bootstrap 5</h3>
                <p>Built on Bootstrap 5.3.8 with utility classes and responsive design.</p>
              </div>
            </div>
          </div>

          <div className="row" style={{marginTop: '4rem', textAlign: 'center'}}>
            <div className="col">
              <h2 style={{marginBottom: '2rem'}}>Quick Example</h2>
              <pre style={{
                textAlign: 'left',
                background: '#f6f8fa',
                padding: '1.5rem',
                borderRadius: '8px',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                <code>{`import { Button, Card } from '@feframework/ui';

function App() {
  return (
    <Card
      header="Welcome"
      body="Get started with FEFramework"
      footer={
        <Button variant="primary" brand="energia">
          Learn More
        </Button>
      }
    />
  );
}`}</code>
              </pre>
            </div>
          </div>

          <div className="row" style={{marginTop: '4rem', textAlign: 'center'}}>
            <div className="col">
              <h2 style={{marginBottom: '1rem'}}>Components</h2>
              <p style={{marginBottom: '2rem'}}>
                Button • FormInput • FormSelect • Alert • Card • Hero • Footer • Navbar • Modal • Carousel
              </p>
              <Link
                className="button button--primary button--lg"
                to="/docs/components/overview">
                Explore All Components
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
