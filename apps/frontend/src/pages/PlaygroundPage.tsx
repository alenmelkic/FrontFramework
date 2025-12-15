import React from 'react';

export const PlaygroundPage: React.FC = () => {
  return (
    <div className="container">
      <h1>Playground</h1>
      <p className="lead">
        Interactive playground for testing component compositions and layouts.
      </p>

      <div className="alert alert-info mt-4">
        <h4>Coming Soon</h4>
        <p className="mb-0">
          This playground will allow you to compose components together, test different
          configurations, and export code snippets. For now, please visit{' '}
          <a href="http://localhost:6006" target="_blank" rel="noopener noreferrer">
            Storybook
          </a>{' '}
          for interactive component testing.
        </p>
      </div>

      <div className="mt-5">
        <h3>Suggested Next Steps</h3>
        <ul>
          <li>Explore components in Storybook</li>
          <li>Check the component documentation</li>
          <li>Review the getting started guide on the homepage</li>
        </ul>
      </div>
    </div>
  );
};
