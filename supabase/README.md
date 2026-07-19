# Supabase Image Upload

A monorepo-style image upload app using Supabase S3-compatible storage with pre-signed URLs. The backend signs the upload — it never touches the file.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19 + Vite 8 |
| Backend | Express 5 (ESM) |
| Storage | Supabase S3-compatible storage |
| Package manager | pnpm |

## Architecture

```
User  ──pick file──►  Frontend (React)
                        │
                        ├── POST /api/v1/upload/pre-signed-url
                        │       └── Backend signs a PUT URL with AWS SDK
                        │
                        └── PUT <pre-signed-url> ──► Supabase S3
                              (file bytes, direct upload)
```

The backend never receives the file. The frontend uploads directly to Supabase using the pre-signed URL.

## Prerequisites

- Node.js >= 20
- pnpm >= 11.8

## Setup

```bash
# Install dependencies for both apps
cd backend && pnpm install
cd ../frontend && pnpm install
```

### Backend env (`backend/.env`)

```env
PORT=3000
ALLOWED_ORIGINS=http://localhost:5173
SUPABASE_S3_REGION=ap-south-1
SUPABASE_S3_ENDPOINT=https://<project>.supabase.co/storage/v1/s3
SUPABASE_S3_ACCESS_KEY=your-access-key
SUPABASE_S3_SECRET_KEY=your-secret-key
SUPABASE_S3_BUCKET=your-bucket-name
```

### Frontend env (`frontend/.env`)

```env
VITE_API_URL=http://localhost:3000
VITE_SUPABASE_PUBLIC_BASE=https://<project>.supabase.co/storage/v1/object/public
VITE_SUPABASE_BUCKET=your-bucket-name
```

## Run

```bash
# Terminal 1 — backend
cd backend && pnpm dev

# Terminal 2 — frontend
cd frontend && pnpm dev
```

Frontend at `http://localhost:5173`, backend at `http://localhost:3000`.

## API

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/upload/list-files` | List objects in the bucket |
| `POST` | `/api/v1/upload/pre-signed-url` | Get a pre-signed PUT URL |

### `POST /api/v1/upload/pre-signed-url`

```json
// Request
{ "fileName": "photo.jpg", "fileType": "image/jpeg" }

// Response
{ "status": "success", "data": { "url": "https://...", "key": "1742400000000-photo.jpg" } }
```

## Notes

- CORS origins are configured via the `ALLOWED_ORIGINS` env var (comma-separated)
- The S3 bucket must be configured with public-read policies for the public URL to work
- Files validated client-side: image types (JPEG, PNG, WebP, GIF), max 10 MB
