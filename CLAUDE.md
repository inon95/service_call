# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Concierge AI is a luxury hotel management and conversational AI platform for "The 1898 Niseko" hotel in Hokkaido, Japan. Built with Next.js 16 (App Router), it integrates voice AI providers (VAPI, ElevenLabs), Twilio for telephony, and multi-role staff management.

## Commands

```bash
npm run dev              # Start dev server (Turbopack, port 4024)
npm run build            # Production build (ignores TS/ESLint errors)
npm run lint             # Run ESLint
npm run tunnel:quick     # Start ngrok tunnel for webhook testing
npm run tunnel:setup     # Setup Cloudflare tunnel
npm run tunnel:start     # Start Cloudflare tunnel
npm run tunnel:update-vapi  # Update VAPI with tunnel URL
```

Testing voice integrations without microphone:
```bash
npx tsx scripts/test-vapi-chat.ts "Your message"
npx tsx scripts/test-elevenlabs-chat.ts "Your message"
```

## Architecture

### Voice AI Flow
```
User speaks → VAPI/ElevenLabs (STT) → Webhook POST to /api/{vapi|elevenlabs}-webhook
    → Forward to AI Agent API → Response back via Live Call Control → TTS → User hears response
```

### Data Layer
All data stored as JSON files in `/data/` directory (guests.json, staff.json, properties.json, reservations.json, products.json, services.json, tasks.json). API routes use `fs.promises` for read/write operations.

### Key Directories
- `/app/api/` - Next.js API routes (webhooks, CRUD endpoints, integrations)
- `/app/components/` - React components (VapiButton, ElevenLabsButton, ChatUI, SlidePresentation)
- `/app/agents/` - Agent-specific UI portals (guests, operations, revenue, architect)
- `/app/admin/` - Staff portal dashboard
- `/app/hooks/` - Custom hooks (useAuth, useSlideSync)
- `/app/store/` - Zustand stores (slideStore)
- `/app/utils/` - Utilities including structured logger
- `/scripts/` - Setup and test scripts for voice integrations
- `/lib/` - Shared utilities (translations for en/zh/ja/ru, language store)
- `/docs/` - Integration guides and best practices

### State Management
- Client: Zustand for slide presentation state
- Server: In-memory Maps in API routes for active sessions

### Authentication
Client-side localStorage tokens (`niseko_authenticated`, `niseko_role`, `guest_authenticated`). The `useAuth` hook checks on mount and redirects to /login if needed.

## Key Integration Points

### VAPI Webhook (`/app/api/vapi-webhook/route.ts`)
Handles voice tool calls and Chat API. Supports async execution with background processing and periodic status updates via Live Call Control `/say` endpoint.

### ElevenLabs Webhook (`/app/api/elevenlabs-webhook/route.ts`)
Simpler webhook format. Tool name: `query_integration_expert`.

### Agent Hub API Pattern
```typescript
POST /assistant/{agentId}/execute
Body: { userInput: "...", sessionId?: "...", systemPromptOverride?: "..." }
Response: { content: "..." | response: "..." }
```

## TypeScript Configuration
- Target: ES2017, Strict mode enabled
- Path alias: `@/*` maps to project root
- Build ignores TypeScript and ESLint errors (see next.config.ts)

## Environment Variables

Required in `.env`:
```
NEXT_PUBLIC_VAPI_PUBLIC_KEY, VAPI_PRIVATE_KEY, NEXT_PUBLIC_VAPI_ASSISTANT_ID
ELEVENLABS_API_KEY, NEXT_PUBLIC_ELEVENLABS_AGENT_ID
AI_AGENT_API_URL, AI_AGENT_API_KEY, AI_AGENT_ID
AGENT_HUB_API_URL, AGENT_HUB_API_KEY
OPENAI_API_KEY (for Realtime API)
```

## Code Patterns

### API Routes
```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  return NextResponse.json({ ... }, { headers: corsHeaders })
}
```

### Client Components
Always add `'use client'` directive at top. Use `useRouter` from `next/navigation`.

### CORS (for webhooks)
```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}
```

### Logging
Use `/app/utils/logger.ts` for structured logging:
```typescript
import { logger } from '@/app/utils/logger'
logger.info('category', 'message', data)
logger.vapiWebhook(sessionId, payload)
```
