import NewPrompt from "@/entrypoints/components/new-prompt"
import PromptList from "@/entrypoints/components/prompt-list"
import Popup from "@/entrypoints/components/ui/popup"
import ExtButton from "@/entrypoints/components/ext-button"
import Menu from "@/entrypoints/components/menu"
import Bookmarks from "@/entrypoints/components/bookmarks"
import AddBookmarkModal from "../components/add-bookmark-modal"

function App() {
  const [showExtension, setShowExtension] = useState<boolean>(false)
  const [showMenu, setShowMenu] = useState<boolean>(false)

  const [showPromptList, setShowPromptList] = useState<boolean>(false)
  const [showNewPromptModal, setshowNewPromptModal] = useState<boolean>(false)
  const [showBookmarks, setShowBookmarks] = useState<boolean>(false)
  const [showAddBookmarkModal, setShowAddBookmarkModal] = useState<boolean>(false)

  const [popupMessage, setPopupMessage] = useState<string>("")
  const [showPopup, setShowPopup] = useState<boolean>(false)

  function popupHandler(msg: string) {
    setPopupMessage(msg)
    setShowPopup(true)
  }

  const handleShowPromptList = useCallback(() => {
    setShowPromptList(true)
  }, [])

  const handleShowNewPrompt = useCallback(() => {
    setshowNewPromptModal(true)
  }, [])

  const handleShowPopup = useCallback(() => {
    setShowPopup(true)
  }, [])

  const handleShowBookmarks = useCallback(() => {
    setShowBookmarks(true)
  }, [])

  const handleDrawerClose = useCallback(() => {
    setShowPromptList(false)
  }, [])

  const handleNewPromptModalClose = useCallback(() => {
    setshowNewPromptModal(false)
  }, [])

  const handlePopupClose = useCallback(() => {
    setShowPopup(false)
  }, [])

  const handleBookmarksClose = useCallback(() => {
    setShowBookmarks(false)
  }, [])

  const handleAddBookmarkModalClose = useCallback(() => {
    setShowAddBookmarkModal(false)
  }, [])

  const handleAddBookmarkModalOpen = useCallback(() => {
    setShowAddBookmarkModal(true)
  }, [])

  const onMenuButtonClick = useCallback(() => {
    setShowMenu((prev) => !prev)
    isMenuActive.setValue(!showMenu)
  }, [showMenu])

  useEffect(() => {
    async function setExtensionActive() {
      const value = await isExtensionActive.getValue()
      setShowExtension(value)
    }

    async function setMenuActive() {
      const value = await isMenuActive.getValue()
      setShowMenu(value)
    }

    isExtensionActive.watch((active: boolean) => {
      setShowExtension(active)
    })

    setExtensionActive()
    setMenuActive()
  }, [])

  // Development check
  if (import.meta.env.MODE == "development") {
    console.log("Ext Dev : App Rendered")
  }

  if (!showExtension) return null

  return (
    <>
      <ExtButton showMenu={showMenu} onMenuButtonClick={onMenuButtonClick} />
      <Menu
        showMenu={showMenu}
        onShowPromptList={handleShowPromptList}
        onShowNewPrompt={handleShowNewPrompt}
        onShowPopup={handleShowPopup}
        onShowBookmarks={handleShowBookmarks}
        onShowAddBookmarkModal={handleAddBookmarkModalOpen}
      />
      <PromptList isOpen={showPromptList} onClose={handleDrawerClose} />
      <Bookmarks isOpen={showBookmarks} onClose={handleBookmarksClose} />
      <NewPrompt isOpen={showNewPromptModal} onClose={handleNewPromptModalClose} />
      <AddBookmarkModal isOpen={showAddBookmarkModal} onClose={handleAddBookmarkModalClose} />
      <Popup isOpen={showPopup} onClose={handlePopupClose} message={popupMessage} />
    </>
  )
}

export default App
