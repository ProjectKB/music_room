#!/usr/bin/env sh

if grep -q NETWORK .env
then
    sed -i '' -e '$ d' .env
fi

echo NETWORK=http://`ifconfig | grep broadcast | cut -d " " -f2`:8080 >> .env
