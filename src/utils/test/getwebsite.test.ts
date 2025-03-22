import { describe, expect, it, vi } from "vitest"
import { getWebsite } from "@/utils/helpers"

describe("getWebsite", () => {
  const mockLocation = (url: string) => {
    vi.stubGlobal("window", { location: { href: url } })
  }

  it("should return 'chatgpt' for chatgpt main url", () => {
    mockLocation("https://chatgpt.com/")
    expect(getWebsite()).toBe("chatgpt")
  })

  it("should return 'chatgpt' for chatgpt chat url", () => {
    mockLocation("https://chatgpt.com/c/67d01602-620c-8013-88ce-4f58e84ad315/")
    expect(getWebsite()).toBe("chatgpt")
  })

  it("should return 'deepseek' for deepseek url", () => {
    mockLocation("https://chat.deepseek.com/")
    expect(getWebsite()).toBe("deepseek")
  })

  it("should return 'deepseek' for deepseek chat url", () => {
    mockLocation("https://chat.deepseek.com/a/chat/s/bec82213-33f7-22d8-aae5-300cf13e246a")
    expect(getWebsite()).toBe("deepseek")
  })

  it("should return 'gemini' for gemini url", () => {
    mockLocation("https://gemini.google.com/")
    expect(getWebsite()).toBe("gemini")
  })

  it("should return 'claude' for claude url", () => {
    mockLocation("https://claude.ai")
    expect(getWebsite()).toBe("claude")
  })

  it("should return 'claude' for claude chat url", () => {
    mockLocation("https://claude.ai/chat/79d9d8aa-7566-4653-9775-a0cc8aab284b")
    expect(getWebsite()).toBe("claude")
  })

  it("should return 'perplexity' for perplexity url", () => {
    mockLocation("https://perplexity.ai")
    expect(getWebsite()).toBe("perplexity")
  })

  it("should return 't3' for t3.chat url", () => {
    mockLocation("https://t3.chat/chat")
    expect(getWebsite()).toBe("t3")
  })

  it("should return 'unknown' for unknown url", () => {
    mockLocation("https://example.com")
    expect(getWebsite()).toBe("unknown")
  })

  it("should return 'unknown' for unknown url", () => {
    mockLocation("localhost:3001")
    expect(getWebsite()).toBe("unknown")
  })
})
