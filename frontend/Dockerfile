# Dockerfile for React (frontend)
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN npm run build

# Install 'serve' to serve the production build
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Use 'serve' to serve the production build
CMD ["serve", "-s", "dist", "-l", "3000"]
