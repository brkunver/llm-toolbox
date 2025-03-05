import Drawer from "@/entrypoints/components/ui/drawer"

import type { TPrompt } from "@/utils/types"
import { promptStorage } from "@/utils/storage"

import { useState } from "react"

interface PromptListProps {
  isOpen: boolean
  onClose: () => void
}

export default function PromptList({ onClose, isOpen }: PromptListProps) {
  const [prompts, setPrompts] = useState<TPrompt[]>([])

  promptStorage.watch((prompts) => {
    setPrompts(prompts)
  })

  useEffect(() => {
    async function getPrompts() {
      const prompts = await promptStorage.getValue()
      setPrompts(prompts)
    }

    getPrompts()
  }, [])

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <h1>Promplist</h1>
      <p>Prompt Count = {prompts.length}</p>
      {prompts.map((prompt) => (
        <div key={prompt.id}>
          <h2>{prompt.title}</h2>
          <p>{prompt.content}</p>
        </div>
      ))}
    </Drawer>
  )
}
