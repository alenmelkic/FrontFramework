/**
 * FEFramework - Enterprise Multi-Brand Component Library
 * Main entry point for standard npm package
 */

// Import base Bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Swiper CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import custom styles
import './styles/bootstrap/main.scss';

// Export components
export * from './components';

// Export utilities
export * from './utils';

// Export accessibility helpers
export * from './a11y';

// Version
export const version = '1.0.0';
