/**
 * Screen Reader Utilities
 * Live region announcements for screen readers
 */

/**
 * Politeness levels for screen reader announcements
 */
export type Politeness = 'polite' | 'assertive' | 'off';

/**
 * Create a live region for screen reader announcements
 */
export const createLiveRegion = (
  politeness: Politeness = 'polite'
): HTMLDivElement => {
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('role', 'status');
  liveRegion.setAttribute('aria-live', politeness);
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.className = 'sr-only visually-hidden';
  document.body.appendChild(liveRegion);
  return liveRegion;
};

/**
 * Announce a message to screen readers
 */
export const announce = (
  message: string,
  politeness: Politeness = 'polite',
  clearAfter: number = 1000
): void => {
  const liveRegion = createLiveRegion(politeness);
  liveRegion.textContent = message;

  // Clear after specified time
  setTimeout(() => {
    if (liveRegion.parentNode) {
      document.body.removeChild(liveRegion);
    }
  }, clearAfter);
};

/**
 * Announce an error message to screen readers
 */
export const announceError = (message: string): void => {
  announce(message, 'assertive', 3000);
};

/**
 * Announce a success message to screen readers
 */
export const announceSuccess = (message: string): void => {
  announce(message, 'polite', 2000);
};

/**
 * Announce loading state to screen readers
 */
export const announceLoading = (message: string = 'Loading'): void => {
  announce(`${message}...`, 'polite', 1000);
};

/**
 * Create a persistent live region that can be updated
 */
export class LiveRegion {
  private element: HTMLDivElement;

  constructor(politeness: Politeness = 'polite', id?: string) {
    this.element = createLiveRegion(politeness);
    if (id) {
      this.element.id = id;
    }
  }

  /**
   * Update the live region content
   */
  announce(message: string): void {
    this.element.textContent = message;
  }

  /**
   * Clear the live region
   */
  clear(): void {
    this.element.textContent = '';
  }

  /**
   * Remove the live region from the DOM
   */
  destroy(): void {
    if (this.element.parentNode) {
      document.body.removeChild(this.element);
    }
  }

  /**
   * Get the live region element
   */
  getElement(): HTMLDivElement {
    return this.element;
  }
}

/**
 * Create a progress announcer for long-running operations
 */
export class ProgressAnnouncer {
  private liveRegion: LiveRegion;
  private interval: number = 5000; // Announce every 5 seconds by default

  constructor(interval?: number) {
    this.liveRegion = new LiveRegion('polite');
    if (interval) {
      this.interval = interval;
    }
  }

  /**
   * Announce progress
   */
  announceProgress(current: number, total: number, unit: string = 'items'): void {
    const percentage = Math.round((current / total) * 100);
    this.liveRegion.announce(
      `${current} of ${total} ${unit} completed, ${percentage}% complete`
    );
  }

  /**
   * Announce completion
   */
  announceCompletion(message: string = 'Process complete'): void {
    this.liveRegion.announce(message);
  }

  /**
   * Clean up
   */
  destroy(): void {
    this.liveRegion.destroy();
  }
}
