# Dockerfile for React (frontend)
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Install PM2 globally
RUN npm install pm2 -g

# Expose the port the app runs on
EXPOSE 3000

# Use PM2 to run the Vite dev server
CMD ["pm2-runtime", "npm", "--", "run", "dev"]
