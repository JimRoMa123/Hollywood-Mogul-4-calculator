FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the NestJS app
RUN npm run build

# Expose the backend port
EXPOSE 3001

# Start in production mode
CMD ["node", "dist/main.js"]
