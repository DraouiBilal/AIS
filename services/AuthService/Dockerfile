FROM node:18.0.0-alpine3.13

COPY package.json ./

COPY tsconfig.json ./

COPY src ./src

RUN npm install

RUN npm run build

EXPOSE 4000

CMD [ "npm", "start" ]