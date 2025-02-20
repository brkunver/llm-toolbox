import { isExtensionActive } from "@/utils/storage"

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(() => {
    isExtensionActive.setValue(true)
  })
})
