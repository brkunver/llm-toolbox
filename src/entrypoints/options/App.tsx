import Button from "@/entrypoints/components/ui/button"
import { CircleX, PlusCircle } from "lucide-react"
import Card from "@/entrypoints/components/ui/card"
import OptionsFooter from "@/entrypoints/options/components/options-footer"
import { useState, useEffect } from "react"
import { extIconSizeStorage, isExtensionActive, extPositionStorage } from "@/utils/storage"
import { ExtPositionType, TExtIconSize } from "@/utils/types"
import { i18n } from "#imports"

const Popup: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(true)
  const [iconSize, setIconSize] = useState<TExtIconSize>("small")
  const [extPosition, setExtPosition] = useState<ExtPositionType>("top-right")

  useEffect(() => {
    const initializeState = async () => {
      try {
        const value = await isExtensionActive.getValue()
        setIsActive(value)
      } catch (err) {
        console.error("Error while getting extension active storage information", err)
      }
    }

    const initializeIconSize = async () => {
      try {
        const value = await extIconSizeStorage.getValue()
        setIconSize(value)
      } catch (err) {
        console.error("Error while getting extension icon size storage information", err)
      }
    }

    const initializePosition = async () => {
      try {
        const value = await extPositionStorage.getValue()
        setExtPosition(value)
      } catch (err) {
        console.error("Error while getting extension position storage information", err)
      }
    }

    initializeState()
    initializeIconSize()
    initializePosition()

    isExtensionActive.watch((active: boolean) => {
      setIsActive(active)
    })

    extIconSizeStorage.watch((size: TExtIconSize) => {
      setIconSize(size)
    })

    extPositionStorage.watch((position: ExtPositionType) => {
      setExtPosition(position)
    })
  }, [])

  const toggleExtension = async () => {
    const currentState = await isExtensionActive.getValue()
    await isExtensionActive.setValue(!currentState)
  }

  const changeIconSize = async (size: TExtIconSize) => {
    setIconSize(size)
    await extIconSizeStorage.setValue(size)
  }

  const changePosition = async (position: ExtPositionType) => {
    setExtPosition(position)
    await extPositionStorage.setValue(position)
  }

  return (
    <main className="min-h-screen p-2 flex flex-col font-main font-medium bg-primary text-white gap-4">
      <h1 className="text-3xl font-bold text-center">LLM Toolbox</h1>
      <section id="settings-section" className="flex flex-wrap gap-4 self-center">
        <Card className="min-h-30 min-w-60 flex flex-col justify-center items-center gap-2">
          <div className="mb-2">
            <span className={`px-2 py-1 rounded-md ${isActive ? "bg-emerald-900" : "bg-red-900"}`}>
              {isActive ? i18n.t("popup.extension.active") : i18n.t("popup.extension.deactive")}
            </span>
          </div>
          <Button className="min-w-36 flex items-center justify-center gap-1" onClick={toggleExtension}>
            {isActive ? (
              <>
                <CircleX size={16} />
                <span>{i18n.t("popup.deactivate")}</span>
              </>
            ) : (
              <>
                <PlusCircle size={16} />
                <span>{i18n.t("popup.activate")}</span>
              </>
            )}
          </Button>
        </Card>
        <Card className="min-h-30 min-w-60 flex flex-col justify-center items-center gap-2">
          <label htmlFor="icon-size" className="mb-2">
            {i18n.t("popup.changeIconSize")}
          </label>
          <select
            name="icon-size"
            id="icon-size"
            value={iconSize}
            className="w-fit text-text-main bg-blue-button px-2 py-1 rounded-2xl"
            onChange={e => changeIconSize(e.target.value as TExtIconSize)}
          >
            <option value="small">{i18n.t("options.iconSize.small")}</option>
            <option value="medium">{i18n.t("options.iconSize.medium")}</option>
            <option value="large">{i18n.t("options.iconSize.large")}</option>
          </select>
        </Card>
        <Card className="min-h-30 min-w-60 flex flex-col justify-center items-center gap-2">
          <label htmlFor="extension-position" className="mb-2">
            {i18n.t("popup.changePosition")}
          </label>
          <select
            name="extension-position"
            id="extension-position"
            value={extPosition}
            className="w-fit text-text-main bg-blue-button px-2 py-1 rounded-2xl"
            onChange={e => changePosition(e.target.value as ExtPositionType)}
          >
            <option value="top-right">{i18n.t("options.position.topRight")}</option>
            <option value="bottom-right">{i18n.t("options.position.bottomRight")}</option>
          </select>
        </Card>
      </section>
      <OptionsFooter />
    </main>
  )
}

export default Popup
