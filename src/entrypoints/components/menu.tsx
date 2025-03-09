import { motion, AnimatePresence } from "motion/react"
import Button from "@/entrypoints/components/ui/button"
import addBookmarkButton from "./add-bookmark-button"
import { memo } from "react"
import AddBookmarkButton from "./add-bookmark-button"

interface MenuProps {
  showMenu: boolean
  onShowPromptList: () => void
  onShowNewPrompt: () => void
  onShowPopup: () => void
}

function Menu({ showMenu, onShowPromptList, onShowNewPrompt, onShowPopup }: MenuProps) {
  if (import.meta.env.MODE == "development") {
    console.log("Ext Dev : Menu Rendered")
  }

  return (
    <AnimatePresence>
      {showMenu && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="flex flex-col fixed top-32 right-14 z-30 p-4 rounded-2xl font-main font-medium bg-primary! border-border border-solid border-1 w-fit h-fit"
        >
          <h1 className="text-3xl font-bold">LLM Toolbox</h1>
          <p>Detected Website : {getWebsite()}</p>
          <Button onClick={() => changePrompt("Hello, how are you?")}>Hello, how are you?</Button>
          <AddBookmarkButton />
          <AddBookmarkButton changeTitle={true} />
          <Button onClick={onShowPromptList}>Show Drawer</Button>
          <Button onClick={onShowNewPrompt}>Show Modal</Button>
          <Button onClick={onShowPopup}>Show Popup</Button>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default memo(Menu)
