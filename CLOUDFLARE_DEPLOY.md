# Deploying Zamzam Capital Position Size Calculator to Cloudflare Pages

Full-stack deploy: React frontend + serverless backend (Cloudflare Pages Functions),
all under one project, one domain.

## 1. Project layout

```
/
├─ frontend/                # React app (CRA + Tailwind)
│  └─ build/                # ← Build output that Cloudflare serves
└─ functions/               # ← Serverless backend (auto-deployed by Pages)
   └─ api/
      ├─ _middleware.js
      ├─ health.js           # GET /api/health
      └─ [[catchall]].js     # Unknown /api/* → 404
```

The `functions/` directory at the project root is auto-detected by Cloudflare
Pages and turned into serverless endpoints. No separate deployment needed.

## 2. One-time setup on Cloudflare

1. Push the repo to GitHub (already done).
2. Log in to https://dash.cloudflare.com  →  **Workers & Pages**  →  **Create application**  →  **Pages**  →  **Connect to Git**.
3. Pick the GitHub repo `Trader-07/zamzamcapitalpositionsizecalculator`.
4. Configure the build:

   | Setting | Value |
   | --- | --- |
   | Framework preset | **Create React App** |
   | Build command | `cd frontend && yarn install --frozen-lockfile && yarn build` |
   | Build output directory | `frontend/build` |
   | Root directory | *(leave blank)* |
   | Node version (env var) | `NODE_VERSION = 20` |

5. Click **Save and Deploy**. First build takes ≈60–90 s.

## 3. Custom domain

After deploy, in the Pages project go to **Custom domains** → **Set up a custom domain**  
and follow the prompts. If the domain is on Cloudflare DNS, it’s a one-click attach.

## 4. Adding new backend endpoints

Create a file in `functions/api/`:

```js
// functions/api/contact.js  →  POST /api/contact
export async function onRequestPost({ request }) {
  const body = await request.json();
  // … do something with body, send email, etc.
  return Response.json({ ok: true });
}
```

No build step required — next git push auto-deploys it.

## 5. Local development

```bash
# Frontend hot reload
cd frontend && yarn start

# Frontend + Functions together (simulates the production routing)
yarn --cwd frontend build
npx wrangler pages dev frontend/build --port 8788
# → http://localhost:8788   (serves React + /api/* functions)
```

## 6. Environment variables / secrets

In the Cloudflare Pages project:
**Settings → Environment variables**  →  add Production / Preview vars.  
Access them inside a Pages Function via `context.env.MY_VAR`.

## 7. Notes about the old FastAPI backend

The `/backend` directory (FastAPI) is unused by the calculator and is kept only
for the Emergent development environment. It is **not** deployed to Cloudflare.
Feel free to delete it once you’ve fully moved.
