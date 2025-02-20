<script lang="ts">
  import { type Snippet } from "svelte"
  import { twMerge } from "tailwind-merge"

  interface Props {
    className?: string
    children: Snippet
    onClick: () => void
    disabled?: boolean
  }

  let { className = "", children, onClick, disabled = false }: Props = $props()
</script>

<button class={twMerge("py-2 px-4 rounded-2xl border", className)} onclick={onClick} {disabled}>
  {@render children()}
</button>
