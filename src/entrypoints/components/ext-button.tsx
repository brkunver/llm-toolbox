import { memo, useState, useEffect } from "react"
import logo from "~/assets/128.png"
import { useUIStateStore } from "@/utils/stores"
import { isMenuActive } from "@/utils/storage"
import { extIconSizeStorage } from "@/utils/storage"

function ExtButton() {
  if (import.meta.env.MODE == "development") {
    console.log("Ext Dev : Ext Button Rendered")
  }

  const showMenu = useUIStateStore(state => state.showMenu)
  const toggleMenu = useUIStateStore(state => state.toggleMenu)

  const [iconSize, setIconSize] = useState<TExtIconSize>("medium")

  const handleMenuButtonClick = () => {
    toggleMenu()
    isMenuActive.setValue(!showMenu)
  }

  useEffect(() => {
    async function setSize() {
      const size = await extIconSizeStorage.getValue()
      setIconSize(size)
    }

    //subscribe to changes
    extIconSizeStorage.watch((size: TExtIconSize) => {
      setIconSize(size)
    })

    setSize()
  }, [])

  let imgSizes = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-14 h-14",
  }

  return (
    <div id="ext-button" className="fixed top-14 right-14 z-30 w-fit h-fit group font-main">
      <div
        className={`${
          showMenu ? "bg-flat-red" : "bg-flat-green"
        } absolute inset-0 rounded-2xl scale-110 opacity-0 group-hover:opacity-100 transition-all duration-200 -z-10`}
      />
      <button
        type="button"
        onClick={handleMenuButtonClick}
        className="w-fit h-fit p-1.5 cursor-pointer rounded-2xl bg-primary border-solid border-1 border-border hover:border-transparent transition-all"
      >
        <img src={logo} alt="toggle-menu" className={`ps-1 pb-1 ${imgSizes[iconSize]}`} />
      </button>
    </div>
  )
}

export default memo(ExtButton)
