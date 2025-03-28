---
date: 2025-03-28T10:00:56-06:00
title: Networked time clock system
description: Originally developed as an internal tool, later expanded into a commercial product sold in Sam’s Club, featuring LAMP backend running on a custom Linux distribution, automated updates, and robust time-tracking capabilities.
tags:
  - Apache
  - Linux
  - MySQL
  - PHP
  - PyGTK
  - Python
---
*This article covers a project I developed around 2003 for my employer at the time. It showcases some of my early experience in full-stack development, system administration, and commercial software deployment.*

## Overview

As the sole developer, I designed and implemented a networked time clock system originally intended as an internal tool to track time for hourly warehouse employees. Over time, the system expanded to support all hourly employees within the company. I worked closely with HR to integrate reporting features (including taxes), eliminating the need for additional payroll software. Ultimately, the system was commercialized and sold in Sam’s Club stores as a turnkey time clock solution.

## Key features

### Server-side

- Developed using PHP and MySQL, running on a custom Fedora-based Linux distribution
  - *I also happened to be the sole manager of the distribution at the time.*
- Web-based GUI configuration wizard for easy setup
- Client and server operated on the same hardware; if no server was detected on boot, the system initialized one automatically
- Full time zone support for businesses with multi-location teams
- Support for both hourly employees and contractors

### Client-side

- Developed using PyGTK
- Auto-discovery of the server within the local network block
- Support for barcode scanners, magnetic strip scanners, and biometric authentication for clocking in and out
- Custom API for client-server communication

## Development timeline

### V0.0 **In-house project**

The first version was a simple in-house tool designed to reduce manual time-tracking costs. However, it had a critical flaw in its data structure: each clock-in and clock-out was stored as a separate record with a type of "in" or "out." While functional, this approach created major challenges for payroll calculations later down the road.

### V1.0 **Commercial expansion**

As reliance on the system grew, my manager recognized its potential as a marketable product. The company decided to sell it as a turnkey solution through Sam’s Club. At this stage, I started a major database refactor for version 2.0 to resolve the schema issue. However, some early units were sold before the refactor was completed.

### V2.0 **Core schema redesign**

To ensure a seamless transition, I implemented an update system leveraging our controlled Linux distribution. The system would pull updates from a dedicated server, automatically install them, and migrate data from the older schema to the improved version. This allowed for a smooth upgrade path without disrupting operations or any need for manual intervention.

## Reflections and takeaways

This project was one of my earliest large-scale developments, giving me hands-on experience with:

- Full-stack development, including both frontend and backend architecture
- Linux distribution build and management
- API design and client-server communication
- Designing and maintaining a commercial software product at scale
