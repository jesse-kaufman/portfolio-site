---
date: 2025-03-19T05:00:56-06:00
title: Home server & Docker services setup
description: My home network is a self-hosted environment designed for automation, media management, and system orchestration. It runs a Docker-based infrastructure that leverages various containerized services for AI-powered automation, notifications, and home management.
params:
  images:
    - grafana-dashboard-server.jpg
tags:
  - Docker
  - MongoDB
  - NGINX
  - Traefik
---
## **Overview**

{{< figure src="grafana-dashboard-internet.jpg" alt="Grafana dashboard for monitoring Internet connection stats" caption="Grafana dashboard for monitoring Internet connection stats" class="right" >}}

*This is a work in progress as I get everything documented.*

My home network is a self-hosted environment designed for automation, media management, and system orchestration. It runs a Docker-based infrastructure that leverages various containerized services for AI-powered automation, notifications, and home management.

**The primary goals of this setup are:**

- Scalability & security
- Self-sufficiency
- Efficient container management
- Automation & AI integration

This project highlights my network and server administration skills, DevOps mindset, and ability to integrate diverse technologies into a cohesive, reliable system.

## **Hardware**

{{< figure src="grafana-dashboard-server.jpg" alt="Grafana dashboard for monitoring server resources" caption="Grafana dashboard for monitoring server resources" class="right" >}}

My home network setup is built on a 3-server setup: The border router runs OPNsense and provides DNS, DHCP, and mail services to the LAN. The other two servers run Ubuntu with Docker Compose managing containerized services.

### Primary server

- Ubuntu server running Docker compose to manage containerized services
- Provides core network services
- **Hardware:** Beelink SER5 5560U Mini PC
  - **CPU:** AMD Ryzen™ 5560U
  - **GPU:** Integrated Radeon Vega 7
  - **RAM:** 48GB
  - **Drives:**
    - **500GB internal NVMe** – host OS and supplemental storage
    - **256GB internal SDD** – container data storage
    - **4TB external HDD** – media/file server storage
    - **8TB external HDD** – centralized backup storage

### Secondary server

- Ubuntu server running Docker compose to manage containerized services
- Provides supplemental services and hosts personal websites
- **Hardware:** Beelink MINI S12 Pro
  - **CPU:** Intel® N100
  - **GPU:** Integrated Intel® UHD
  - **RAM:** 16GB
  - **Drives:**
    - **500GB internal SATA3 SSD** – host OS and general storage
    - **2TB external SSD** – primary media and file storage

### Border router

- OPNsense
- Provides routing, firewall, physical separation of IoT network, DNS, DHCP, and SMTP services for LAN
- **Hardware:** Topton 4x i226-V 2.5Gbps micro firewall
  - **CPU:** Intel® Celeron® J4125
  - **GPU:** Integrated Intel® UHD
  - **RAM:** 8GB
  - **Drives:**
    - **128GB internal NVMe** – host OS

## **Docker services**

{{< figure src="grafana-dashboard-server.jpg" alt="Grafana dashboard displaying container resource usage overview for primary server" caption="Grafana dashboard displaying container resource usage overview for primary server" class="right" >}}

These are the services (non-comprehensive) that are provided by Docker on the primary and secondary Linux servers.

### **Primary server**

#### Smart home & automation

- [Home Assistant](https://www.home-assistant.io) – used to manage smart home, provide entities to Node-RED with which it can interact, and provide UI for interacting with smart home devices
- [Node-RED](https://www.nodered.org) – powers event-driven smart home automation
- [EMQX](https://github.com/emqx/emqx) – MQTT broker used to communicate with Zigbee devices via Zigbee2MQTT and as messaging queue for Node-RED automations
- [Zigbee2MQTT](https://www.zigbee2mqtt.io) – used to bridge Zigbee devices with MQTT for integration into Home Assistant
- [Z-Wave JS UI](https://github.com/zwave-js/zwave-js-ui) – integrates Z-Wave devices into Home Assistant
- [ESPHome](https://esphome.io/) – allows easy programming of ESP32 devices and greatly simplifies integration with Home Assistant
- [eufy-security-ws](https://github.com/bropat/eufy-security-ws) – used to integrate Eufy Security cameras into Home Assistant for event notifications and camera images
- [MediaMTX](https://github.com/bluenviron/mediamtx) – provides interface to Eufy Security cameras for streaming live video

#### AI & computer vision

- **[YOLO API](https://github.com/JavierMtz5/YOLOv8-docker) (trash can detection)** – provides API to YOLO instance that detects trash cans in security camera images
- **[YOLO API](https://github.com/JavierMtz5/YOLOv8-docker) (object detection)** – provides API to YOLO instance that detects objects in security camera images to verify detections made by the security system's built-in AI
- [Ultralytics YOLO11](https://github.com/ultralytics/ultralytics) – deep learning model providing fast and accurate real-time object detection and image segmentation
- [Piper](https://github.com/rhasspy/piper) – locally-hosted text-to-speech (TTS) service used for audible announcements on smart speakers

#### Monitoring

- [Telegraf](https://github.com/influxdata/telegraf) – scrapes data from Ubuntu host and other services and stores data in InfluxDB buckets for later processing/graphing with Grafana
- [Grafana](https://github.com/grafana/grafana) – provides dashboard for viewing graphed data from InfluxDB and MariaDB databases
- [Scrutiny](https://github.com/AnalogJ/scrutiny) – provides web UI for S.M.A.R.T. hard drive monitoring tool as well as email notifications when an issue has been detected

#### Networking & security

- [CloudFlare](https://www.cloudflare.com) Tunnel – provides selective public access to services behind CG-NAT and firewall
- [fail2ban](https://github.com/fail2ban/fail2ban) – bans abusive IP addresses based on log entries from a number of services
- [Authelia](https://www.authelia.com/) – provides authentication for web-based services that do not have their own built-in authentication (authenticates against LDAP backend)
- [NGINX](https://www.nginx.org) – web server used behind Traefik reverse proxy for CDN and core web server functionality in development projects
- Acme.sh – automatically renews SSL certificates with Let's Encrypt

#### Databases & caching

- [Redis](https://github.com/redis/redis) – provides object storage to other containers for caching and session management
- [MongoDB](https://www.mongodb.com/) – used for services requiring NoSQL storage
- [MariaDB](https://www.mariadb.org) – used for services requiring SQL-based relational database storage
- [InfluxDB](https://github.com/influxdata/influxdb) – stores Home Assistant entity history as well as Telegraf data for processing and graphing in Grafana
- [PostgreSQL](https://www.postgresql.org/) – used for services requiring Postgres-specific relational database storage
- [phpMyAdmin](https://www.phpmyadmin.net/) – provides web UI for managing MariaDB/MySQL

#### Media & file management

- [Jellyfin](https://www.jellyfin.org/) – provides locally-hosted media server (think Netflix but local) for streaming movies and TV shows, listening to music, reading books, and reading comic books
- [Jellysearch](https://gitlab.com/DomiStyle/jellysearch) – provides fast full-text search for Jellyfin by proxying search queries from Jellyfin
  - *uses dedicated instance of Meilisearch*
- [FileFlows](https://www.fileflows.org/) – distributed, automated conversion of media files into a standardized format for ingestion into Jellyfin
- [Samba](https://www.samba.org/) – shares files on server with Mac/Windows/Linux clients using CIFS protocol
- [Avahi](https://avahi.org/) – provides ZeroConf/mDNS for Samba server so shares show up automatically in GUI clients

#### Backup & system maintenance

- [Kopia](https://kopia.io/) – network-connected backup system providing centralized backups to multiple servers and user devices on the LAN
- [Diun](https://crazymax.dev/diun/) – sends emails when a Docker image update has been detected
- [dockcheck-web](https://github.com/Palleri/DCW) – web UI to see which Docker images have updates available

#### Productivity & self-hosting

- [NextCloud](https://nextcloud.com) – provides web-based file access (think Google Drive), client file sync (think Dropbox), calendar/tasks/contacts sync, and OpenID Connect (OIDC) services for SSO (authenticates against LDAP backend)
  - *uses centralized MariaDB container instance*
- [Collabora Online](https://www.collaboraonline.com/) – provides web-based document editing to NextCloud (similar to Microsoft Office 365/Google Docs)
- [Light LDAP (LLDAP)](https://github.com/lldap/lldap) – provides single source of truth for user identity and authentication for other containers
- [Outline](https://github.com/outline/outline) – self-hosted tool for managing notes and projects (think Microsoft Loop or Notion)
  - *uses dedicated Redis and Postgres containers for isolation and security*
- [Bookstack](https://www.bookstackapp.com/) – self-hosted tool for managing notes and projects similar to Outline (*potentially deprecating Bookstack and switching*); currently used to document network setup as well as household management in the event of my death (e.g., location of water shut-offs, circuit breaker, items to remember when winterizing house, odd quirks about the house, etc.)

### **Secondary server**

#### AI & computer vision

- [Whisper ASR Box](https://github.com/ahmetoner/whisper-asr-webservice) – web API interface for [faster-whisper](https://github.com/SYSTRAN/faster-whisper) to transcribe audio using AI (e.g., creating subtitles for movies without subs)

#### Monitoring

- [Telegraf](https://github.com/influxdata/telegraf) – scrapes data from Ubuntu host and other services and stores data in InfluxDB buckets for later processing/graphing with Grafana
- [Scrutiny](https://github.com/AnalogJ/scrutiny) – provides web UI for S.M.A.R.T. hard drive monitoring tool as well as email notifications when an issue has been detected

#### Databases & caching

- [Redis](https://github.com/redis/redis) – provides object storage to other containers for caching and session management
- [MariaDB](https://www.mariadb.org) – used for services requiring SQL-based relational database storage
- [PostgreSQL](https://www.postgresql.org/) – used for services requiring Postgres-specific relational database storage

#### Backup & system maintenance

- [Kopia](https://kopia.io/) – network-connected backup system providing centralized backups to multiple servers and user devices on the LAN
- [Diun](https://crazymax.dev/diun/) – sends emails when a Docker image update has been detected
- [dockcheck-web](https://github.com/Palleri/DCW) – web UI to see which Docker images have updates available

#### Media & file management

- [Samba](https://www.samba.org/) – shares files on server with Mac/Windows/Linux clients using CIFS protocol
- [Avahi](https://avahi.org/) – provides ZeroConf/mDNS for Samba server so shares show up automatically in GUI clients
- [Jellystat](https://github.com/CyferShepard/Jellystat) – provides statistics on Jellyfin server usage
  - *uses dedicated PostgreSQL container instance for isolation and security*
- [Bazarr](https://www.bazarr.media/) – downloads subtitles for movies/shows missing subtitles; also utilizes Whisper web service to transcribe audio using AI

#### Productivity & self-hosting

- [Vaultwarden](https://github.com/dani-garcia/vaultwarden) – password manager; open source implementation of Bitwarden server
- [This website](https://www.jessekaufman.com/) – this very website is hosted on my secondary server
- [Photography website](https://shop.jessekaufman.com/) – WordPress site running WooCommerce
  - *uses dedicated Mariadb container instance for isolation and security*
- [Mealie](https://mealie.io/) – self-hosted recipe management
- [OwnTone](https://owntone.github.io/owntone-server/) – daapd server (iTunes media server) allowing Apple's Music app to access Jellyfin music natively
- [Plausible](https://github.com/plausible/analytics) – self-hosted website analytics that's watching you right now
  - *uses dedicated PostgreSQL container instance for isolation and security*
- [Github actions API](https://github.com/jesse-kaufman/githup-actions-api) – small API I developed to accept incoming webhooks from Github actions to perform deployments locally
