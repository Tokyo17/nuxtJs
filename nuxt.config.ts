// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  css: ["bootstrap/dist/css/bootstrap.min.css"],
  devtools: { enabled: true },
  runtimeConfig:{
    public:{
      API:process.env.API
    }
  }
})
