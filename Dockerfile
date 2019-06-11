FROM node:lts

# Create the docs website directory
WORKDIR /verdaccio-website

COPY . .

WORKDIR /verdaccio-website/website

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]
