// Tailwind CSS configuration
// Generated to support the project's custom utilities and breakpoints
module.exports = {
    // Enable JIT mode (default in Tailwind v3+)
    // mode: 'jit', // JIT is default in Tailwind v4, removed
    // Paths to all of the template files in the project
    content: [
        './src/**/*.{js,ts,jsx,tsx,css}',
        './public/**/*.html',
    ],
    theme: {
        // Custom screen breakpoints matching the CSS variables defined in src/globals.css
        screens: {
            // Smartwatch breakpoint (custom variable --breakpoint-watch: 200px)
            'watch': { 'max': '199px' },
            // Extra‑small devices (smartwatch‑like)
            'xs': '380px',
            // Small mobile devices
            'sm': '640px',
            // Standard mobile
            'md': '768px',
            // Tablet
            'lg': '1024px',
            // Desktop
            'xl': '1280px',
            // Large desktop
            '2xl': '1536px',
            // TV / large displays
            'tv': '2560px',
            // 4K displays
            '4k': '3840px',
        },
        extend: {
            // Example of extending colors with the custom CSS variables used in the project
            colors: {
                'cyber-purple': 'var(--cyber-purple)',
                'cyber-cyan': 'var(--cyber-cyan)',
                'cyber-glow': 'var(--cyber-glow)',
                'bg-glass': 'var(--bg-glass)',
                'tertiary': 'var(--tertiary)',
            },
            // Extend other utilities if needed (e.g., spacing, animation)
            animation: {
                // Placeholder for custom animations defined in globals.css
                // (Tailwind will still generate the @keyframes you wrote manually)
            },
        },
    },
    // Enable future‑proof features
    future: {
        // Remove deprecated utilities in future releases
        removeDeprecatedGapUtilities: true,
        // Enable hover‑only utilities when supported
        hoverOnlyWhenSupported: true,
    },
    // Plugins that are useful for the project (forms, typography, etc.)
    // Ensure core utilities like text-white are always generated
    safelist: ['text-white'],
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/line-clamp'),
        // Container queries are used in the CSS (e.g., @container)
        require('@tailwindcss/container-queries'),
    ],
};
