# ---- Stage 1: Build the React application ----
# Use an official Node.js runtime as the base image for the build stage.
# 'alpine' is a lightweight version of Linux, perfect for keeping image sizes small.
FROM node:18-alpine AS builder

# Set the working directory inside the container.
WORKDIR /app

# Copy 'package.json' and 'package-lock.json' first.
# This leverages Docker's layer caching. If these files don't change,
# Docker won't re-run 'npm install' on subsequent builds, speeding things up.
COPY package*.json ./

# Install project dependencies.
RUN npm install

# Copy the rest of the application's source code into the container.
COPY . .

# Build the React app for production. This creates a 'dist' folder (for Vite).
RUN npm run build

# ---- Stage 2: Serve the application using Nginx ----
# Use a lightweight Nginx image as the base for the final image.
FROM nginx:1.23-alpine

# Copy the built static files from the 'builder' stage into the Nginx public directory.
# This is the magic of multi-stage builds: we only take the final product, not the build tools.
COPY --from=builder /app/dist /usr/share/nginx/html

# Inform Docker that the container listens on port 80.
EXPOSE 80

# The default Nginx command is to start the server, but we add this for clarity.
# This command starts Nginx in the foreground.
CMD ["nginx", "-g", "daemon off;"]