FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# FIX: force binary executable permission inside container
RUN chmod +x ./node_modules/.bin/tsc

# Build typescript
RUN ./node_modules/.bin/tsc

EXPOSE 8080

CMD ["node", "dist/index.js"]
