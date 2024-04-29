FROM node:20-alpine AS builder
WORKDIR /build
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN CI=true pnpm install --prod --frozen-lockfile
COPY --link . .

FROM node:20-alpine AS runner
RUN apk --no-cache add curl
COPY --from=builder /build /app
WORKDIR /app