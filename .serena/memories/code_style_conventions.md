# Code Style and Conventions

## General Patterns
- **Language**: TypeScript everywhere with strict type checking
- **Module System**: ES modules (`"type": "module"`)
- **Import Style**: Named imports preferred, default exports for components
- **File Extensions**: `.ts` for utilities, `.tsx` for React components

## Component Patterns
- **Function Components**: Preferred over class components
- **Export Style**: `export default function ComponentName()` for main components
- **Props**: Interface definitions for all component props
- **Hooks**: Custom hooks prefixed with `use` (e.g., `useChat`, `useChatMutation`)

## Directory Structure
```
apps/
  web/src/
    app/           # Next.js app router pages
    components/    # Reusable components
      ui/          # Shadcn/ui components
    features/      # Feature-specific components
    hooks/         # Custom React hooks
    lib/           # Utilities
    providers/     # Context providers
    types/         # TypeScript type definitions
    _client/       # API client code
  server/src/      # Hono API routes
packages/
  lib/             # Shared utilities
  ui/              # Shared UI components
```

## Styling Conventions
- **CSS Framework**: Tailwind CSS with utility classes
- **Component Variants**: Class Variance Authority (cva) for component variations
- **Utility Function**: `cn()` function for combining class names
- **Dark Mode**: Built-in support with next-themes

## TypeScript Conventions
- **Interfaces**: PascalCase for interface names
- **Types**: Exported from dedicated `/types` files
- **Strict Mode**: Enabled with `noEmit` for type checking