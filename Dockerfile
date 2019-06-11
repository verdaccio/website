FROM node:lts

# Create the docs website directory
WORKDIR /website

COPY . .

WORKDIR /website/website

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]
