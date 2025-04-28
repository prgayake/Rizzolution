"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Copy, RefreshCw, Edit, Sparkles } from "lucide-react";
import Link from "next/link";
import { MoodSelector } from "@/components/mood-selector";
import { RizzReply } from "@/components/rizz-reply";
import { generateRizzReply } from "@/lib/generate-rizz";

export default function ChatPage() {
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [selectedMood, setSelectedMood] = useState("Flirty");
  const [generatedReply, setGeneratedReply] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<
    Array<{ text: string; mood: string; date: string }>
  >([]);

  const handleSubmit = async () => {
    if (!message) return;

    setIsGenerating(true);

    try {
      const reply = await generateRizzReply(message, selectedMood);
      setGeneratedReply(reply);

      // Add to history
      const newHistoryItem = {
        text: reply,
        mood: selectedMood,
        date: new Date().toLocaleDateString(),
      };

      setHistory((prev) => [newHistoryItem, ...prev]);
      setStep(2);
    } catch (error) {
      console.error("Error generating reply:", error);
      setGeneratedReply(
        "Sorry, I couldn't generate a reply right now. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const generateAnother = async () => {
    setIsGenerating(true);

    try {
      const reply = await generateRizzReply(message, selectedMood);
      setGeneratedReply(reply);

      // Add to history
      const newHistoryItem = {
        text: reply,
        mood: selectedMood,
        date: new Date().toLocaleDateString(),
      };

      setHistory((prev) => [newHistoryItem, ...prev]);
    } catch (error) {
      console.error("Error generating reply:", error);
      setGeneratedReply(
        "Sorry, I couldn't generate a reply right now. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedReply);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-pink-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Rizzolution
              </h1>
            </div>
          </Link>
        </header>

        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="flex items-center text-purple-600 mb-6 hover:text-purple-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="rounded-2xl shadow-lg border-0 overflow-hidden">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">
                      What did she say? 💬
                    </h2>
                    <Textarea
                      placeholder="Paste her message here..."
                      className="min-h-[120px] mb-6 text-lg rounded-xl border-purple-100 focus:border-purple-300 focus:ring-purple-300"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />

                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3">
                        Choose your vibe:
                      </h3>
                      <MoodSelector
                        selectedMood={selectedMood}
                        setSelectedMood={setSelectedMood}
                      />
                    </div>

                    <Button
                      onClick={handleSubmit}
                      disabled={!message || isGenerating}
                      className="w-full py-6 text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 rounded-xl shadow transition-all duration-300"
                    >
                      {isGenerating ? (
                        <span className="flex items-center">
                          <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                          Cooking...
                        </span>
                      ) : (
                        "Cook the Reply 🍳"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="rounded-2xl shadow-lg border-0 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold">Your Rizz Reply ✨</h2>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {selectedMood}
                      </span>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl mb-6 min-h-[120px]">
                      {isGenerating ? (
                        <div className="flex justify-center items-center h-[120px]">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                        </div>
                      ) : (
                        <RizzReply text={generatedReply} />
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2 py-5 border-purple-200 hover:bg-purple-50 hover:text-purple-700"
                        onClick={copyToClipboard}
                      >
                        <Copy className="h-4 w-4" />
                        <span>Copy</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2 py-5 border-purple-200 hover:bg-purple-50 hover:text-purple-700"
                        onClick={generateAnother}
                        disabled={isGenerating}
                      >
                        <RefreshCw className="h-4 w-4" />
                        <span>Another</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex items-center justify-center gap-2 py-5 border-purple-200 hover:bg-purple-50 hover:text-purple-700"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Customize</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">History</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {history.map((item, index) => (
                      <Card
                        key={index}
                        className="rounded-xl shadow-sm border-0 hover:shadow-md transition-shadow cursor-pointer bg-white"
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm text-gray-500 mb-1">
                                {item.date}
                              </p>
                              <p className="text-sm line-clamp-2">
                                {item.text}
                              </p>
                            </div>
                            <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">
                              {item.mood}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
