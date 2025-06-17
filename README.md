# 🚀 StartupSpotter

**StartupSpotter** is an AI-powered full-stack web app that helps aspiring entrepreneurs discover the best microbusiness to start based on their budget, location, and local demand trends.

---

## 🌐 Tech Stack

| Layer        | Tech                                 |
|--------------|--------------------------------------|
| Frontend     | React + TypeScript (Vite)            |
| Backend      | Express.js (TypeScript)              |
| Database     | MongoDB + Mongoose                   |
| AI Engine    | Google ADK Agents (Python + FastAPI) |
| Communication| Axios (React → Express → FastAPI)    |

---

## 📂 Directory Structure

```bash
.
├── client/                  # React frontend
├── server/
│   ├── src/
│   │   ├── routes/          # Express routes (startup.ts, search.ts)
│   │   └── models/          # Mongoose models (Startup.ts)
│   ├── index.ts             # Entry point
│   ├── app.ts               # Express app setup
│   ├── .env                 # Contains MONGO_URI, AGENT_SERVER_URL, PORT
│   └── dist/                # Compiled JS output
└── agents/                  # Python FastAPI + Google ADK setup
    ├── agent_server.py      # FastAPI endpoints
    └── all agent logic...   # ADK agents, handlers, session logic
```

---

## ⚙️ Setup Instructions

### 1. 🛠️ Install dependencies

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

---

### 2. 📦 Set up `.env` (in `/server`)

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/startupspotter
AGENT_SERVER_URL=http://localhost:8000
```

---

### 3. 🔌 Start Agent Server (Python)

```bash
# From project root or agents directory
uvicorn agent_server:app --host 0.0.0.0 --port 8000
```

---

### 4. 🧪 Start Dev Server (Express backend)

```bash
cd server
npm run dev
```

---

### 5. ⚛️ Start Frontend

```bash
cd client
npm run dev
```

---

## 🧪 Test the API

Start a session:

```bash
curl -X POST http://localhost:3000/api/startup/start_session      -H "Content-Type: application/json"      -d '{"user_id": "Kyle_Law"}'
```

Run the agent:

```bash
curl -X POST http://localhost:3000/api/search      -H "Content-Type: application/json"      -d '{"session_id": "<your-session-id>", "query": "What businesses can I start?"}'
```

---

## 💡 Features

- Multi-agent reasoning via Google ADK
- Full MongoDB persistence of startup data
- Custom user session management
- Clean API bridge (Axios from frontend → backend → Python)
- Modular and scalable agent architecture

---

## 🧑‍💻 Authors

Kyle Law, Vivaan Rajesh
[StartupSpotter AI Project]