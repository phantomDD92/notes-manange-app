import aliasConfig from "./nuxt-vite.config.js";

const baseUrl = "/";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 8000,
  },
  modules: [
    "nuxt-gtag",
    "~/modules/nuxt-primevue/module",
    "@pinia/nuxt",
    // "nuxt-primevue",
  ],
  // primevue: {
  //   /* Options */
  //   cssLayerOrder: "reset,primevue",
  //   options: {
  //     unstyled: true,
  //     ripple: true,
  //     inputStyle: "filled",
  //   },
  //   usePrimeVue: true,
  //   components: {
  //     include: "*",
  //   },
  //   directives: {
  //     include: "*",
  //   },
  //   importPT: { as: "Tailwind", from: "primevue/passthrough/tailwind" },
  // },
  // css: ["primevue/resources/themes/aura-light-green/theme.css"],
  // components: [
  //   "~/components",
  //   {
  //     path: "~/components/layout",
  //     prefetch: false,
  //   },
  // ],
  css: [
    "/node_modules/primeflex/primeflex.css",
    "/node_modules/primeicons/primeicons.css",
    "@/assets/styles/flags.css",
    "@docsearch/css/dist/style.css",
    "@/assets/styles/layout/landing/_landing.scss",
    "@/assets/styles/layout/layout.scss",
    "@/assets/styles/global.css",
    "primevue/resources/themes/aura-light-green/theme.css",
  ],
  // build: {
  //   postcss: {
  //     postcssOptions: require("./postcss.config.js"),
  //   },
  // },
  // vite: aliasConfig,
  // nitro: {
  //   alias: aliasConfig.resolve.alias,
  // },
  routeRules: {
    "/accessibility": {
      redirect: { to: "/guides/accessibility", statusCode: 301 },
    },
    "/installation": { redirect: { to: "/vite", statusCode: 301 } },
  },
  app: {
    baseURL: baseUrl,
    head: {
      title: "PrimeVue Notes App",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "The ultimate collection of design-agnostic, flexible and accessible Vue UI Components.",
        },
        { name: "robots", content: "index,follow" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@primevue" },
        {
          name: "twitter:title",
          content: "PrimeVue | Vue UI Component Library",
        },
        {
          name: "twitter:description",
          content:
            "The ultimate collection of design-agnostic, flexible and accessible Vue UI Components.",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content: "PrimeVue | Vue UI Component Library",
        },
        { property: "og:url", content: "https://primevue.org/" },
        {
          property: "og:description",
          content:
            "The ultimate collection of design-agnostic, flexible and accessible Vue UI Components.",
        },
        {
          property: "og:image",
          content:
            "https://www.primefaces.org/static/social/primevue-preview.jpg",
        },
        { property: "og:ttl", content: "604800" },
      ],
      link: [{ rel: "icon", href: baseUrl + "favicon.ico" }],
      script: [
        {
          src: baseUrl + "scripts/prism.js",
          "data-manual": true,
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      contextPath: baseUrl,
    },
  },
  primevue: {
    options: {
      ripple: true,
    },
    layerOrder: "primevue",
    resolvePath: function ({ as, from, type }) {
      const resolvedPath = from.replace("primevue", "@/components/lib");

      return type === "component"
        ? `${resolvedPath}/${as}.vue`
        : `${resolvedPath}/${as}.js`;
    },
  },
  gtag: {
    id: "G-48TTQ6G6KV",
  },
});
