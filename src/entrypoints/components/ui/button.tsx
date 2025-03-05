import { twMerge } from "tailwind-merge"

interface ButtonProps {
  onClick?: () => void
  children: React.ReactNode | string
  className?: string
  variant?: "blue" | "red" | "green" | "yellow"
}

export default function Button(props: ButtonProps) {
  const variant = props.variant || "blue"

  function getVariantClasses() {
    switch (variant) {
      case "blue":
        return "bg-blue-button hover:bg-dark-blue-button"
      case "red":
        return "bg-red-button hover:bg-dark-red-button"
      case "green":
        return "bg-green-button hover:bg-dark-green-button"
      case "yellow":
        return "bg-yellow-button hover:bg-dark-yellow-button"
      default:
        return "bg-blue-button hover:bg-dark-blue-button"
    }
  }

  return (
    <button
      role="button"
      type="button"
      onClick={props.onClick}
      className={twMerge(
        "px-2 py-1 rounded-md text-white cursor-pointer transition-all font-main text-base w-fit",
        getVariantClasses(),
        props.className
      )}
    >
      {props.children}
    </button>
  )
}
