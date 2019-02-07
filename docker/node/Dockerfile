FROM node:6.2.0

RUN groupadd --gid 1000 node \
  && useradd --uid 1000 --gid node --shell /bin/bash --create-home node

RUN npm install -g standard

RUN npm install -g brew webpack@^3.0.0

ENTRYPOINT [ "/usr/local/bin/entrypoint.sh" ]