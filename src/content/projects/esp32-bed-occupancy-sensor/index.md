---
date: 2025-03-20T00:00:56-06:00
title: “Smart bed” – ESP32-based occupancy sensor
description: This project enhances smart home automation by using an ESP32 microcontroller and force-sensitive resistors (FSRs) to accurately detect bed occupancy. By monitoring each side of the bed independently, it enables personalized automation and improves room occupancy detection.
images:
  - /projects/esp32-bed-occupancy-sensor/bedroom-dashboard-section.jpg
tags:
  - ESP32
  - ESPHome
  - Home Assistant
  - Node-RED
---
## **Overview**

{{< figure src="/projects/esp32-bed-occupancy-sensor/esp32-fsr-wiring.jpg" alt="Wiring diagram for ESP32 board and two force-sensitive resistors." caption="Wiring diagram for ESP32 board and two force-sensitive resistors." class="left small" >}}

This project enhances smart home automation by using an ESP32 microcontroller and force-sensitive resistors (FSRs) to accurately detect bed occupancy. By monitoring each side of the bed independently, it enables personalized automation and improves room occupancy detection.

## **Key features**

{{< figure src="/projects/esp32-bed-occupancy-sensor/bed-occupied.jpg" alt="Node-RED flow for controlling bedroom lights based on bed occupancy." caption="Node-RED flow for controlling bedroom lights based on bed occupancy." class="small right" >}}

### Dual-sensor occupancy detection

Two force-sensitive resistors (FSRs) are placed under the bed to detect occupancy on each side. Each sensor is wired to its own analog input on the ESP32, allowing the system to determine not only if the bed is occupied but also which side is in use. This granularity enables more precise automation and personalized responses based on individual presence.

### Adjustable sensitivity

A potentiometer is integrated as a variable resistor in each voltage divider circuit, allowing input gain adjustment. This enables both sides of the bed to have fine-tuned sensitivity calibration, accounting for differences in weight, mattress consistency, and sensor placement. By individually customizing sensitivity levels, the system ensures reliable detection while minimizing false or missed triggers.

## **Practical applications**

{{< figure src="/projects/esp32-bed-occupancy-sensor/bedroom-dashboard-section.jpg" alt="Bedroom overview section of Home Assistant dashboard." caption="Bedroom overview section of Home Assistant dashboard." class="small right" >}}

### Enhanced room occupancy detection

The bed occupancy data integrates with existing PIR and mmWave motion sensors to improve room presence detection. This prevents false negatives that could occur when motion sensors no longer detect motion, ensuring that the system does not mistakenly assume the room is empty and trigger unwanted lighting changes.

I'm using a mixture of 5.8GHz and 24Ghz mmWave sensors, so even at night when the only movement is breathing, motion tends to be detected. However, the bed occupancy sensor prevents the rare occurrence from turning on all the lights in the room in the middle of the night.

### Automated lighting control

When either side of the bed is occupied, the main room light smoothly dims over two seconds before turning off, creating a seamless transition into sleep mode. Additionally, if my side of the bed is detected as occupied, my desk lamps also dim and turn off, further enhancing nighttime automation without requiring manual input.

{{< figure src="/projects/esp32-bed-occupancy-sensor/bed-occupied-flow.jpg" alt="Node-RED flow for controlling bedroom lights based on bed occupancy." caption="Node-RED flow for controlling bedroom lights based on bed occupancy." >}}

## **Hardware & wiring**

{{< figure src="/projects/esp32-bed-occupancy-sensor/bed-sensor-esp32-board.jpg" alt="Interior of bed sensor case showing wiring for ESP32 sensor." caption="Interior of bed sensor case showing wiring for ESP32 sensor." class="left small" >}}

Since I'm still working on my soldering skills, I opted for an ESP32 board with headers pre-installed so I could use breadboard wires with pins for the connections. On the FSR end, I also opted for using the pin/header connection style over attempting to solder and potentially damaging the FSR. However, anywhere 2 or more wires meet was soldered and wrapped in heat-shrink insulation.

{{< figure src="/projects/esp32-bed-occupancy-sensor/bed-sensor-case.jpg" alt="Complete bed sensor assembly for ESP32 board." caption="Complete bed sensor assembly for ESP32 board." class="right small" >}}

The ESP32 board was then installed inside a small electronics project case I ordered online after using a Dremel to allow wires through the case when closed.

## **Sensor placement**

{{< figure src="/projects/esp32-bed-occupancy-sensor/bed-sensor-placement.jpg" alt="Photo of bed sensor placement on box spring." caption="Photo of bed sensor placement on box spring." class="right small" >}}

To ensure accurate and reliable readings, careful consideration was given to the placement of the force-sensitive resistors (FSRs).

Due to the construction of the box spring, certain areas created extreme pressure points where metal bars were located, which could have led to false positives. To mitigate this, each FSR was taped to a 1/8" thick piece of plexiglass, providing a more consistent surface and preventing pressure-related inaccuracies. Each piece of plexiglass is then taped in place to prevent movement when the mattress on top is adjusted. Additionally, the wires are taped in place to prevent undue strain on the FSR connection when the mattress moves.

Each FSR is positioned diagonally to cover the area where an average-height person's torso would typically rest during sleep. This placement maximizes detection accuracy while minimizing false triggers. The sensors are intentionally set away from the edges of the bed to prevent false positives from actions such as sitting on the bed’s edge or resting feet on the mattress while working at my desk.

For reference, the black box visible at the top of the photo houses the ESP32 microcontroller, while the white wire extending toward the top edge of the image is the USB power supply for the ESP32.

## **Future expansion**

### Wake-up assistance & alarms

The system could be expanded to include alarms or spoken reminders for individuals who remain in bed past a certain time. This could help with morning routines by triggering audio prompts or gradually increasing light levels to encourage wakefulness.

### Sleep tracking & data logging

Home Assistant is configured to store short-term sensor history and long-term history is stored in Grafana, so this could provide insights into individual sleep patterns, helping to track habits and improve sleep quality. The data from other health data sources such as Fitbit or Google Health could be aggregated with the bed sensor data inside Home Assistant for further insight into sleep patterns.

### Adaptive automation

Future enhancements could allow the system to adapt temperature based on bedtime routines. For example, detecting prolonged occupancy at night could trigger a smart thermostat to lower the temperature automatically.

## **Summary**

This project showcases embedded development, sensor integration, and smart home automation, demonstrating both technical implementation and real-world usability.
