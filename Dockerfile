FROM node:10-slim

RUN mkdir -p /usr/share/man/man1

RUN apt update && \
  apt install -y netcat && \
  apt install -y default-jre

# Environment
ARG env=local

# Set to a non-root built-in user `node`
USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app/

# Copy source files
COPY --chown=node . .

# Install build dependencies
RUN npm install

# Generate client api-sdk library
RUN npm run create:sdk

RUN mkdir -p /home/node/app/client

WORKDIR /home/node/app/client

# Install ui dependencies
RUN npm install

# Compile ui source
RUN if [ "$env" = "prod" ] ; then npm run build:prod; fi
RUN if [ "$env" = "stage" ] ; then npm run build:stage; fi
RUN if [ "$env" = "local" ] ; then npm run build:local; fi

# Move ui fragments to public dir
RUN mv dist/client/* ../api/public/

RUN mkdir -p /home/node/app/api

WORKDIR /home/node/app/api

# Install api dependencies
RUN npm install

RUN npm run build

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3000

RUN chmod 700 /home/node/app/bin/wait-for-mongo.sh

ENTRYPOINT ["/bin/sh", "/home/node/app/bin/wait-for-mongo.sh"]

EXPOSE ${PORT}
CMD [ "node", "." ]
