FROM node:16.16.0-alpine3.16

WORKDIR /root/site/current

COPY . .

RUN npm install

EXPOSE 3010

CMD [ "npm", "run", "startdev" ] 