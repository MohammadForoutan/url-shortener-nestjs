ARG IMAGE_BUILDER=node:24-bookworm
ARG IMAGE_PROD=node:24-bookworm
ARG NODE_ENV=production

# Build stage
FROM ${IMAGE_BUILDER} AS builder

WORKDIR /app

# Copy dependency files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY scripts/ ./scripts/

# Install pnpm and dependencies (including dev dependencies for build)
RUN npm install -g pnpm && \
    pnpm install

# Copy remaining source files
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM ${IMAGE_PROD} AS production

WORKDIR /app

ENV NODE_ENV=${NODE_ENV}

# Copy dependency files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install pnpm and production dependencies only (ignore scripts for production)
RUN npm install -g pnpm && \
    pnpm install --prod --ignore-scripts

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Start the application
CMD ["pnpm", "run", "start:prod"]
