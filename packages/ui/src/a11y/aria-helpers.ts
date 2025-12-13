/**
 * ARIA Helper Utilities
 * Generate ARIA attributes for accessibility
 */

/**
 * Generate unique ID for ARIA relationships
 */
export const generateAriaId = (prefix: string = 'aria'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Generate ARIA attributes for describedby relationship
 */
export const generateDescribedBy = (...ids: (string | undefined)[]): string | undefined => {
  const validIds = ids.filter(Boolean);
  return validIds.length > 0 ? validIds.join(' ') : undefined;
};

/**
 * Generate ARIA attributes for labelledby relationship
 */
export const generateLabelledBy = (...ids: (string | undefined)[]): string | undefined => {
  const validIds = ids.filter(Boolean);
  return validIds.length > 0 ? validIds.join(' ') : undefined;
};

/**
 * Generate ARIA attributes for expanded state
 */
export const generateExpandedAttrs = (
  isExpanded: boolean
): {
  'aria-expanded': boolean;
} => ({
  'aria-expanded': isExpanded,
});

/**
 * Generate ARIA attributes for pressed state (toggle buttons)
 */
export const generatePressedAttrs = (
  isPressed: boolean
): {
  'aria-pressed': boolean;
} => ({
  'aria-pressed': isPressed,
});

/**
 * Generate ARIA attributes for selected state
 */
export const generateSelectedAttrs = (
  isSelected: boolean
): {
  'aria-selected': boolean;
} => ({
  'aria-selected': isSelected,
});

/**
 * Generate ARIA attributes for current state (navigation)
 */
export const generateCurrentAttrs = (
  current: 'page' | 'step' | 'location' | 'date' | 'time' | boolean
): {
  'aria-current': 'page' | 'step' | 'location' | 'date' | 'time' | 'true';
} | {} => {
  if (current === true) {
    return { 'aria-current': 'true' };
  }
  if (current && typeof current === 'string') {
    return { 'aria-current': current };
  }
  return {};
};

/**
 * Generate ARIA attributes for hidden state
 */
export const generateHiddenAttrs = (
  isHidden: boolean
): {
  'aria-hidden': boolean;
} | {} => {
  if (isHidden) {
    return { 'aria-hidden': true };
  }
  return {};
};

/**
 * Generate ARIA attributes for live region
 */
export const generateLiveRegionAttrs = (
  politeness: 'polite' | 'assertive' | 'off' = 'polite',
  atomic: boolean = true
): {
  'aria-live': 'polite' | 'assertive' | 'off';
  'aria-atomic': boolean;
} => ({
  'aria-live': politeness,
  'aria-atomic': atomic,
});

/**
 * Generate ARIA attributes for controls relationship
 */
export const generateControlsAttrs = (
  controlsId: string
): {
  'aria-controls': string;
} => ({
  'aria-controls': controlsId,
});

/**
 * Generate ARIA attributes for owns relationship
 */
export const generateOwnsAttrs = (
  ...ownedIds: string[]
): {
  'aria-owns': string;
} => ({
  'aria-owns': ownedIds.join(' '),
});
