#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install
cp config/database.yml.postgresql config/database.yml
bundle exec rake assets:precompile
bundle exec rake assets:clean
bundle exec rake db:migrate
