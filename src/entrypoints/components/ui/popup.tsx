import { motion, AnimatePresence } from "motion/react"

const bgColors = {
  blue: "bg-blue-600",
  green: "bg-green-600",
  yellow: "bg-yellow-600",
  red: "bg-red-600",
}

function Popup() {
  const { showPopup, popupMessage, popupColor, duration, setShowPopup } = usePopupStore()

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [showPopup, duration, setShowPopup])

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.section
          key="popup"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5 }}
          className={`fixed bottom-10 right-10 z-50 ${bgColors[popupColor]} text-white p-4 rounded-lg shadow-lg`}
        >
          <div className="flex flex-col">
            <p>{popupMessage}</p>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Popup
