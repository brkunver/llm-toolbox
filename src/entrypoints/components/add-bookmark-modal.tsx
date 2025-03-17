import Modal from "@/entrypoints/components/ui/modal";
import Button from "@/entrypoints/components/ui/button";
import { addBookmark } from "@/utils/helpers";


function AddBookmarkModal() {
  const [title, setTitle] = useState("");
  const showPopup = usePopupStore(state => state.show)
  const isOpen = useUIStateStore((state) => state.showAddBookmarkModal);
  const setShowAddBookmarkModal = useUIStateStore((state) => state.setShowAddBookmarkModal);

  const handleSave = async () => {
    if (title.trim() === "") {
      showPopup("Title cannot be empty", "red");
      return;
    }
    await addBookmark(title);
    setShowAddBookmarkModal(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setShowAddBookmarkModal(false)} className="p-10">
      <section className="flex flex-col gap-4 rounded-2xl w-[30rem]">
        <h2 className="text-center text-2xl font-bold">Add Bookmark</h2>
        <input
          className="bg-ui px-4 py-2 rounded-2xl"
          type="text"
          value={title}
          placeholder="Enter title..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex justify-center gap-4 w-full">
          <Button className="text-lg font-semibold flex gap-1" onClick={() => setShowAddBookmarkModal(false)} variant="red">
            Cancel
          </Button>
          <Button className="text-lg font-semibold flex gap-1" onClick={handleSave} variant="green">
            Save
          </Button>
        </div>
      </section>
    </Modal>
  );
}

export default AddBookmarkModal;
