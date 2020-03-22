FROM node:10-slim

RUN apt update && \
  apt install -y netcat

# Environment
ARG env=local

# Set to a non-root built-in user `node`
USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app/

# Copy source files
COPY --chown=node ./api/. .
COPY --chown=node ./bin/. ./bin

# Install build dependencies
RUN npm install

# Compile source files
RUN npm run clean && npm run build

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3000

RUN chmod 700 /home/node/app/bin/wait-for-mongo.sh

ENTRYPOINT ["/bin/sh", "/home/node/app/bin/wait-for-mongo.sh"]

EXPOSE ${PORT}
CMD [ "node", "." ]
