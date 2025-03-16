---
date: 2025-03-14T10:00:56-06:00
title: Event-driven, asynchronous security camera notifications
description: This event-driven, asynchronous camera notification system processes motion events from security cameras, classifies and describes images, and sends notifications based on various detection types such as person, pet, vehicle, or motion.
images:
  - /projects/event-driven-camera-notifications/camera-dashboard.jpg
tags:
  - artificial intelligence
  - automation
  - Docker
  - Home Assistant
  - machine learning
  - MQTT
  - NGINX
  - Node-RED
---
## Overview

{{< figure src="/projects/event-driven-camera-notifications/mailman-dave.jpg" alt="Image of Known Person notification from Home Assistant" caption="Image of Known Person notification from Home Assistant" class="left small" >}}This event-driven, asynchronous camera notification system processes motion events from security cameras, classifies and describes images, and sends notifications based on various detection types such as person, pet, vehicle, or motion. Using a series of timeouts, MQTT messaging, and integration with machine learning models like [YOLO](https://www.ultralytics.com/yolo) and [Google Gemini](https://gemini.google.com), the system aims to enhance detection accuracy and provide real-time alerts. It is built around an event-driven architecture that ensures responsiveness and scalability. [Home Assistant](https://www.home-assistant.io) supplies the data and triggers for automations, notification platform, and dashboard, while [Node-RED](https://www.nodered.org) orchestrates the logic and executes the workflows.

*Yes, of course I am aware of the security implications of using cloud-based AI to describe the images. This was more of an experiment to see what's possible than anything. I'm working on finding a locally-hosted alternative that will provide the description detail I want in under 5 seconds.*

![Image of camera dashboard in Home Assistant](camera-dashboard.jpg)

## Key Features

- **Event-Driven Architecture**: The system uses event-driven principles to handle motion detection and image processing efficiently.
- **Image Verification**: YOLO and Google Gemini ensure accurate person detection and image description.
- **Asynchronous Processing**: Timeouts and event-based triggers allow for asynchronous, non-blocking operations.
- **Flexible Notification System**: Notifications are sent to all devices, with custom smart speaker announcements for person/known person events.

{{< figure src="/projects/event-driven-camera-notifications/latest-image-dashboard.jpg" alt="Image of latest camera images in Home Assistant" caption="Image of latest camera images in Home Assistant" class="rounded narrow" >}}

## Tech Stack

- [eufy-security-ws](https://github.com/bropat/eufy-security-ws) - integrates Eufy Security cameras into Home Assistant
- [Home Assistant](https://www.home-assistant.io) - provides interface to cameras and motion detections
- [Node-RED](https://www.nodered.org) - handles all logic for automations
- [YOLO](https://www.ultralytics.com/yolo) - provides AI-powered object detection
- [YOLO web service](https://github.com/JavierMtz5/YOLOv8-docker.git) - Provides web API interface for YOLO inside Docker container
- [Google Gemini](https://gemini.google.com) - provides detailed description of image
- [EMQX](https://www.emqx.com) - MQTT broker used for messaging
- [Labelme](https://labelme.io/) - used for labelling images for iterative learning

## Workflow & System Components

### 1. **Motion detection and initial event classification**

- The system listens for motion events from Eufy cameras via the Home Assistant (HA) binary sensors for motion, person, known person, pet, and vehicle.
- When any of these motion sensors are triggered, a motion event is classified based on the sensor type (e.g., person, pet, vehicle).
- The system sets a 5-second timeout after motion is detected:
  - If the image does not change within this timeout, it fires an `image_change_timed_out` event.
  - If the image changes within 2 seconds of the motion event, it fires an `image_changed` event and publishes this on the `cameras/[camera]/event` MQTT topic.

![Motion-detected flow section in Node-RED](motion-detected.jpg)

### 2. **Image change monitoring and download**

- A Home Assistant state change node monitors the camera's last event image for changes.
- When a change is detected, the system begins a timeout for downloading the image.
- After the image is downloaded, it is copied into the correct location for the camera’s last motion image entity.
- The timestamp for the last motion is updated, and a `download_complete` event is fired.
- Other flows, like [trash can detection](../ai-trash-detection/), listen for the `download_complete` event to trigger subsequent actions.

![Image-changed flow section in Node-RED](image-changed.jpg)

![Image download flow section in Node-RED](download-image.jpg)

### 3. **Image classification / verification with YOLO**

- When the `download_complete` event is triggered in MQTT, the image is sent to YOLO for classification, which is used to verify the camera’s person detection.
- If the event type is "person" and YOLO does not detect a person, the system changes the event type to a more generic "motion" event.
- A timeout is also set for this classification step.

![Image-downloaded flow section in Node-RED](image-downloaded.jpg)

### 4a. **Image description with Google Gemini**

- After the image is classified by YOLO, an `image_classified` event is triggered.
- The image is then sent to Google Gemini with a prompt (based on what was detected and verified by YOLO) for a description.
- Once the description is finished, it is saved to a Home Assistant text entity, and a `describe_complete` event is emitted.

![Image classification/verification flow section in Node-RED](image-classified.jpg)

### 4b. **Event-specific image handling**

- After the image is classified by YOLO, the image is copied into event-specific locations (if applicable), so Home Assistant has image entities for last motion, last person, last known person, last vehicle, and last pet, which can be used for notifications and dashboards.

![Image download flow section in Node-RED](specific-events.jpg)

### 5. **Timeout handling**

- If any of the steps (except the YOLO classification) times out, the system skips the remaining steps and moves on to the next one.
- If YOLO times out, the system proceeds directly to the description step without changing the event type.

### 6. **Notification**

- If the event type is "person", "known person", "pet", or "vehicle", a notification is sent to all devices.
- For "person" and "known person" events, an announcement is made on smart speakers in rooms where people are present.
- If the cameras recognize the person, the AI describe portion is skipped and "`[name]` spotted." is used as the description instead.

![Event notification flow section in Node-RED](send-notification.jpg)

## Future Improvements

- Support for image changes without related detection event
  - *Camera images occasionally update when a detection event did not occur and this would download those and update the latest camera's image without the describe or notification steps.*
- Support for multiple simultaneous detection types (e.g., image with a vehicle and person)
- Refinements to make the flow more asynchronous and modular—especially the portion that copies files into event-specific directories
- Reducing amount of data sent in payload / stored in flow context for improved memory efficiency

This system ensures that camera-triggered events are processed quickly and accurately, providing reliable notifications to users based on detected activity.
