# TicketIQ — AI-Powered Support Ticket Management

> A modern, full-stack support ticket dashboard with AI-assisted priority classification and categorization. Built for teams that need a fast, clean interface to manage support requests — from submission to resolution.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://react.dev/)

---

## 🚀 Features

- **AI-powered classification** — Automatically assigns priority and category to tickets using Google Gemini
- **Real-time status updates** — Inline status changes (New → Investigating → Resolved) without a page reload
- **Smart ticket filters** — Filter by status and priority with an instant clear-all
- **Skeleton loaders** — Streaming-style loading states on every data fetch
- **Toast notifications** — Contextual success/error feedback for all actions
- **Responsive design** — Sidebar collapses on mobile; full topbar fallback
- **Form validation** — Inline character counters and blur-triggered error messages
- **Relative timestamps** — Human-readable dates ("Today", "2d ago")

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS v3 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (via Mongoose) |
| **AI** | Google Gemini API (`@google/generative-ai`) |
| **Dev Tools** | Nodemon, ESLint, Vite HMR |

---

## 📦 Installation

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **MongoDB** running locally (or a MongoDB Atlas connection string)
- A **Google Gemini API key** — get one free at [Google AI Studio](https://aistudio.google.com/)

### 1. Clone the repository

```bash
git clone https://github.com/heyysid18/TicketSupportSystem.git
cd TicketSupportSystem
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```bash
cp .env.example .env   # or create it manually — see Environment Variables below
```

### 3. Set up the frontend

```bash
cd ../frontend
npm install
```

---

## ▶️ Usage

### Run both servers (from separate terminals)

**Backend** (runs on port `3000`):

```bash
cd backend
npm run start        # production
# or
npm run dev          # development with hot-reload (nodemon)
```

**Frontend** (runs on port `5173`):

```bash
cd frontend
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

The frontend proxies all `/api` requests to the backend at `localhost:3000` via Vite's built-in proxy.

---

## 📁 Folder Structure

```
TicketSupportSystem/
├── backend/
│   ├── server.js              # Entry point
│   └── src/
│       ├── app.js             # Express app setup, middleware
│       ├── config/            # Database connection
│       ├── controllers/       # Route handlers (ticket logic)
│       ├── middleware/        # Error handler, validators
│       ├── models/            # Mongoose schemas
│       ├── routes/            # Express routers
│       └── services/          # Gemini AI service
│
└── frontend/
    ├── index.html
    ├── tailwind.config.js
    ├── vite.config.js
    └── src/
        ├── App.jsx            # Root layout (sidebar + topbar + content)
        ├── index.css          # Tailwind directives + custom utilities
        ├── components/
        │   ├── ui/
        │   │   ├── Primitives.jsx   # Badge, Button, Input, Textarea, Spinner
        │   │   └── Toast.jsx        # useToast hook + ToastRegion
        │   ├── layout/
        │   │   ├── Sidebar.jsx      # Left nav with live stats
        │   │   └── Header.jsx       # Sticky topbar with CTA
        │   └── tickets/
        │       ├── StatsRow.jsx          # 4 metric cards
        │       ├── TicketTable.jsx       # Full table + filters + skeleton
        │       └── CreateTicketModal.jsx # Create ticket form modal
        ├── hooks/
        │   └── useTickets.js    # Ticket state + API calls
        └── services/
            └── api.js           # Fetch wrapper for all endpoints
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the `backend/` directory with the following keys:

```env
# Server
PORT=3000

# MongoDB — local or Atlas connection string
MONGO_URI=mongodb://localhost:27017/ticketiq

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here
```

> **Note:** Never commit your `.env` file. It is already listed in `.gitignore`.

---

## 📸 Screenshots

| Dashboard | Create Ticket |
|---|---|
| *Sidebar + stats + ticket table* | *Modal form with AI priority selector* |

> Screenshots can be added after running the project locally.

---

## 🚀 Deployment

### Build the frontend for production

```bash
cd frontend
npm run build
```

The output is placed in `frontend/dist/`. You can serve it with any static host (Vercel, Netlify, Render).

### Deploy the backend

The backend is a standard Node.js/Express app. Deploy it to any platform that supports Node.js:

**Render:**
1. Create a new **Web Service** from your repo
2. Set **Build Command** to `cd backend && npm install`
3. Set **Start Command** to `node backend/server.js`
4. Add the environment variables in the Render dashboard

**Environment variables required in production:**

```env
PORT=3000
MONGO_URI=<your MongoDB Atlas connection string>
GEMINI_API_KEY=<your Gemini API key>
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
