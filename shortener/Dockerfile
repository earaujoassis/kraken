FROM node:6.10.3
MAINTAINER Ewerton Assis <ewerton.assis@todxs.org>

ENV NODE_ENV production
ENV PORT 8080
RUN mkdir -p /app
COPY . /app
WORKDIR /app
RUN npm install
RUN npm run migrate
EXPOSE 8080
CMD [ "npm", "start" ]
