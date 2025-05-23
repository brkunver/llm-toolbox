import Modal from "@/entrypoints/components/ui/modal"
import Button from "@/entrypoints/components/ui/button"
import { memo } from "react"

import { i18n } from "#imports"

function EditPromptModal() {
  const showPopup = usePopupStore(state => state.show)
  const isOpen = useUIStateStore(state => state.showEditPromptModal)
  const prompt = useUIStateStore(state => state.currentEditingPrompt)
  const closeEditPromptModal = useUIStateStore(state => state.closeEditPromptModal)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState<TPromptCategory>("other")

  useEffect(() => {
    if (prompt) {
      setTitle(prompt.title)
      setContent(prompt.content)
      setCategory(prompt.category)
    }
  }, [prompt])

  const handleSave = async () => {
    if (!prompt) return

    if (!title.trim()) {
      showPopup(i18n.t("content.titleCantBeEmpty"), "red")
      return
    }

    if (!content.trim()) {
      showPopup(i18n.t("content.contentCantBeEmpty"), "red")
      return
    }

    const updatedPrompt: TPrompt = {
      ...prompt,
      title,
      content,
      category,
    }

    try {
      // Get current prompts from storage
      const prompts = await promptStorage.getValue()

      // Update the specific prompt
      const updatedPrompts = prompts.map(p => (p.id === updatedPrompt.id ? updatedPrompt : p))

      // Save to storage
      await promptStorage.setValue(updatedPrompts)

      // Show success message
      showPopup(i18n.t("content.promptUpdated"), "green")

      // Close the modal
      closeEditPromptModal()
    } catch (error) {
      showPopup(i18n.t("content.failedToUpdatePrompt"), "red")
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={closeEditPromptModal} className="w-[500px] max-w-[90vw]">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">{i18n.t("content.editPrompt")}</h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm text-gray-400">
            {i18n.t("content.title")}
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="p-2 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="content" className="text-sm text-gray-400">
            {i18n.t("content.content")}
          </label>
          <textarea
            id="content"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={6}
            className="p-2 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-sm text-gray-400">
            {i18n.t("content.category")}
          </label>
          <select
            id="category"
            value={category}
            onChange={e => setCategory(e.target.value as TPromptCategory)}
            className="p-2 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
          >
            <option value="writing">Writing</option>
            <option value="conversation">Conversation</option>
            <option value="creative">Creative</option>
            <option value="coding">Coding</option>
            <option value="marketing">Marketing</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <Button variant="red" onClick={closeEditPromptModal}>
            {i18n.t("content.cancel")}
          </Button>
          <Button variant="blue" onClick={handleSave}>
            {i18n.t("content.save")}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default memo(EditPromptModal)
