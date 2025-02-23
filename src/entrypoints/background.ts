import { isExtensionActive, isMenuActive, bookmarkStorage, promptStorage } from "@/utils/storage"

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener((details) => {
    if (details.reason == "install") {
      isExtensionActive.setValue(true)
      isMenuActive.setValue(true)
      bookmarkStorage.setValue([])
      promptStorage.setValue([])
    }
  })
})
