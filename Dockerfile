FROM node:20-slim

WORKDIR /home/node/app

COPY package*.json ./
COPY .env.example .env

RUN apt update -y && apt install procps -y && npm install -g @nestjs/cli@10.3.0 -y

USER node

CMD ["tail", "-f", "/dev/null"]