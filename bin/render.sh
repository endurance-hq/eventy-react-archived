#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install

bin/yarn

bundle exec rake assets:precompile
bundle exec rake db:migrate
