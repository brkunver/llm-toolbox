import { memo } from "react"
import Button from "@/entrypoints/components/ui/button"
import Modal from "@/entrypoints/components/ui/modal"
import { CircleX, Eraser, Save } from "lucide-react"
import { nanoid } from "nanoid"
import { i18n } from "#imports"

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
      showPopup(i18n.t("content.titleAndContentCantBeEmpty"), "red")
      return
    }

    if (prompTitle.length > 50) {
      showPopup(i18n.t("content.titleCantExceed"), "red")
      return
    }

    if (promptContent.length > 1000) {
      showPopup(i18n.t("content.contentCantExceed"), "red")
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
    showPopup(i18n.t("content.promptAddedSuccessfully"), "green")
    setPromptTitle("")
    setPromptContent("")
    setPromptCategory("other")
    setShowNewPromptModal(false)
  }

  return (
    <Modal isOpen={isOpen} onClose={() => setShowNewPromptModal(false)} className="p-10">
      <section className="flex flex-col gap-4 rounded-2xl w-[50rem] ">
        <h2 className="text-center text-3xl font-bold underline">{i18n.t("content.createNewPrompt")}</h2>
        <input
          className="bg-ui px-4 py-2 rounded-2xl"
          type="text"
          value={prompTitle}
          placeholder={i18n.t("content.bookmarkTitlePlaceholder")}
          onChange={e => setPromptTitle(e.target.value)}
        />
        <textarea
          className="h-40 w-full resize-none bg-ui text-text-main p-4 rounded-2xl"
          placeholder={i18n.t("content.promptContentPlaceholder")}
          value={promptContent}
          onChange={e => setPromptContent(e.target.value)}
        />
        <select
          className="bg-ui px-4 py-2 rounded-2xl"
          value={promptCategory}
          onChange={e => setPromptCategory(e.target.value as TPromptCategory)}
        >
          <option value="writing">Writing</option>
          <option value="conversation">Conversation</option>
          <option value="creative">Creative</option>
          <option value="coding">Coding</option>
          <option value="marketing">Marketing</option>
          <option value="other">Other</option>
        </select>
        <div className="flex justify-center gap-4 w-full">
          <Button
            className="text-lg font-semibold flex gap-1"
            onClick={() => setShowNewPromptModal(false)}
            variant="red"
          >
            <CircleX />
            <p>{i18n.t("content.cancel")}</p>
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
            <p>{i18n.t("content.clear")}</p>
          </Button>
          <Button className="text-lg font-semibold flex gap-1" variant="green" onClick={handleSavePrompt}>
            <Save />
            <p>{i18n.t("content.save")}</p>
          </Button>
        </div>
      </section>
    </Modal>
  )
}

export default memo(NewPrompt)
