export default defineNuxtConfig({
  runtimeConfig: {
    // Private keys that are server-side only
    openaiApiKey: process.env.OPENAI_API_KEY,
  },

  compatibilityDate: "2025-04-03",

  modules: ['nuxt-icon'],
  
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },
});