export type Tllm = "chatgpt" | "deepseek" | "gemini" | "claude" | "perplexity" | "t3"
export type TWebsite = Tllm | "unknown"

export type TBookmark = {
  id: string
  name: string
  url: string
}

export type TPrompts = {
  id: string
  name: string
  prompt: string
}
