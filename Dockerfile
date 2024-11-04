# Use a Node.js image as the base
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port for the app
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start:dev"]