FROM node:20-alpine3.17

WORKDIR /app

RUN npm install -g @nestjs/cli

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn build

CMD ["yarn", "run", "start:dev"]

