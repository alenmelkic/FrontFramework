import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Brand = 'energia' | 'powerni';

interface ThemeContextValue {
  brand: Brand;
  setBrand: (brand: Brand) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [brand, setBrandState] = useState<Brand>(() => {
    // Load from localStorage or default to energia
    const stored = localStorage.getItem('feframework-brand');
    return (stored === 'energia' || stored === 'powerni') ? stored : 'energia';
  });

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('feframework-brand', brand);

    // Apply brand class to body
    document.body.className = `brand-${brand}`;

    // Update document title to reflect current brand
    const brandName = brand === 'energia' ? 'Energia' : 'PowerNI';
    document.title = `FEFramework - ${brandName}`;
  }, [brand]);

  const setBrand = (newBrand: Brand) => {
    setBrandState(newBrand);
  };

  return (
    <ThemeContext.Provider value={{ brand, setBrand }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
