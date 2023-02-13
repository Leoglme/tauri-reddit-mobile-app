FROM node:lts as vue

WORKDIR /app

COPY . /app

RUN npm install

