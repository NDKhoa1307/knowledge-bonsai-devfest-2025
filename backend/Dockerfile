# ---------- Build stage ----------
FROM node:20-alpine as builder
WORKDIR /app

# Copy package files and prisma schema
COPY package.json yarn.lock ./
COPY prisma ./prisma/

# Debug: verify prisma files exist
RUN ls -la ./prisma/ && cat ./prisma/schema.prisma

# Install all dependencies
RUN yarn install --frozen-lockfile

# Generate Prisma client
RUN yarn prisma generate

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# ---------- Production stage ----------
FROM node:20-alpine as production

ENV NODE_ENV production
ENV PORT 8080

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Copy entire prisma directory from builder (includes schema + migrations)
COPY --from=builder /app/prisma ./prisma/

# Install production dependencies
RUN yarn install --frozen-lockfile --production

# Install prisma CLI since it's in devDependencies
RUN yarn add prisma@6.19.0 --ignore-workspace-root-check

# Generate Prisma Client in production
RUN yarn prisma generate

# Copy built application from builder
COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/main.js"]
