export type Tllm = "chatgpt" | "deepseek" | "gemini" | "claude" | "perplexity" | "t3"
export type TWebsite = Tllm | "unknown"
export type TPromptCategory = "writing" | "conversation" | "creative" | "code" | "marketing" | "other"

export type TBookmark = {
  website: TWebsite
  name: string
  url: string
}

export type TPrompts = {
  id: string
  title: string
  prompt: string
  category: TPromptCategory
  createdAt: Date
}
