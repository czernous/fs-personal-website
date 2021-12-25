#!/bin/bash
docker rm -f fs-freelance-app-api
docker-compose -f docker-compose.yml -f docker-compose.development.yml up --build -d 
echo -e "\033[33mremoving dangling images"
docker image prune -f 