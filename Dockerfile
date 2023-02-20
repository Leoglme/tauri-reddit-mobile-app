FROM node:lts

WORKDIR /usr/src/app

COPY package*.json package.json ./

RUN npm install

COPY . .