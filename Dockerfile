FROM node:latest

# Create the docs website directory
WORKDIR /website

COPY . .

WORKDIR /website/website

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
