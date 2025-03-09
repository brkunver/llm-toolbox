import { memo } from "react"
import Button from "./ui/button"
import { Bookmark, FilePenLine } from "lucide-react"

interface AddBookmarkButtonProps {
  changeTitle?: boolean
}

function AddBookmarkButton({ changeTitle = false }: AddBookmarkButtonProps) {
  function addBookmarkHandler() {
    if (changeTitle) {
      // TODO : Show a model for title
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
