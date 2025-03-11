import { memo } from "react"
import Button from "./ui/button"
import { Bookmark, FilePenLine } from "lucide-react"

interface AddBookmarkButtonProps {
  onShowAddBookmarkModal?: () => void
  changeTitle?: boolean
}

function AddBookmarkButton({ changeTitle = false, onShowAddBookmarkModal }: AddBookmarkButtonProps) {
  function addBookmarkHandler() {
    if (changeTitle && onShowAddBookmarkModal) {
      onShowAddBookmarkModal()
      return
    } else {
      addBookmark()
    }
  }

  return (
    <Button onClick={addBookmarkHandler} className="flex gap-1">
      {changeTitle ? <FilePenLine /> : <Bookmark />}
      <span>{changeTitle ? "Add bookmark as..." : "Add bookmark"}</span>
    </Button>
  )
}

export default memo(AddBookmarkButton)
