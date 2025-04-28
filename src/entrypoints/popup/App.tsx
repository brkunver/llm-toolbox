import Button from "@/entrypoints/components/ui/button"
import { extPositionStorage } from "@/utils/storage"
import { CircleX, MapPin, PlusCircle, Scaling, Settings } from "lucide-react"
import { i18n } from "#imports"

const Popup: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(true)

  useEffect(() => {
    const initializeState = async () => {
      try {
        const value = await isExtensionActive.getValue()
        setIsActive(value)
      } catch (err) {
        console.error("Error while getting extension active storage information", err)
      }
    }

    initializeState()

    isExtensionActive.watch((active: boolean) => {
      setIsActive(active)
    })
  }, [])

  const toggleExtension = async () => {
    const currentState = await isExtensionActive.getValue()
    await isExtensionActive.setValue(!currentState)
  }

  const changeIconSize = async () => {
    const currentState = await extIconSizeStorage.getValue()
    if (currentState == "small") {
      await extIconSizeStorage.setValue("medium")
    } else if (currentState == "medium") {
      await extIconSizeStorage.setValue("large")
    } else {
      await extIconSizeStorage.setValue("small")
    }
  }

  const changeIconPosition = async () => {
    const currentState = await extPositionStorage.getValue()
    if (currentState == "top-right") {
      await extPositionStorage.setValue("bottom-right")
    } else {
      await extPositionStorage.setValue("top-right")
    }
  }

  return (
    <main className="min-w-52 min-h-24 p-2 flex flex-col justify-center font-main font-medium gap-1 bg-primary text-white">
      <h1 className="text-2xl font-bold text-center">LLM Toolbox</h1>
      <div className="flex mb-2 min-w-full">
        <span className={`px-2 py-1 rounded-md min-w-full text-center ${isActive ? "bg-emerald-900" : "bg-red-900"}`}>
          {isActive ? i18n.t("popup.extension.active") : i18n.t("popup.extension.deactive")}
        </span>
      </div>
      <Button className="flex items-center justify-start w-full gap-1" onClick={toggleExtension}>
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
      <Button
        className="bg-amber-900 hover:bg-amber-950 flex items-center gap-1 w-full"
        onClick={() => browser.runtime.openOptionsPage()}
      >
        <Settings size={16} />
        <span>{i18n.t("popup.options")}</span>
      </Button>
      <Button
        className="bg-indigo-700 hover:bg-indigo-800 flex items-center gap-1 w-full"
        onClick={() => changeIconSize()}
      >
        <Scaling size={16} />
        <span>{i18n.t("popup.changeIconSize")}</span>
      </Button>
      <Button
        className="bg-purple-700 hover:bg-purple-800 flex items-center gap-1 w-full"
        onClick={() => changeIconPosition()}
      >
        <MapPin size={16} />
        <span>{i18n.t("popup.changePosition")}</span>
      </Button>
    </main>
  )
}

export default Popup
