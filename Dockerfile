# Stage 1: Build
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install production dependencies
COPY package.json package-lock.json ./
RUN npm install --production --frozen-lockfile

# Copy built application from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Copy required config files
COPY next.config.mjs ./
COPY postcss.config.mjs ./

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]