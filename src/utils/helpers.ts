export type Tllm = | "chatgpt" | "deepseek" | "gemini" | "claude" | "perplexity" | "t3"
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
  if (website == "chatgpt") {
    return document.querySelector("#prompt-textarea") as HTMLDivElement
  }
  if (website == "deepseek") {
    return document.querySelector("#chat-input") as HTMLTextAreaElement
  }
  if (website == "gemini") {
    return document.querySelector('div[contenteditable="true"]') as HTMLDivElement
  }
  if (website == "claude") {
    return document.querySelector('div[contenteditable="true"]') as HTMLDivElement
  }
  if (website == "perplexity") {
    return document.querySelector("textarea")
  }
  if (website == "t3") {
    return document.querySelector("#chat-input") as HTMLTextAreaElement
  }

  return null
}

export function changePrompt(prompt: string) {
  const website = getWebsite()
  const promptElement = getPromptElement(website)
  if (promptElement) {
    if (website == "chatgpt") {
      promptElement.innerText = prompt
    } else if (website == "deepseek") {
      const descriptor = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")
      if (descriptor && descriptor.set) {
        descriptor.set.call(promptElement, prompt)
      }
      promptElement.dispatchEvent(new Event("input", { bubbles: true }))
    } else if (website == "claude") {
      promptElement.innerText = prompt
      promptElement.dispatchEvent(new Event("input", { bubbles: true }))
    } else if (website == "gemini") {
      promptElement.innerText = prompt
      promptElement.dispatchEvent(new Event("input", { bubbles: true }))
    } else if (website == "perplexity" && promptElement instanceof HTMLTextAreaElement) {
      promptElement.value = prompt
      promptElement.dispatchEvent(new Event("input", { bubbles: true }))
    } else if (website == "t3" && promptElement instanceof HTMLTextAreaElement) {
      promptElement.value = prompt
      promptElement.dispatchEvent(new Event("input", { bubbles: true }))
    }
  }
}
