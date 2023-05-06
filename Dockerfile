# Use Node as the base image
FROM node:latest AS build

# Set the working directory
WORKDIR /build

# Copy the package.json and package-lock.json files
COPY package.json package.json
COPY package-lock.json package-lock.json

# Install dependencies
RUN npm ci

# Copy the client and server folders
COPY client/ client
COPY server/ server

# Build the React app
RUN npm run build-client

# Build the Node app
RUN npm run build-server

# Use Nginx as the base image for the web server
FROM nginx:alpine

# Set the working directory
WORKDIR /usr/share/nginx/html

# Copy the build files from the previous stage
COPY --from=build /build/client/build/ .
COPY --from=build /build/server/build/ .

# Expose ports for both React and Node apps
EXPOSE 3000 8080

# Start both apps
CMD ["npm", "run", "start"]
