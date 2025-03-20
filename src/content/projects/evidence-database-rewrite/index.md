---
date: 2025-03-18T11:00:56-06:00
title: Evidence database for law enforcement – Node.js/MongoDB rewrite
description: This project is a full rewrite of an evidence database originally built with PHP and MySQL, transitioning it to Node.js and MongoDB for improved performance, a simplified architecture, and hands-on learning.
images:
  - /projects/evidence-database/uml.svg
github: https://github.com/jesse-kaufman/evidencedb/tree/main/node-only
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
- **Rethink the schema** – Optimized data storage and relationships, taking advantage of MongoDB's document storage model
- **Improve performance** – The original version relied on a **massive SQL join** that caused significant slowdowns in search and initial rendering
- **Simplify the tech stack** – Eliminated the need for a separate web server for backend logic

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

**Improved attachment handling** – The original system required a separate table for attachments. With MongoDB, attachments were stored as sub-documents in an array, eliminating the need for extra queries.

## New features & enhancements

**Optional screenshots** – Each communication record can now include related screenshots (stored as sub-documents in an array)

## Collection: `evidencedb.items`

This collection contains each evidence item in a document with optional sub-documents for attachments. The type field designates which type of evidence the document represents. See below for an explanation of the fields for each evidence item type.

### Text (SMS) item document

| Field         | Type     | Description                                       |
|---------------|----------|---------------------------------------------------|
| `_id`         | ObjectId | unique ID                                         |
| `type`        | String   | set to "text" for text evidence items             |
| `date_sent`   | Date     | date communication was sent                       |
| `from`        | String   | phone number from which message was sent          |
| `from`        | String   | phone number to which message was sent            |
| `victim`      | String   | victim involved in communication ("name 1", "name 2", or "both") |
| `direction`   | String   | direction of message (IN = sent to victim; OUT = sent from victim) |
| `body`        | String   | body of text                                      |
| `hash`        | String   | MD5 used to detect potential duplicates           |
| `attachments[]`     | \[[Attachment](#attachment-sub-document)\]    | *optional;* array of attachments sent with text              |
| `screenshots[]`     | \[String\]    | *optional;* array of screenshots of text              |

#### Example text

```json
{
  "_id": {
    "$oid": "65ff2e11343226efa0287146"
  },
  "type": "text",
  "date_sent": {
    "$date": "2023-08-22T13:39:34.000Z"
  },
  "from": "1231231234",
  "to": "3213213214",
  "victim": "jesse",
  "direction": "IN",
  "body": "This is the body.",
  "hash": "b624d11209456afeda71e3b4115cff33",
  "date": "2023-08-22T13:39:34.000Z",
  "attachments": [
    {
      "filename": "e24c6401-1373-4b0a-a05f-4778b7e5c6b4.jpeg"
    }
  ]
}
```

#### Example with screenshots

```json
{
  "_id": {
    "$oid": "65ff2e40343226efa0287563"
  },
  "type": "text",
  "date_sent": {
    "$date": "2023-09-16T23:32:41.000Z"
  },
  "from": "1231231234",
  "to": "3213213215",
  "victim": "name2",
  "direction": "IN",
  "body": "This is the body.",
  "hash": "a5c986d885533a4df221dc78130040d9",
  "date": "2023-09-16T23:32:41.000Z",
  "screenshots": [
    "379316872_824393575817148_824374480860275657_n.webp"
  ]
}
```

#### Example with attachments

```json
{
  "_id": {
    "$oid": "65ff2e40343226efa0287360"
  },
  "type": "text",
  "date_sent": {
    "$date": "2023-09-30T20:34:42.000Z"
  },
  "from": "1231231234",
  "to": "3213213214",
  "victim": "name1",
  "direction": "IN",
  "body": "This is the body of the text.",
  "hash": "3261d123216816ad52af8238bd8222c7",
  "date": "2023-09-30T20:34:42.000Z",
  "attachments": [
    {
      "filename": "9a486dd4-4b90-4135-8b2f-5f04bbd0acc3.jpeg"
    },
    {
      "filename": "81dceafa-ac72-4492-b046-34171e416485.jpeg"
    },
    {
      "filename": "53dce01a-569a-41f9-9a4c-618fa6032c54.jpeg"
    }
  ]
}
```

### Email item document

| Field         | Type     | Description                                       |
|---------------|----------|---------------------------------------------------|
| `_id`         | ObjectId | unique ID                                         |
| `type`        | String   | set to "email" for email evidence items           |
| `date_sent`   | Date     | date communication was sent                       |
| `from`        | String   | email address from which message was sent         |
| `to`          | String   | email address to which message was sent           |
| `victim`      | String   | victim involved in communication ("name 1", "name 2", or "both") |
| `direction`   | String   | direction of message (IN = sent to victim; OUT = sent from victim) |
| `subject`     | String   | subject line from email                           |
| `body`        | String   | text-only body of email                           |
| `body_html`   | String   | HTML body of email (if applicable)                |
| `message_id`  | String   | used in path to attachments to prevent filename collisions |
| `hash`        | String   | MD5 used to detect potential duplicates           |
| `attachments[]`     | \[[Attachment](#attachment-sub-document)\]    | *optional;* array of attachments sent with email              |
| `screenshots[]`   | \[String\] | *optional;* array of strings of screenshot filenames |

#### Example email

```json
{
  "_id": {
    "$oid": "65ff2e11343226efa0287146"
  },
  "type": "email",
  "date_sent": {
    "$date": "2023-10-10T04:48:15.000Z"
  },
  "from": "Stalker <stalker@example.com>",
  "to": "Victim <victim@example.com>",
  "victim": "jesse",
  "direction": "IN",
  "subject": "This is the subject line",
  "body": "This is the body of the email.",
  "body_html": "<p>This is the body of the email.</p>",
  "message_id": "<CAKebby+pQSD5WF4Pc-92OhHA2CCAu9Z597WDAe90xgn7ZbaAgw@mail.example.com>",
  "hash": "17bb3ffcbde942c86f17c2b67249dc10",
  "date": "2023-10-10T04:48:15.000Z"
}
```

### Voicemail item document

| Field             | Type     | Description                                     |
|-------------------|----------|-------------------------------------------------|
| `_id`             | ObjectId | unique ID                                       |
| `type`            | String   | set to "voicemail" for voicemail evidence items |
| `date_sent`       | Date     | date communication was sent                     |
| `from`            | String   | phone number from which message was sent        |
| `to`              | String   | phone number to which message was sent          |
| `victim`          | String   | victim involved in communication ("name 1", "name 2", or "both") |
| `direction`       | String   | direction of message (IN = sent to victim; OUT = sent from victim) |
| `body`            | String   | transcription of voicemail                      |
| `duration`        | String   | duration of voicemail in `hh:mm:ss` format      |
| `durationSeconds` | Number   | duration of voicemail in seconds                |
| `filename`        | String   | *deprecated,* filename of voicemail audio file  |
| `video_filename`   | String   | filename of video containing voicemail audio    |
| `hash`            | String   | MD5 used to detect potential duplicates         |
| `screenshots[]`   | \[String\] | *optional;* array of strings of screenshot filenames |

#### Example voicemail

```json
{
  "_id": {
    "$oid": "664d2f3efafb619e1608f341"
  },
  "type": "voicemail",
  "date_sent": {
    "$date": "2023-10-20T00:44:00.000Z"
  },
  "from": "1231231234",
  "to": "3213213214",
  "victim": "name1",
  "direction": "IN",
  "body": "0:01\nThis is the transcript\n0:04\nfor the video\n0:06\nevidence item.",
  "duration": "00:00:06",
  "filename": "2023-10-19_at_19.44_Voicemail_to_Name1.mp3",
  "durationSeconds": 6,
  "video_filename": "oct19-1944.mkv"
}
```

### Video item document

| Field             | Type     | Description                                              |
|-------------------|----------|----------------------------------------------------------|
| `_id`             | ObjectId | unique ID                                                |
| `type`            | String   | set to "video" for video evidence items                  |
| `date_sent`       | Date     | date video was posted                                    |
| `from`            | String   | YouTube account on which video was posted                |
| `direction`       | String   | direction of message (IN = sent to victim; OUT = sent from victim) |
| `title`           | String   | title of video on YouTube                                |
| `body`            | String   | automatic transcription of video from YouTube            |
| `duration`        | String   | duration of video in `hh:mm:ss` format                   |
| `durationSeconds` | Number   | duration of video in seconds                             |
| `filename`        | String   | filename of video for embedding in web interface         |
| `screenshots[]`   | \[String\] | *optional;* array of strings of screenshot filenames |

#### Example video

```json
{
  "_id": {
    "$oid": "664dfe8ffafb619e1608f366"
  },
  "type": "video",
  "date_sent": {
    "$date": "2023-08-18T05:00:00.000Z"
  },
  "title": "Title of video",
  "body": "0:01\nThis is the transcript\n0:04\nfor the video\n0:06\nevidence item.",
  "victim": "both",
  "duration": "00:03:33",
  "filename": "video1.mkv",
  "direction": "IN",
  "durationSeconds": 213
}
```

### Attachment sub-document

| Field      | Type   | Description                                              |
|------------|--------|----------------------------------------------------------|
| `filename` | String | filename of attachment                                   |

## Outcome

This rewrite resulted in a **faster, more maintainable, and scalable** system while significantly reducing the complexity of data retrieval. The migration process deepened my understanding of MongoDB schema design and Node.js programming **while reducing the initial load time by 50%**.
