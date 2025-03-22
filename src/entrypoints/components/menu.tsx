import { motion, AnimatePresence } from "motion/react"
import Button from "@/entrypoints/components/ui/button"
import { memo } from "react"
import AddBookmarkButton from "./add-bookmark-button"
import { List, Bookmark, PlusCircle } from "lucide-react"

function Menu() {
  if (import.meta.env.MODE == "development") {
    console.log("Ext Dev : Menu Rendered")
  }

  const showMenu = useUIStateStore(state => state.showMenu)
  const setShowMenu = useUIStateStore(state => state.setShowMenu)
  const setShowPromptList = useUIStateStore(state => state.setShowPromptList)
  const setShowNewPromptModal = useUIStateStore(state => state.setShowNewPromptModal)
  const setShowBookmarks = useUIStateStore(state => state.setShowBookmarks)
  const setShowAddBookmarkModal = useUIStateStore(state => state.setShowAddBookmarkModal)

  const [position, setPosition] = useState<ExtPositionType>("top-right")

  const currentWebsite = getWebsite()

  useEffect(() => {
    async function setMenuStatus() {
      const value = await isMenuActive.getValue()
      setShowMenu(value)
    }

    async function loadPosition() {
      const pos = await extPositionStorage.getValue()
      setPosition(pos)
    }

    //subscribe to changes
    extPositionStorage.watch(pos => {
      setPosition(pos)
    })

    isMenuActive.watch((active: boolean) => {
      setShowMenu(active)
    })

    setMenuStatus()
    loadPosition()
  }, [])

  const positions = {
    "top-right": "top-32 right-14",
    "bottom-right": "bottom-32 right-14",
  }

  return (
    <AnimatePresence>
      {showMenu && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className={`flex flex-col fixed ${positions[position]} z-30 p-4 gap-1 rounded-2xl font-main font-medium bg-primary! border-border border-solid border-1 w-fit h-fit`}
        >
          <h1 className="text-3xl font-bold text-center">LLM Toolbox</h1>
          <div id="website-detected-div" className="flex flex-col justify-center items-center my-1">
            <p className="text-center underline">Detected Website</p>
            <div
              className={`${
                currentWebsite == "unknown" ? "bg-red-800" : "bg-blue-900 "
              } rounded-2xl px-4 py-1 text-white font-semibold`}
            >
              {currentWebsite}
            </div>
          </div>
          <AddBookmarkButton className="w-full text-center bg-emerald-900 hover:bg-emerald-950" />
          <AddBookmarkButton
            className="w-full text-center bg-emerald-900 hover:bg-emerald-950"
            changeTitle={true}
            onShowAddBookmarkModal={() => setShowAddBookmarkModal(true)}
          />
          <Button
            className="flex gap-1 w-full text-center bg-indigo-900 hover:bg-indigo-950"
            onClick={() => setShowNewPromptModal(true)}
          >
            <PlusCircle />
            <span>New prompt</span>
          </Button>
          <Button className="flex gap-1 w-full text-center" onClick={() => setShowPromptList(true)}>
            <List />
            <span>My Prompts</span>
          </Button>
          <Button className="flex gap-1 w-full text-center" onClick={() => setShowBookmarks(true)}>
            <Bookmark />
            <span>My Bookmarks</span>
          </Button>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default memo(Menu)
