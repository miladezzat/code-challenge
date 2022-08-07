FROM node:14-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install --only=prod

COPY .. /app

CMD ["npm", "start"]
