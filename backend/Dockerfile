# Dockerfile for Express (backend)
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

# Generate Prisma Client
RUN npx prisma generate

# Run Prisma migrations
RUN npx prisma migrate deploy

# Expose the port the app runs on
EXPOSE 5000

# Use PM2 to run the server
CMD ["pm2-runtime", "server.js"]
