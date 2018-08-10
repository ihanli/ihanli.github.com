FROM alpine:3.7

RUN apk add --no-cache \
    git \
    vim \
    curl \
    bash \
    build-base \
    linux-headers \
    readline-dev \
    openssl-dev \
    zlib-dev

ENV PATH /root/.rbenv/shims:/root/.rbenv/bin:$PATH

RUN curl -fsSL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-installer | bash

RUN echo 'eval "$(rbenv init -)"' > /root/.bash_profile
RUN rbenv install 2.5.1
RUN rbenv global 2.5.1

ENTRYPOINT ["/bin/bash"]
