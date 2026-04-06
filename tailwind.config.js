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
            // Fluid Typography
            fontSize: {
                'fluid-xs': 'clamp(0.75rem, 1vw + 0.5rem, 0.875rem)',   // 12px to 14px
                'fluid-sm': 'clamp(0.875rem, 1.2vw + 0.5rem, 1rem)',    // 14px to 16px
                'fluid-base': 'clamp(1rem, 1.5vw + 0.5rem, 1.125rem)',  // 16px to 18px
                'fluid-lg': 'clamp(1.125rem, 2vw + 0.5rem, 1.25rem)',   // 18px to 20px
                'fluid-xl': 'clamp(1.25rem, 2.5vw + 0.5rem, 1.5rem)',   // 20px to 24px
                'fluid-2xl': 'clamp(1.5rem, 3vw + 0.5rem, 2rem)',       // 24px to 32px
                'fluid-3xl': 'clamp(1.875rem, 4vw + 0.5rem, 2.5rem)',   // 30px to 40px
                'fluid-4xl': 'clamp(2.25rem, 5vw + 0.5rem, 3rem)',      // 36px to 48px
                'fluid-5xl': 'clamp(3rem, 6vw + 0.5rem, 4rem)',         // 48px to 64px
                'fluid-h1': 'clamp(2.5rem, 7vw, 5rem)',
                'fluid-h2': 'clamp(2rem, 5vw, 4rem)',
                'fluid-h3': 'clamp(1.5rem, 4vw, 3rem)',
            },
            // Fluid Spacing
            spacing: {
                'fluid-sm': 'clamp(0.5rem, 1vw, 1rem)',
                'fluid-md': 'clamp(1rem, 2vw, 1.5rem)',
                'fluid-lg': 'clamp(1.5rem, 3vw, 2.5rem)',
                'fluid-xl': 'clamp(2rem, 5vw, 4rem)',
                'fluid-2xl': 'clamp(3rem, 7vw, 6rem)',
                'fluid-section': 'clamp(4rem, 10vw, 8rem)',
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
