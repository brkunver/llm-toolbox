import App from "./App.svelte"
import { mount, unmount } from "svelte"

const urls = {
  chatgpt: "*://*.chatgpt.com/*",
  deepseek: "*://*.deepseek.com/*",
  gemini: "*://gemini.google.com/*",
  claude: "*://claude.ai/*",
  perplexity: "*://*.perplexity.ai/*",
  t3: "*://t3.chat/*",
}

export default defineContentScript({
  matches: [urls.chatgpt, urls.deepseek, urls.gemini, urls.claude, urls.perplexity, urls.t3],

  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: "inline",
      anchor: "body",
      onMount: (container) => {
        // Create the Svelte app inside the UI container
        mount(App, {
          target: container,
        })
      },
      onRemove: (app) => {
        // Destroy the app when the UI is removed
        // cast any to avoid TS error
        unmount(app as any)
      },
    })

    // Call mount to add the UI to the DOM
    ui.mount()
  },
})
