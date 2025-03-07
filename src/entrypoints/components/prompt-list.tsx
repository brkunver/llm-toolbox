import Drawer from "@/entrypoints/components/ui/drawer"

import type { TPrompt } from "@/utils/types"
import { promptStorage } from "@/utils/storage"

import { useState, useEffect, useMemo, memo } from "react"

interface PromptListProps {
  isOpen: boolean
  onClose: () => void
}

const PromptList = memo(function PromptList({ onClose, isOpen }: PromptListProps) {
  if (import.meta.env.MODE == "development") {
    console.log("Ext Dev : Prompt List Rendered")
  }

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

  const memoizedPromptList = useMemo(() => {
    return prompts.map((prompt) => (
      <div key={prompt.id}>
        <h2>{prompt.title}</h2>
        <p>{prompt.content}</p>
      </div>
    ))
  }, [prompts])

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <h1>Promplist</h1>
      <p>Prompt Count = {prompts.length}</p>
      {memoizedPromptList}
    </Drawer>
  )
})

export default PromptList
