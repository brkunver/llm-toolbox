import { memo } from "react"
import { twMerge } from "tailwind-merge"

interface CardProps {
  className?: string
  children: React.ReactNode
}

function Card({ className, children }: CardProps) {
  return (
    <div className={twMerge("p-4 rounded-2xl border border-solid border-border w-fit h-fit", className)}>
      {children}
    </div>
  )
}

export default memo(Card)
