import Button from "@/entrypoints/components/ui/button"
import { CircleX, PlusCircle } from "lucide-react"

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

  return (
    <main className="min-h-screen p-2 flex flex-col font-main font-medium bg-primary text-white">
      <h1>LLM Toolbox</h1>
      <div className="mb-2">
        <span className={`px-2 py-1 rounded-md ${isActive ? "bg-emerald-900" : "bg-red-900"}`}>
          Extension is {isActive ? "active" : "inactive"}
        </span>
      </div>
      <Button className="min-w-36 flex items-center justify-center gap-1" onClick={toggleExtension}>
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
    </main>
  )
}

export default Popup
