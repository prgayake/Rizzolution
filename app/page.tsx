"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-pink-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Rizz Bot
            </h1>
          </div>
          <nav className="flex gap-4">
            <Button variant="ghost" className="text-purple-700 hover:text-purple-900">
              History
            </Button>
            <Button variant="ghost" className="text-purple-700 hover:text-purple-900">
              About
            </Button>
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90">Login</Button>
          </nav>
        </header>

        <main>
          <motion.div
            className="flex flex-col items-center text-center max-w-3xl mx-auto mt-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Unlock Your Ultimate{" "}
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Rizz</span>{" "}
              ✨
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Generate charming, flirty, and cheesy replies that'll make her smile. Level up your chat game with
              AI-powered conversation starters.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="w-full max-w-md"
            >
              <Link href="/chat">
                <Button className="w-full py-6 text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 rounded-xl shadow-lg transition-all duration-300 group">
                  <span>Get Rizzing</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Share Her Message</h3>
              <p className="text-gray-600">Paste her latest text and let our AI understand the context.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🍳</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Cook the Perfect Reply</h3>
              <p className="text-gray-600">Our AI crafts the perfect response based on your chosen vibe.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Watch the Magic</h3>
              <p className="text-gray-600">Copy your perfectly crafted message and watch her reply instantly.</p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
