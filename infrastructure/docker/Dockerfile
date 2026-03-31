# ===== Multi-stage Dockerfile =====
# PORTECOS ACADEMIC IA — Web Application

# ---- Base ----
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# ---- Dependencies ----
FROM base AS deps
COPY package.json package-lock.json* ./
COPY apps/web/package.json ./apps/web/
COPY services/api/package.json ./services/api/
RUN npm ci --workspace=apps/web --workspace=services/api

# ---- Web Build ----
FROM base AS web-builder
COPY --from=deps /app/node_modules ./node_modules
COPY apps/web ./apps/web
COPY shared ./shared
COPY turbo.json .
WORKDIR /app/apps/web
RUN npm run build

# ---- Web Production ----
FROM node:20-alpine AS web-production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=web-builder /app/apps/web/.next/standalone ./
COPY --from=web-builder /app/apps/web/.next/static ./.next/static
COPY --from=web-builder /app/apps/web/public ./public
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
CMD ["node", "server.js"]

# ---- API Build ----
FROM base AS api-builder
COPY --from=deps /app/node_modules ./node_modules
COPY services/api ./services/api
COPY shared ./shared
WORKDIR /app/services/api
RUN npm run build

# ---- API Production ----
FROM node:20-alpine AS api-production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=api-builder /app/services/api/dist ./dist
COPY --from=api-builder /app/services/api/package.json .
RUN npm ci --only=production
EXPOSE 4000
CMD ["node", "dist/index.js"]
