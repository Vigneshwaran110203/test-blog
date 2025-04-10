---
title: Remote Access to MQTT Broker Behind NAT Router or Firewall over the Internet
slug: remote-access-mqtt-broker-behind-nat-router-firewall-over-the-internet
description: "Remote access to a private MQTT broker is required when IoT devices and sensors are placed remotely in customer sites or in some remote locations in the open fields to monitor and measure the environmental factors."
author: Ganesh Velrajan
tags: [
    MQTT Broker, Remote Access, NAT Router, Firewall, Internet
]
date: 2021-05-21
lastmod: 2024-10-19
categories: [
    IoT
]
images: ["/assets/img/mqtt-remote-access/mqtt-broker-remote-access.png"]
aliases: ["remote-access-to-mqtt-broker-behind-nat-router-or-firewall-over-the-internet"]
---

In this article, we'll discuss how to securely connect and remotely access a private MQTT Broker located inside your office or home network behind a NAT router or a Firewall over the internet. We'll use the open source [Mosquitto MQTT broker](https://mosquitto.org/) and client for this demo.

Remote access to a private MQTT broker is required when IoT devices and sensors are placed remotely in customer sites or in some remote locations in the open fields to monitor and measure the environmental factors.

Data collected from the sensors needs to be streamed to the MQTT broker so that MQTT subscribers of an MQTT topic could receive the published data for further processing and analysis.  MQTT broker and clients follow the pub-sub model.

You can find the instructions to [download and installMosquitto MQTT broker on your private server here](https://mosquitto.org/download/) .

Let's see how to setup remote access to an MQTT broker using SocketXP IoT Remote Access Platform.

## Setup SocketXP IoT Agent for MQTT Broker Remote Access
You need to download and install a simple SocketXP IoT agent on your IoT devices and the server where your MQTT broker runs. You can find the instructions to[download and install SocketXP IoT Agent here](https://www.socketxp.com/download).

Next, connect the MQTT Broker with the SocketXP IoT Cloud Gateway using the following command.

{{<source-code>}}$ socketxp connect tcp://127.0.0.1:1883 

Connected to SocketXP Cloud Gateway.
Access the TCP service securely using the SocketXP agent in IoT Slave Mode.{{</source-code>}}

## Connect IoT devices to the MQTT Broker in IoT Slave Mode
Next, setup SocketXP agent to run in IoT Slave Mode in all your IoT devices (both MQTT subscriber devices and the publisher devices)

{{<source-code>}}$ socketxp connect tcp://localhost:3883 --iot-slave --peer-device-id 22312adsf-233434-18042021 --peer-device-port 1883 --authtoken &lt;auth token&gt;

Listening for TCP connections at:
Local URL -> tcp://localhost:3883{{</source-code>}}

You shall find the device ID of the device from the SocketXP Portal in the IoT Devices section.

## Subscribe to a topic
Make your IoT devices to subscribe to a topic they are interested in listening, so that they could take some action like powering ON a bulb. In the following example, the IoT device subscribes to the topic "office/floor1/bulb1"

Note: port 3883 is the local TCP port on which MQTT broker is reachable via the SocketXP agent running in IoT Slave Mode, providing secure TLS tunnel to the MQTT Broker.

{{<source-code>}}$ mosquitto_sub -h 127.0.0.1 -t "office/floor1/bulb1" -d -p 3883 
Client mosq-Q9Qsreqpu6epUSQdMH sending CONNECT
Client mosq-Q9Qsreqpu6epUSQdMH received CONNACK (0)
Client mosq-Q9Qsreqpu6epUSQdMH sending SUBSCRIBE (Mid: 1, Topic: office/floor1/bulb1, QoS: 0, Options: 0x00)
Client mosq-Q9Qsreqpu6epUSQdMH received SUBACK
Subscribed (mid: 1): 0{{</source-code>}}

## Publish to the topic
Now it's time to publish some message to the topic "office/floor1/bulb1". Again use the local TCP port 3883 and local host IP address 127.0.0.1 to reach the MQTT Broker via the SocketXP agent running in IoT slave mode.

{{<source-code>}}$ mosquitto_pub -h 127.0.0.1 -p 3883 -t "office/floor1/bulb1" -m "ON" -d
Client mosq-dAaaept2na6Hz8vqgV sending CONNECT
Client mosq-dAaaept2na6Hz8vqgV received CONNACK (0)
Client mosq-dAaaept2na6Hz8vqgV sending PUBLISH (d0, q0, r0, m1, 'office/floor1/bulb1', ... (2 bytes))
Client mosq-dAaaept2na6Hz8vqgV sending DISCONNECT
${{</source-code>}}
Check if the subscriber has received the "ON" message sent to the topic.

{{<source-code>}}$ mosquitto_sub -h 127.0.0.1 -t "office/floor1/bulb1" -d -p 3883 
...
...
Client mosq-Q9Qsreqpu6epUSQdMH sending PINGREQ
Client mosq-Q9Qsreqpu6epUSQdMH received PINGRESP
Client mosq-Q9Qsreqpu6epUSQdMH received PUBLISH (d0, q0, r0, m0, 'office/floor1/bulb1', ... (2 bytes))
ON{{</source-code>}}
We see that the "ON" message has been received by the subscriber.

  SocketXP eliminates the need to host your MQTT broker in a public cloud infrastructure. You could host the MQTT broker server in-house in a private network behind a NAT router or Firewall.  SocketXP IoT Remote Access solution provides simple and secure remote connections to your IoT devices and edge servers.


