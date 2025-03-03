import Button from "@/entrypoints/components/ui/button"

export default function NewPrompt() {
  return (
    <section className="flex flex-col gap-4">
      <h2>Create a new prompt</h2>
      <textarea
        className="h-40 w-80 resize-none bg-ui text-text-main p-4"
        placeholder="You are a softare developer..."
      ></textarea>
      <div className="flex justify-end">
        <Button>Cancel</Button>
        <Button>Save Prompt</Button>
      </div>
    </section>
  )
}
