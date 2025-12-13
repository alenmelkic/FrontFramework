import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { useState } from 'react';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const Default: Story = {
  render: () => <ModalWrapper title="Modal Title">This is modal content</ModalWrapper>,
};

export const Large: Story = {
  render: () => <ModalWrapper title="Large Modal" size="lg">Large modal content</ModalWrapper>,
};

export const Energia: Story = {
  render: () => <ModalWrapper title="Energia Modal" brand="energia">Energia themed modal</ModalWrapper>,
};
