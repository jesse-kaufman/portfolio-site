---
date: 2025-03-07T17:00:56-06:00
title: Home Assistant container microservices setup
description: This project leverages Docker containers to create a scalable and efficient home automation system with microservices for seamless integration, management, and control of various smart devices and services.
images:
  - /projects/home-assistant-containers/home-assistant-containers.jpg
tags:
  - Docker
  - Home Assistant
  - MQTT
  - MySQL
  - Node-RED
  - smart home
  - Traefik
  - Zigbee
---
{{< figure src="/projects/home-assistant-containers/home-assistant-dashboard.jpg" alt="Primary Home Assistant dashboard view." caption="Primary Home Assistant dashboard view." class="right small" >}}

This project leverages Docker containers to create a scalable and efficient home automation system with microservices for seamless integration, management, and control of various smart devices and services.

**Diagram of Docker containers covered in this project**:
{{< figure src="/projects/home-assistant-containers/home-assistant-containers.jpg" alt="Docker container setup for home automation system." caption="Docker container setup for home automation system." class="rounded" >}}

## Home Assistant (HA) container

- The central hub of the setup, Home Assistant (HA) manages and automates interactions with smart devices throughout the home.
- Configured in host mode to enable auto-discovery of devices, ensuring smooth integration.
- The web UI is secured and only accessible through a reverse proxy with HTTPS.

## ESPHome container

- ESPHome is used to interact with ESP32 devices, enabling advanced automation and sensor functionality.
- Located in a private Docker network with a Traefik reverse proxy for secure HTTPS access.
- Home Assistant connects to ESPHome through this proxy, facilitating seamless communication between the two.

## Node-RED container

- Node-RED drives the home automation workflows with its event-driven philosophy.
- Powers the actual automations and connects to Home Assistant via a discrete Docker network.
- The Node-RED web UI is secured using Authelia with LDAP for authentication and accessible via reverse proxy.
- Uses MQTT for communication with Zigbee devices and internal event messaging, further enhancing the event-driven nature of the automations.

## Zigbee2MQTT and MQTT containers

- Zigbee2MQTT (Z2M) acts as the intermediary between Zigbee devices and MQTT, allowing integration of Zigbee devices into the Home Assistant ecosystem.
- The MQTT container (running EMQX) facilitates communication between Z2M and Home Assistant, using SSL over TCP for secure messaging.
- The Z2M web UI is secured using Authelia with LDAP for authentication and accessible via reverse proxy.
- These containers are organized into discrete Docker networks to ensure isolation and security.

## NextCloud container

- NextCloud is used by Home Assistant for managing CalDAV calendars, which are integral to scheduling events such as appointments, school days, and trash collection.
- Interacts with the MariaDB container for database storage.
- Both NextCloud and its database are secured behind a reverse proxy with distinct networks, ensuring secure access to the web UIs and the services they provide.

## MariaDB container

- MariaDB serves as the database backend for NextCloud, storing essential data for calendar management and automation scheduling.
- The database is isolated in its own discrete Docker network shared only with the phpMyAdmin and NextCloud containers.
- The phpMyAdmin container, also accessible via the reverse proxy, provides a secure interface for managing the database.

## InfluxDB container

- InfluxDB is used by Home Assistant to store historical data for graphing and visual analysis via Grafana.
- Home Assistant connects to InfluxDB over HTTPS through a reverse proxy container, ensuring encrypted data transfer and secure access to historical records.

## Eufy Security container

- This container facilitates the integration of Eufy security cameras with Home Assistant.
- Provides video streaming and motion/person detection notifications.
- Home Assistant connects to the Eufy security container via an open port on 127.0.0.1 for local communication.

## CloudFlare Tunnel container

- The CloudFlare Tunnel container is used to securely allow public access to certain services on the local network—even when behind CG-NAT.
- Restricts and filters traffic to protect the network, ensuring only specific services are publicly available and blocking potential malicious access to local services.

## Additional Notes

- Each containerized microservice is carefully isolated within its own Docker network to optimize both performance and security.
- Traefik reverse proxies are used to secure access to the web UIs, providing HTTPS encryption and simplifying traffic management between services.
- This containerized architecture facilitates seamless expansion and modification of the home automation system as new devices and services are integrated.
- Services that don't have built-in login capabilities rely on Authelia, which authenticates using LDAP, ensuring secure access and a unified login experience with a single password.
- Services with native LDAP support authenticate against the local LDAP server, ensuring secure access and providing the convenience of a single password for all services.

---

## Summary

This project demonstrates a robust home automation setup using Docker containers to orchestrate a collection of microservices. Each service is carefully isolated in its own containerized environment to ensure optimal performance and security. Security is prioritized through the use of Traefik reverse proxies for secure HTTPS access, with LDAP authentication and Authelia providing streamlined and secure login capabilities across services. This modular, containerized approach allows for easy expansion and modification of the system as new devices and services are added.
