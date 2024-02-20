FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm rebuild
COPY . .
EXPOSE 3000
CMD [ "node", "src/app.js" ]
