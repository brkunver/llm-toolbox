import React, { useState, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"

export default function usePopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")

  const showPopup = useCallback((msg: string) => {
    setMessage(msg)
    setIsOpen(true)

    const DISPLAY_DURATION = 2000
    const timer = setTimeout(() => {
      setIsOpen(false)
    }, DISPLAY_DURATION)

    return () => clearTimeout(timer) // Cleanup
  }, [])

  const PopupComponent: React.FC = () => (
    <AnimatePresence mode="popLayout">
      {isOpen && (
        <motion.section
          key={message}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
          transition={{ duration: 1 }}
          className="fixed bottom-10 right-10 z-50 bg-blue-500 text-white p-4 rounded-lg shadow-lg"
        >
          <div className="flex flex-col">
            <p>{message}</p>
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{
                duration: 2,
                ease: "linear",
              }}
              className="h-1 bg-white mt-2 rounded"
            />
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )

  return { showPopup, PopupComponent }
}
