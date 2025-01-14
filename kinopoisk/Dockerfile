FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7070

CMD ["npx", "cross-env", "NODE_ENV=development", "webpack", "serve", "--open", "--stats-error-details"]
