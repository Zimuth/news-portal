# Multi-stage Dockerfile for news-portal
# 1. Build the React client
FROM node:18-alpine AS build
WORKDIR /app

# only copy package files to install dependencies faster
COPY package.json package-lock.json ./
COPY client/package.json client/package-lock.json ./client/

# install dependencies for backend and frontend
RUN npm install --legacy-peer-deps
RUN npm install --prefix client --legacy-peer-deps

# copy the rest of the sources
COPY . .

# build react app
RUN npm run build --prefix client

# 2. Prepare runtime image
FROM node:18-alpine AS runtime
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --only=prod --legacy-peer-deps

# copy built frontend
COPY --from=build /app/client/dist ./client/dist

# copy server and data
COPY server.js data/ ./
COPY client/public ./client/public

EXPOSE 5000
CMD ["node", "server.js"]
