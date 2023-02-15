ARG NGINX_HOST

FROM nginx:stable-alpine

# TODO: move ssl cert stuff to dedicated development Dockerfile
RUN apk add --no-cache bash && apk add openssl && openssl req -x509 -nodes -days 365 -subj "/C=CA/ST=QC/O=Company, Inc./CN=fs-app.loc" -addext "subjectAltName=DNS:fs-app.loc" -newkey rsa:2048 -keyout /etc/ssl/private/self_signed.key -out /etc/ssl/certs/self_signed.crt