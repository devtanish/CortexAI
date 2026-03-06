<div align="center">

# 🧠 CortexAI

### An intelligent, full-stack AI chat application powered by OpenAI — with persistent conversation history, multi-session support, and a clean modern UI.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-SDK-412991?style=for-the-badge&logo=openai)](https://openai.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

---

**[Live Demo](#)** · **[Report a Bug](issues)** · **[Request a Feature](issues)**

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Reference](#-api-reference)
- [Data Flow Diagram](#-data-flow-diagram)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Frontend Deep Dive](#-frontend-deep-dive)
- [Backend Deep Dive](#-backend-deep-dive)
- [Persistence & Conversation Memory](#-persistence--conversation-memory)
- [State Management with Recoil](#-state-management-with-recoil)
- [Input Validation with Zod](#-input-validation-with-zod)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔍 Overview

**CortexAI** is a production-grade, ChatGPT-like conversational AI platform. Users can start conversations, ask questions, and receive intelligent responses powered by the OpenAI API — just like ChatGPT.

What makes CortexAI special:

> 💾 **Persistent Memory** — Every conversation is stored in a PostgreSQL database via Prisma ORM. When the server restarts, **all conversations and their full message history are retained** — nothing is lost.

> 🗂️ **Multi-Session Support** — Users can manage multiple independent chat sessions, switch between them, and resume exactly where they left off.

> ⚡ **Real-time Feel** — The frontend is built with Next.js and Recoil.js for blazing-fast, reactive state updates without unnecessary re-renders.

---

## ✨ Key Features

| Feature | Description |
|--------|-------------|
| 💬 **AI Chat** | Send messages and receive responses from OpenAI's GPT models |
| 🗃️ **Persistent Conversations** | Full chat history stored in PostgreSQL — survives server restarts |
| 🔁 **Multi-turn Context** | Each API call includes full conversation history for contextual replies |
| 🗂️ **Multiple Chat Sessions** | Create, rename, delete, and switch between conversations |
| ✅ **Input Validation** | All API inputs validated with Zod schemas before processing |
| 🎨 **Clean UI** | Built with ShadCN components for a polished, accessible interface |
| 🌐 **CORS Configured** | Secure cross-origin request setup between frontend and backend |
| 📦 **Modular Architecture** | Clean separation of concerns across routes, services, and controllers |

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                          │
│                                                                  │
│   ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐   │
│   │  Next.js    │◄──►│  Recoil.js   │◄──►│  ShadCN (UI)     │   │
│   │  (Pages /   │    │  (Global     │    │  (Components)    │   │
│   │   App Router│    │   State)     │    │                  │   │
│   └──────┬──────┘    └──────────────┘    └──────────────────┘   │
│          │  HTTP Requests (Axios)                                │
└──────────┼───────────────────────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────────────────────────┐
│                     BACKEND (Node.js / Express)                  │
│                                                                  │
│   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌────────────┐  │
│   │  CORS    │──►│  Routes  │──►│  Zod     │──►│ Controllers│  │
│   │Middleware│   │          │   │Validation│   │  (Logic)   │  │
│   └──────────┘   └──────────┘   └──────────┘   └─────┬──────┘  │
│                                                       │         │
│                        ┌──────────────────────────────┤         │
│                        ▼                              ▼         │
│                ┌──────────────┐              ┌──────────────┐   │
│                │  OpenAI SDK  │              │  Prisma ORM  │   │
│                │  (GPT calls) │              │  (DB Layer)  │   │
│                └──────────────┘              └──────┬───────┘   │
└───────────────────────────────────────────────────────────────── ┘
                                                       │
                                                       ▼
                                          ┌────────────────────────┐
                                          │   PostgreSQL Database  │
                                          │                        │
                                          │  conversations         │
                                          │  messages              │
                                          └────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose | Why We Use It |
|-----------|---------|---------------|
| **Next.js 14** | React framework with App Router | SSR, routing, optimized performance |
| **Recoil.js** | Global state management | Atomic state model, avoids prop drilling |
| **ShadCN/UI** | Component library | Accessible, customizable, Tailwind-based |
| **Axios** | HTTP client | Promise-based, interceptors, easy error handling |
| **TypeScript** | Type safety | Catches bugs at compile time |

### Backend

| Technology | Purpose | Why We Use It |
|-----------|---------|---------------|
| **Node.js** | JavaScript runtime | Non-blocking I/O, great for chat APIs |
| **Express.js** | Web framework | Lightweight, flexible routing |
| **OpenAI SDK** | AI model integration | Official SDK for GPT-4 / GPT-3.5 |
| **Prisma ORM** | Database interface | Type-safe queries, migrations, easy schema |
| **PostgreSQL** | Relational database | Reliable, ACID-compliant persistence |
| **Zod** | Input validation | Schema-first validation, TypeScript-native |
| **CORS** | Cross-origin policy | Secure frontend ↔ backend communication |
| **Axios** | HTTP (optional internal) | For any third-party API calls from backend |

---

## 📁 Project Structure

```
cortexai/
│
├── frontend/                          # Next.js Application
│   ├── app/
│   │   ├── layout.tsx                 # Root layout with Recoil provider
│   │   ├── page.tsx                   # Home / redirect to chat
│   │   └── chat/
│   │       ├── page.tsx               # Main chat page
│   │       └── [conversationId]/
│   │           └── page.tsx           # Dynamic conversation route
│   │
│   ├── components/
│   │   ├── ui/                        # ShadCN auto-generated components
│   │   ├── ChatWindow.tsx             # Main chat display area
│   │   ├── MessageBubble.tsx          # Individual message component
│   │   ├── InputBar.tsx               # Message input + send button
│   │   ├── Sidebar.tsx                # Conversation list sidebar
│   │   └── ConversationItem.tsx       # Single conversation in sidebar
│   │
│   ├── recoil/
│   │   ├── atoms/
│   │   │   ├── conversationsAtom.ts   # List of all conversations
│   │   │   ├── activeConversationAtom.ts # Currently open conversation
│   │   │   └── messagesAtom.ts        # Messages in active conversation
│   │   └── selectors/
│   │       └── conversationSelectors.ts
│   │
│   ├── lib/
│   │   └── axios.ts                   # Axios instance with base URL
│   │
│   ├── types/
│   │   └── index.ts                   # Shared TypeScript types
│   │
│   └── .env.local                     # Frontend environment variables
│
├── backend/                           # Node.js / Express Application
│   ├── src/
│   │   ├── index.ts                   # Entry point, Express app setup
│   │   ├── routes/
│   │   │   ├── conversation.routes.ts # /api/conversations routes
│   │   │   └── message.routes.ts      # /api/messages routes
│   │   │
│   │   ├── controllers/
│   │   │   ├── conversation.controller.ts
│   │   │   └── message.controller.ts
│   │   │
│   │   ├── services/
│   │   │   ├── openai.service.ts      # OpenAI SDK wrapper
│   │   │   └── conversation.service.ts
│   │   │
│   │   ├── validators/
│   │   │   ├── conversation.schema.ts # Zod schemas for conversations
│   │   │   └── message.schema.ts      # Zod schemas for messages
│   │   │
│   │   ├── middleware/
│   │   │   ├── validate.ts            # Zod validation middleware
│   │   │   └── errorHandler.ts        # Global error handler
│   │   │
│   │   └── lib/
│   │       └── prisma.ts              # Prisma client singleton
│   │
│   ├── prisma/
│   │   ├── schema.prisma              # Database models
│   │   └── migrations/                # Auto-generated migrations
│   │
│   └── .env                           # Backend environment variables
│
├── docker-compose.yml                 # PostgreSQL via Docker
└── README.md
```

---

## 🗄️ Database Schema

CortexAI uses **two core models** in PostgreSQL, managed by Prisma:

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Represents a single chat session (like a "chat" in ChatGPT sidebar)
model Conversation {
  id        String    @id @default(cuid())
  title     String    @default("New Conversation")
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  messages  Message[]
}

// Represents a single message within a conversation
model Message {
  id             String       @id @default(cuid())
  role           String       // "user" | "assistant"
  content        String       @db.Text
  createdAt      DateTime     @default(now())

  conversationId String
  conversation   Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)
}
```

### Entity Relationship Diagram

```
┌─────────────────────┐         ┌──────────────────────────┐
│    Conversation      │         │         Message           │
│─────────────────────│         │──────────────────────────│
│ id (PK, cuid)       │◄────────│ id (PK, cuid)            │
│ title               │  1 : N  │ role (user | assistant)  │
│ createdAt           │         │ content (TEXT)           │
│ updatedAt           │         │ createdAt                │
└─────────────────────┘         │ conversationId (FK)      │
                                └──────────────────────────┘
```

> 🔁 **onDelete: Cascade** — Deleting a conversation automatically deletes all its messages.

---

## 📡 API Reference

### Base URL
```
http://localhost:5000/api
```

---

### Conversations

#### `GET /conversations`
Fetch all conversations (sidebar list).

**Response:**
```json
[
  {
    "id": "clx1abc...",
    "title": "How does black holes work?",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:45:00Z"
  }
]
```

---

#### `POST /conversations`
Create a new conversation session.

**Request Body:**
```json
{
  "title": "New Conversation"  // optional
}
```

**Response:** `201 Created`
```json
{
  "id": "clx1xyz...",
  "title": "New Conversation",
  "createdAt": "2024-01-15T11:00:00Z",
  "updatedAt": "2024-01-15T11:00:00Z",
  "messages": []
}
```

---

#### `GET /conversations/:id`
Fetch a specific conversation with **all its messages** (used to restore chat history).

**Response:**
```json
{
  "id": "clx1abc...",
  "title": "How does black holes work?",
  "messages": [
    { "id": "msg1", "role": "user", "content": "What is a black hole?", "createdAt": "..." },
    { "id": "msg2", "role": "assistant", "content": "A black hole is...", "createdAt": "..." }
  ]
}
```

---

#### `DELETE /conversations/:id`
Delete a conversation and all its messages (cascade delete).

**Response:** `204 No Content`

---

### Messages

#### `POST /messages`
Send a user message, store it, call OpenAI with full history, store AI reply, and return the AI response.

**Request Body:**
```json
{
  "conversationId": "clx1abc...",
  "content": "Explain quantum entanglement simply."
}
```

**Response:** `201 Created`
```json
{
  "userMessage": {
    "id": "msg3",
    "role": "user",
    "content": "Explain quantum entanglement simply.",
    "createdAt": "..."
  },
  "assistantMessage": {
    "id": "msg4",
    "role": "assistant",
    "content": "Quantum entanglement is when two particles...",
    "createdAt": "..."
  }
}
```
## 🧪 Testing with Postman

### Setup
Open Postman → **New → Collection** → name it `CortexAI`.

---

### Test each route in order:

#### 1. Create a Conversation
```
Method: POST
URL:    http://localhost:5000/api/conversations
Body:   raw → JSON

{
  "title": "Test Chat"
}
```
> Copy the `id` from the response — you'll need it for the next requests.

---

#### 2. Get All Conversations
```
Method: GET
URL:    http://localhost:5000/api/conversations
```

---

#### 3. Get One Conversation
```
Method: GET
URL:    http://localhost:5000/api/conversations/PASTE_ID_HERE
```

---

#### 4. Send a Message
```
Method: POST
URL:    http://localhost:5000/api/messages
Body:   raw → JSON

{
  "conversationId": "PASTE_ID_HERE",
  "content": "What is a black hole?"
}
```
> This is the big one — it hits OpenRouter and returns the AI reply.

---

#### 5. Delete a Conversation
```
Method: DELETE
URL:    http://localhost:5000/api/conversations/PASTE_ID_HERE
```

---

### 💡 Tips
- Always set `Content-Type: application/json` in **Headers** for POST requests — Postman does this automatically when you select `raw → JSON`
- Run requests **in order** — create conversation first, then send message
- If you get a `400`, your JSON body is wrong — check the Zod validation error in the response for details
- If you get a `500`, check your terminal where the backend is running for the actual error

---

## 🔄 Data Flow Diagram

How a single user message travels through the system:

```
User types message
        │
        ▼
[ InputBar.tsx (Frontend) ]
  - Reads input value
  - Dispatches to Recoil atom (optimistic UI update)
  - Calls POST /api/messages via Axios
        │
        ▼
[ Express Router → Zod Validator ]
  - Validates: conversationId exists, content is non-empty string
  - Rejects with 400 if invalid
        │
        ▼
[ Message Controller ]
  - Saves user message to DB via Prisma
  - Fetches full conversation history from DB
        │
        ▼
[ OpenAI Service ]
  - Builds messages array:
    [{ role: "user", content: "..." }, { role: "assistant", content: "..." }, ...]
  - Sends to openai.chat.completions.create()
  - Receives AI response
        │
        ▼
[ Message Controller (continued) ]
  - Saves AI response to DB via Prisma
  - Returns both messages in response
        │
        ▼
[ Frontend receives response ]
  - Updates Recoil atom with confirmed messages
  - ChatWindow re-renders with new messages
        │
        ▼
User sees AI reply ✅
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** `>= 18.x` — [Download](https://nodejs.org/)
- **npm** or **pnpm** `>= 8.x`
- **PostgreSQL** `>= 14` — or use Docker (recommended)
- **OpenAI API Key** — [Get one here](https://platform.openai.com/api-keys)

---

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/cortexai.git
cd cortexai
```

**2. Install Backend Dependencies**
```bash
cd backend
npm install
```

**3. Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

**4. Set up PostgreSQL with Docker (Recommended)**
```bash
# From project root
docker-compose up -d
```

Or if you have PostgreSQL installed locally, create the database:
```bash
psql -U postgres -c "CREATE DATABASE cortexai;"
```

**5. Set up the database with Prisma**
```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

---

### Environment Variables

**Backend** — create `backend/.env`:
```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/cortexai"

# OpenAI
OPENAI_API_KEY="sk-..."
OPENAI_MODEL="gpt-4o"          # or gpt-3.5-turbo

# Server
PORT=5000
NODE_ENV=development
```

**Frontend** — create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
```

---

### Running the App

**Start the Backend:**
```bash
cd backend
npm run dev
# Server starts at http://localhost:5000
```

**Start the Frontend:**
```bash
cd frontend
npm run dev
# App starts at http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🎉

---

## 🎨 Frontend Deep Dive

### Next.js App Router

CortexAI uses the **Next.js 14 App Router** for clean, nested routing:

```
app/
├── layout.tsx              → Wraps everything in <RecoilRoot>
├── page.tsx                → Redirects to /chat
└── chat/
    ├── page.tsx            → Shows empty state / new chat prompt
    └── [conversationId]/
        └── page.tsx        → Loads specific conversation from API
```

When a user navigates to `/chat/clx1abc...`, Next.js:
1. Renders the dynamic `[conversationId]` page
2. The component fetches conversation + messages from the backend
3. Hydrates the Recoil `activeConversationAtom` and `messagesAtom`
4. The `ChatWindow` renders all messages

### ShadCN UI Components Used

| Component | Used For |
|-----------|----------|
| `Button` | Send message, new chat, delete |
| `Input` | Message text input |
| `ScrollArea` | Chat message scrollable container |
| `Skeleton` | Loading placeholders |
| `Tooltip` | Icon button labels |
| `AlertDialog` | Confirm conversation delete |
| `Separator` | Sidebar visual dividers |

---

## ⚙️ Backend Deep Dive

### Request Lifecycle

Every request through the Express backend goes through this exact pipeline:

```
Incoming Request
      │
      ▼
CORS Middleware          → Allow requests from http://localhost:3000
      │
      ▼
JSON Body Parser         → Parse request body
      │
      ▼
Route Matcher            → Match to correct router
      │
      ▼
Zod Validate Middleware  → Validate body against schema
      │
      ▼
Controller               → Business logic
      │
      ▼
Prisma / OpenAI          → DB operations or AI call
      │
      ▼
JSON Response            → Send back to client
```

### OpenAI Multi-turn Context

The most important backend logic — **how conversation memory works with OpenAI**:

```typescript
// services/openai.service.ts

export async function getChatResponse(messages: Message[]) {
  // Convert DB messages to OpenAI format
  const formattedMessages = messages.map((msg) => ({
    role: msg.role as "user" | "assistant",
    content: msg.content,
  }));

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o",
    messages: [
      {
        role: "system",
        content: "You are CortexAI, a helpful and intelligent assistant.",
      },
      ...formattedMessages, // ← Full history sent every time!
    ],
  });

  return response.choices[0].message.content;
}
```

> ⚠️ **Why full history?** OpenAI's API is stateless — it has no memory between calls. By sending the entire conversation history on each request, we give GPT the context it needs to provide coherent, contextual responses — exactly like ChatGPT does.

---

## 💾 Persistence & Conversation Memory

This is the core feature that separates CortexAI from a simple chatbot.

### How Persistence Works

```
User sends message "What is relativity?"
          │
          ▼
Backend saves to PostgreSQL:
  Message { role: "user", content: "What is relativity?", conversationId: "..." }
          │
          ▼
Backend fetches ALL messages for this conversation from PostgreSQL
          │
          ▼
Sends full history to OpenAI → gets response
          │
          ▼
Backend saves AI response to PostgreSQL:
  Message { role: "assistant", content: "Relativity is...", conversationId: "..." }
          │
          ▼
Server restarts... user comes back...
          │
          ▼
Frontend calls GET /conversations/:id
          │
          ▼
Prisma fetches ALL messages from PostgreSQL (they're all still there!)
          │
          ▼
User sees their full conversation history ✅
```

This is the key difference: **PostgreSQL is the source of truth**, not browser memory or server RAM. No matter how many times the server restarts, all conversations are safe.

---

## 🔮 State Management with Recoil

Recoil uses an **atomic model** — state is broken into small, independent pieces called atoms.

```typescript
// recoil/atoms/conversationsAtom.ts
export const conversationsAtom = atom<Conversation[]>({
  key: "conversationsAtom",
  default: [],
});

// recoil/atoms/activeConversationAtom.ts
export const activeConversationAtom = atom<string | null>({
  key: "activeConversationAtom",
  default: null,
});

// recoil/atoms/messagesAtom.ts
export const messagesAtom = atom<Message[]>({
  key: "messagesAtom",
  default: [],
});
```

### Why Recoil over Redux or Zustand?

| Feature | Recoil | Redux | Zustand |
|---------|--------|-------|---------|
| Boilerplate | Low ✅ | High ❌ | Low ✅ |
| React-native | Yes ✅ | No ❌ | Yes ✅ |
| Async selectors | Built-in ✅ | Middleware needed | Manual |
| DevTools | Yes ✅ | Yes ✅ | Limited |
| Learning curve | Low ✅ | High ❌ | Low ✅ |

Recoil's **async selectors** are perfect for fetching conversations on mount without extra boilerplate.

---

## 🛡️ Input Validation with Zod

All incoming API data is validated using **Zod schemas** before any business logic runs.

```typescript
// validators/message.schema.ts
import { z } from "zod";

export const sendMessageSchema = z.object({
  conversationId: z.string().cuid({ message: "Invalid conversation ID format" }),
  content: z
    .string()
    .min(1, { message: "Message cannot be empty" })
    .max(4000, { message: "Message too long (max 4000 characters)" }),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;
```

```typescript
// middleware/validate.ts
import { AnyZodObject } from "zod";

export const validate = (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: result.error.flatten().fieldErrors,
      });
    }
    req.body = result.data; // Use parsed/typed data downstream
    next();
  };
```

Example error response when validation fails:
```json
{
  "error": "Validation failed",
  "details": {
    "content": ["Message cannot be empty"],
    "conversationId": ["Invalid conversation ID format"]
  }
}
```

---

## 📸 Screenshots

> _Add screenshots here after first deployment_

| Chat Interface | Sidebar | Mobile View |
|---------------|---------|-------------|
| ![Chat]() | ![Sidebar]() | ![Mobile]() |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get involved:

1. **Fork** the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a **Pull Request**

Please make sure your code:
- Passes TypeScript checks (`tsc --noEmit`)
- Follows the existing file/folder naming conventions
- Includes Zod validation for any new API endpoints
- Has no console errors in the browser

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

<div align="center">

Built with ❤️ by the CortexAI Team

⭐ Star this repo if you found it helpful!

</div>