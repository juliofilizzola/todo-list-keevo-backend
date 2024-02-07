FROM node:18-alpine AS builder

WORKDIR /home/node/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY prisma ./prisma/
COPY .env.example .env
COPY --chown=node:node package.json yarn.lock ./

# Install app dependencies
RUN yarn install --silent

COPY . .

EXPOSE 3000

CMD ["yarn", "run", "start:dev"]
