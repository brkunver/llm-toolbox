import { memo } from "react"
import Drawer from "@/entrypoints/components/ui/drawer"

interface PromptListProps {
  isOpen: boolean
  onClose: () => void
}

function PromptList({ onClose, isOpen }: PromptListProps) {
  if (import.meta.env.MODE == "development") {
    console.log("Ext Dev : Prompt List Rendered")
  }

  const [prompts, setPrompts] = useState<TPrompt[]>([])

  promptStorage.watch((prompts) => {
    setPrompts(prompts)
  })

  useEffect(() => {
    async function getPrompts() {
      const prompts = await promptStorage.getValue()
      setPrompts(prompts)
    }

    getPrompts()
  }, [])

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <h1>Promplist</h1>
      <p>Prompt Count = {prompts.length}</p>
      {prompts.map((prompt) => (
        <div key={prompt.id}>
          <h2>{prompt.title}</h2>
        </div>
      ))}
    </Drawer>
  )
}

export default memo(PromptList)
