import { motion } from "framer-motion"
import React from "react"

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  side?: "left" | "right"
}

export function Drawer({ isOpen, onClose, children, side = "right" }: DrawerProps) {
  const variants = {
    open: {
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: side === "right" ? "100%" : "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black"
          />

          {/* Drawer */}
          <motion.div
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={variants}
            className={`absolute inset-y-0 ${
              side === "right" ? "right-0" : "left-0"
            } w-80 bg-black text-white shadow-lg z-50`}
          >
            <div className="h-full p-4 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </>
  )
}
