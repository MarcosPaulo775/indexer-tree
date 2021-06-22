FROM node:alpine
WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY . .

ENV HOSTS docker
EXPOSE 3000
CMD ["yarn", "start:dev"]