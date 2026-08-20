#!/bin/sh
set -e

LISTEN_PORT="${PORT:-${WEB_PORT:-8080}}"
export LISTEN_PORT

envsubst '${LISTEN_PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'
