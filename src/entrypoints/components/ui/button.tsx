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
        "px-2 py-1 rounded-md bg-black text-white cursor-pointer border-solid border! border-transparent! hover:border-white! transition-all font-main w-fit",
        props.className
      )}
    >
      {props.children}
    </button>
  )
}
