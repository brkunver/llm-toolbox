import { defineConfig } from "wxt"
import tailwindcss from "@tailwindcss/vite"

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    defaultLocale: "en",
    permissions: ["storage"],
    web_accessible_resources: [
      {
        matches: ["<all_urls>"],
        resources: ["/fonts/*"],
      },
    ],
  },
  srcDir: "src",
  publicDir: "src/public",
  modules: ["@wxt-dev/module-react"],
  webExt: {
    disabled: true,
  },
  vite: () => ({
    plugins: [tailwindcss()] as any,
  }),
})
