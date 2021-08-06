FROM node:14-alpine

ENV APP_DOCKER true
WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY . .

EXPOSE 3000
CMD ["yarn", "docker-start:dev"]