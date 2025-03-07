import "@/entrypoints/global.css"

import logo from "~/assets/128.png"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"

import { getWebsite, changePrompt } from "@/utils/helpers"
import { isExtensionActive, isMenuActive } from "@/utils/storage"

import Button from "@/entrypoints/components/ui/button"
import NewPrompt from "@/entrypoints/components/new-prompt"
import PromptList from "@/entrypoints/components/prompt-list"
import Popup from "@/entrypoints/components/ui/popup"

function App() {
  const [showExtension, setShowExtension] = useState<boolean>(false)
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [showPromptList, setShowPromptList] = useState<boolean>(false)
  const [showNewPromptModal, setshowNewPromptModal] = useState<boolean>(false)
  const [showPopup, setShowPopup] = useState<boolean>(false)

  // This is a development check

  if (import.meta.env.MODE == "development") {
    console.log("Ext Dev : App Rendered")
  }

  // subcribe to the storage change
  isExtensionActive.watch((active) => {
    setShowExtension(active)
  })

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

  // This function toggles the menu
  const onMenuButtonClick = () => {
    setShowMenu(!showMenu)
    isMenuActive.setValue(!showMenu)
  }

  // These functions handle the closing of the drawer, modal and popup
  const handleDrawerClose = useCallback(() => {
    setShowPromptList(false)
  }, [])

  const handleNewPromptModalClose = useCallback(() => {
    setshowNewPromptModal(false)
  }, [])

  const handlePopupClose = useCallback(() => {
    setShowPopup(false)
  }, [])

  if (!showExtension) return null

  return (
    <>
      <div id="ext-button" className="fixed top-14 right-14 z-30 w-fit h-fit group font-main">
        <div
          className={`${
            showMenu ? "bg-flat-red" : "bg-flat-green"
          } absolute inset-0 rounded-2xl scale-110 opacity-0 group-hover:opacity-100 transition-all duration-200 -z-10`}
        />
        <button
          type="button"
          onClick={onMenuButtonClick}
          className="w-fit h-fit p-2 cursor-pointer rounded-2xl bg-primary border-solid border-1 border-border hover:border-transparent transition-all"
        >
          <img src={logo} alt="toggle-menu" className="text-white w-10 h-10 mb-2 ml-2" />
        </button>
      </div>

      <AnimatePresence>
        {showMenu && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex flex-col fixed top-32 right-14 z-30 p-4 rounded-2xl font-main bg-primary! border-border border-solid border-1 w-fit h-fit"
          >
            <h1 className="text-3xl! font-bold!">LLM Toolbox</h1>
            <p>Detected Website : {getWebsite()}</p>
            <Button onClick={() => changePrompt("Hello, how are you?")}>Hello, how are you?</Button>
            <Button onClick={() => setShowPromptList(true)}>Show Drawer</Button>
            <Button onClick={() => setshowNewPromptModal(true)}>Show Modal</Button>
            <Button onClick={() => setShowPopup(true)}>Show Popup</Button>
          </motion.section>
        )}
      </AnimatePresence>

      <PromptList isOpen={showPromptList} onClose={handleDrawerClose} />

      <NewPrompt isOpen={showNewPromptModal} onClose={handleNewPromptModalClose} />

      <Popup isOpen={showPopup} onClose={handlePopupClose} message="Hello, how are you?" />
    </>
  )
}

export default App
