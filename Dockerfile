FROM node:20

WORKDIR /app

# install dependencies first (better caching)
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# copy project
COPY . .

# build the project
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]