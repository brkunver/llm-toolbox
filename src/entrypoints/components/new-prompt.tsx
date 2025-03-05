import { useState } from "react"

import Button from "@/entrypoints/components/ui/button"
import { CircleX, Eraser, Save } from "lucide-react"

import type { TPrompt } from "@/utils/types"
import { addNewPrompt } from "@/utils/helpers"
import { nanoid } from "nanoid"

interface NewPromptProps {
  onClose: () => void
}

export default function NewPrompt({ onClose }: NewPromptProps) {
  const [prompTitle, setPromptTitle] = useState<string>("")
  const [promptContent, setPromptContent] = useState<string>("")

  console.log()

  function handleSavePrompt() {
    if (prompTitle.trim() === "" || promptContent.trim() === "") {
      alert("Please fill in all fields")
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
    onClose()
  }

  return (
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
      ></textarea>
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
  )
}
