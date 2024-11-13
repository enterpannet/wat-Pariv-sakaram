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

# Install 'serve' globally
RUN bun add serve

# Expose the port the app runs on
EXPOSE 3000

# Use 'serve' to serve the production build
CMD ["serve", "-s", "dist", "-l", "3000"]
