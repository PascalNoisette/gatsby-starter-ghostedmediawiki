FROM node:latest

RUN set -ex \
    && apt-get update \
    && apt-get install -y --no-install-recommends \
        autoconf \
        libtool \
        libpng-dev \
        pkg-config \
        nasm \
        git \
        curl \
        vim \
    && wget -q -O /tmp/libpng12.deb http://mirrors.kernel.org/ubuntu/pool/main/libp/libpng/libpng12-0_1.2.54-1ubuntu1_amd64.deb \
         && dpkg -i /tmp/libpng12.deb \
         && rm /tmp/libpng12.deb \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/*

COPY . /var/www
RUN chown -R node:node /var/www
WORKDIR /var/www
USER node
RUN yarn
CMD ["/bin/bash", "-c", "/var/www/node_modules/.bin/gatsby build && /var/www/node_modules/.bin/gatsby serve --host=0.0.0.0"]