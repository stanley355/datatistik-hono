FROM oven/bun:latest AS builder
WORKDIR /app
COPY . .
RUN bun install
RUN bun run build

# Production Stage
FROM oven/bun:distroless as runner
COPY --from=builder /app/dist /app

EXPOSE 3001
ENTRYPOINT /app/index.js
