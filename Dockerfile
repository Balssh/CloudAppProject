FROM node:18.12.1-alpine as module-install-stage
# set working directory
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json

RUN apk add yarn
RUN yarn install --production

# build
FROM node:18.12.1-alpine as build-stage
COPY --from=module-install-stage /app/node_modules/ /app/node_modules
WORKDIR /app
COPY . .
RUN yarn build

# serve
FROM node:18.12.1-alpine
COPY --from=build-stage /app/build/ /app/build
RUN npm install -g serve
# start app
EXPOSE 3000

CMD serve -s /app/build -l 3000