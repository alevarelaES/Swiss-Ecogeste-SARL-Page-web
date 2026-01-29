---
description: Auto-confirm safe browser and command operations
---

# Auto-Confirm Policy

// turbo-all

## Safe Operations to Auto-Run

The following operations should ALWAYS use `SafeToAutoRun: true`:

### Browser Operations
- Scrolling (`window.scrollTo`, `element.scrollIntoView`)
- Taking screenshots
- Reloading pages
- Reading DOM content
- JavaScript that only reads data (no mutations)
- Navigation to localhost URLs
- Window resizing

### Command Operations
- `npm run dev` and development servers
- `npm install` (read-only check)
- Build commands for preview
- Type checking (`tsc --noEmit`)
- Linting commands
- Git status, log, diff (read-only)

### File Operations
- Reading files
- Viewing file outlines
- Searching with grep

## Operations Requiring Confirmation
- Deleting files
- Git commits/push
- Installing new dependencies
- Running arbitrary scripts
- Any destructive database operations
