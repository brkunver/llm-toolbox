import { storage } from "wxt/storage"

export const isExtensionActive = storage.defineItem<boolean>("local:isExtensionActive", {
  fallback: true,
})

export const isMenuActive = storage.defineItem<boolean>("local:isMenuActive", {
  fallback: true,
})
