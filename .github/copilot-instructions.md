## Quick orientation for AI coding agents

This repo is a small Socket.io-based chat app (Express + MongoDB backend, React frontends). Below are the essential facts, run/debug commands, and concrete examples you can rely on when making edits.

### Big picture
- Backend: `letschat-backend/server.js` — Express app that attaches a Socket.io server and exposes REST routes under `/api/*` (see `routes/auth.js`).
- Socket handlers: `letschat-backend/socket/socketHandlers.js` — central place for socket event handling (joins, messaging, typing, read receipts).
- Data models: `letschat-backend/models/User.js` and `letschat-backend/models/Message.js` (use these when changing message/user shapes).
- Frontend: there are two frontends in the tree:
  - `letschat-frontend/` — React app that the assignment uses (see `src/context/SocketContext.js` and `src/pages/Chat.js`).
  - `client/` — older/starter client code (contains `src/socket/socket.js`). Prefer `letschat-frontend` when changing UI.

### How to run / debug (explicit)
- Install dependencies in both backend and frontend folders before running: `npm install` in each folder.
- Backend: there is no "dev" script in `letschat-backend/package.json`. Useful commands:
  - Run once: `node server.js`
  - With auto-reload (if `nodemon` is installed locally): `npx nodemon server.js`
  - To add a script (optional): add to package.json `"start": "node/server.js", "dev": "nodemon server.js"` then `npm run dev`.
- Frontend (`letschat-frontend`): standard CRA scripts are present. From `letschat-frontend` run:
  - `npm start` — dev server (React)
  - `npm run build` — production build

### Important env vars
- Backend: `MONGODB_URI`, `CLIENT_URL`, `PORT`, `JWT_SECRET` (read in `letschat-backend/server.js` and `routes/auth.js`).
- Frontend: `REACT_APP_SERVER_URL` (used by `SocketContext`) or `VITE_SOCKET_URL` (alternate client implementation in `client/`).

### Socket/REST integration patterns (copyable examples)
- send message (backend expects):
  - Event: `sendMessage`
  - Payload: `{ senderId, receiverId, content }`
  - Backend saves `Message` (see `models/Message.js`) and emits `newMessage` to the receiver: `io.to(receiverId).emit('newMessage', message);`
- typing indicators:
  - Events emitted by frontend: `typingStart` / `typingStop` with `{ senderId, receiverId }`
  - Backend relays via `socket.to(receiverId).emit('userTyping', { userId: senderId, isTyping: true/false })`
- read receipts:
  - Frontend emits `markAsRead` -> backend updates `Message.isRead` and emits `messageRead` back to sender.

### Files to open when making changes
- Backend entry: `letschat-backend/server.js`
- Socket behavior: `letschat-backend/socket/socketHandlers.js`
- Auth endpoints: `letschat-backend/routes/auth.js`
- Models: `letschat-backend/models/User.js`, `letschat-backend/models/Message.js`
- Main frontend Socket provider: `letschat-frontend/src/context/SocketContext.js`
- Chat UI and event wiring: `letschat-frontend/src/pages/Chat.js`, `letschat-frontend/src/components/MessageList.js`

### Project-specific conventions & gotchas
- Two frontends exist; prefer `letschat-frontend/` for UI changes. The `client/` folder contains a different socket helper (`client/src/socket/socket.js`) — compare before copy/paste.
- Socket event names differ slightly across client implementations (`send_message` vs `sendMessage`, etc.). Use the code in `letschat-frontend/src/context/SocketContext.js` and `letschat-backend/socket/socketHandlers.js` as the canonical source for event names when editing both sides.
- Backend `package.json` doesn't include start/dev scripts — don't assume `npm run dev` exists.

### Quick debugging tips
- If `npm run dev` fails with "Missing script: dev", run `node server.js` or `npx nodemon server.js` from `letschat-backend/`, or add the scripts to package.json.
- Socket connection issues: check matching event names and that the frontend is using the same server URL env var (`REACT_APP_SERVER_URL` or `VITE_SOCKET_URL`).
- Check DB connectivity: backend logs show Mongoose connection attempts; confirm `MONGODB_URI` or a running local MongoDB instance.

If anything here is unclear or you want a different level of detail (for example, automatic script additions or a short runbook), tell me which parts to expand and I'll update this file.
