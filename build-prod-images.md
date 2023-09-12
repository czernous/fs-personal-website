# Build app for production

There is an issue with using docker-compose for production build.
I was not able to find a feasible way to make sure that the blog api is built before the client app is built.
Since Nextjs site is statically generated, if there is not data available (API) at build time, it will be built with empty pages/errors.
I have dediced to deploy different parts of the app (API, AUTH, CLIENT) to cloud hosting (azure or aws). My setup requires pre built docker images hosted at some regeistry. In my case it's docker hub. You can use azure container registry or something else, or you can figure out how to make sure that the data is available when client is built.

below you can see the commands I have used to create images:

#### Blog API

```sh
docker build -t your-tag-name \
  --build-arg API_KEY=your-key \
  --build-arg API_DB_URL="your-db-connection-string" \
  --build-arg CLOUDINARY_NAME=your-cloudinary-name \
  --build-arg CLOUDINARY_KEY=your-cloudinary-key \
  --build-arg CLOUDINARY_SECRET=your-cloudinary-secret \
  ./api/
```

#### Auth API

```sh
docker build -t your-tag-name \
  --build-arg AUTH_API_KEY=your-key\
  --build-arg AUTH_API_PORT="80" \
  --build-arg AUTH_JWT_SECRET=your-sercret\
  --build-arg SMTP_HOST=your-smtp-host \
  --build-arg SMTP_PORT=your-smpt-port \
  --build-arg SMTP_LOGIN=your-login(email address in gmail) \
  --build-arg SMTP_PASSWORD=your-password(app specific pw) \
  --file ./auth/Dockerfile \
  ./auth/
```

push to registry:
``` docker push <image-name> ```

run image you've built using the same environment variables you passed as build args:

```sh
docker run -d \
  -e  API_KEY=\
  -e API_DB_URL="" \
  -e CLOUDINARY_NAME=\
  -e CLOUDINARY_KEY=\
  -e CLOUDINARY_SECRET=\
  -p 5000:5000 \
```
