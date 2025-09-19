# AI Indian Repo - Project Overview

## Purpose
This is a humorous AI chat application called "AI Indian" that simulates conversations with an AI assistant that responds in stereotypical Indian engineer speech patterns. The application includes:

- A chat interface where users can ask questions
- AI responses that use phrases like "Actually...", "Basically...", "Let me explain you properly..."
- A fatigue system where the AI gets "tired" and goes into maintenance mode
- Integration with Google Gemini AI for generating responses
- Fallback to predefined responses when the API fails

## Architecture
- **Frontend**: Next.js React application (apps/web)
- **Backend**: Hono-based API running on Cloudflare Workers (apps/server)
- **Shared**: Common libraries and UI components (packages/*)
- **Monorepo**: Turborepo for managing multiple packages

## Main Features
1. Real-time chat interface with typing indicators
2. AI fatigue system that triggers maintenance mode
3. Fallback response system for API failures
4. Shadcn/ui component library integration
5. TanStack Query for state management
6. Responsive design with Tailwind CSS