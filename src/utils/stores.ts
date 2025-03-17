import { create } from "zustand"
import { TPrompt } from "./types"

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
  showMenu: boolean
  showPromptList: boolean
  showNewPromptModal: boolean
  showBookmarks: boolean
  showAddBookmarkModal: boolean
  showEditPromptModal: boolean
  currentEditingPrompt: TPrompt | null
  setShowMenu: (show: boolean) => void
  toggleMenu: () => void
  setShowPromptList: (show: boolean) => void
  setShowNewPromptModal: (show: boolean) => void
  setShowBookmarks: (show: boolean) => void
  setShowAddBookmarkModal: (show: boolean) => void
  setShowEditPromptModal: (show: boolean) => void
  setCurrentEditingPrompt: (prompt: TPrompt | null) => void
  openEditPromptModal: (prompt: TPrompt) => void
  closeEditPromptModal: () => void
}

export const useUIStateStore = create<UIStateStoreTypes>((set) => ({
  showMenu: false,
  showPromptList: false,
  showNewPromptModal: false,
  showBookmarks: false,
  showAddBookmarkModal: false,
  showEditPromptModal: false,
  currentEditingPrompt: null,
  setShowMenu: (show: boolean) => set({ showMenu: show }),
  toggleMenu: () => set((state) => ({ showMenu: !state.showMenu })),
  setShowPromptList: (show: boolean) => set({ showPromptList: show }),
  setShowNewPromptModal: (show: boolean) => set({ showNewPromptModal: show }),
  setShowBookmarks: (show: boolean) => set({ showBookmarks: show }),
  setShowAddBookmarkModal: (show: boolean) => set({ showAddBookmarkModal: show }),
  setShowEditPromptModal: (show: boolean) => set({ showEditPromptModal: show }),
  setCurrentEditingPrompt: (prompt: TPrompt | null) => set({ currentEditingPrompt: prompt }),
  openEditPromptModal: (prompt: TPrompt) => set({ showEditPromptModal: true, currentEditingPrompt: prompt }),
  closeEditPromptModal: () => set({ showEditPromptModal: false, currentEditingPrompt: null }),
}))
