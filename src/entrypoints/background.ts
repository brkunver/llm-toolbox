import { extPositionStorage } from "@/utils/storage"
import { i18n } from "#imports"

const exampleBookmark: TBookmark = {
  id: "exampleid1",
  website: "chatgpt",
  title: "ChatGPT Home",
  url: "https://chatgpt.com/",
}

const examplePrompt: TPrompt = {
  id: i18n.t("example.prompt1.id"),
  title: i18n.t("example.prompt1.title"),
  content: i18n.t("example.prompt1.content"),
  category: "coding",
  createdAt: new Date(),
}

const examplePrompt2: TPrompt = {
  id: i18n.t("example.prompt2.id"),
  title: i18n.t("example.prompt2.title"),
  content: i18n.t("example.prompt2.content"),
  category: "marketing",
  createdAt: new Date(),
}

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(details => {
    if (details.reason == "install") {
      isExtensionActive.setValue(true)
      isMenuActive.setValue(true)
      bookmarkStorage.setValue([exampleBookmark])
      promptStorage.setValue([examplePrompt, examplePrompt2])
      extIconSizeStorage.setValue("medium")
      extPositionStorage.setValue("top-right")
    }
  })
})
