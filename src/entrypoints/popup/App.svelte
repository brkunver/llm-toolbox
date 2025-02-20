<script lang="ts">
  import "../global.css"
  import { isExtensionActive } from "../../utils/storage"
  import Button from "../components/Button.svelte"

  let isActive = $state(true)

  isExtensionActive.watch((active) => {
    isActive = active
  })

  $effect(() => {
    isExtensionActive
      .getValue()
      .then((value) => {
        isActive = value
      })
      .catch((err) => {
        console.error("Error while getting extension active storage information", err)
      })
  })

  async function toggleExtension() {
    const isActive = await isExtensionActive.getValue()
    await isExtensionActive.setValue(!isActive)
  }
</script>

<main class="min-w-48 min-h-24 p-2 flex flex-col justify-center items-center">
  <h1>LLM Toolbox</h1>
  <p>Extension is = {isActive}</p>
  <button onclick={toggleExtension} class="border p-2 bg-black text-white rounded-2xl cursor-pointer"
    >Toggle Extension</button
  >
  <Button className="bg-black text-blue-200">Click me</Button>
</main>
