import { memo, useState, useEffect } from "react"
import Drawer from "@/entrypoints/components/ui/drawer"
import Button from "@/entrypoints/components/ui/button"
import { useUIStateStore, usePopupStore } from "@/utils/stores"
import { promptStorage } from "@/utils/storage"
import { truncateText, changePrompt } from "@/utils/helpers"
import { TPrompt } from "@/utils/types"

function PromptList() {
  if (import.meta.env.MODE == "development") {
    console.log("Ext Dev : Prompt List Rendered")
  }

  const isOpen = useUIStateStore((state) => state.showPromptList)
  const setShowPromptList = useUIStateStore((state) => state.setShowPromptList)
  const openEditPromptModal = useUIStateStore((state) => state.openEditPromptModal)
  const showPopup = usePopupStore((state) => state.show)
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

  const handleUsePrompt = (prompt: TPrompt) => {
    changePrompt(prompt.content)
    setShowPromptList(false)
    showPopup(`Prompt "${truncateText(prompt.title, 20)}" applied`, "green")
  }

  const handleEditPrompt = (prompt: TPrompt) => {
    openEditPromptModal(prompt)
  }

  const handleDeletePrompt = async (promptId: string, promptTitle: string) => {
    if (confirm(`Are you sure you want to delete "${truncateText(promptTitle, 20)}"?`)) {
      const updatedPrompts = prompts.filter((p) => p.id !== promptId)
      await promptStorage.setValue(updatedPrompts)
      showPopup(`Prompt "${truncateText(promptTitle, 20)}" deleted`, "red")
    }
  }

  return (
    <Drawer isOpen={isOpen} onClose={() => setShowPromptList(false)}>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold">Saved Prompts</h1>
        <p className="text-gray-400">Prompt Count: {prompts.length}</p>
        
        {prompts.length === 0 ? (
          <div className="p-4 bg-gray-800 rounded-md">
            <p className="text-center text-gray-400">No saved prompts yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {prompts.map((prompt) => (
              <div key={prompt.id} className="p-3 bg-gray-800 rounded-md flex flex-col gap-2">
                <div className="flex flex-col">
                  <h2 className="font-semibold text-lg truncate">{truncateText(prompt.title, 25)}</h2>
                  <p className="text-sm text-gray-400 truncate">{truncateText(prompt.content, 50)}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-2">
                    <Button variant="green" onClick={() => handleUsePrompt(prompt)}>
                      Use
                    </Button>
                    <Button variant="blue" onClick={() => handleEditPrompt(prompt)}>
                      Edit
                    </Button>
                    <Button variant="red" onClick={() => handleDeletePrompt(prompt.id, prompt.title)}>
                      Delete
                    </Button>
                  </div>
                  <span className="text-xs px-2 py-1 bg-gray-700 rounded-full shrink-0">{prompt.category}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Drawer>
  )
}

export default memo(PromptList)
