# ---------- Build stage ----------
FROM node:20-alpine as builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json yarn.lock ./
COPY prisma ./prisma/

# Install all dependencies
RUN yarn install --frozen-lockfile

# Generate Prisma client
RUN yarn prisma:g

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# ---------- Production stage ----------
FROM node:20-alpine as production

# Set the node env and the port that the container will listen on
# (Cloud Run requires the port to be set by the service)
ENV NODE_ENV production
ENV PORT 8080

WORKDIR /app

COPY package*.json yarn.lock ./

# Install only production dependencies
RUN yarn install --frozen-lockfile --production

# Copy built application from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

CMD ["node", "dist/main.js"]
