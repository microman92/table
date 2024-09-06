export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  css: [
    '~/assets/styles/style.scss'
  ],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Тестовое задание',
    },
    baseURL: process.env.NODE_ENV === 'production' ? '/table/' : '/',
  },
  router: {
    base: '/table/'
  },
})
