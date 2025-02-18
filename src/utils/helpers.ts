type TWebsite = "chatgpt" | "gemini" | "claude" | "deepseek" | "unknown"

export function getWebsite(): TWebsite {
  const url = window.location.href
  if (url.includes("chatgpt")) return "chatgpt"
  if (url.includes("gemini")) return "gemini"
  if (url.includes("claude")) return "claude"
  if (url.includes("deepseek")) return "deepseek"
  return "unknown"
}

