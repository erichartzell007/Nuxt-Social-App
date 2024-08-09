// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  // routeRules: {
  //   "/": { ssr: false },
  //   "/auth/*": { ssr: false },
  //   "/profile/*": { ssr: false },
  //   "/create-post/*": { ssr: false },
  //   "/store/*": { ssr: false },
  // },
  css: ["~/assets/css/main.css", "vue-toast-notification/dist/theme-sugar.css"],
  modules: [
    "@pinia/nuxt",
    "@vee-validate/nuxt",

    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Roboto: [300, 400, 500, 600, 700],
          Lato: [100, 300],
          Poppins: [200, 300, 400, 500, 600, 700, 800],
        },
      },
    ],
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
