import { motion, AnimatePresence } from "motion/react"
import { useEffect } from "react"

interface PopupProps {
  isOpen: boolean
  onClose: () => void
  message: string
  duration?: number
  color?: "blue" | "green" | "yellow" | "red"
}

const bgColors = {
  blue: "bg-blue-600",
  green: "bg-green-600",
  yellow: "bg-yellow-600",
  red: "bg-red-600",
}

function Popup({ isOpen, onClose, message, duration = 2500, color = "blue" }: PopupProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isOpen, duration, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          key="popup"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className={`fixed bottom-10 right-10 z-50 ${bgColors[color]} text-white p-4 rounded-lg shadow-lg`}
        >
          <div className="flex flex-col">
            <p>{message}</p>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Popup
