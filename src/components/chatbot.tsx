"use client";

import { useState } from "react";
import axios from "axios";
import { Send, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await axios.post("/api/v1/chatbot", { message: input });
      const botMessage = { sender: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops, something went wrong!" },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end">
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-gradient-to-r from-orange-400 to-pink-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        <Bot size={26} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mt-3 w-80 sm:w-96 backdrop-blur-md bg-black/70 border border-white/30 text-white rounded-2xl shadow-xl flex flex-col overflow-hidden"
          >
            <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-3 text-lg font-semibold flex justify-between items-center">
              TraWel Bot
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 h-80 space-y-3">
              {messages.length === 0 && (
                <p className="text-center text-white/60 italic mt-10">
                  👋 Hey traveler! How can I assist you today?
                </p>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                      msg.sender === "user"
                        ? "bg-orange-500 text-white"
                        : "bg-white/30 text-white/90"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center border-t border-white/30 p-2 bg-white/10">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 bg-transparent text-white placeholder-white/60 focus:outline-none px-2"
              />
              <button
                onClick={sendMessage}
                className="p-2 bg-orange-500 rounded-full hover:scale-105 transition-transform"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
