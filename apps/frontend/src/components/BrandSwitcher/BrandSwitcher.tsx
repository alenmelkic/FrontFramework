import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './BrandSwitcher.scss';

export const BrandSwitcher: React.FC = () => {
  const { brand, setBrand } = useTheme();

  return (
    <div className="brand-switcher">
      <label htmlFor="brand-select" className="brand-switcher-label">
        Theme:
      </label>
      <div className="brand-switcher-buttons">
        <button
          type="button"
          className={`brand-switcher-btn ${brand === 'energia' ? 'active' : ''}`}
          onClick={() => setBrand('energia')}
          aria-pressed={brand === 'energia'}
          aria-label="Switch to Energia theme"
        >
          <span className="brand-indicator energia"></span>
          Energia
        </button>
        <button
          type="button"
          className={`brand-switcher-btn ${brand === 'powerni' ? 'active' : ''}`}
          onClick={() => setBrand('powerni')}
          aria-pressed={brand === 'powerni'}
          aria-label="Switch to PowerNI theme"
        >
          <span className="brand-indicator powerni"></span>
          PowerNI
        </button>
      </div>
    </div>
  );
};
