import NewPrompt from "@/entrypoints/components/new-prompt"
import PromptList from "@/entrypoints/components/prompt-list"
import Popup from "@/entrypoints/components/ui/popup"
import ExtButton from "@/entrypoints/components/ext-button"
import Menu from "@/entrypoints/components/menu"

function App() {
  const [showExtension, setShowExtension] = useState<boolean>(false)
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [showPromptList, setShowPromptList] = useState<boolean>(false)
  const [showNewPromptModal, setshowNewPromptModal] = useState<boolean>(false)
  const [showPopup, setShowPopup] = useState<boolean>(false)

  isExtensionActive.watch((active: boolean) => {
    setShowExtension(active)
  })

  const handleShowPromptList = useCallback(() => {
    setShowPromptList(true)
  }, [])

  const handleShowNewPrompt = useCallback(() => {
    setshowNewPromptModal(true)
  }, [])

  const handleShowPopup = useCallback(() => {
    setShowPopup(true)
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
      />
      <PromptList isOpen={showPromptList} onClose={handleDrawerClose} />
      <NewPrompt isOpen={showNewPromptModal} onClose={handleNewPromptModalClose} />
      <Popup isOpen={showPopup} onClose={handlePopupClose} message="Hello, how are you?" />
    </>
  )
}

export default App
