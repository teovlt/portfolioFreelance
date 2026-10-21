# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Enable pnpm via corepack, pinned to the version the lockfile was generated with
RUN corepack enable && corepack prepare pnpm@10.11.1 --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Same-origin API in prod — nginx proxies /api to the backend container
ENV VITE_API_URL=/api

# Build the application
RUN pnpm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
