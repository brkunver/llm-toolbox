import { memo, useState, useEffect } from "react"
import Drawer from "@/entrypoints/components/ui/drawer"
import { useUIStateStore } from "@/utils/stores"
import { promptStorage } from "@/utils/storage"
import { truncateText } from "@/utils/helpers"

function PromptList() {
  if (import.meta.env.MODE == "development") {
    console.log("Ext Dev : Prompt List Rendered")
  }

  const isOpen = useUIStateStore((state) => state.showPromptList)
  const setShowPromptList = useUIStateStore((state) => state.setShowPromptList)
  const [prompts, setPrompts] = useState<TPrompt[]>([])

  useEffect(() => {
    async function getPrompts() {
      const prompts = await promptStorage.getValue()
      setPrompts(prompts)
    }

    promptStorage.watch((prompts) => {
      setPrompts(prompts)
    })

    getPrompts()
  }, [])

  return (
    <Drawer isOpen={isOpen} onClose={() => setShowPromptList(false)}>
      <h1>Promplist</h1>
      <p>Prompt Count = {prompts.length}</p>
      {prompts.map((prompt) => (
        <div key={prompt.id}>
          <h2>{truncateText(prompt.title, 20)}</h2>
        </div>
      ))}
    </Drawer>
  )
}

export default memo(PromptList)
