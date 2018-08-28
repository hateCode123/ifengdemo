FROM docker.ifeng.com/library/node:8.9.3 AS build

WORKDIR /ifeng-whale
COPY . /ifeng-whale

RUN npm --registry http://npm.ifengcloud.ifeng.com install
RUN npm run build

# RUN cd ..
RUN NODE_ENV=production npm run uploadcdn magicapple V0rxeH2NNjHV31bNDJu4wQxyTh2wsdfKCcU6cQmb02Gg5hmvh1vnTM8XLAess9aGGRqTLK0Jxz7pjQfXipSo7Jo5C7a9iW3Y5EjHD2xFQlC1HF73yL7xBUIM7xahRoysfOkZjC0ZKVB7Ja9p8IaOw1nixOtTCGMVz1K3EwQnJJ7J8iFB4kTix3WmY5AdgOEl3GTawDstHrK09xAPdd6eK9aCgESqiIgTfEu5EtRuS65purCfj9jgAl4TbGMYutc0

FROM docker.ifeng.com/library/node:8.9.3-alpine

ENV NODE_ENV ""
WORKDIR /ifeng-whale
EXPOSE 3000

COPY --from=build /ifeng-whale/biz /ifeng-whale/biz
COPY --from=build /ifeng-whale/dist/*.html /ifeng-whale/dist/
COPY --from=build /ifeng-whale/*.json /ifeng-whale/
COPY --from=build /ifeng-whale/*.js /ifeng-whale/

RUN npm --registry http://npm.ifengcloud.ifeng.com install  --production

# TODO remove /data/logs after remove logging to file
# RUN  mkdir -p /data/logs

CMD ["node","app.js"]