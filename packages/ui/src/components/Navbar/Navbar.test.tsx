import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@tests/test-utils';
import userEvent from '@testing-library/user-event';
import { Navbar } from './Navbar';

const mockLinks = [
  { text: 'Home', href: '/', active: true },
  { text: 'About', href: '/about' },
];

describe('Navbar Component', () => {
  it('renders brand text', () => {
    render(<Navbar brandText="Brand" />);
    expect(screen.getByText('Brand')).toBeInTheDocument();
  });

  it('renders links', () => {
    render(<Navbar links={mockLinks} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('toggles mobile menu', async () => {
    const user = userEvent.setup();
    const { container } = render(<Navbar links={mockLinks} />);
    const toggle = screen.getByLabelText('Toggle navigation');
    
    await user.click(toggle);
    expect(container.querySelector('.navbar-collapse')).toHaveClass('show');
  });

  it('applies brand theming', () => {
    const { container } = render(<Navbar brand="energia" />);
    expect(container.querySelector('.navbar-brand-energia')).toBeInTheDocument();
  });

  it('marks active link', () => {
    render(<Navbar links={mockLinks} />);
    const activeLink = screen.getByText('Home');
    expect(activeLink).toHaveClass('active');
  });
});
