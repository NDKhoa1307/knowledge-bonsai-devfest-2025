# ---------- Build stage ----------
FROM node:20-alpine as builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application (skip type checking)
RUN npm run build:skip-typecheck || vite build --mode production

# ---------- Production stage ----------
FROM nginx:stable-alpine as prod

# Remove default nginx index
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default nginx config with custom config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
