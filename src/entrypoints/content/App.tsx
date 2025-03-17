import NewPrompt from "@/entrypoints/components/new-prompt"
import PromptList from "@/entrypoints/components/prompt-list"
import Popup from "@/entrypoints/components/ui/popup"
import ExtButton from "@/entrypoints/components/ext-button"
import Menu from "@/entrypoints/components/menu"
import Bookmarks from "@/entrypoints/components/bookmarks"
import AddBookmarkModal from "../components/add-bookmark-modal"

function App() {
  const extensionStore = useExtensionStore()

  useEffect(() => {
    async function setExtensionActive() {
      const value = await isExtensionActive.getValue()
      extensionStore.setShowExtension(value)
    }

    isExtensionActive.watch((active: boolean) => {
      extensionStore.setShowExtension(active)
    })

    setExtensionActive()
  }, [])

  // Development check
  if (import.meta.env.MODE == "development") {
    console.log("Ext Dev : App Rendered")
  }


  if (!extensionStore.showExtension) return null

  return (
    <>
      <ExtButton />
      <Menu />
      <PromptList />
      <Bookmarks />
      <NewPrompt />
      <AddBookmarkModal />
      <Popup />
    </>
  )
}

export default App
