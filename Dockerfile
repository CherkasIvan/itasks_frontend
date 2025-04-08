FROM node:14-alpine as build
ARG APP_ENV=staging
ENV APP_ENV=${APP_ENV}

WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install
COPY . /app

RUN node --max_old_space_size=4192 node_modules/@angular/cli/bin/ng build --configuration=${APP_ENV}

FROM nginx:1.16.0-alpine
# user www-data
RUN set -x ; \
  addgroup -g 1000 -S www-data ; \
  adduser -u 1000 -D -S -G www-data www-data && exit 0 ; exit 1
COPY --from=build /app/dist /app
COPY --chown=www-data:www-data . /app
COPY ./conf/app.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
