FROM node:22-slim

RUN set -x \
  && apt-get update \
  && apt-get upgrade -y \
  && apt-get install -y git vim less curl jq postgresql-client \
  && curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
  && chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
  && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
  && apt-get update \
  && apt-get install -y gh \
  && rm -rf /var/lib/apt/lists/*

ENV LESSCHARSET=utf-8
ENV PNPM_HOME="/home/node/.local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"

RUN set -x \
  && corepack enable \
  && corepack prepare pnpm@latest --activate \
  && pnpm add -g nodemon

WORKDIR /usr/src/app

COPY ./profile.d/alias.sh /etc/profile.d

USER node
