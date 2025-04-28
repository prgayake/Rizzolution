"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const moods = [
  { id: "Funny", emoji: "😂", label: "Funny" },
  { id: "Sweet", emoji: "🥰", label: "Sweet" },
  { id: "Bold", emoji: "😎", label: "Bold" },
  { id: "Flirty", emoji: "😏", label: "Flirty" },
  { id: "Over the Top", emoji: "🤩", label: "Over the Top" },
]

interface MoodSelectorProps {
  selectedMood: string
  setSelectedMood: (mood: string) => void
}

export function MoodSelector({ selectedMood, setSelectedMood }: MoodSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {moods.map((mood) => (
        <motion.div key={mood.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            type="button"
            variant={selectedMood === mood.id ? "default" : "outline"}
            className={`w-full py-6 flex flex-col items-center justify-center gap-1 rounded-xl ${
              selectedMood === mood.id
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                : "border-purple-200 hover:bg-purple-50 hover:text-purple-700"
            }`}
            onClick={() => setSelectedMood(mood.id)}
          >
            <span className="text-xl">{mood.emoji}</span>
            <span>{mood.label}</span>
          </Button>
        </motion.div>
      ))}
    </div>
  )
}
