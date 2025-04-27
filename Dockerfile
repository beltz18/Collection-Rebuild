FROM node:20 AS base

WORKDIR /app

COPY package.json ./
COPY .env ./
RUN npm install --legacy-peer-deps

COPY . ./

RUN npm run build
EXPOSE 3000

CMD ["npm", "start"]