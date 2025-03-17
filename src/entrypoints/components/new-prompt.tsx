import { memo } from "react"
import Button from "@/entrypoints/components/ui/button"
import Modal from "@/entrypoints/components/ui/modal"
import { CircleX, Eraser, Save } from "lucide-react"
import { nanoid } from "nanoid"

function NewPrompt() {
  if (import.meta.env.MODE == "development") {
    console.log("Ext Dev : New Prompt Rendered")
  }

  const isOpen = useUIStateStore(state => state.showNewPromptModal)
  const setShowNewPromptModal = useUIStateStore(state => state.setShowNewPromptModal)
  const showPopup = usePopupStore(state => state.show)

  const [prompTitle, setPromptTitle] = useState<string>("")
  const [promptContent, setPromptContent] = useState<string>("")
  const [promptCategory, setPromptCategory] = useState<TPromptCategory>("other")

  function handleSavePrompt() {
    if (prompTitle.trim() === "" || promptContent.trim() === "") {
      showPopup("Title and content cannot be empty", "red")
      return
    }

    if (prompTitle.length > 50) {
      showPopup("Title cannot exceed 50 characters", "red")
      return
    }

    if (promptContent.length > 1000) {
      showPopup("Content cannot exceed 1000 characters", "red")
      return
    }

    const newPrompt: TPrompt = {
      id: nanoid(),
      title: prompTitle,
      content: promptContent,
      category: promptCategory,
      createdAt: new Date(),
    }

    addNewPrompt(newPrompt)
    showPopup("Prompt added successfully!")
    setShowNewPromptModal(false)
  }

  return (
    <Modal isOpen={isOpen} onClose={() => setShowNewPromptModal(false)} className="p-10">
      <section className="flex flex-col gap-4 rounded-2xl w-[50rem] ">
        <h2 className="text-center text-3xl font-bold underline">Create a new prompt</h2>
        <input
          className="bg-ui px-4 py-2 rounded-2xl"
          type="text"
          value={prompTitle}
          placeholder="Title..."
          onChange={(e) => setPromptTitle(e.target.value)}
        />
        <textarea
          className="h-40 w-full resize-none bg-ui text-text-main p-4 rounded-2xl"
          placeholder="Prompt content..."
          value={promptContent}
          onChange={(e) => setPromptContent(e.target.value)}
        />
        <select
          className="bg-ui px-4 py-2 rounded-2xl"
          value={promptCategory}
          onChange={(e) => setPromptCategory(e.target.value as TPromptCategory)}
        >
          <option value="writing">Writing</option>
          <option value="conversation">Conversation</option>
          <option value="creative">Creative</option>
          <option value="coding">Coding</option>
          <option value="marketing">Marketing</option>
          <option value="other">Other</option>
        </select>
        <div className="flex justify-center gap-4 w-full">
          <Button className="text-lg font-semibold flex gap-1" onClick={() => setShowNewPromptModal(false)} variant="red">
            <CircleX />
            <p>Cancel</p>
          </Button>
          <Button
            className="text-lg font-semibold flex gap-1"
            variant="yellow"
            onClick={() => {
              setPromptTitle("")
              setPromptContent("")
              setPromptCategory("other")
            }}
          >
            <Eraser />
            <p>Clear</p>
          </Button>
          <Button className="text-lg font-semibold flex gap-1" variant="green" onClick={handleSavePrompt}>
            <Save />
            <p>Save Prompt</p>
          </Button>
        </div>
      </section>
    </Modal>
  )
}

export default memo(NewPrompt)
