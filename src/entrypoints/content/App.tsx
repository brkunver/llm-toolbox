import NewPrompt from "@/entrypoints/components/new-prompt"
import PromptList from "@/entrypoints/components/prompt-list"
import Popup from "@/entrypoints/components/ui/popup"
import ExtButton from "@/entrypoints/components/ext-button"
import Menu from "@/entrypoints/components/menu"
import Bookmarks from "@/entrypoints/components/bookmarks"
import AddBookmarkModal from "@/entrypoints/components/add-bookmark-modal"
import EditPromptModal from "@/entrypoints/components/edit-prompt-modal"
import EditBookmarkModal from "@/entrypoints/components/edit-bookmark-modal"

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
      <EditPromptModal />
      <EditBookmarkModal />
      <Popup />
    </>
  )
}

export default App
