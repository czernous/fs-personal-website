#!/bin/sh
# DIR=`date_+%m%d%y`
# #FILNAME=`mongo_dump_+%m%d%y.gz`
# DEST=/backup/$DIR
# mkdir $DEST

BACKUP_FOLDER="/backup/"

DUMP_NAME="mongo_dump_"
CURRENT_DATE=$(date +"%m_%d_%Y")

echo "${n}"

if [ -f .env ]; then
    # Load Environment Variables
    export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
    # For instance, will be example_kaggle_key
    echo $API_DB_URL
    docker exec -it fs-freelance-app-db sh -c "mongodump -u $API_DB_USER --db=blog  -p $API_DB_PASSWORD --authenticationDatabase=admin --archive=$BACKUP_FOLDER$DUMP_NAME$CURRENT_DATE.gz --gzip -vvv"
fi