# 🛡️ AegisEngage

### Autonomous Multi-Agent AI Banking Engagement Ecosystem

#### SBI Hackathon Submission

---

## 🚀 Overview

AegisEngage is an AI-powered digital banking engagement platform designed for the State Bank of India (SBI). The system leverages a Multi-Agent Architecture, Retrieval-Augmented Generation (RAG), Conversational Banking Interfaces, and Security Guardrails to create personalized, trustworthy, and autonomous customer engagement experiences.

Unlike traditional banking chatbots, AegisEngage intelligently routes customer interactions to specialized AI agents that can:

* Grow customer wealth through personalized recommendations.
* Simplify onboarding journeys through conversational applications.
* Build trust by proactively explaining security and fraud alerts.

The solution demonstrates how SBI can transform digital banking into a proactive, intelligent, and customer-centric ecosystem.

---

# 🎯 Problem Statement

Modern banking customers face three major challenges:

### 1. Product Discovery Complexity

Customers struggle to understand which investment or banking products best suit their needs.

### 2. Lengthy Onboarding Processes

Traditional forms are cumbersome and lead to high abandonment rates.

### 3. Lack of Trust During Fraud Events

Customers often receive cryptic fraud alerts without meaningful explanations.

---

# 💡 Solution

AegisEngage introduces a Multi-Agent AI Framework where specialized banking agents collaborate under a central orchestration layer.

```text
                    ┌─────────────────────┐
                    │     User Query      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Intent Router     │
                    │   (Orchestrator)    │
                    └──────────┬──────────┘
                               │
      ┌────────────────────────┼────────────────────────┐
      ▼                        ▼                        ▼

┌──────────────┐     ┌────────────────┐      ┌────────────────┐
│ Financial    │     │ Onboarding     │      │ Fraud Guard    │
│ Growth Agent │     │ Agent          │      │ Agent          │
└──────┬───────┘     └──────┬─────────┘      └──────┬─────────┘
       │                    │                       │
       └──────────────┬─────┴───────────────┬──────┘
                      ▼
          ┌───────────────────────┐
          │ SBI Knowledge Base    │
          │ Vector Retrieval RAG  │
          └───────────┬───────────┘
                      ▼
          ┌───────────────────────┐
          │ Security Guardrails   │
          │ NeMo-style Filtering  │
          └───────────┬───────────┘
                      ▼
                Final Response
```

---

# 🏗 Architecture

## Backend

### Framework

* Python
* FastAPI
* LangGraph / LangChain

### Components

#### 1. Orchestrator

Responsible for:

* Intent Classification
* Agent Routing
* Workflow Coordination

#### 2. Agent Layer

##### Financial Growth Agent

Responsibilities:

* Analyze banking queries
* Explain investment products
* Simulate returns
* Recommend suitable SBI offerings

##### Onboarding Agent

Responsibilities:

* Conversational KYC
* Product Application Guidance
* Gamified User Journey

##### Fraud Guard Agent

Responsibilities:

* Fraud Alert Explanations
* Security Recommendations
* Trust Building Communication

---

## Knowledge Layer

Mock RAG implementation using:

* PostgreSQL + pgvector (simulated)
* ChromaDB (simulated)

Pre-loaded SBI product catalog:

| Product                 | Details               |
| ----------------------- | --------------------- |
| SBI Amrit Kalash FD     | 400 Days @ 7.10%      |
| SBI Personal Loan       | Starting from 11.15%  |
| SBI Wealth Mutual Funds | Multiple schemes      |
| SBI Savings Account     | Digital onboarding    |
| SBI NRI Services        | International banking |

---

## Security Guardrails

Inspired by NVIDIA NeMo Guardrails.

The guardrail layer intercepts:

### Toxic Content

Example:

```text
Hack SBI accounts
```

Response:

```text
Request blocked by security policy.
```

### PII Exposure

Blocked entities:

* Aadhaar Numbers
* PAN Numbers
* Account Numbers
* IFSC-linked personal records

### Hallucinated Financial Data

If an agent generates:

```text
SBI FD gives 15% interest
```

Guardrail automatically rejects the response.

---

# 🤖 Agent Design

## Agent 1: Financial Growth Agent

### Objective

Help customers grow wealth.

### Tools

* Investment Calculator
* Product Recommender
* SBI Product Search

### Sample Query

```text
Where should I invest ₹2 Lakhs?
```

### Output

```text
Based on SBI offerings, SBI Amrit Kalash FD
offers 7.10% interest over 400 days.
Estimated maturity amount: ₹2,15,500
```

---

## Agent 2: Onboarding Agent

### Objective

Convert forms into conversations.

### Sample Query

```text
I want to open an account.
```

### Conversational Flow

```text
Step 1:
Are you an Indian Resident?

Step 2:
Choose account type.

Step 3:
Upload PAN.

Step 4:
Complete Video KYC.
```

---

## Agent 3: Fraud Guard Agent

### Objective

Build customer trust.

### Sample Query

```text
Why was my transaction blocked?
```

### Response

```text
A high-value transaction was detected
from a new device location.

For your protection, SBI temporarily
held the transaction for verification.
```

---

# 🎨 Frontend

Built using:

* React.js
* Tailwind CSS
* Responsive Components

### Features

✅ Banking Dashboard

✅ Asset Summary

✅ Product Recommendations

✅ Conversational Drawer

✅ Voice/Text Assistant

✅ CTA Buttons

Example:

```text
Open Account with 1-Click
Apply for Personal Loan
Start Investment Journey
```

---

# 📂 Project Structure

```text
AegisEngage/
│
├── backend/
│   ├── agents.py
│   ├── main.py
│
├── frontend/
│   ├── App.jsx
│
├── README.md
│
└── requirements.txt
```

---

# ⚙️ Installation

## Backend

```bash
cd backend

python -m venv venv

source venv/bin/activate
# Windows:
venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend URL:

```text
http://localhost:8000
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# 🔄 API Flow

### Request

```json
POST /chat

{
  "message":"I want to invest 5 lakhs"
}
```

### Processing

```text
User Query
   ↓
Intent Detection
   ↓
Agent Selection
   ↓
Knowledge Retrieval
   ↓
Security Validation
   ↓
Response Generation
```

### Response

```json
{
  "agent":"Financial Growth Agent",
  "response":"Recommended SBI Amrit Kalash FD...",
  "cta":"Start Investment Journey"
}
```

---

# 🎬 Demo Scenario

### Scenario 1: Investment Advisory

Input:

```text
I have ₹5 lakh to invest.
```

Agent:

```text
Financial Growth Agent
```

Output:

```text
Investment recommendation
+
Return simulation
+
CTA button
```

---

### Scenario 2: New Customer

Input:

```text
Open a savings account.
```

Agent:

```text
Onboarding Agent
```

Output:

```text
Interactive onboarding questionnaire
```

---

### Scenario 3: Security Alert

Input:

```text
Why was my card transaction declined?
```

Agent:

```text
Fraud Guard Agent
```

Output:

```text
Fraud explanation
+
Security guidance
```

---

# 🌟 Innovation Highlights

### Multi-Agent Banking AI

Specialized banking experts rather than one generic chatbot.

### Conversational Banking

Transforms complex banking workflows into natural dialogue.

### Explainable Fraud Intelligence

Improves trust through transparent communication.

### Guardrail-Driven Compliance

Reduces hallucinations and unsafe outputs.

### Future Ready

Designed for:

* SBI YONO
* SBI WhatsApp Banking
* SBI Contact Center AI
* SBI Branch Assistants

---

# 🔮 Future Enhancements

* Real SBI API Integrations
* Voice Biometrics
* Regional Language Support
* Customer Digital Twin
* Personalized Financial Journey Mapping
* Real-time Fraud Monitoring
* Human Agent Escalation

---

# 👨‍💻 Team

SBI Hackathon Submission

Project: AegisEngage

"Autonomous AI Agents Transforming Digital Banking Engagement"

---

## License

MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files.
