---
date: 2025-03-18T11:00:56-06:00
title: Evidence database for law enforcement – Node.js/MongoDB rewrite
description: This is a rewrite of the initial evidence database project using Node.js/MongoDB instead of PHP/MySQL.
images:
  - /projects/evidence-database/uml.svg
tags:
  - Docker
  - Express.js
  - MongoDB
  - NGINX
  - Node.js
  - Pug.js
  - Traefik
---
## Overview

This project is a full rewrite of [an evidence database originally built with **PHP and MySQL**](../evidence-database/), transitioning it to **Node.js and MongoDB** for improved performance, a simplified architecture, and hands-on learning. The database aggregates **communication records** (texts, emails, social media messages, etc.) for use by law enforcement and the district attorney in an ongoing harassment case.

## Why the rewrite?

- **Learn Node.js & MongoDB** – Gained hands-on experience in a real-world project
- **Rethink the Schema** – Optimized data storage and relationships, taking advantage of MongoDB's document storage model
- **Improve Performance** – The original version relied on a **massive SQL join** that caused significant slowdowns in search and initial rendering
- **Simplify the Tech Stack** – Eliminated the need for a separate web server for backend logic

## Tech stack

- [**Docker**](https://www.docker.com) – provides containerization for MySQL and both NGINX instances
- [**Express.js**](https://expressjs.com/) – provides HTTP server in Node.js
- [**NGINX**](https://nginx.org/) – used as CDN to serve media files
- [**Node.js**](https://nodejs.org/) – provides logic for backend
- [**Pug.js**](https://pugjs.org/) – templating engine used with Express.js
- [**Traefik**](https://traefik.io/traefik/) - reverse proxy providing HTTPS

## Key challenges & solutions

**Date storage differences** – MySQL stored dates as **date-only fields** (with no time), while MongoDB uses **full JavaScript timestamps**. This required converting imported dates (originally imported as strings) into proper **Date objects** in bulk.

**Schema improvements** – Unlike SQL where each communication type (emails, texts, social posts) needed a separate table, MongoDB allowed all communication types in a single collection, storing only the necessary properties per document.

**Improved attachment handling** – The original system required a separate table for attachments. With MongoDB, attachments were stored as subdocuments in an array, eliminating the need for extra queries.

## New Features & Enhancements

**Optional screenshots** – Each communication record can now include related screenshots (stored as subdocuments in an array)

## Outcome

This rewrite resulted in a **faster, more maintainable, and scalable** system while significantly reducing the complexity of data retrieval. The migration process deepened my understanding of MongoDB schema design and Node.js programming **while reducing the initial load time by 50%**.
