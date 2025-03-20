#!/bin/sh
set -e

find /app/public \
  -type f \
  -name '*.js' \
  -exec sed -i "s+__REACT_APP_SENTRY_DSN__+${REACT_APP_SENTRY_DSN:?}+g" '{}' \;

exec /docker-entrypoint.sh "$@"
