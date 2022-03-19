#!/bin/sh

set -e

echo "ENVIRONMENT: $RAILS_ENV"

bundle check || bundle install

database_config_path="$APP_PATH/config/database.yml"

rm -f database_config_path
cp $APP_PATH/config/database.yml.docker "$database_config_path"

bundle exec ${@}
