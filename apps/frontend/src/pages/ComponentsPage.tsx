import React from 'react';
import { componentsData } from '../data/components-data';

export const ComponentsPage: React.FC = () => {
  return (
    <div className="container">
      <h1>Components</h1>
      <p className="lead">Explore all {componentsData.length} components in the FEFramework library.</p>

      <div className="row g-4 mt-4">
        {componentsData.map((component) => (
          <div key={component.name} className="col-md-6 col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{component.name}</h5>
                <span className="badge bg-secondary mb-2">{component.category}</span>
                <p className="card-text">{component.description}</p>

                <h6 className="mt-3">Props</h6>
                <div className="d-flex flex-wrap gap-1">
                  {component.props.map((prop) => (
                    <span key={prop} className="badge bg-light text-dark">
                      {prop}
                    </span>
                  ))}
                </div>

                <h6 className="mt-3">Accessibility</h6>
                <ul className="small">
                  {component.a11yFeatures.slice(0, 2).map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="alert alert-info mt-5">
        <strong>Interactive Examples:</strong> Visit{' '}
        <a href="http://localhost:6006" target="_blank" rel="noopener noreferrer">
          Storybook
        </a>{' '}
        to see live, interactive examples of all components.
      </div>
    </div>
  );
};
