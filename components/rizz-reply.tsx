"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface RizzReplyProps {
  text: string
}

export function RizzReply({ text }: RizzReplyProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 30) // Adjust typing speed here

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  useEffect(() => {
    // Reset when text changes
    setDisplayedText("")
    setCurrentIndex(0)
  }, [text])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg font-medium">
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.7 }}
          className="inline-block ml-1 w-2 h-5 bg-purple-500"
        />
      )}
    </motion.div>
  )
}
