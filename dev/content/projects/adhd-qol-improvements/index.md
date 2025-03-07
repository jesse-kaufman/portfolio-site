---
date: 2025-03-05T17:00:56-06:00
draft: false
title: ADHD Quality of Life enhancements through automation
description: ""
tags:
  - home-assistant
  - node-red
  - smart-home
---
## Food Left in Microwave Reminder

This automation ensures that food left in the microwave doesn't go unnoticed by leveraging smart home technology. The system operates as follows:

1. **Detecting microwave activity:** A smart plug monitors power usage to determine when the microwave is in use. If power consumption exceeds a defined threshold, the system marks the microwave as **"running."**

2. **Completion detection & initial notification:** When power usage drops below the threshold, the system waits **two seconds** for the microwave door to open:
   - If the door is opened within this window, the microwave is marked **"idle"** and no further action is taken.
   - If the door remains closed, the microwave is marked **"occupied,"** and a notification stating **"The microwave is done"** is sent to all home devices. Simultaneously, smart speakers announce the message in occupied rooms.

3. **Recurring reminders:** A **two-minute timer** starts. If the microwave door remains closed after the timer expires, a repeating notification is sent every two minutes: **"There's food in the microwave."**

4. **Clearing notifications on interaction:** Once the door is opened, any microwave notifications are cleared from devices to prevent clutter and notification fatigue.

This automation has reduced the amount of times I've forgotten about food in the microwave to **zero.**

### Tech Stack

This system is built using a combination of **smart home automation platforms, IoT devices, and messaging systems**:

- **[Node-RED](https://nodered.org/):** Manages automation logic and event handling.
- **[Home Assistant](https://www.home-assistant.io/):** Central hub for device management and automation orchestration.
- **[Zigbee2MQTT](https://www.zigbee2mqtt.io/):** Bridges Zigbee devices to MQTT for integration into Home Assistant.
- **Zigbee Contact Sensor:** Detects when the microwave door is opened.
- **Smart Outlet with Power Monitoring:** Tracks microwave power usage to determine its state.
- **Home Assistant Mobile App:** Delivers push notifications to devices.
- **Smart Speakers (e.g., Google Home, Amazon Echo):** Announce microwave status in occupied rooms.
- **[EMQX](https://www.emqx.com/):** Facilitates communication between Home Assistant and Zigbee devices (via Zigbee2MQTT).

This stack allows for **real-time event detection, recurring reminders with multiple alert levels (e.g., notice, critical, warning), and seamless smart home integration.**
