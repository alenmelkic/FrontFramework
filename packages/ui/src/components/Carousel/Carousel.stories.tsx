import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './Carousel';

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const imageSlides = [
  { content: <img src="https://via.placeholder.com/800x400/00a651/ffffff?text=Slide+1" alt="Slide 1" /> },
  { content: <img src="https://via.placeholder.com/800x400/0066b3/ffffff?text=Slide+2" alt="Slide 2" /> },
  { content: <img src="https://via.placeholder.com/800x400/dc3545/ffffff?text=Slide+3" alt="Slide 3" /> },
];

export const Default: Story = {
  args: {
    slides: imageSlides,
  },
};

export const WithAutoplay: Story = {
  args: {
    slides: imageSlides,
    autoplay: true,
    autoplayDelay: 2000,
  },
};

export const NoNavigation: Story = {
  args: {
    slides: imageSlides,
    navigation: false,
  },
};

export const NoPagination: Story = {
  args: {
    slides: imageSlides,
    pagination: false,
  },
};

export const Energia: Story = {
  args: {
    slides: imageSlides,
    brand: 'energia',
  },
};

export const PowerNI: Story = {
  args: {
    slides: imageSlides,
    brand: 'powerni',
  },
};

export const MultipleSlides: Story = {
  args: {
    slides: imageSlides,
    slidesPerView: 2,
    spaceBetween: 20,
  },
};
