import { defineConfig } from "wxt"
import tailwindcss from "@tailwindcss/vite"

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: ["storage"],
    web_accessible_resources: [
      {
        matches: ["<all_urls>"],
        resources: ["/fonts/*"],
      },
    ],
  },
  srcDir: "src",
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],
  runner: {
    disabled: true,
  },
  vite: () => ({
    plugins: [tailwindcss()] as any,
  }),
})
