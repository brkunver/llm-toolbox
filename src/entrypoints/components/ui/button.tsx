import { twMerge } from "tailwind-merge"

interface ButtonProps {
  onClick?: () => void
  children: React.ReactNode | string
  className?: string
}

export default function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      role="button"
      onClick={props.onClick}
      className={twMerge(
        "p-2 rounded-md bg-black text-white cursor-pointer border border-transparent hover:border-white font-main",
        props.className
      )}
    >
      {props.children}
    </button>
  )
}
