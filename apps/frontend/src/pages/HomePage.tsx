import React from 'react';
import { Link } from 'react-router-dom';
import { frameworkInfo, gettingStarted, exportFormats } from '../data/framework-info';
import { componentsData } from '../data/components-data';
import { useTheme } from '../contexts/ThemeContext';
import './HomePage.scss';

export const HomePage: React.FC = () => {
  const { brand } = useTheme();
  const currentBrand = frameworkInfo.brands.find(b => b.id === brand);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">{frameworkInfo.name}</h1>
          <p className="hero-subtitle">v{frameworkInfo.version}</p>
          <p className="hero-description">{frameworkInfo.description}</p>

          <div className="hero-actions">
            <Link to="/components" className="btn btn-primary">
              View Components
            </Link>
            <Link to="/playground" className="btn btn-secondary">
              Try Playground
            </Link>
            <a
              href="http://localhost:6006"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Open Storybook
            </a>
          </div>

          {currentBrand && (
            <div className="current-brand-badge">
              <div className="brand-indicator" style={{ background: currentBrand.color }}></div>
              <span>Currently viewing: <strong>{currentBrand.name}</strong> theme</span>
            </div>
          )}
        </div>
      </section>

      <div className="container">
        {/* Available Pages */}
        <section className="section">
          <h2 className="section-title">Available Pages</h2>
          <div className="pages-grid">
            <div className="page-card">
              <h3>Home</h3>
              <p>Complete framework overview with all information</p>
              <Link to="/">View Page</Link>
            </div>
            <div className="page-card">
              <h3>Components</h3>
              <p>Browse all 10 components with interactive examples</p>
              <Link to="/components">View Page</Link>
            </div>
            <div className="page-card">
              <h3>Playground</h3>
              <p>Interactive playground to test component compositions</p>
              <Link to="/playground">View Page</Link>
            </div>
          </div>
        </section>

        {/* Components Library */}
        <section className="section">
          <h2 className="section-title">Component Library</h2>
          <p className="section-description">
            {frameworkInfo.name} provides {componentsData.length} production-ready components,
            all WCAG 2.1 AA compliant and fully tested.
          </p>
          <div className="components-grid">
            {componentsData.map((component) => (
              <div key={component.name} className="component-card">
                <div className="component-header">
                  <h3 className="component-name">{component.name}</h3>
                  <span className="component-category">{component.category}</span>
                </div>
                <p className="component-description">{component.description}</p>
                <div className="component-features">
                  <strong>Key Features:</strong>
                  <ul>
                    {component.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="component-footer">
                  <span className="props-count">{component.props.length} props</span>
                  <span className="a11y-badge">A11y Compliant</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="section">
          <h2 className="section-title">Technology Stack</h2>
          <div className="tech-grid">
            {frameworkInfo.technologies.map((tech) => (
              <div key={tech.name} className="tech-card">
                <h3 className="tech-name">{tech.name}</h3>
                <span className="tech-version">v{tech.version}</span>
                <p className="tech-purpose">{tech.purpose}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Themes */}
        <section className="section">
          <h2 className="section-title">Brand Themes</h2>
          <div className="brands-grid">
            {frameworkInfo.brands.map((brandItem) => (
              <div key={brandItem.id} className={`brand-card ${brand === brandItem.id ? 'active' : ''}`}>
                <div className="brand-card-header">
                  <div
                    className="brand-color-swatch"
                    style={{ background: brandItem.color }}
                  ></div>
                  <h3>{brandItem.name}</h3>
                </div>
                <p className="brand-color-code">{brandItem.color}</p>
                <p>{brandItem.description}</p>
                {brand === brandItem.id && (
                  <span className="active-badge">Active Theme</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Export Capabilities */}
        <section className="section">
          <h2 className="section-title">Multi-Platform Export</h2>
          <p className="section-description">
            Export components to multiple CMS platforms with separate HTML, CSS, and JavaScript files.
          </p>
          <div className="export-grid">
            {exportFormats.map((platform) => (
              <div key={platform.platform} className={`export-card status-${platform.status.toLowerCase().replace(' ', '-')}`}>
                <div className="export-header">
                  <h3>{platform.platform}</h3>
                  <span className={`status-badge ${platform.status.toLowerCase().replace(' ', '-')}`}>
                    {platform.status}
                  </span>
                </div>
                <p className="export-format"><strong>Format:</strong> {platform.format}</p>
                <p className="export-output"><strong>Output:</strong> {platform.output}</p>
                <p className="export-description">{platform.description}</p>
                <code className="export-command">{platform.command}</code>
              </div>
            ))}
          </div>
        </section>

        {/* Framework Capabilities */}
        <section className="section">
          <h2 className="section-title">Framework Capabilities</h2>
          <div className="capabilities-grid">
            {frameworkInfo.capabilities.map((capability, idx) => (
              <div key={idx} className="capability-item">
                <span className="capability-icon">✓</span>
                <span>{capability}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Getting Started */}
        <section className="section">
          <h2 className="section-title">Getting Started</h2>
          <div className="getting-started">
            <div className="install-section">
              <h3>Installation</h3>
              <p>Install using pnpm (recommended):</p>
              <pre className="code-block">
                <code>{gettingStarted.installation}</code>
              </pre>
              <p>Or using npm:</p>
              <pre className="code-block">
                <code>{gettingStarted.npmInstallation}</code>
              </pre>
            </div>

            <div className="usage-section">
              <h3>Basic Usage</h3>
              <pre className="code-block">
                <code>{gettingStarted.usage}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Links */}
        <section className="section">
          <h2 className="section-title">Resources</h2>
          <div className="links-grid">
            {frameworkInfo.links.map((link) => (
              <a
                key={link.title}
                href={link.url}
                className="link-card"
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <h3>{link.title}</h3>
                <p>{link.description}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
