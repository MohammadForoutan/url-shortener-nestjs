# ==== Build Stage ====
ARG IMAGE_BUILDER=node:24-bookworm-slim
FROM ${IMAGE_BUILDER} AS builder

# Use non-root user early (optional, but secure)
# RUN useradd -m appUser
# USER appUser

WORKDIR /app

# Install pnpm globally (once)
RUN npm install -g pnpm@10.17.0

# Copy only dependency manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY scripts/ ./scripts/

# Install ALL dependencies (dev + prod) for build
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the app
RUN pnpm run build

# ==== Production Stage ====
FROM node:24-bookworm-slim AS production

WORKDIR /app

# Install pnpm globally and netcat for health checks
RUN npm install -g pnpm@10.17.0 && \
  apt-get update && \
  apt-get install -y netcat-openbsd && \
  rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install ONLY production dependencies
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

# Copy built dist from builder
COPY --from=builder /app/dist ./dist

# Copy startup scripts
COPY scripts/start-prod.sh ./scripts/start-prod.sh
COPY scripts/run-migrations.sh ./scripts/run-migrations.sh
RUN chmod +x ./scripts/start-prod.sh ./scripts/run-migrations.sh

# Optional: Copy any runtime config if needed
# COPY config/ ./config/

# Use non-root user (recommended for production)
# RUN useradd -m appUser && chown -R appUser:appUser /app
# USER appUser

# Expose port (NestJS default)
EXPOSE 3000
