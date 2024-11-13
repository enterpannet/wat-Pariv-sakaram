# Use the official Bun image from Oven
FROM oven/bun:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies using Bun
COPY package*.json bun.lockb* ./
RUN bun install

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN bun run build

# Expose the port the app runs on
EXPOSE 3000

# Use Bun to serve the production build
CMD ["bun", "run", "serve", "-s", "dist", "-l", "3000"]
