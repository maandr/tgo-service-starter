FROM node:9.8-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
RUN npm install

COPY . /usr/src/app

RUN npm run build

EXPOSE 9001

CMD [ "npm", "start" ]