FROM docker.ifeng.com/library/node:8.9.3-alpine

ENV NODE_ENV ""

WORKDIR /ifeng-whale

EXPOSE 3000

COPY . /ifeng-whale

# RUN npm --registry https://registry.npm.taobao.org install --production

RUN  mkdir -p /data/logs

CMD ["node","app.js"]