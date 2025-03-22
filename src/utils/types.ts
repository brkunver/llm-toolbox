export type Tllm = "chatgpt" | "deepseek" | "gemini" | "claude" | "perplexity" | "t3"
export type TWebsite = Tllm | "unknown"
export type TPromptCategory = "writing" | "conversation" | "creative" | "coding" | "marketing" | "other"

// settings
export type TExtIconSize = "small" | "medium" | "large"
export type ExtPositionType = "top-right" | "bottom-right"

export type TBookmark = {
  id: string
  website: TWebsite
  title: string
  url: string
}

export type TPrompt = {
  id: string
  title: string
  content: string
  category: TPromptCategory
  createdAt: Date
}
