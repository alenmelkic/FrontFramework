import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BrandSwitcher } from '../BrandSwitcher/BrandSwitcher';
import { useTheme } from '../../contexts/ThemeContext';
import './Layout.scss';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { brand } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`layout brand-${brand}`}>
      <header className="layout-header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="brand-logo">
              <span className="brand-icon">FE</span>
              <span className="brand-name">Framework</span>
            </Link>

            <nav className="main-nav" aria-label="Main navigation">
              <Link
                to="/"
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
              >
                Home
              </Link>
              <Link
                to="/components"
                className={`nav-link ${isActive('/components') ? 'active' : ''}`}
              >
                Components
              </Link>
              <Link
                to="/playground"
                className={`nav-link ${isActive('/playground') ? 'active' : ''}`}
              >
                Playground
              </Link>
              <a
                href="http://localhost:6006"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                Storybook ↗
              </a>
            </nav>

            <BrandSwitcher />
          </div>
        </div>
      </header>

      <main className="layout-main">
        {children}
      </main>

      <footer className="layout-footer">
        <div className="container">
          <div className="footer-content">
            <p className="footer-text">
              &copy; {new Date().getFullYear()} FEFramework. Built with React, TypeScript, and Bootstrap.
            </p>
            <div className="footer-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="http://localhost:6006" target="_blank" rel="noopener noreferrer">
                Storybook
              </a>
              <a href="#" onClick={(e) => e.preventDefault()}>
                Documentation
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
