# Dockerfile for jessekaufman.com contact form API.

# Use the official Node.js image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./src

# Install dependencies
RUN npm install --production

# Copy the rest of the app files
COPY . .

# Set environment variables (optional)
ENV PORT=3000

# Expose the internal port (not mapped to host)
EXPOSE 3000

# Command to start the server
CMD ["npm", "start"]