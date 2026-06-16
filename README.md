```markdown
<div align="center">
  <h1>🛡️ AegisEngage</h1>
  <p>A modern, full-stack TypeScript web application powered by Vite and integrated with the Google Gemini API.</p>
</div>

---

## 🏗️ Project Architecture & Tech Stack

This project is built as a highly responsive single-repository web application leveraging a lightweight backend proxy to handle secure AI requests.

* **Frontend Framework & Build Tool:** [Vite](https://vite.dev/) — Delivers an ultra-fast local development environment and optimized production bundling.
* **Language:** [TypeScript](https://www.typescriptlang.org/) — Implemented across both client and server files to ensure strict, compile-time type safety.
* **Backend Runtime:** [Node.js](https://nodejs.org/) — Powers the server-side environment.
* **Core AI Engine:** [Google Gemini API](https://ai.google.dev/) — Implements advanced language models to drive the core features of the application.

---

## 📂 Codebase Breakdown

* **`server.ts`**: The backend environment. It acts as a secure proxy that reads your API keys from a protected server environment and forwards requests to Gemini, keeping your credentials safe from the browser.
* **`src/` & `index.html`**: The frontend layer. Contains the user interface layouts, application views, styling, and interactive client-side logic.
* **`vite.config.ts` & `tsconfig.json`**: Management files that configure module bundling, path mapping, and strict TypeScript compilation rules.
* **`package.json`**: Contains scripts and external package manifests required to build and execute the application.

---

## 🔄 How It Works (Data Flow)


```

[ User Browser UI ]
│
▼ (1) User interacts or inputs data
[ Vite Frontend (src/) ]
│
▼ (2) Sends secure request to local backend
[ server.ts ]  <─── Reads key from ─── [ .env.local ]
│
▼ (3) Performs authorized API call
[ Google Gemini API ]

```

---

## 🚀 Getting Started

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation & Setup

1. **Install Dependencies**
   Clone the repository, navigate to the root directory, and install the required packages:
   ```bash
   npm install

```

2. **Configure Environment Variables**
Create a `.env.local` file in the root directory (you can use `.env.example` as a template) and add your Gemini API key:
```env
GEMINI_API_KEY=your_actual_api_key_here

```


3. **Run the Application**
Start the local development server:
```bash
npm run dev

```


Open the local URL provided in your terminal (typically `http://localhost:5173`) to view the application.

```

```
