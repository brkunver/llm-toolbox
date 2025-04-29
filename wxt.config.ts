import { defineConfig } from "wxt"
import tailwindcss from "@tailwindcss/vite"

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: "__MSG_extName__",
    description: "__MSG_extDescription__",
    default_locale: "en",
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
  modules: ["@wxt-dev/module-react", "@wxt-dev/i18n/module"],
  webExt: {
    disabled: true,
  },
  vite: () => ({
    plugins: [tailwindcss()] as any,
  }),
})
