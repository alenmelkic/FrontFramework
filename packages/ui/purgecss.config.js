module.exports = {
  content: ['src/**/*.{tsx,jsx,ts,js}'],
  css: ['dist/**/*.css'],
  safelist: {
    standard: [
      // Swiper classes
      /^swiper/,
      // Accessibility utilities
      'sr-only',
      'visually-hidden',
      'focus-visible',
      'skip-link',
      // State classes
      'active',
      'show',
      'fade',
      'disabled',
      'collapse',
      'collapsing',
    ],
    deep: [
      // Bootstrap component classes
      /^btn/,
      /^form/,
      /^nav/,
      /^alert/,
      /^card/,
      /^modal/,
      /^dropdown/,
      /^carousel/,
      /^accordion/,
      /^badge/,
      /^list-group/,
      /^table/,
      /^pagination/,
      /^breadcrumb/,
      /^tooltip/,
      /^popover/,
      /^spinner/,
      /^progress/,
      /^toast/,
      /^offcanvas/,
      // ARIA and data attributes
      /^aria-/,
      /^data-/,
      // Brand classes
      /energia/,
      /powerni/,
    ],
    greedy: [
      // Bootstrap utilities
      /^(m|p)(t|b|l|r|x|y|s|e)?-/,
      /^text-/,
      /^bg-/,
      /^border-/,
      /^rounded/,
      /^d-/,
      /^flex/,
      /^justify/,
      /^align/,
      /^w-/,
      /^h-/,
      /^position-/,
      /^top-/,
      /^bottom-/,
      /^start-/,
      /^end-/,
      /^translate-/,
      /^overflow-/,
      /^gap-/,
      /^fs-/,
      /^fw-/,
      /^lh-/,
      /^opacity-/,
      /^shadow/,
      /^z-/,
      /^col/,
      /^row/,
      /^g-/,
      /^gx-/,
      /^gy-/,
      /^container/,
    ],
  },
  // Custom extractor for React className prop
  defaultExtractor: content => {
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
    return broadMatches.concat(innerMatches);
  },
};
