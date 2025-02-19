<script lang="ts">
  import "../global.css"
  import logo from "./128.png"
  import { fade } from "svelte/transition"
  import { getWebsite, changePrompt } from "../../utils/helpers"

  let showMenu = $state(false)

  let onMenuButtonClick = () => {
    showMenu = !showMenu
  }
</script>

<main class="fixed top-14 right-14 z-50">
  <section id="ui" class="flex flex-col p-2 rounded-2xl bg-gray-900 w-fit h-fit">
    <button onclick={onMenuButtonClick} class="w-fit h-fit self-end">
      <img src={logo} alt="toggle-menu" class="text-white w-10 h-10 mb-2 ml-2" />
    </button>
    {#if showMenu}
      <section transition:fade class="flex flex-col">
        <h1>LLM Toolbox</h1>
        <p>Detected Website : {getWebsite()}</p>
        <button onclick={() => changePrompt("How are you doing :)")} class="cursor-pointer">Test Prompt Change</button
        >
      </section>
    {/if}
  </section>
</main>
