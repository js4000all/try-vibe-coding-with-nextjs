FROM node:22-slim

RUN set -x \
  && apt-get update \
  && apt-get upgrade -y \
  && apt-get install -y git vim less curl jq
ENV LESSCHARSET=utf-8
WORKDIR /usr/src/app
COPY ./profile.d/alias.sh /etc/profile.d

USER node
