
FROM node:10-alpine as builder

WORKDIR /tmp/wild-magic
COPY . /tmp/wild-magic
RUN npm ci && npm run build

FROM node:10-alpine
WORKDIR /opt/nexus
COPY --from=builder /tmp/wild-magic/node_modules/ /opt/nexus
COPY --from=builder /tmp/wild-magic/lib /opt/nexus
EXPOSE 4000
ENTRYPOINT ["node", "index.js"]