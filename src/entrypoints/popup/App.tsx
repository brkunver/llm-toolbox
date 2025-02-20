import React, { useState, useEffect } from "react"
import "../global.css"
import { isExtensionActive } from "../../utils/storage"

const Popup: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean>(true)

  useEffect(() => {
    // İlk değeri alıyoruz
    const initializeState = async () => {
      try {
        const value = await isExtensionActive.getValue()
        setIsActive(value)
      } catch (err) {
        console.error("Error while getting extension active storage information", err)
      }
    }

    initializeState()

    // Değişiklikleri izliyoruz - Svelte'in watch yapısını taklit ediyoruz
    isExtensionActive.watch((active: boolean) => {
      setIsActive(active)
    })

    // Clean up işlemi gerekirse buraya eklenebilir
    // return () => {...}
  }, [])

  const toggleExtension = async () => {
    const currentState = await isExtensionActive.getValue()
    await isExtensionActive.setValue(!currentState)
  }

  return (
    <main className="min-w-48 min-h-24 p-2 flex flex-col justify-center items-center">
      <h1>LLM Toolbox</h1>
      <p>Extension is = {String(isActive)}</p>
      <button onClick={toggleExtension} className="border p-2 bg-black text-white rounded-2xl cursor-pointer">
        Toggle Extension
      </button>
    </main>
  )
}

export default Popup
