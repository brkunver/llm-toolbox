export type Tllm = "chatgpt" | "deepseek" | "gemini" | "claude" | "perplexity" | "t3"
type TWebsite = Tllm | "unknown"

export function getWebsite(): TWebsite {
  const url = window.location.href
  if (url.includes("chatgpt")) return "chatgpt"
  if (url.includes("deepseek")) return "deepseek"
  if (url.includes("gemini")) return "gemini"
  if (url.includes("claude")) return "claude"
  if (url.includes("perplexity")) return "perplexity"
  if (url.includes("t3.chat")) return "t3"

  return "unknown"
}

export function getPromptElement(website: TWebsite) {
  switch (website) {
    case "chatgpt":
      return document.querySelector("#prompt-textarea") as HTMLDivElement
    case "deepseek":
      return document.querySelector("#chat-input") as HTMLTextAreaElement
    case "gemini":
      return document.querySelector('div[contenteditable="true"]') as HTMLDivElement
    case "claude":
      return document.querySelector('div[contenteditable="true"]') as HTMLDivElement
    case "perplexity":
      return document.querySelector("textarea") as HTMLTextAreaElement // not needed but for consistency
    case "t3":
      return document.querySelector("#chat-input") as HTMLTextAreaElement
    default:
      return null
  }
}

export function changePrompt(prompt: string) {
  const website = getWebsite()
  const promptElement = getPromptElement(website)

  if (promptElement) {
    if (website == "chatgpt") {
      promptElement.innerText = prompt
    }

    if (website == "deepseek") {
      const descriptor = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")

      if (descriptor && descriptor.set) {
        descriptor.set.call(promptElement, prompt)
      }

      promptElement.dispatchEvent(new Event("input", { bubbles: true }))
    }

    if (website == "claude") {
      promptElement.innerText = prompt
      promptElement.dispatchEvent(new Event("input", { bubbles: true }))
    }

    if (website == "gemini") {
      promptElement.innerText = prompt
      promptElement.dispatchEvent(new Event("input", { bubbles: true }))
    }

    if (website == "perplexity" && promptElement instanceof HTMLTextAreaElement) {
      promptElement.value = prompt
      promptElement.dispatchEvent(new Event("input", { bubbles: true }))
    }

    if (website == "t3" && promptElement instanceof HTMLTextAreaElement) {
      promptElement.value = prompt
      promptElement.dispatchEvent(new Event("input", { bubbles: true }))
    }
  }
}
