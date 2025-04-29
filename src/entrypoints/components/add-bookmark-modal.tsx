import Modal from "@/entrypoints/components/ui/modal"
import Button from "@/entrypoints/components/ui/button"
import { addBookmark } from "@/utils/helpers"

import { i18n } from "#imports"

function AddBookmarkModal() {
  const [title, setTitle] = useState("")
  const showPopup = usePopupStore(state => state.show)
  const isOpen = useUIStateStore(state => state.showAddBookmarkModal)
  const setShowAddBookmarkModal = useUIStateStore(state => state.setShowAddBookmarkModal)

  const handleSave = async () => {
    if (title.trim() == "") {
      showPopup(i18n.t("content.titleCantBeEmpty"), "red")
      return
    }
    await addBookmark(title)
    setTitle("")
    setShowAddBookmarkModal(false)
    showPopup(i18n.t("content.bookmarkAdded"), "green")
  }

  return (
    <Modal isOpen={isOpen} onClose={() => setShowAddBookmarkModal(false)} className="p-10">
      <section className="flex flex-col gap-4 rounded-2xl w-[30rem]">
        <h2 className="text-center text-2xl font-bold">{i18n.t("content.addBookmark")}</h2>
        <input
          className="bg-ui px-4 py-2 rounded-2xl"
          type="text"
          value={title}
          placeholder={i18n.t("content.bookmarkTitlePlaceholder")}
          onChange={e => setTitle(e.target.value)}
        />
        <div className="flex justify-center gap-4 w-full">
          <Button
            className="text-lg font-semibold flex gap-1"
            onClick={() => setShowAddBookmarkModal(false)}
            variant="red"
          >
            {i18n.t("content.cancel")}
          </Button>
          <Button className="text-lg font-semibold flex gap-1" onClick={handleSave} variant="green">
            {i18n.t("content.save")}
          </Button>
        </div>
      </section>
    </Modal>
  )
}

export default AddBookmarkModal
