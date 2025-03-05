export type Tllm = "chatgpt" | "deepseek" | "gemini" | "claude" | "perplexity" | "t3"
export type TWebsite = Tllm | "unknown"
export type TPromptCategory = "writing" | "conversation" | "creative" | "code" | "marketing" | "other"

export type TBookmark = {
  website: TWebsite
  name: string
  url: string
}

export type TPrompt = {
  id: string
  title: string
  content: string
  category: TPromptCategory
  createdAt: Date
}
