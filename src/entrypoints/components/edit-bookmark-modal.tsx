import Modal from "@/entrypoints/components/ui/modal"
import Button from "@/entrypoints/components/ui/button"
import { memo } from "react"

import { i18n } from "#imports"

function EditBookmarkModal() {
  const showPopup = usePopupStore(state => state.show)
  const isOpen = useUIStateStore(state => state.showEditBookmarkModal)
  const bookmark = useUIStateStore(state => state.currentEditingBookmark)
  const closeEditBookmarkModal = useUIStateStore(state => state.closeEditBookmarkModal)

  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")

  async function handleSave() {
    if (!bookmark) return

    if (title.trim() === "" || url.trim() === "") {
      showPopup(i18n.t("content.titleCantBeEmpty"), "red")
      return
    }

    if (title.length > 50) {
      showPopup(i18n.t("content.titleCantExceed"), "red")
      return
    }

    if (url.length > 1000) {
      showPopup(i18n.t("content.urlCantExceed"), "red")
      return
    }

    const updatedBookmark: TBookmark = {
      ...bookmark,
      title,
      url,
    }

    try {
      const bookmarks = await bookmarkStorage.getValue()
      const updatedBookmarks = bookmarks.map(b => (b.id === updatedBookmark.id ? updatedBookmark : b))
      await bookmarkStorage.setValue(updatedBookmarks)
      showPopup(i18n.t("content.bookmarkUpdatedSuccesfully"), "green")
      closeEditBookmarkModal()
    } catch (error) {
      showPopup(i18n.t("content.failedToUpdateBookmark"), "red")
    }
  }

  useEffect(() => {
    if (bookmark) {
      setTitle(bookmark.title)
      setUrl(bookmark.url)
    }
  }, [bookmark])
  return (
    <Modal isOpen={isOpen} onClose={closeEditBookmarkModal}>
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">{i18n.t("content.editBookmark")}</h2>

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
          <label htmlFor="url" className="text-sm text-gray-400">
            URL
          </label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            className="p-2 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <Button variant="red" onClick={closeEditBookmarkModal}>
            {i18n.t("content.cancel")}
          </Button>
          <Button variant="blue" onClick={() => handleSave()}>
            {i18n.t("content.save")}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default memo(EditBookmarkModal)
