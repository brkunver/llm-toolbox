import Modal from "@/entrypoints/components/ui/modal"
import Button from "@/entrypoints/components/ui/button"
import { memo } from "react"

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
      showPopup("Title and URL cannot be empty", "red")
      return
    }

    if (title.length > 50) {
      showPopup("Title cannot exceed 50 characters", "red")
      return
    }

    if (url.length > 1000) {
      showPopup("URL cannot exceed 1000 characters", "red")
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
      showPopup("Bookmark updated successfully!", "green")
      closeEditBookmarkModal()
    } catch (error) {
      showPopup("Failed to update bookmark", "red")
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
        <h2 className="text-xl font-bold">Edit Bookmark</h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm text-gray-400">
            Title
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
            Cancel
          </Button>
          <Button variant="blue" onClick={() => handleSave()}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default memo(EditBookmarkModal)
