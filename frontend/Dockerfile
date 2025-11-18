# ---------- Build stage ----------
FROM node:20-alpine as builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files and install dependencies
COPY package*.json ./
COPY pnpm-*.yaml ./

RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm build

# ---------- Production stage ----------
FROM nginx:stable-alpine as prod

# Remove default nginx index
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default nginx config with custom config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8800
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
