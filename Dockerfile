FROM node:20
# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code to the working directory
COPY . .

# Build the app
RUN npm run build

FROM nginx:alpine

COPY dist/ /usr/share/nginx/html 
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port that the app will run on
EXPOSE 80

# Define the command to run the app
CMD ["nginx", "-g", "daemon off;"]