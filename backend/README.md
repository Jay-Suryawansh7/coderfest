# Heritage Pulse Backend API

A Node.js + Express backend API for the Heritage Pulse cultural heritage exploration platform.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment template:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`

5. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Environment & app configuration
│   ├── controllers/     # Request handlers & business logic
│   ├── middleware/      # Express middleware (auth, validation, etc.)
│   ├── models/          # Data schemas & validation
│   ├── routes/          # API endpoint definitions
│   ├── services/        # External API integrations
│   ├── utils/           # Helper functions & utilities
│   └── server.js        # Main application entry point
├── logs/                # Application logs (auto-generated)
├── .env                 # Environment variables (not in git)
├── .env.example         # Environment template
├── .gitignore
├── package.json
└── README.md
```

## 🛣️ API Endpoints

### Health
- `GET /health` - Basic health check
- `GET /health/detailed` - Detailed system info
- `GET /health/ready` - Readiness check
- `GET /health/live` - Liveness check

### Heritage
- `GET /api/heritage` - List heritage sites
- `GET /api/heritage/:id` - Get site by ID
- `GET /api/heritage/search` - Search sites
- `GET /api/heritage/nearby` - Find nearby sites

### Chat
- `POST /api/chat` - Send message, get AI response
- `POST /api/chat/stream` - Stream AI response (SSE)
- `GET /api/chat/history/:conversationId` - Get chat history
- `DELETE /api/chat/history/:conversationId` - Clear history

## 🔧 Scripts

```bash
npm start       # Start production server
npm run dev     # Start development server with hot reload
npm run lint    # Run ESLint
npm test        # Run tests
```

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `OPENROUTER_API_KEY` | OpenRouter API key | - |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |
| `RATE_LIMIT_WINDOW` | Rate limit window (minutes) | 15 |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |

## 📦 Dependencies

### Core
- **express** - Web framework
- **axios** - HTTP client
- **dotenv** - Environment variables
- **cors** - Cross-origin requests
- **helmet** - Security headers

### Validation & Security
- **express-validator** - Input validation
- **rate-limiter-flexible** - Rate limiting

### Logging
- **winston** - Structured logging

## 📝 License

MIT
