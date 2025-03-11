import { fakeBrowser } from "wxt/testing"
import { beforeEach, describe, expect, it } from "vitest"
import { addBookmark } from "@/utils/helpers"

describe("Add Bookmark", () => {
  beforeEach(() => {
    fakeBrowser.reset()
    // Mock window location and document title
    global.window = {
      location: { href: "https://chatgpt.com/c/67d01602-620c-8013-822e-4f58e8473310" },
    } as any
    global.document = {
      title: "ChatGPT Conversation",
    } as any
  })

  it("should add a bookmark with a title", async () => {
    const customTitle = "My Custom Bookmark"
    await addBookmark(customTitle)

    const storage = await fakeBrowser.storage.local.get("bookmarks")
    const bookmarks = storage.bookmarks as TBookmark[]

    expect(bookmarks).toHaveLength(1)
    expect(bookmarks[0]).toEqual({
      id: expect.any(String),
      website: "chatgpt",
      title: customTitle,
      url: "https://chatgpt.com/c/67d01602-620c-8013-822e-4f58e8473310",
    })
  })
})
