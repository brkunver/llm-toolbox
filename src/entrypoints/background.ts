const exampleBookmark : TBookmark = {
  id: "exampleid1",
  website: "chatgpt",
  title: "ChatGPT Home",
  url: "https://chatgpt.com/",
}

const examplePrompt : TPrompt = {
  id: "promptid1",
  title: "Act as a Data Scientist",
  content: `I want you to act as a data scientist. 
  Imagine you're working on a challenging project for a cutting-edge tech company. 
  You've been tasked with extracting valuable insights from a large dataset related to user behavior on a new app. 
  Your goal is to provide actionable recommendations to improve user engagement and retention.`,
  category: "coding",
  createdAt: new Date()
}

const examplePrompt2 : TPrompt = {
  id: "promptid2",
  title: "Act as SEO specialist",
  content : `I want you to act as an SEO specialist. 
  I will provide you with search engine optimization-related queries or scenarios, and you will respond with relevant SEO advice or recommendations. 
  Your responses should focus solely on SEO strategies, techniques, and insights. 
  Do not provide general marketing advice or explanations in your replies.`,
  category: "marketing",
  createdAt: new Date()
}

export default defineBackground(() => {
  browser.runtime.onInstalled.addListener((details) => {
    if (details.reason == "install") {
      isExtensionActive.setValue(true)
      isMenuActive.setValue(true)
      bookmarkStorage.setValue([exampleBookmark])
      promptStorage.setValue([examplePrompt, examplePrompt2])
      extIconSizeStorage.setValue("medium")
    }
  })
})
