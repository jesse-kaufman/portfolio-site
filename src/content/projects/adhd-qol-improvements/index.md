---
date: 2025-03-04T17:00:56-06:00
title: ADHD Quality of Life enhancements
description: Two smart home automations designed to improve daily life in a neurodivergent household—intelligent reminders to prevent food from being forgotten in the microwave and wet clothes from sitting in the washer.
images:
  - food-in-microwave-notification.jpg
tags:
  - Home Assistant
  - MQTT
  - Node-RED
  - smart home
  - Zigbee
---
<!-- no toc -->
- [Food left in microwave reminders](#food-left-in-microwave-reminders)
- [Wet clothes in washer reminders](#wet-clothes-in-washer-reminders)

## **Food left in microwave reminders**

{{< figure src="/projects/adhd-qol-improvements/food-in-microwave-notification.jpg" alt="Notification sent by Home Assistant companion app." caption="Notification sent by Home Assistant." class="left rounded" >}}

This automation ensures that food left in the microwave doesn't go unnoticed by leveraging smart home technology. The system operates as follows:

1. **Detecting microwave activity** – a smart plug monitors power usage to determine when the microwave is in use. If power consumption exceeds a defined threshold, the system marks the microwave as **"running"**

2. **Completion detection & initial notification** – when power usage drops below the threshold, the system waits **two seconds** for the microwave door to open:
   - If the door is opened within this window, the microwave is marked **"idle"** and no further action is taken
   - If the door remains closed, the microwave is marked **"occupied,"** and a notification stating *"The microwave is done"* is sent to all home devices. Simultaneously, smart speakers announce the message in occupied rooms

3. **Recurring reminders** – a two-minute timer starts. If the microwave door remains closed after the timer expires, a repeating notification is sent every two minutes: *"There's food in the microwave"*

4. **Clearing notifications on interaction** – once the door is opened, any microwave notifications are cleared from devices to prevent clutter and notification fatigue

{{< figure src="/projects/adhd-qol-improvements/food-in-microwave-flow.jpg" alt="Food left in microwave flow in Node-RED." caption="Food left in microwave flow in Node-RED." >}}

### Outcome

This automation has reduced the amount of times I've forgotten about food in the microwave to **zero.**

### Tech stack

This system is built using a combination of **smart home automation platforms, IoT devices, and messaging systems**:

- **[Node-RED](https://nodered.org/)** – manages automation logic and event handling
- **[Home Assistant](https://www.home-assistant.io/)** – central hub for device management and automation orchestration
- **[Zigbee2MQTT](https://www.zigbee2mqtt.io/)** – bridges Zigbee devices to MQTT for integration into Home Assistant
- **Zigbee contact sensor** – detects when the microwave door is opened
- **Smart outlet with power monitoring** – tracks microwave power usage to determine its state
- **[Home Assistant companion app](https://companion.home-assistant.io/)** – delivers push notifications to devices
- **Smart speakers** – announce microwave status in occupied rooms
- **[EMQX](https://www.emqx.com/)** – facilitates communication between Home Assistant and Zigbee devices (via Zigbee2MQTT)

This stack allows for **real-time event detection, recurring reminders with multiple alert levels (e.g., notice, critical, warning), and seamless smart home integration.**

---

## **Wet clothes in washer reminders**

{{< figure src="/projects/adhd-qol-improvements/wet-clothes-in-washer.jpg" alt="Notification sent by Home Assistant companion app." caption="Notification sent by Home Assistant." class="left rounded" >}}

This automation helps remind users when the washing cycle is complete, and wet clothes are left in the washer:

1. **Smart washer communication** – the smart washer communicates its state to Home Assistant via webhooks, providing real-time updates on the washing cycle

2. **Cycle completion notification** – once the washing cycle is complete, a notification is sent to all devices in the home, and *"washing cycle complete"* is announced on smart speakers in any occupied rooms

3. **Wet clothes detection** – if the washer door is closed at the time of cycle completion, a binary input sensor (labeled "wet clothes in washer") is turned on and the washer is marked as "occupied" in Home Assistant

4. **Follow-up notification** – a 15-minute timer begins upon cycle completion. Once the timer finishes, a notification stating *"there are wet clothes in the washer"* is sent to all devices and announced on any smart speakers in occupied rooms

5. **Door open action** – if the washer door is opened at any point during the timer, the timer is stopped, the "wet clothes in washer" sensor is turned off, and any washing machine notifications are cleared from devices to prevent notification clutter

{{< figure src="/projects/adhd-qol-improvements/full-washing-machine-flow.jpg" alt="Full washing machine logic in Node-RED." caption="Full washing machine logic in Node-RED." >}}

### Outcome

This automation has prevented me from ever having to re-wash mildew-y clothes once since deployment. It saves me from smelly clothes and wasting time and money re-washing clothes after forgetting about them.

### Tech stack

- **[Node-RED](https://nodered.org/)** – provides the automation workflows
- **[Home Assistant](https://www.home-assistant.io/)** – central hub for managing and automating smart devices, providing webhook support and device state monitoring
- **[Zigbee2MQTT](https://www.zigbee2mqtt.io/)** – bridges Zigbee devices with MQTT for integration with Home Assistant
- **[EMQX](https://www.emqx.com/)** – facilitates communication between Home Assistant and Zigbee devices (via Zigbee2MQTT)
- **Zigbee contact sensor** – used to detect if the door is open or closed when the washing cycle finishes
- **Smart washer** – communicates cycle state to Home Assistant via webhooks
- **[Home Assistant companion app](https://companion.home-assistant.io/)** – provides support for notifications on phones, computers, and tablets
- **Smart speakers** – used for spoken announcements in occupied rooms
