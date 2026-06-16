import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// --- Mock Knowledge Base ---
const BANKING_PRODUCTS = [
  { id: 1, name: "SBI Amrit Kalash FD", details: "400 Days tenure at 7.10% interest p.a." },
  { id: 2, name: "SBI Personal Loan", details: "Starting at 11.15% interest - Fast disbursement." },
  { id: 3, name: "SBI Wealth Mutual Fund", details: "Aggressive & Diversified schemes for long term growth." }
];

// --- Guardrail ---
function applyGuardrails(text: string): { allowed: boolean; reason?: string } {
  const forbidden = ["PII", "hack", "bypass", "interest rate 99%"];
  for (const f of forbidden) {
    if (text.toLowerCase().includes(f.toLowerCase())) {
      return { allowed: false, reason: "Security violation detected." };
    }
  }
  return { allowed: true };
}

// --- Agents ---
const agents = {
  growth: (input: string) => `Financial Growth Agent: Analyzing your interest in ${input}. I suggest looking at our ${BANKING_PRODUCTS[0].name} for optimal returns.`,
  onboarding: (input: string) => `Onboarding Agent: Excited to help you! Let's start transforming your request "${input}" into an effortless application. What's your next goal?`,
  fraud: (input: string) => `Fraud Guard Agent: I've scanned your request "${input}". No anomalies detected, but I'm keeping an eye on your secure account status to prevent any unauthorized activity.`
};

// --- Orchestrator ---
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  
  const guard = applyGuardrails(message);
  if (!guard.allowed) return res.json({ response: guard.reason });

  const lower = message.toLowerCase();
  let agentKey: keyof typeof agents = "growth";
  
  if (lower.includes("apply") || lower.includes("open")) agentKey = "onboarding";
  if (lower.includes("fraud") || lower.includes("alert") || lower.includes("security")) agentKey = "fraud";

  const response = agents[agentKey](message);
  res.json({ response, agent: agentKey });
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
