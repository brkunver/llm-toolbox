import { motion, AnimatePresence } from "motion/react"

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  side?: "left" | "right"
  width?: string
}

function Drawer({ isOpen, onClose, children, side = "right", width = "w-80" }: DrawerProps) {
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEscKey)

    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      window.removeEventListener("keydown", handleEscKey)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  const variants = {
    initial: {
      x: side === "right" ? "100%" : "-100%",
    },
    animate: {
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
      },
    },
    exit: {
      x: side === "right" ? "100%" : "-100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-40 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black"
          />

          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            className={`absolute inset-y-0 ${
              side === "right" ? "right-0" : "left-0"
            } ${width} bg-black text-white shadow-xl flex flex-col`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 cursor-pointer"
                aria-label="Close drawer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <title>Close drawer</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default Drawer
