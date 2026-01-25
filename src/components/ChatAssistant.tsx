"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, Bot } from "lucide-react";
import { clsx } from "clsx";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Namaste! I am your heritage guide. How can I assist you in exploring India's cultural timeline today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Mock API delay
    setTimeout(() => {
      const responses = [
        "That's a fascinating aspect of our history. The intricate details of this monument reflect the craftsmanship of that era.",
        "I can tell you more about the architectural significance if you're interested!",
        "Did you know this site is protected by UNESCO? It's a testament to our rich heritage.",
        "Connecting with our roots allows us to understand the present better. What else would you like to explore?",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: randomResponse,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
          isOpen ? "bg-stone-900 text-white" : "bg-gradient-to-r from-orange-600 to-amber-600 text-white"
        )}
        aria-label="Open AI Assistant"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={clsx(
          "fixed bottom-24 right-6 z-50 flex w-[90vw] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white/95 shadow-2xl backdrop-blur-md transition-all duration-300 dark:border-stone-700 dark:bg-stone-900/95 sm:right-6",
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-4 opacity-0 pointer-events-none"
        )}
        style={{ maxHeight: "calc(100vh - 120px)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-stone-100 to-stone-50 px-4 py-3 border-b border-stone-100 dark:from-stone-800 dark:to-stone-900 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-900/30">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Heritage Guide
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                AI Assistant
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar h-[400px]">
          <div className="flex flex-col gap-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={clsx(
                  "flex max-w-[85%] flex-col gap-1",
                  message.role === "user" ? "self-end items-end" : "self-start items-start"
                )}
              >
                <div
                  className={clsx(
                    "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    message.role === "user"
                      ? "bg-orange-600 text-white rounded-br-none"
                      : "bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-100 rounded-bl-none"
                  )}
                >
                  {message.content}
                </div>
                <span className="text-[10px] text-stone-400">
                  {message.role === "user" ? "You" : "Guide"}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="flex max-w-[85%] self-start items-start gap-1">
                 <div className="rounded-2xl rounded-bl-none bg-stone-100 px-4 py-3 dark:bg-stone-800">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-stone-400 [animation-delay:-0.3s]"></span>
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-stone-400 [animation-delay:-0.15s]"></span>
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-stone-400"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-stone-100 bg-white p-3 dark:border-stone-800 dark:bg-stone-900">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-2 py-1.5 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 dark:border-stone-700 dark:bg-stone-800"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Indian heritage..."
              className="flex-1 bg-transparent px-3 py-1 text-sm text-stone-900 placeholder-stone-500 focus:outline-none dark:text-stone-100"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white transition-colors hover:bg-orange-700 disabled:bg-stone-300 disabled:cursor-not-allowed dark:disabled:bg-stone-700"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
