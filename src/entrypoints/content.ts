export default defineContentScript({
  matches: ["*://*.chatgpt.com/*"],
  main() {
    console.log("Hello content.")
  },
})
