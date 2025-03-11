import { describe, expect, it, vi } from "vitest"
import { getWebsite } from "@/utils/helpers"

describe("getWebsite", () => {
  const mockLocation = (url: string) => {
    vi.stubGlobal("window", { location: { href: url } })
  }

  it("should return 'chatgpt' for chatgpt url", () => {
    mockLocation("https://example.com/chatgpt")
    expect(getWebsite()).toBe("chatgpt")
  })

  it("should return 'deepseek' for deepseek url", () => {
    mockLocation("https://deepseek.com")
    expect(getWebsite()).toBe("deepseek")
  })

  it("should return 'gemini' for gemini url", () => {
    mockLocation("https://ai.google.com/gemini")
    expect(getWebsite()).toBe("gemini")
  })

  it("should return 'claude' for claude url", () => {
    mockLocation("https://claude.ai")
    expect(getWebsite()).toBe("claude")
  })

  it("should return 'perplexity' for perplexity url", () => {
    mockLocation("https://perplexity.ai")
    expect(getWebsite()).toBe("perplexity")
  })

  it("should return 't3' for t3.chat url", () => {
    mockLocation("https://t3.chat")
    expect(getWebsite()).toBe("t3")
  })

  it("should return 'unknown' for unknown url", () => {
    mockLocation("https://example.com")
    expect(getWebsite()).toBe("unknown")
  })
})
