import "@/entrypoints/global.css"

import logo from "~/assets/128.png"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"

import { getWebsite, changePrompt } from "@/utils/helpers"
import { isExtensionActive, isMenuActive } from "@/utils/storage"

import Drawer from "@/entrypoints/components/ui/drawer"
import Modal from "@/entrypoints/components/ui/modal"
import Button from "@/entrypoints/components/ui/button"
import NewPrompt from "@/entrypoints/components/new-prompt"

function App() {
  const [showUi, setShowUi] = useState<boolean>(false)
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [showDrawer, setShowDrawer] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)

  isExtensionActive.watch((active) => {
    setShowUi(active)
  })

  useEffect(() => {
    async function setExtensionActive() {
      const value = await isExtensionActive.getValue()
      setShowUi(value)
    }

    async function setMenuActive() {
      const value = await isMenuActive.getValue()
      setShowMenu(value)
    }

    setExtensionActive()
    setMenuActive()
  }, [])

  const onMenuButtonClick = () => {
    setShowMenu(!showMenu)
    isMenuActive.setValue(!showMenu)
  }

  if (!showUi) return null

  return (
    <>
      <div className="fixed top-14 right-14 z-30 w-fit h-fit group">
        <div
          className={`${
            showMenu ? "bg-flat-red" : "bg-flat-green"
          } absolute inset-0 rounded-2xl scale-110 opacity-0 group-hover:opacity-100 transition-all duration-200 -z-10`}
        ></div>
        <button
          role="button"
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
            className="flex flex-col fixed top-32 right-14 z-30 p-4 rounded-2xl bg-primary! border-border border-solid border-1 w-fit h-fit"
          >
            <h1 className="text-3xl! font-bold!">LLM Toolbox</h1>
            <p>Detected Website : {getWebsite()}</p>
            <Button onClick={() => changePrompt("Hello, how are you?")}>Hello, how are you?</Button>
            <Button onClick={() => setShowDrawer(true)}>Show Drawer</Button>
            <Button onClick={() => setShowModal(true)}>Show Modal</Button>
          </motion.section>
        )}
      </AnimatePresence>

      <Drawer isOpen={showDrawer} onClose={() => setShowDrawer(false)} key={showDrawer.toString()}>
        <h1>Drawer</h1>
      </Drawer>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <NewPrompt />
      </Modal>
    </>
  )
}

export default App
