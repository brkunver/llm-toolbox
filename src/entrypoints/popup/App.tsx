import Button from "@/entrypoints/components/ui/button"
import { CircleX, PlusCircle, Scaling, Settings } from "lucide-react"

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

  return (
    <main className="min-w-52 min-h-24 p-2 flex flex-col justify-center font-main font-medium gap-1 bg-primary text-white">
      <h1 className="text-2xl font-bold text-center">LLM Toolbox</h1>
      <div className="flex mb-2 min-w-full">
        <span className={`px-2 py-1 rounded-md min-w-full text-center ${isActive ? "bg-emerald-900" : "bg-red-900"}`}>
          Extension is {isActive ? "active" : "inactive"}
        </span>
      </div>
      <Button className="flex items-center justify-start w-full gap-1" onClick={toggleExtension}>
        {isActive ? (
          <>
            <CircleX size={16} />
            <span>Deactivate</span>
          </>
        ) : (
          <>
            <PlusCircle size={16} />
            <span>Activate</span>
          </>
        )}
      </Button>
      <Button
        className="bg-amber-900 hover:bg-amber-950 flex items-center gap-1 w-full"
        onClick={() => browser.runtime.openOptionsPage()}
      >
        <Settings size={16} />
        <span>Options</span>
      </Button>
      <Button className="bg-sky-900 hover:bg-sky-950 flex items-center gap-1 w-full" onClick={() => changeIconSize()}>
        <Scaling size={16} />
        <span>Change Icon Size</span>
      </Button>
    </main>
  )
}

export default Popup
