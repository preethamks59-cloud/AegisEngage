import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// --- Chat Endpoint ---
app.post("/api/chat", async (req, res) => {
  try {
    console.log("Request Body:", JSON.stringify(req.body, null, 2));
    const messages = req.body?.messages;
    if (!messages || !Array.isArray(messages)) {
      console.error("Invalid request: messages array missing or invalid");
      return res.status(400).json({ error: "Invalid request: messages array required" });
    }
    
    // Transform frontend history into Gemini content format
    const contents = messages.map((m: { role: string; text: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: (m.text || "").toString() }]
    }));

    // Using Gemini API with history - using gemini-1.5-pro
    const response = await ai.models.generateContent({
      model: "gemini-1.5-pro",
      contents: contents as any,
      config: {
        systemInstruction: "You are a helpful and professional financial AI assistant for SBI Bank. Provide concise, actionable, and accurate banking advice. Act as a financial guardian and growth partner. Keep responses direct and relevant to the user's inquiry.",
      },
    });

    res.json({ response: response.text || "I'm sorry, I couldn't generate a response." });
  } catch (error: any) {
    console.error("Gemini API Error details:", error);
    if (error?.status === 429) {
      res.status(429).json({ error: "Rate limit exceeded. Please wait a moment and try again." });
    } else {
      res.status(500).json({ error: "Failed to communicate with the AI assistant. Please try again." });
    }
  }
});

async function startServer() {
  // Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
