import { create } from "zustand"
import { TPrompt, TBookmark } from "./types"

interface extensionStoreTypes {
  showExtension: boolean
  setShowExtension: (show: boolean) => void
}

export const useExtensionStore = create<extensionStoreTypes>((set) => ({
  showExtension: false,
  setShowExtension: (show: boolean) => set({ showExtension: show }),
}))

interface popupStoreTypes {
  showPopup: boolean
  setShowPopup: (show: boolean) => void
  popupMessage: string
  setPopupMessage: (msg: string) => void
  popupColor: "blue" | "green" | "yellow" | "red"
  setPopupColor: (color: "blue" | "green" | "yellow" | "red") => void
  duration: number
  setDuration: (duration: number) => void
  show: (message: string, color?: "blue" | "green" | "yellow" | "red", duration?: number) => void
}

export const usePopupStore = create<popupStoreTypes>((set) => ({
  showPopup: false,
  setShowPopup: (show) => set({ showPopup: show }),
  popupMessage: "",
  setPopupMessage: (msg) => set({ popupMessage: msg }),
  popupColor: "green",
  setPopupColor: (color) => set({ popupColor: color }),
  duration: 2500,
  setDuration: (duration) => set({ duration }),
  show: (message, color = "green", duration = 2500) =>
    set({
      showPopup: true,
      popupMessage: message,
      popupColor: color,
      duration,
    }),
}))

interface UIStateStoreTypes {
  // Menu state
  showMenu: boolean
  setShowMenu: (show: boolean) => void
  toggleMenu: () => void
  
  // Prompt list state
  showPromptList: boolean
  setShowPromptList: (show: boolean) => void
  
  // New prompt modal state
  showNewPromptModal: boolean
  setShowNewPromptModal: (show: boolean) => void
  
  // Bookmarks state
  showBookmarks: boolean
  setShowBookmarks: (show: boolean) => void
  
  // Add bookmark modal state
  showAddBookmarkModal: boolean
  setShowAddBookmarkModal: (show: boolean) => void
  
  // Edit prompt modal state
  showEditPromptModal: boolean
  currentEditingPrompt: TPrompt | null
  setShowEditPromptModal: (show: boolean) => void
  setCurrentEditingPrompt: (prompt: TPrompt | null) => void
  openEditPromptModal: (prompt: TPrompt) => void
  closeEditPromptModal: () => void
  
  // Edit bookmark modal state
  showEditBookmarkModal: boolean
  currentEditingBookmark: TBookmark | null
  setShowEditBookmarkModal: (show: boolean) => void
  setCurrentEditingBookmark: (bookmark: TBookmark | null) => void
  openEditBookmarkModal: (bookmark: TBookmark) => void
  closeEditBookmarkModal: () => void
}

export const useUIStateStore = create<UIStateStoreTypes>((set) => ({
  // Menu state
  showMenu: false,
  setShowMenu: (show: boolean) => set({ showMenu: show }),
  toggleMenu: () => set((state) => ({ showMenu: !state.showMenu })),
  
  // Prompt list state
  showPromptList: false,
  setShowPromptList: (show: boolean) => set({ showPromptList: show }),
  
  // New prompt modal state
  showNewPromptModal: false,
  setShowNewPromptModal: (show: boolean) => set({ showNewPromptModal: show }),
  
  // Bookmarks state
  showBookmarks: false,
  setShowBookmarks: (show: boolean) => set({ showBookmarks: show }),
  
  // Add bookmark modal state
  showAddBookmarkModal: false,
  setShowAddBookmarkModal: (show: boolean) => set({ showAddBookmarkModal: show }),
  
  // Edit prompt modal state
  showEditPromptModal: false,
  currentEditingPrompt: null,
  setShowEditPromptModal: (show: boolean) => set({ showEditPromptModal: show }),
  setCurrentEditingPrompt: (prompt: TPrompt | null) => set({ currentEditingPrompt: prompt }),
  openEditPromptModal: (prompt: TPrompt) => set({ showEditPromptModal: true, currentEditingPrompt: prompt }),
  closeEditPromptModal: () => set({ showEditPromptModal: false, currentEditingPrompt: null }),
  
  // Edit bookmark modal state
  showEditBookmarkModal: false,
  currentEditingBookmark: null,
  setShowEditBookmarkModal: (show: boolean) => set({ showEditBookmarkModal: show }),
  setCurrentEditingBookmark: (bookmark: TBookmark | null) => set({ currentEditingBookmark: bookmark }),
  openEditBookmarkModal: (bookmark: TBookmark) => set({ showEditBookmarkModal: true, currentEditingBookmark: bookmark }),
  closeEditBookmarkModal: () => set({ showEditBookmarkModal: false, currentEditingBookmark: null }),
}))
