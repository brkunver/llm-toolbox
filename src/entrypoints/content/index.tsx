import "~/assets/style.css"

import ReactDOM from "react-dom/client"
import App from "./App.tsx"

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
  // 2. Set cssInjectionMode
  cssInjectionMode: "ui",

  async main(ctx) {
    // 3. Define your UI
    const ui = await createShadowRootUi(ctx, {
      name: "extension-ui",
      position: "inline",
      anchor: "body",
      append: "first",
      onMount: container => {
        // Inject Inter font
        const fontUrl = browser.runtime.getURL("/fonts/Inter.ttf")
        const fontStyle = document.createElement("style")
        fontStyle.textContent = `
            @font-face {
              font-family: 'Inter';
              src: url('${fontUrl}') format('truetype');
              font-weight: 100 900;
              font-style: normal;
            }
        `

        // Add to shadow head
        document.head.appendChild(fontStyle)

        // Container is a body, and React warns when creating a root on the body, so create a wrapper div
        const app = document.createElement("div")
        app.id = "llm-toolbox-root"
        app.style.zIndex = "999999"
        container.append(app)

        // Create a root on the UI container and render a component
        const root = ReactDOM.createRoot(app)
        root.render(<App />)
        return root
      },
      onRemove: root => {
        // Unmount the root when the UI is removed
        root?.unmount()
      },
    })

    // 4. Mount the UI
    ui.autoMount()
  },
})
