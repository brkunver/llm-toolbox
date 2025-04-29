import { memo } from "react"
import Drawer from "@/entrypoints/components/ui/drawer"
import Button from "@/entrypoints/components/ui/button"
import { i18n } from "#imports"

function PromptList() {
  if (import.meta.env.MODE == "development") {
    console.log("Ext Dev : Prompt List Rendered")
  }

  const isOpen = useUIStateStore(state => state.showPromptList)
  const setShowPromptList = useUIStateStore(state => state.setShowPromptList)
  const openEditPromptModal = useUIStateStore(state => state.openEditPromptModal)
  const showPopup = usePopupStore(state => state.show)
  const [prompts, setPrompts] = useState<TPrompt[]>([])

  useEffect(() => {
    async function getPrompts() {
      const prompts = await promptStorage.getValue()
      setPrompts(prompts)
    }

    promptStorage.watch(prompts => {
      setPrompts(prompts)
    })

    getPrompts()
  }, [])

  const handleUsePrompt = (prompt: TPrompt) => {
    changePrompt(prompt.content)
    setShowPromptList(false)
    showPopup(i18n.t("content.promptApplied"), "green")
  }

  const handleEditPrompt = (prompt: TPrompt) => {
    openEditPromptModal(prompt)
  }

  const handleDeletePrompt = async (promptId: string, promptTitle: string) => {
    const updatedPrompts = prompts.filter(p => p.id !== promptId)
    await promptStorage.setValue(updatedPrompts)
    showPopup(i18n.t("content.promptDeleted"), "red")
  }

  return (
    <Drawer isOpen={isOpen} onClose={() => setShowPromptList(false)}>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold">{i18n.t("content.savedPrompts")}</h1>
        <p className="text-gray-400">
          {i18n.t("content.promptCount")}: {prompts.length}
        </p>

        {prompts.length === 0 ? (
          <div className="p-4 bg-gray-800 rounded-md">
            <p className="text-center text-gray-400">{i18n.t("content.noSavedPrompts")}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {prompts.map(prompt => (
              <div key={prompt.id} className="p-3 bg-gray-800 rounded-md flex flex-col gap-2">
                <div className="flex flex-col">
                  <h2 className="font-semibold text-lg truncate">{truncateText(prompt.title, 25)}</h2>
                  <p className="text-sm text-gray-400 truncate">{truncateText(prompt.content, 50)}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-2">
                    <Button variant="green" onClick={() => handleUsePrompt(prompt)}>
                      {i18n.t("content.use")}
                    </Button>
                    <Button variant="blue" onClick={() => handleEditPrompt(prompt)}>
                      {i18n.t("content.edit")}
                    </Button>
                    <Button variant="red" onClick={() => handleDeletePrompt(prompt.id, prompt.title)}>
                      {i18n.t("content.delete")}
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
