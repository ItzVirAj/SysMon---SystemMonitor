# 1️⃣ Base image
FROM node:20-alpine

# 2️⃣ Set working directory
WORKDIR /app

# 3️⃣ Copy package files first (for caching)
COPY package.json package-lock.json* ./

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Copy the rest of the app
COPY . .

# 6️⃣ Build Next.js app
RUN npm run build

# 7️⃣ Expose port
EXPOSE 3000

# 8️⃣ Start production server
CMD ["npm", "start"]
