from node:24-alpine3.21

workdir /app

copy package*.json ./

run npm ci && npm cache clean --force

expose 3000
cmd ["npm", "run", "dev"]
