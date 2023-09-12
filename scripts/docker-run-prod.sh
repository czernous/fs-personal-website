#!/bin/bash
docker-compose up --build --pull=always --force-recreate -d
echo -e "\033[33mremoving dangling images"
docker image prune -f 
docker network prune -f 