FROM node:0.10
MAINTAINER nearForm <info@nearform.com>

RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm install && npm install -g foreman

EXPOSE 8080

CMD ["nf", "start"]
