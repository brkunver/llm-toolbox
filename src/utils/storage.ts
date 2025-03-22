import { storage } from "wxt/storage"
import { TExtIconSize, ExtPositionType, TBookmark, TPrompt } from "./types"

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

export const extIconSizeStorage = storage.defineItem<TExtIconSize>("local:extIconSizeStorage", {
  fallback: "medium",
})

export const extPositionStorage = storage.defineItem<ExtPositionType>("local:extPositionStorage", {
  fallback: "top-right",
})