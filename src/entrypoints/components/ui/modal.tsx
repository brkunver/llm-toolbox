import { twMerge } from "tailwind-merge"
import { motion, AnimatePresence } from "motion/react"

interface ModalProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  className?: string
}

function Modal({ children, isOpen, onClose, className }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black"
          />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={twMerge("relative z-50 rounded-lg bg-black text-white p-6 shadow-lg ", className)}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default Modal
