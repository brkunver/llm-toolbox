import { memo } from "react"
import Drawer from "@/entrypoints/components/ui/drawer"
import { Trash, ExternalLink } from "lucide-react"

interface BookmarksProps {
  isOpen: boolean
  onClose: () => void
}

function Bookmarks({ onClose, isOpen }: BookmarksProps) {
  if (import.meta.env.MODE == "development") {
    console.log("Ext Dev : Bookmarks Rendered")
  }

  const [bookmarks, setBookmarks] = useState<TBookmark[]>([])

  bookmarkStorage.watch((bookmarks) => {
    setBookmarks(bookmarks)
  })

  useEffect(() => {
    async function getBookmarks() {
      const bookmarks = await bookmarkStorage.getValue()
      setBookmarks(bookmarks)
    }

    getBookmarks()
  }, [])

  const handleOpenBookmark = (url: string) => {
    window.open(url, "_blank")
  }

  const handleDeleteBookmark = async (id: string) => {
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id)
    await bookmarkStorage.setValue(updatedBookmarks)
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} width="w-96">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">My Bookmarks</h1>
        <p className="text-gray-400">Bookmark Count: {bookmarks.length}</p>

        {bookmarks.length == 0 ? (
          <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg">
            <p className="text-gray-400">No bookmarks yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="p-4 bg-gray-800 w-full rounded-lg flex justify-between border border-gray-700 hover:border-gray-500 transition-colors"
              >
                <button className="flex gap-2 hover:underline" onClick={() => handleOpenBookmark(bookmark.url)}>
                  <p>{bookmark.title}</p>
                  <ExternalLink />
                </button>
                <button onClick={() => handleDeleteBookmark(bookmark.id)}>
                  <Trash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Drawer>
  )
}

export default memo(Bookmarks)
