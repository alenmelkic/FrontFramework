/**
 * Keyboard Navigation Utilities
 * Handle keyboard navigation patterns
 */

export type KeyboardKey =
  | 'Enter'
  | 'Space'
  | 'Escape'
  | 'Tab'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Home'
  | 'End';

/**
 * Check if a keyboard event matches a specific key
 */
export const isKey = (event: KeyboardEvent, key: KeyboardKey): boolean => {
  return event.key === key || event.code === key;
};

/**
 * Check if Enter or Space was pressed (for button-like elements)
 */
export const isActivationKey = (event: KeyboardEvent): boolean => {
  return isKey(event, 'Enter') || isKey(event, 'Space');
};

/**
 * Handle keyboard navigation for a list of items
 */
export const handleListNavigation = (
  event: KeyboardEvent,
  currentIndex: number,
  itemCount: number,
  onNavigate: (newIndex: number) => void,
  options: {
    vertical?: boolean;
    horizontal?: boolean;
    circular?: boolean;
  } = {}
): void => {
  const { vertical = true, horizontal = false, circular = true } = options;

  let newIndex = currentIndex;
  let handled = false;

  if (vertical) {
    if (isKey(event, 'ArrowDown')) {
      newIndex = currentIndex + 1;
      handled = true;
    } else if (isKey(event, 'ArrowUp')) {
      newIndex = currentIndex - 1;
      handled = true;
    }
  }

  if (horizontal) {
    if (isKey(event, 'ArrowRight')) {
      newIndex = currentIndex + 1;
      handled = true;
    } else if (isKey(event, 'ArrowLeft')) {
      newIndex = currentIndex - 1;
      handled = true;
    }
  }

  if (isKey(event, 'Home')) {
    newIndex = 0;
    handled = true;
  } else if (isKey(event, 'End')) {
    newIndex = itemCount - 1;
    handled = true;
  }

  if (handled) {
    event.preventDefault();

    // Handle circular navigation
    if (circular) {
      if (newIndex < 0) {
        newIndex = itemCount - 1;
      } else if (newIndex >= itemCount) {
        newIndex = 0;
      }
    } else {
      // Clamp to valid range
      newIndex = Math.max(0, Math.min(itemCount - 1, newIndex));
    }

    if (newIndex !== currentIndex) {
      onNavigate(newIndex);
    }
  }
};

/**
 * Handle roving tabindex for a list of items
 */
export const updateRovingTabindex = (
  items: HTMLElement[],
  activeIndex: number
): void => {
  items.forEach((item, index) => {
    if (index === activeIndex) {
      item.setAttribute('tabindex', '0');
      item.focus();
    } else {
      item.setAttribute('tabindex', '-1');
    }
  });
};

/**
 * Handle Escape key to close menus, modals, etc.
 */
export const handleEscapeKey = (
  event: KeyboardEvent,
  onEscape: () => void
): void => {
  if (isKey(event, 'Escape')) {
    event.preventDefault();
    onEscape();
  }
};

/**
 * Prevent default behavior for specific keys
 */
export const preventDefaultForKeys = (
  event: KeyboardEvent,
  keys: KeyboardKey[]
): void => {
  if (keys.some((key) => isKey(event, key))) {
    event.preventDefault();
  }
};

/**
 * Handle typeahead/search in a list
 */
export const createTypeaheadHandler = (
  items: string[],
  onMatch: (index: number) => void,
  timeout: number = 500
): ((event: KeyboardEvent) => void) => {
  let searchString = '';
  let clearTimeout: ReturnType<typeof setTimeout> | null = null;

  return (event: KeyboardEvent) => {
    // Only handle single character keys
    if (event.key.length !== 1 || event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    // Clear existing timeout
    if (clearTimeout) {
      window.clearTimeout(clearTimeout);
    }

    // Add character to search string
    searchString += event.key.toLowerCase();

    // Find matching item
    const matchIndex = items.findIndex((item) =>
      item.toLowerCase().startsWith(searchString)
    );

    if (matchIndex !== -1) {
      onMatch(matchIndex);
    }

    // Clear search string after timeout
    clearTimeout = window.setTimeout(() => {
      searchString = '';
    }, timeout);
  };
};
