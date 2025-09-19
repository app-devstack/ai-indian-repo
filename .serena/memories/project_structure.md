# Project Structure

## Root Level
```
ai-indian-repo/
├── apps/                 # Applications
│   ├── web/             # Next.js frontend
│   └── server/          # Hono API (Cloudflare Workers)
├── packages/            # Shared packages
│   ├── lib/             # Shared utilities and AI client
│   ├── ui/              # Shared UI components
│   ├── eslint-config/   # ESLint configurations
│   ├── typescript-config/ # TypeScript configurations
│   └── tailwind-config/ # Tailwind CSS config
├── package.json         # Root package.json with workspaces
├── turbo.json          # Turborepo configuration
├── bun.lock           # Bun lockfile
└── README.md          # Project documentation
```

## Apps Structure

### Web App (apps/web)
```
apps/web/src/
├── app/                # Next.js App Router
│   ├── layout.tsx     # Root layout
│   ├── page.tsx       # Home page
│   └── globals.css    # Global styles
├── components/         # Reusable components
│   └── ui/            # Shadcn/ui components
├── features/          # Feature-specific components
│   ├── HomeScreen.tsx # Main app wrapper
│   └── home/          # Home feature components
│       ├── indian.tsx # Main chat component
│       ├── ChatArea.tsx
│       ├── ChatMessage.tsx
│       ├── Header.tsx
│       ├── EngineerStatus.tsx
│       └── MaintenanceScreen.tsx
├── hooks/             # Custom React hooks
│   ├── useChat.ts     # Chat API integration
│   └── use-mobile.ts  # Mobile detection
├── lib/               # Utilities
│   └── utils.ts       # Common utility functions
├── providers/         # React context providers
│   └── QueryProvider.tsx # TanStack Query setup
├── types/             # TypeScript definitions
│   └── chat.ts        # Chat-related types
└── _client/           # API client
    └── fetcher.ts     # HTTP client functions
```

### Server App (apps/server)
```
apps/server/
├── src/
│   └── index.ts       # Main Hono app with routes
├── package.json       # Server dependencies
└── wrangler.toml      # Cloudflare Workers config
```

## Packages Structure

### Shared Library (packages/lib)
```
packages/lib/src/
├── index.ts           # Main exports
├── utils.ts           # Utility functions
├── uuid.ts            # UUID generation
├── GeminiClient.ts    # Google Gemini AI client
└── ai/                # AI-related utilities
```

### UI Package (packages/ui)
```
packages/ui/
├── src/               # UI component source
└── dist/              # Built components
```

## Key Files
- `turbo.json`: Defines build pipeline and caching
- `package.json`: Workspace configuration with Bun
- `.gitignore`: Git ignore patterns
- Individual `package.json` files in each workspace define local dependencies and scripts