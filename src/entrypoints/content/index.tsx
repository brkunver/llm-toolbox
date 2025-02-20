import ReactDOM from "react-dom/client"
import App from "./App.tsx"

import type { Tllm } from "@/utils/helpers.ts"

const urls: Record<Tllm, string> = {
  chatgpt: "*://*.chatgpt.com/*",
  deepseek: "*://*.deepseek.com/*",
  gemini: "*://gemini.google.com/*",
  claude: "*://claude.ai/*",
  perplexity: "*://*.perplexity.ai/*",
  t3: "*://t3.chat/*",
}

export default defineContentScript({
  matches: [...Object.values(urls)],

  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: "inline",
      anchor: "body",
      onMount: (container) => {
        // Create a root on the UI container and render a component
        const root = ReactDOM.createRoot(container)
        root.render(<App />)
        return root
      },
      onRemove: (root) => {
        // Unmount the root when the UI is removed
        if (root) {
          root.unmount()
        }
      },
    })

    // Call mount to add the UI to the DOM
    ui.mount()
  },
})
