# Task Completion Checklist

When completing any development task, ensure you run these commands:

## Required Checks (Run from project root)

### 1. Type Checking
```bash
bun run check-types
```
- Ensures no TypeScript errors
- Must pass before considering task complete

### 2. Linting
```bash
bun run lint
```
- Checks code style and potential issues
- Must resolve all warnings (max-warnings 0)

### 3. Formatting
```bash
bun run format
```
- Applies consistent code formatting
- Run before committing changes

### 4. Build Verification
```bash
bun run build
```
- Ensures all packages can build successfully
- Catches build-time errors

## Optional but Recommended

### Test Local Development
```bash
bun dev
```
- Verify changes work in development environment
- Test both web app (port 3001) and server functionality

### For Server Changes
```bash
cd apps/server
bun dev
```
- Test Cloudflare Workers functionality locally
- Verify API endpoints work correctly

## Pre-Commit Process
1. Run all required checks above
2. Ensure no console errors in browser
3. Test core functionality manually
4. Check git status for unintended changes
5. Only commit if all checks pass

## Notes
- The project uses ESLint with `--max-warnings 0`, so all warnings must be resolved
- TypeScript is in strict mode - all type errors must be fixed
- Prettier configuration includes Tailwind CSS plugin for class sorting