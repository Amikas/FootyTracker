"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function OllamaChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/ollama/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from Ollama")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please make sure Ollama is running locally.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const toggleChatbot = () => {
    setIsOpen(!isOpen)
  }

  const clearChat = () => {
    setMessages([])
  }

  return (
    <>
      {/* Toggle Button */}
      <Button
        onClick={toggleChatbot}
        className={`fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          isOpen ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
        }`}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Interface */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-40 w-80 h-96 shadow-2xl border-2 animate-in slide-in-from-bottom-2 duration-300 sm:w-96">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bot className="h-5 w-5 text-blue-500" />
                Local AI Assistant
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChat}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Clear chat history"
              >
                Clear
              </Button>
            </div>
            <p className="text-sm text-gray-600">Powered by Ollama (qwen2.5:0.5b)</p>
          </CardHeader>

          <CardContent className="flex flex-col h-full pb-4">
            {/* Messages Area */}
            <ScrollArea className="flex-1 pr-4 mb-4">
              <div className="space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <Bot className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>Hello! I'm your local AI assistant.</p>
                    <p className="text-sm">Ask me anything!</p>
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex-shrink-0">
                        <Bot className="h-6 w-6 text-blue-500 mt-1" />
                      </div>
                    )}

                    <div
                      className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${
                        message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {message.content}
                    </div>

                    {message.role === "user" && (
                      <div className="flex-shrink-0">
                        <User className="h-6 w-6 text-gray-500 mt-1" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-2 justify-start">
                    <Bot className="h-6 w-6 text-blue-500 mt-1" />
                    <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
                maxLength={500}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                size="sm"
                className="px-3"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  )
}
