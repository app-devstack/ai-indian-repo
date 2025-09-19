# Development Commands

## Primary Commands (Run from project root)

### Development
- `bun dev` - Start all development servers (web + server)
- `bun run dev` - Alternative way to start development

### Building
- `bun run build` - Build all packages and applications
- `bun run turbo build` - Explicit Turborepo build

### Code Quality
- `bun run lint` - Run ESLint on all packages
- `bun run check-types` - Run TypeScript type checking
- `bun run format` - Format code with Prettier

## Individual App Commands

### Web App (apps/web)
```bash
cd apps/web
bun dev          # Start Next.js dev server on port 3001
bun build        # Build for production
bun start        # Start production server
bun lint         # Lint web app only
bun check-types  # Type check web app only
```

### Server App (apps/server)
```bash
cd apps/server
bun dev          # Start Cloudflare Workers dev server
bun deploy       # Deploy to Cloudflare Workers
bun cf-typegen   # Generate Cloudflare bindings types
```

### Shared Library (packages/lib)
```bash
cd packages/lib
bun build        # Build TypeScript to dist/
bun dev          # Watch mode for development
bun lint         # Lint library code
bun check-types  # Type check library
```

## System Information
- **Package Manager**: Bun (>= 1.2.14)
- **Node Version**: >= 18
- **Platform**: Linux (WSL2)
- **Git**: Available for version control