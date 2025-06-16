import { type NextRequest, NextResponse } from "next/server"

interface OllamaResponse {
  model: string
  created_at: string
  response: string
  done: boolean
}

interface Message {
  role: "user" | "assistant"
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Format conversation history for Ollama
    const conversationContext = history
      .slice(-10) // Keep last 10 messages for context
      .map((msg: Message) => `${msg.role === "user" ? "Human" : "Assistant"}: ${msg.content}`)
      .join("\n")

    const prompt = conversationContext
      ? `${conversationContext}\nHuman: ${message}\nAssistant:`
      : `Human: ${message}\nAssistant:`

    // Make request to local Ollama instance
    const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "qwen2.5:0.5b",
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          max_tokens: 500,
        },
      }),
    })

    if (!ollamaResponse.ok) {
      throw new Error(`Ollama API error: ${ollamaResponse.status}`)
    }

    const data: OllamaResponse = await ollamaResponse.json()

    return NextResponse.json({
      response: data.response.trim(),
      model: data.model,
      timestamp: data.created_at,
    })
  } catch (error) {
    console.error("Ollama API error:", error)

    // Check if it's a connection error (Ollama not running)
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return NextResponse.json(
        {
          error: "Unable to connect to Ollama. Please ensure Ollama is running locally on port 11434.",
          details: 'Run "ollama serve" to start the Ollama server.',
        },
        { status: 503 },
      )
    }

    return NextResponse.json(
      {
        error: "Failed to get response from AI model",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
