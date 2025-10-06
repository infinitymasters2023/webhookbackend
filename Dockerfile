# Step 1: Base image
FROM node:18-alpine

# Step 2: Working directory
WORKDIR /app

# Step 3: Copy package files and install deps
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Step 4: Copy rest of the code
COPY . .

# Step 5: Build the app (optional if using start:prod)
RUN npm run build

# Step 6: Expose and start
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
