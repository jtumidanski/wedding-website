# Use a lightweight Node.js image as a base
FROM node:20.11.1-alpine AS build-env

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the production bundle
RUN npm run build

# Use a lightweight Nginx image as a base for serving the application
FROM nginx:alpine

# Copy the built files from the previous stage to the Nginx server directory
COPY --from=build-env /app/dist /usr/share/nginx/html

COPY /static/videos /usr/share/nginx/html/videos

# Expose the port on which Nginx will run (optional)
EXPOSE 80

# Command to start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
