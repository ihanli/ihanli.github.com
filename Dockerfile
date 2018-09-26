FROM ubuntu:18.04

RUN apt-get update
RUN apt-get install -y curl git vim gcc make libreadline-dev zlib1g-dev \
    autoconf bison build-essential libssl-dev \
    libyaml-dev libncurses5-dev libffi-dev libgdbm5 libgdbm-dev

ENV LC_ALL C.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
ENV PATH /root/.rbenv/shims:/root/.rbenv/bin:$PATH

RUN curl -fsSL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-installer | bash

RUN echo 'eval "$(rbenv init -)"' > /root/.bash_profile
RUN rbenv install 2.5.1
RUN rbenv global 2.5.1

RUN gem install bundler

WORKDIR /root/ihanli.github.com
COPY Gemfile .
RUN bundle install

EXPOSE 4000
