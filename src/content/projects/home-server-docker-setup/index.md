---
date: 2025-03-19T05:00:56-06:00
title: Home network & Docker setup
description: My home network is a self-hosted environment designed for automation, media management, and system orchestration. It runs a Docker-based infrastructure that leverages various containerized services for AI-powered automation, notifications, and home management.
tags:
  - Docker
  - MongoDB
  - NGINX
  - Traefik
---
## **Overview**

*This is a work in progress as I get everything documented.*

My home network is a self-hosted environment designed for automation, media management, and system orchestration. It runs a Docker-based infrastructure that leverages various containerized services for AI-powered automation, notifications, and home management.

**The primary goals of this setup are:**

- Scalability & security
- Self-sufficiency & DevOps practices
- Efficient container management
- Automation & AI integration

This project highlights my network and server administration skills, DevOps mindset, and ability to integrate diverse technologies into a cohesive, reliable system.

## **Infrastructure & architecture**

My home network setup is built on a 3-server setup: The border router runs OPNsense and provides DNS, DHCP, and mail services to the LAN. The other two servers run Ubuntu with Docker Compose managing containerized services. The architecture is designed for modularity, automation, and ease of management, following DevOps best practices.

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

- OPNsense server
- Provides routing, firewall, physical separation of IoT network, DNS, DHCP, and SMTP services for LAN
- **Hardware:** Topton 4x i226-V 2.5Gbps micro firewall
  - **CPU:** Intel® Celeron® J4125
  - **GPU:** Integrated Intel® UHD
  - **RAM:** 8GB
  - **Drives:**
    - **128GB internal NVMe** – host OS

## **Docker services**

### **Primary server**

#### Smart home & automation

- **Home Assistant** – used to manage smart home, provide entities to Node-RED with which it can interact, and provide UI for interacting with smart home devices
- **Node-RED** – powers event-driven smart home automation
- **MQTT** – used to communicate with Zigbee devices via Zigbee2MQTT and as messaging queue for Node-RED automations
- **Zigbee2MQTT** – used to bridge Zigbee devices with MQTT for integration into Home Assistant
- **Z-Wave JS UI** – integrates Z-Wave devices into Home Assistant
- **ESPHome** – allows easy programming of ESP32 devices and greatly simplifies integration with Home Assistant
- **eufy-security-ws** – used to integrate Eufy Security cameras into Home Assistant for event notifications and camera images
- **MediaMTX** – provides interface to Eufy Security cameras for streaming live video

#### AI & computer vision

- **YOLO API (trash can detection)** – detects trash cans in security footage for automation
- **YOLO API (object detection)** – detects objects in security camera images to verify detections made by the security system's built-in AI
- **Piper** – locally-hosted text-to-speech (TTS) service used for audible announcements on smart speakers

#### Monitoring & data storage

- **InfluxDB** – stores Home Assistant entity history as well as Telegraf data for processing and graphing in Grafana
- **Telegraf** – scrapes data from Ubuntu host and other services and stores data in InfluxDB buckets for later processing/graphing with Grafana
- **Grafana** – provides dashboard for viewing graphed data from InfluxDB
- **Scrutiny** – provides web UI for S.M.A.R.T. hard drive monitoring tool as well as email notifications when an issue has been detected

#### Networking & security

- **Traefik** – handles domain-based routing, SSL termination, and service discovery
- **CloudFlare Tunnel** – provides selective public access to services behind CG-NAT and firewall
- **fail2ban** – bans abusive IP addresses based on log entries from a number of services
- **Authelia** – provides authentication for web-based services that do not have their own built-in authentication (authenticates against LDAP backend)
- **NGINX** – web server used behind Traefik reverse proxy for CDN and core web server functionality in development projects
- **Acme.sh** – automatically renews SSL certificates with Let's Encrypt

#### Databases & caching

- **Redis** – provides object storage to other containers for caching and session management
- **MongoDB** – used for services requiring NoSQL storage
- **MariaDB** – used for services requiring SQL-based relational database storage
- **PostgreSQL** – used for services requiring Postgres-specific relational database storage
- **phpMyAdmin** – provides web UI for managing MariaDB/MySQL

#### Media & file management

- **Jellyfin** – provides locally-hosted media server (think Netflix but local) for streaming movies and TV shows, listening to music, reading books, and reading comic books
- **Jellysearch** – provides fast full-text search for Jellyfin by proxying search queries from Jellyfin to Jellysearch's Meilisearch database
- **FileFlows** – distributed, automated conversion of media files into a standardized format for ingestion into Jellyfin
- **Samba** – shares files on server with Mac/Windows/Linux clients using CIFS protocol
- **Avahi** – provides ZeroConf for Samba server so shares show up automatically in GUI clients

#### Backup & system maintenance

- **Kopia** – network-connected backup system providing centralized backups to multiple servers and user devices on the LAN
- **Diun** – sends emails when a Docker image update has been detected

#### Productivity & self-hosting

- **Obsidian Sync** – locally-hosted synchronization service for Obsidian note-taking app (replacement for stock Notes app on iPhone)
- **NextCloud** – provides web-based file access (think Google Drive), client file sync (think Dropbox), calendar/tasks/contacts sync, and OpenID Connect (OIDC) services for SSO (authenticates against LDAP backend)
- **Caldera Office** – provides web-based document editing similar to Microsoft Office 365/Google Docs to NextCloud
- **Light LDAP (LLDAP)** – provides single source of truth for user identity and authentication for other containers
- **Outline** – self-hosted tool for managing notes and projects (think Microsoft Loop or Notion)
  - runs its own instance of Redis and Postgres as part of compose stack
- **Bookstack** – self-hosted tool for managing notes and projects similar to Outline (potentially deprecating Bookstack and switching); currently used to document network setup as well as household management in the event of my death (e.g., location of water shut-offs, circuit breaker, items to remember when winterizing house, odd quirks about the house, etc.)

### **Secondary server**

#### AI & computer vision

- **Whisper web service** – API interface to faster-whisper for transcribing audio (e.g., creating subtitles for movies without subs)

#### Monitoring & data storage

- **Telegraf** – scrapes data from Ubuntu host and other services and stores data in InfluxDB buckets (on primary server) for later processing/graphing with Grafana
- **Scrutiny** – provides web UI for S.M.A.R.T. hard drive monitoring tool as well as email notifications when an issue has been detected

#### Databases & caching

- **Redis** – provides object storage to other containers for caching and session management
- **MariaDB** – used for services requiring SQL-based relational database storage
- **PostgreSQL** – used for services requiring Postgres-specific relational database storage

#### Backup & system maintenance

- **Kopia** – connects to Kopia instance on primary server for storage
- **Diun** – sends emails when a Docker image update has been detected

#### Media & file management

- **Samba** – shares files on server with Mac/Windows/Linux clients using CIFS protocol
- **Avahi** – provides ZeroConf for Samba server so shares show up automatically in GUI clients
- **Jellyseerr** – user-friendly request site to automate adding movies/shows to Jellyfin
- **Jellystat** – provides statistics on Jellyfin server usage
- **Bazarr** – downloads subtitles for movies/shows missing subtitles; utilizes Whisper web service to transcribe audio using AI

#### Productivity & self-hosting

- **Vaultwarden** – password manager; open source implementation of Bitwarden server
- **This website** – this very website is hosted on my secondary server
- **Photography website** – WordPress site running WooCommerce and an instance of MariaDB
- **Mealie** – self-hosted recipe website
- **OwnTone** – daapd server (iTunes media server) allowing Apple's Music app to access Jellyfin music natively
- **Plausible** – self-hosted website analytics that's watching you right now
- **Github actions API** – small API I developed to accept incoming webhooks from Github actions to perform deployments locally
