import { memo, useState, useEffect } from "react"
import Drawer from "@/entrypoints/components/ui/drawer"
import { Trash, ExternalLink, Edit } from "lucide-react"
import { useUIStateStore } from "@/utils/stores"
import { bookmarkStorage } from "@/utils/storage"
import { TBookmark } from "@/utils/types"

import { i18n } from "#imports"

function Bookmarks() {
  if (import.meta.env.MODE == "development") {
    console.log("Ext Dev : Bookmarks Rendered")
  }

  const isOpen = useUIStateStore(state => state.showBookmarks)
  const setShowBookmarks = useUIStateStore(state => state.setShowBookmarks)
  const openEditBookmarkModal = useUIStateStore(state => state.openEditBookmarkModal)

  const [bookmarks, setBookmarks] = useState<TBookmark[]>([])

  useEffect(() => {
    async function getBookmarks() {
      const bookmarks = await bookmarkStorage.getValue()
      setBookmarks(bookmarks)
    }

    bookmarkStorage.watch(bookmarks => {
      setBookmarks(bookmarks)
    })

    getBookmarks()
  }, [])

  const handleOpenBookmark = (url: string) => {
    window.open(url, "_blank")
  }

  const handleDeleteBookmark = async (id: string) => {
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== id)
    await bookmarkStorage.setValue(updatedBookmarks)
  }

  const handleEditBookmark = async (id: string) => {
    const bookmark = bookmarks.find(bookmark => bookmark.id === id)
    if (bookmark) {
      openEditBookmarkModal(bookmark)
    }
  }

  return (
    <Drawer isOpen={isOpen} onClose={() => setShowBookmarks(false)} width="w-96">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{i18n.t("content.myBookmarks")}</h1>
        <p className="text-gray-400">
          {i18n.t("content.bookmarkCount")}: {bookmarks.length}
        </p>

        {bookmarks.length == 0 ? (
          <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg">
            <p className="text-gray-400">{i18n.t("content.noBookmarksYet")}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {bookmarks.map(bookmark => (
              <div
                key={bookmark.id}
                className="p-4 bg-gray-800 w-full rounded-lg flex justify-between border border-gray-700 hover:border-gray-500 transition-colors"
              >
                <button className="flex gap-2 hover:underline" onClick={() => handleOpenBookmark(bookmark.url)}>
                  <p>{bookmark.title}</p>
                  <ExternalLink />
                </button>
                <div className="flex gap-2">
                  <button onClick={() => handleDeleteBookmark(bookmark.id)}>
                    <Trash className="text-red-500 hover:text-red-600" />
                  </button>
                  <button onClick={() => handleEditBookmark(bookmark.id)}>
                    <Edit className="text-blue-500 hover:text-blue-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Drawer>
  )
}

export default memo(Bookmarks)
