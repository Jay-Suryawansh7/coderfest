# Dharohar — Preserving India's Cultural Legacy

**Dharohar** (Heritage Pulse) is a comprehensive platform dedicated to discovering, exploring, and preserving India's magnificent cultural heritage. By combining modern web technologies with AI-driven assistance, we aim to build a community of heritage enthusiasts committed to protecting our monuments, traditions, and stories for future generations.

## ✨ Features

-   **Heritage Site Exploration:** Discover heritage sites through an interactive map or detailed list view.
-   **AI Chat Assistant:** "Neo" - A context-aware, RAG-based AI assistant that answers queries about Indian heritage, utilizing a rich knowledge base.
-   **User Authentication:** Secure login and profile management via Clerk.
-   **Rich Content:** Detailed information, images, and historical context for each site.
-   **Responsive Design:** Optimized for both desktop and mobile devices.

## 🛠️ Tech Stack

### Frontend
-   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
-   **Language:** TypeScript
-   **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
-   **Maps:** [Leaflet](https://leafletjs.com/) (React Leaflet)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Authentication:** [Clerk](https://clerk.com/)

### Backend
-   **Runtime:** Node.js
-   **Framework:** [Express.js](https://expressjs.com/)
-   **Database:** PostgreSQL (with potential for Vector extensions)
-   **AI Integration:** OpenRouter (accessing models like Gemini, etc.)
-   **Logging:** Winston

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
-   Node.js >= 18.0.0
-   npm, yarn, or pnpm

### Environment Setup

You will need to configure environment variables for both the frontend and backend.

**1. Frontend (`.env.local`):**
Create a `.env.local` file in the root directory.
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**2. Backend (`backend/.env`):**
Create a `.env` file in the `backend` directory.
```env
PORT=5000
OPENROUTER_API_KEY=your_openrouter_api_key
# Add other backend specific variables here
```

### Installation & Running

**1. Start the Backend:**

```bash
cd backend
npm install
npm run dev
```
The backend server will start on `http://localhost:5000`.

**2. Start the Frontend:**

Open a new terminal in the root directory:

```bash
npm install
npm run dev
```
The frontend application will start on `http://localhost:3000`.

## 📁 Project Structure

-   `/src`: Next.js frontend source code (components, pages/app, services).
-   `/backend`: Express.js backend source code (controllers, routes, services).
-   `/public`: Static assets.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the [MIT License](LICENSE).
