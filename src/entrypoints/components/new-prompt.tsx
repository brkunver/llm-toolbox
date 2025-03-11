import { memo, useState } from "react"

import Button from "@/entrypoints/components/ui/button"
import Modal from "@/entrypoints/components/ui/modal"

import { CircleX, Eraser, Save } from "lucide-react"
import { nanoid } from "nanoid"

interface NewPromptProps {
  showPopupHandler: (msg: string, color?: "blue" | "green" | "yellow" | "red") => void
  isOpen: boolean
  onClose: () => void
}

function NewPrompt({ onClose, isOpen, showPopupHandler }: NewPromptProps) {
  if (import.meta.env.MODE == "development") {
    console.log("Ext Dev : New Prompt Rendered")
  }

  const [prompTitle, setPromptTitle] = useState<string>("")
  const [promptContent, setPromptContent] = useState<string>("")

  function handleSavePrompt() {
    if (prompTitle.trim() === "" || promptContent.trim() === "") {
      showPopupHandler("Title and content cannot be empty", "red")
      return
    }

    if (prompTitle.length > 50) {
      showPopupHandler("Title cannot be longer than 50 characters", "red")
      return
    }

    if (promptContent.length > 1000) {
      showPopupHandler("Content cannot be longer than 1000 characters", "red")
      return
    }

    const newPrompt: TPrompt = {
      id: nanoid(),
      title: prompTitle,
      content: promptContent,
      category: "other",
      createdAt: new Date(),
    }

    addNewPrompt(newPrompt)
    showPopupHandler("Prompt saved successfully")
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="p-10">
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
        <div className="flex justify-center gap-4 w-full">
          <Button className="text-lg font-semibold flex gap-1" onClick={onClose} variant="red">
            <CircleX />
            <p>Cancel</p>
          </Button>
          <Button
            className="text-lg font-semibold flex gap-1"
            variant="yellow"
            onClick={() => {
              setPromptTitle("")
              setPromptContent("")
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
