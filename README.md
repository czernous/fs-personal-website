A full stack website with a blog.

You will need a Cloudinary account to store images and some sort of Email provider to send magic links for admin login (I used Gmail).

Use:

- clone the repository
- get latest submodules `git submodule update --recursive --remote`
- from root run `./env-gen/target/<your-os-build>/release/env-gen template.env .env` to generate .env file from template. If there is no build for your OS, you can create your own build. For that you will need Rust and all the relevant dependencies for your OS.
- start in dev mode `./scripts/docker-run-dev.sh`
- stop docker `./scripts/docker-stop.sh`
- start in prod mode `./scripts/docker-run-prod.sh`
- create db dump `./data/api-db/backup.sh`
- restore db from dump `./data/api-db/restore.sh`
  

Note: Don't forget to add the alias you are using for nginx domain to your hosts file.

Caveats:

Production part of the docker-compose is largely the same as development as hardly any changes were made. The issue with production is that the build has to run in a specific order due to the fact that most of NextJS app is static. Which means, you need to have API available in order to build the client otherwise there is no data and the website will be empty. I tried a few things to make it work unsuccessfully and decided to deploy different services to different platforms, Azure, Vercel, etc. You could try to make it work or use something more advanced like Kubernetes to build all of the services in order.

Stack: 
client - TS + NextJS
API - .NET + MongoDB/CosmosDB
AUTH - Go + Email(Gmail)
MISC - docker-compose, nginx...