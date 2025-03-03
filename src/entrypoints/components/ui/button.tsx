import { twMerge } from "tailwind-merge"

interface ButtonProps {
  onClick?: () => void
  children: React.ReactNode | string
  className?: string
}

export default function Button(props: ButtonProps) {
  return (
    <button
      role="button"
      type="button"
      onClick={props.onClick}
      className={twMerge(
        "px-2 py-1 rounded-md bg-flat-blue text-white cursor-pointer hover:bg-flat-dark-blue transition-all font-main w-fit",
        props.className
      )}
    >
      {props.children}
    </button>
  )
}
