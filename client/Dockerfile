FROM node:alpine as builder

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn

COPY  . .

RUN yarn build


FROM nginx

WORKDIR /app

RUN apt-get update \
  && apt-get install -y curl git build-essential \
  && curl -sL https://deb.nodesource.com/setup_12.x | bash - \
  && apt-get install -y nodejs \
  && npm install -g yarn

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /usr/src/app .

CMD ["yarn", "start"]
