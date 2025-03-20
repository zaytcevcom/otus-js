FROM node:23-alpine3.21

RUN apk update && apk add bash && apk add --no-cache curl

USER root
COPY ./common/wait-for-it.sh /usr/local/bin/wait-for-it
RUN chmod +x /usr/local/bin/wait-for-it

WORKDIR /app
RUN chown -R node:node /app
USER node

HEALTHCHECK --interval=5s --timeout=5s --start-period=1s CMD curl --fail http://127.0.0.1:3000/health || exit 1
