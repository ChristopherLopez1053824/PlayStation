# Dockerfile del microservicio NOVEDADES. Igual que el de los otros servicios.
FROM node:22-alpine
WORKDIR /app

# 1) Solo los manifiestos primero (aprovecha la caché de capas).
COPY package*.json ./
RUN npm install

# 2) El resto del código.
COPY . .

EXPOSE 4003
CMD ["node", "src/server.js"]
