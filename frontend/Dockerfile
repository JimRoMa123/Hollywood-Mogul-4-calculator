FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start Vite dev server, binding to 0.0.0.0 so it's accessible outside the container
CMD ["npx", "vite", "--host", "0.0.0.0"]
