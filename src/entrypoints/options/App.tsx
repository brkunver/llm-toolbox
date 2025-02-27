import { useState, useEffect } from "react"
import Button from "@/entrypoints/components/ui/button"
import "../global.css"
import { isExtensionActive } from "@/utils/storage"

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
    <main className="min-h-screen p-2 flex flex-col font-roboto font-medium bg-primary text-white">
      <h1>LLM Toolbox</h1>
      <p>Extension is = {String(isActive)}</p>
      <Button className="min-w-20 w-24" onClick={toggleExtension}>
        {isActive ? "Deactivate" : "Activate"}
      </Button>
    </main>
  )
}

export default Popup
