import { memo } from "react"
import { twMerge } from "tailwind-merge"
import Button from "./ui/button"
import { Bookmark, FilePenLine } from "lucide-react"

import { i18n } from "#imports"

interface AddBookmarkButtonProps {
  onShowAddBookmarkModal?: () => void
  changeTitle?: boolean
  className?: string
}

function AddBookmarkButton({ changeTitle = false, onShowAddBookmarkModal, className }: AddBookmarkButtonProps) {
  const showPopup = usePopupStore(state => state.show)

  function addBookmarkHandler() {
    if (changeTitle && onShowAddBookmarkModal) {
      onShowAddBookmarkModal()
      return
    } else {
      addBookmark()
      showPopup(i18n.t("content.bookmarkAdded"), "green")
    }
  }

  return (
    <Button onClick={addBookmarkHandler} className={twMerge("flex gap-1", className)}>
      {changeTitle ? <FilePenLine /> : <Bookmark />}
      <span>{changeTitle ? i18n.t("content.addBookmarkAs") : i18n.t("content.addBookmark")}</span>
    </Button>
  )
}

export default memo(AddBookmarkButton)
