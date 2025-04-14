---
date: 2025-04-12T00:00:56-06:00
title: Docker microservice setup & methodology
description: This article breaks down how I organize and manage Docker projects using a modular docker-compose setup. I’ll cover the structure, security practices, reverse proxy configuration, and the reasoning behind each decision, with the goal of creating a setup that’s flexible, maintainable, and production-aware.
tags:
  - Docker
  - security
  - networking
---

## Service structure & philosophy

When organizing containers, I group services based on how tightly they're coupled. If two or more services are designed to work exclusively with each other (like Authelia and its Redis instance) they occupy the same directory with a shared `docker compose` file. This keeps interdependent services encapsulated and easier to manage. It also makes migrating the services to another physical machine as simple as copying the directory.

Larger standalone services, like Home Assistant or Node-RED, get their own directory and compose file. Each compose file is named after its directory—for example, `proxy/proxy.compose.yaml` or `homeassistant/homeassistant.compose.yaml`. This keeps things intuitive, especially when dealing with dozens of containers.

## The master compose file

At the root of my Docker setup is a single master `docker-compose.yaml` file. This file includes all service-specific compose files, as well as a `network.compose.yaml` that centralizes the definition of all Docker networks. This makes it simple to connect any container to any network without repeating boilerplate configuration in each individual file.

Rather than manually specifying `-f` flags or navigating into specific directories, I use a shell alias that always references this master compose file by default. That way, I can manage any container from any location in the project—whether I'm starting, stopping, or checking logs.

This approach gives me flexibility and consistency. Centralizing the network definitions reduces duplication, and managing everything through one master file keeps the setup predictable and scalable. I also manually define IP ranges for all Docker networks. This has made network behavior more predictable and significantly easier to troubleshoot when issues arise.

## CLI shortcuts

To streamline day-to-day Docker management, I use a set of shell aliases for commonly used commands. These aliases are especially useful when combined with my default alias for the master compose file, allowing me to control any part of the stack from any directory. They save time, reduce typing, and make it easy to manage containers, networks, images, and volumes from anywhere in the project:

**Compose commands:**

```bash
alias dcu='docker compose up -d'
alias dcdn='docker compose down'
alias dcstart='docker compose start'
alias dcstop='docker compose stop'
alias dce='docker compose exec'
```

**Container management:**
```bash
alias dc='docker container'
alias dci='docker container inspect'
alias dcl='docker container list'
alias dcla='docker container list -a'
```

**Network management:**
```bash
alias dn='docker network'
alias dni='docker network inspect'
alias dnl='docker network list'
alias dnp='docker network prune'
```

**Volume management:**
```bash
alias dv='docker volume'
alias dvi='docker volume inspect'
alias dvl='docker volume list'
alias dvp='docker volume prune'
```

**Image management:**
```bash
alias di='docker image'
alias dii='docker image inspect'
alias dil='docker image list'
alias dip='docker image prune'
```

**Other commands:**
```bash
alias ds='docker stats'
alias dl='docker logs'
alias dsys='docker system'
alias dprune='docker system prune -af'
```

## Persistent storage

Persistent data and configuration are stored using bind mounts. For single-service directories, I typically use `./data` and `./config`. When a directory houses multiple services, I follow a naming convention like `./[service]_data` and `./[service]_config` to keep things organized and predictable.

Using bind mounts also simplifies file ownership and permissions—everything is owned by my local user, which avoids the usual UID/GID headaches that come with volume-based storage.

Backups are handled with [Kopia](https://kopia.io/) on a scheduled, rotating basis. Since the data lives in clearly defined directories, it's easy to target only what's needed for backup without worrying about Docker-specific paths or permissions. This setup keeps my containers stateless and my data safe.

## Environment variables

I try to keep all environment variables within `.env` files located in each service directory. This keeps the configuration specific to each service organized and easy to update without worrying about conflicts across different parts of the stack.

In addition to these service-specific `.env` files, there’s a main `.env` file in the root containers directory that defines common environment variables like `PUID`, `PGID`, and `TZ`. These are used globally across all containers to ensure consistent user permissions and timezone settings.

## Security Considerations

### Sensitive config

Where possible, I store sensitive configurations like API keys and passwords in Docker secrets. This ensures sensitive data is kept out of version control and adds an extra layer of security by keeping secrets in Docker’s managed storage.

### User/group permissions

I use PUID and PGID environment variables so that containers that support it (like images from [linuxserver.io](linuxserver.io)) run as the specified user automatically. This also allows me to use the following for other containers:

```yaml
user: ${PUID}:${PGID}
```

If an image does not support setting UID/GID, I build a custom image to modify the UID/GID. This ensures that the containers run with the same user permissions as my local user, preventing permission issues and minimizing security risks.

### Read-only containers

Whenever possible, I configure containers to use a read-only filesystem, preventing unauthorized or malicious modifications. I mount only necessary directories as read-write (e.g., `./data` and `./config`) and use read-only bind mounts wherever possible to minimize the attack surface and further reduce the risk of a container being compromised.

### Networking

By default, I avoid using Docker’s default network to prevent unintended inter-container communication. Instead, I define explicit networks to tightly control access between services. I also disable inter-container communication on Docker's default network to prevent any possible unintentional communication.

For inter-container dependencies (e.g., Redis for Authelia) I use `[service]-internal` networks. These networks isolate backend components from the network at large.

When a service needs to be exposed via the web, it’s placed in a `[service]-external` network. Traefik, my reverse proxy, is also connected to these external networks, allowing it to route traffic as needed. This setup ensures that only Traefik can access the exposed services, while preventing other containers from communicating with them directly, adding an extra layer of isolation and security.

### Resource limits

To prevent any single container from over-utilizing system resources, I use the `deploy:` key in my compose files to set memory and CPU limits. This ensures that runaway processes or poorly behaved containers don't starve the rest of the system.

By defining `memory` and `cpus` under `deploy.resources.limits`, I can contain resource usage at the container level, improving system stability and predictability—especially important on resource-constrained hosts or when running many services concurrently.

I also set `ulimits` where appropriate—particularly for things like file descriptors or core dumps—to add another layer of control over container behavior. Combined with memory and CPU constraints, this helps enforce predictable resource usage across my stack.

```yaml
services:
  myservice:
    image: example/image
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: "4"
    ulimits:
      nofile:
        soft: 1024
        hard: 2048
```

## Conclusion

This Docker setup has evolved through trial, error, and practical needs—aimed at being secure, modular, and maintainable. By organizing services clearly, enforcing sensible defaults, and applying best practices like resource limits and network isolation, I’ve built a system that’s easy to manage and resilient to common issues. It’s not perfect, but it’s pragmatic, and it works well for the complexity of a real-world self-hosted environment.
