/**
 * Kentico MVC Auto-Mount System
 *
 * This file serves as the entry point for the Kentico build.
 * It exposes React and ReactDOM globally, provides a component registry,
 * and implements auto-mounting functionality for components via data attributes.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';

// Import components
import { Button } from './components/Button';

// Expose React and ReactDOM globally for Kentico
(window as any).React = React;
(window as any).ReactDOM = ReactDOM;

// Component registry - register all components
const componentRegistry: Record<string, React.ComponentType<any>> = {
  Button,
};

// FEFramework namespace
export interface FEFramework {
  version: string;
  components: Record<string, React.ComponentType<any>>;
  mount: (elementId: string, componentName: string, props?: Record<string, any>) => void;
  unmount: (elementId: string) => void;
  registerComponent: (name: string, component: React.ComponentType<any>) => void;
}

// Create FEFramework namespace
const feFramework: FEFramework = {
  version: '1.0.0',
  components: componentRegistry,

  /**
   * Manually mount a component to a DOM element
   * @param elementId - ID of the target DOM element
   * @param componentName - Name of the component to mount
   * @param props - Props to pass to the component
   */
  mount(elementId: string, componentName: string, props: Record<string, any> = {}) {
    const element = document.getElementById(elementId);

    if (!element) {
      console.error(`[FEFramework] Element with ID "${elementId}" not found`);
      return;
    }

    const Component = componentRegistry[componentName];

    if (!Component) {
      console.error(
        `[FEFramework] Component "${componentName}" not found. Available components:`,
        Object.keys(componentRegistry)
      );
      return;
    }

    try {
      const root = ReactDOM.createRoot(element);
      root.render(React.createElement(Component, props));
      console.log(`[FEFramework] Mounted ${componentName} to #${elementId}`);

      // Store root for potential unmounting
      (element as any).__feframework_root = root;
    } catch (error) {
      console.error(`[FEFramework] Error mounting ${componentName}:`, error);
    }
  },

  /**
   * Unmount a component from a DOM element
   * @param elementId - ID of the element to unmount from
   */
  unmount(elementId: string) {
    const element = document.getElementById(elementId);

    if (!element) {
      console.error(`[FEFramework] Element with ID "${elementId}" not found`);
      return;
    }

    const root = (element as any).__feframework_root;

    if (root) {
      root.unmount();
      delete (element as any).__feframework_root;
      console.log(`[FEFramework] Unmounted component from #${elementId}`);
    }
  },

  /**
   * Register a component in the registry
   * @param name - Component name
   * @param component - Component constructor
   */
  registerComponent(name: string, component: React.ComponentType<any>) {
    componentRegistry[name] = component;
    console.log(`[FEFramework] Registered component: ${name}`);
  },
};

// Expose FEFramework globally
(window as any).FEFramework = feFramework;

/**
 * Auto-mount system: Scan for [data-component] elements and mount them
 */
function autoMountComponents() {
  const elements = document.querySelectorAll('[data-component]');

  console.log(`[FEFramework] Found ${elements.length} components to auto-mount`);

  elements.forEach(element => {
    const componentName = element.getAttribute('data-component');
    const propsAttr = element.getAttribute('data-props');

    if (!componentName) {
      console.warn('[FEFramework] Element has data-component but no component name:', element);
      return;
    }

    // Parse props from JSON
    let props = {};
    if (propsAttr) {
      try {
        props = JSON.parse(propsAttr);
      } catch (error) {
        console.error(
          `[FEFramework] Error parsing props for ${componentName}:`,
          error,
          propsAttr
        );
        return;
      }
    }

    // Check if component exists
    const Component = componentRegistry[componentName];

    if (!Component) {
      console.error(
        `[FEFramework] Component "${componentName}" not found. Available:`,
        Object.keys(componentRegistry)
      );
      return;
    }

    // Mount component
    try {
      const root = ReactDOM.createRoot(element);
      root.render(React.createElement(Component, props));
      console.log(`[FEFramework] Auto-mounted ${componentName}`);

      // Store root for potential unmounting
      (element as any).__feframework_root = root;
    } catch (error) {
      console.error(`[FEFramework] Error auto-mounting ${componentName}:`, error);
    }
  });
}

// Auto-mount on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoMountComponents);
} else {
  // DOM already loaded
  autoMountComponents();
}

export default feFramework;
