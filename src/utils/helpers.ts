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
  return null
}

export function changePrompt(prompt: string) {
  const website = getWebsite()
  const promptElement = getPromptElement(website)
  if (promptElement) {
    if (website == "chatgpt") {
      promptElement.innerText = prompt
    }
  }
}
