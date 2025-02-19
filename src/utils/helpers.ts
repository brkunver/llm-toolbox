type TWebsite = "chatgpt" | "deepseek" | "gemini" | "claude" | "unknown"

export function getWebsite(): TWebsite {
  const url = window.location.href
  if (url.includes("chatgpt")) return "chatgpt"
  if (url.includes("deepseek")) return "deepseek"
  if (url.includes("gemini")) return "gemini"
  if (url.includes("claude")) return "claude"

  return "unknown"
}

export function getPromptElement(website: TWebsite) {
  if (website == "chatgpt") {
    return document.querySelector("#prompt-textarea") as HTMLDivElement
  }
  if (website == "deepseek") {
    return document.querySelector("#chat-input") as HTMLTextAreaElement
  }
  if (website == "claude") {
    return document.querySelector('div[contenteditable="true"]') as HTMLDivElement
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
    }
  }
}
