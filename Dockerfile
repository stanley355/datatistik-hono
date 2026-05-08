# Build Stage
FROM oven/bun:1.1 AS builder
WORKDIR /app

# Copy package files first to leverage Docker caching
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .
# Ensure your build command targets the correct output path
RUN bun run build

# Production Stage
FROM oven/bun:1.1-slim AS runner
WORKDIR /app

# Copy the binary from the builder stage
COPY --from=builder /app/build-bin ./build-bin

# Set execution permissions just in case
RUN chmod +x /app/build-bin

EXPOSE 3001

# Use exec form for ENTRYPOINT
ENTRYPOINT ["/app/build-bin"]
