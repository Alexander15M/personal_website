export const THEME_KEY = 'portfolio-theme'

// Runs before first paint (see app/layout.tsx) so the right theme is applied without a flash.
export const themeInitScript = `(function(){try{var s=localStorage.getItem('${THEME_KEY}');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d)}catch(e){}})()`
