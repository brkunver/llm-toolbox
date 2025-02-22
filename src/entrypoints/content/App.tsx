import "@/entrypoints/global.css"

import logo from "./128.png"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"

import { getWebsite, changePrompt } from "@/utils/helpers"
import { isExtensionActive } from "@/utils/storage"

import { Drawer } from "@/entrypoints/components/ui/drawer"

function App() {
  const [showUi, setShowUi] = useState<boolean>(false)
  const [showMenu, setShowMenu] = useState<boolean>(true)
  const [showDrawer, setShowDrawer] = useState<boolean>(false)

  isExtensionActive.watch((active) => {
    setShowUi(active)
  })

  useEffect(() => {
    const setupExtensionState = async () => {
      try {
        const value = await isExtensionActive.getValue()
        setShowUi(value)
      } catch (err) {
        console.error("Error while getting extension active storage information", err)
      }
    }
    setupExtensionState()
  }, [])

  const onMenuButtonClick = () => {
    setShowMenu(!showMenu)
  }

  if (!showUi) return null

  return (
    <>
      <button
        role="button"
        onClick={onMenuButtonClick}
        className="fixed top-14 right-14 z-30 w-fit h-fit p-2 cursor-pointer rounded-2xl bg-primary! hover:scale-110! transition-all duration-100! ease-in-out!"
      >
        <img src={logo} alt="toggle-menu" className="text-white w-10 h-10 mb-2 ml-2" />
      </button>

      <AnimatePresence>
        {showMenu && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="flex flex-col fixed top-32 right-14 z-30 p-4 rounded-2xl bg-primary! w-fit h-fit"
          >
            <h1 className="font-jb-mono! text-3xl! font-bold!">LLM Toolbox</h1>
            <p className="font-jb-mono!">Detected Website : {getWebsite()}</p>
            <button className="font-roboto!" onClick={() => changePrompt("Hello, how are you?")}>
              Hello, how are you?
            </button>
            <button className="font-roboto!" onClick={() => setShowDrawer(true)}>
              Show Drawer
            </button>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        <Drawer isOpen={showDrawer} onClose={() => setShowDrawer(false)} key={showDrawer.toString()}>
          <h1>Drawer</h1>
        </Drawer>
      </AnimatePresence>
    </>
  )
}

export default App
