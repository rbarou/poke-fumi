FROM node:17.0.1

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm rebuild

CMD ["npm","start"]

EXPOSE 5000