# Tech Stack

## Frontend (apps/web)
- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS 4.x
- **UI Components**: Shadcn/ui with Radix UI primitives
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form with Zod validation
- **TypeScript**: Full TypeScript support
- **Package Manager**: Bun

## Backend (apps/server)
- **Framework**: Hono (lightweight web framework)
- **Runtime**: Cloudflare Workers
- **AI Integration**: Google Gemini AI (@google/genai)
- **TypeScript**: ES modules

## Shared Packages
- **@repo/lib**: Shared utilities, AI client, UUID generation
- **@repo/ui**: Shared UI components
- **@repo/eslint-config**: ESLint configurations
- **@repo/typescript-config**: TypeScript configurations
- **@repo/tailwind-config**: Tailwind CSS configurations

## Development Tools
- **Monorepo**: Turborepo for build orchestration
- **Linting**: ESLint with TypeScript support
- **Formatting**: Prettier with Tailwind plugin
- **Type Checking**: TypeScript compiler
- **Development**: Turbopack for fast rebuilds