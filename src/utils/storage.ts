import { storage } from "wxt/storage"

export const isExtensionActive = storage.defineItem<boolean>("local:isExtensionActive", {
  fallback: true,
})

export const isMenuActive = storage.defineItem<boolean>("local:isMenuActive", {
  fallback: true,
})

export const bookmarkStorage = storage.defineItem<TBookmark[]>("local:bookmarks", {
  fallback: [],
})

export const promptStorage = storage.defineItem<TPrompt[]>("local:prompts", {
  fallback: [],
})
