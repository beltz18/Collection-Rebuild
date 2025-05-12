# Getting Started

## Description:
Colletion FE is an admin panel for managing collections, loans and payments. It is built using Nextjs, and consumes the Collection API.

## Installation and Setup Instructions
Clone down this repository. You will need node and npm installed globally on your machine.
node version used for this project is v^20.

## Environments Variables
Create a new file called `.env` in the root of your project and add the following environment variables: 

- `NEXT_PUBLIC_SERVER` = Add the API URL
- `NEXT_PUBLIC_APPNAME` = Application's name
- `NEXT_PUBLIC_DESCRIPTION` = Application's description
- `NEXT_PUBLIC_ENTITY_PDF` = Logo entity URL but for PDF's files
- `NEXT_PUBLIC_ENTITY` = Logo entity URL
- `NEXT_PUBLIC_ENTITY_CONTRAST` = Logo entity in white colour
- `NEXT_PUBLIC_FOOTER` = Logo footer URL

## Running Locally
You can run this project using npm or docker

### Using Node
1. Install all dependencies with `npm install`, `pnpm install` or `yarn`
2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Using Docker
Docker allows you to run your application in an isolated environment without manually installing dependencies on your machine. Follow these steps to set up and run your project with Docker.

1. **Build a Docker image:**
Before you run your container, you must first build a Docker image from the Dockerfile in your project. Run the following command:

```bash
docker build -t <image-name>
```

2. **Build and run your container with Docker Compose**,
Docker Compose makes it easy to manage multiple containers and services. Follow these steps:
    - **Build the image and mount the container:** If you haven't built the image in the previous step or want to update it, use the following command:
    ```bash
    docker compose up --build
    ```
    >This will build the image if needed and then start the containers.

    - **Start the container without rebuilding the image:** If you have already built the image and just want to run the container, use:
    ```bash
    docker compose up
    ```
    >This will start the container with the configuration defined in the docker-compose.yml file.

3. **Stop and remove containers:** If you want to stop the execution and remove the associated containers, run:
```bash
docker compose down
```
> This will shut down all services defined in docker-compose.yml and clean up the generated containers.

## Accessing the platform

Open [http://localhost:3000](http://localhost:3000) in your browser to access the platform.