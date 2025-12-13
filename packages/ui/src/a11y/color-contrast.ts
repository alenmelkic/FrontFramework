/**
 * Color Contrast Utilities
 * Calculate and verify WCAG color contrast ratios
 */

/**
 * Convert hex color to RGB
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Parse hex values
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  if (hex.length !== 6) {
    return null;
  }

  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  return { r, g, b };
};

/**
 * Calculate relative luminance of a color
 * https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
export const getRelativeLuminance = (rgb: {
  r: number;
  g: number;
  b: number;
}): number => {
  const { r, g, b } = rgb;

  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;

  const rLinear = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const gLinear = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const bLinear = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
};

/**
 * Calculate contrast ratio between two colors
 * https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 */
export const getContrastRatio = (color1: string, color2: string): number | null => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) {
    return null;
  }

  const lum1 = getRelativeLuminance(rgb1);
  const lum2 = getRelativeLuminance(rgb2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * WCAG contrast levels
 */
export enum WCAGLevel {
  AA = 'AA',
  AAA = 'AAA',
}

/**
 * Text size categories for WCAG
 */
export enum TextSize {
  Normal = 'normal',
  Large = 'large',
}

/**
 * Check if contrast ratio meets WCAG AA standards
 */
export const meetsWCAGAA = (
  contrastRatio: number,
  textSize: TextSize = TextSize.Normal
): boolean => {
  const requiredRatio = textSize === TextSize.Large ? 3 : 4.5;
  return contrastRatio >= requiredRatio;
};

/**
 * Check if contrast ratio meets WCAG AAA standards
 */
export const meetsWCAGAAA = (
  contrastRatio: number,
  textSize: TextSize = TextSize.Normal
): boolean => {
  const requiredRatio = textSize === TextSize.Large ? 4.5 : 7;
  return contrastRatio >= requiredRatio;
};

/**
 * Verify color contrast meets WCAG standards
 */
export const verifyContrast = (
  foreground: string,
  background: string,
  level: WCAGLevel = WCAGLevel.AA,
  textSize: TextSize = TextSize.Normal
): {
  ratio: number | null;
  passes: boolean;
  level: WCAGLevel;
  textSize: TextSize;
} => {
  const ratio = getContrastRatio(foreground, background);

  if (ratio === null) {
    return {
      ratio: null,
      passes: false,
      level,
      textSize,
    };
  }

  const passes =
    level === WCAGLevel.AAA ? meetsWCAGAAA(ratio, textSize) : meetsWCAGAA(ratio, textSize);

  return {
    ratio,
    passes,
    level,
    textSize,
  };
};

/**
 * Get suggested improvements for contrast
 */
export const getSuggestedContrast = (
  foreground: string,
  background: string,
  targetLevel: WCAGLevel = WCAGLevel.AA
): string => {
  const result = verifyContrast(foreground, background, targetLevel);

  if (!result.ratio) {
    return 'Invalid colors provided';
  }

  if (result.passes) {
    return `Contrast ratio ${result.ratio.toFixed(2)}:1 passes ${targetLevel}`;
  }

  const requiredRatio =
    targetLevel === WCAGLevel.AAA
      ? result.textSize === TextSize.Large
        ? 4.5
        : 7
      : result.textSize === TextSize.Large
      ? 3
      : 4.5;

  return `Contrast ratio ${result.ratio.toFixed(
    2
  )}:1 does not meet ${targetLevel} standards. Minimum required: ${requiredRatio}:1`;
};
