FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn
RUN npm install -g http-server

COPY . .

RUN yarn build

EXPOSE 8080

CMD [ "http-server", "dist" ]
