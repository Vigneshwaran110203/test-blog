---
title: How to Remote Access a Node-RED Server on your Device
slug: remote-access-node-red-server-iot-from-internet
description: "Remote access a Node-RED server in your localhost IoT device from outside network over the internet using SocketXP IoT Remote Access solution."
author: Ganesh Velrajan
tags: [
    Remote Access, Nodejs App, Node-RED server, Webservice, IoT, localhost node-red
]
date: 2023-09-14
lastmod: 2024-10-19
categories: [
    IoT
]
images: ["/assets/img/remote-access-node-red-server/remote-access-node-red-server-localhost-1880-internet.jpg"]
aliases: []
---
In this article, we'll discuss how to remote access a Node-RED server running locally in your IoT, Raspberry Pi or any device, over the internet.

## What is Node-RED
[Node-RED](https://nodered.org/) is a low-code programming tool for visual programming developed originally by IBM for wiring together hardware devices, APIs and online services as part of the Internet of Things (IoT). 

Node-RED provides a web browser-based flow editor, which can be used to create JavaScript functions. Elements of applications can be saved or shared for re-use. The runtime is built on Node.js. The flows created in Node-RED are stored using JSON.

Node-RED is an excellent tool for workflow automation.

### Usecases:
Here are some examples of how Node-RED can be used:

1. To connect a temperature sensor to a cloud-based database and send temperature readings every minute.
2. To create a dashboard that displays data from multiple devices in real time.
3. To automate the control of smart home devices, such as lights and thermostats.
4. To integrate different systems, such as a CRM system and an ERP system.

Node-RED is a powerful tool that can be used to create a wide range of applications. It is a good choice for IoT development, but it can also be used for other types of applications, such as data integration and automation.

### Benefits:
Here are some of the benefits of using Node-RED:

**Easy to use:** Node-RED uses a visual programming interface, which makes it easy to create applications without any coding experience.

**Scalable:** Node-RED can be used to create complex applications that can handle large amounts of data.
Versatile: Node-RED can be used to create a wide range of applications, including IoT applications, data integration applications, and automation applications.

**Open source:** Node-RED is an open source project, which means that it is free to use and modify.

## Remote Access Node-RED server

Follow the steps below to setup remote access to your node-red server.

### Download and install a Node-RED server:

You can install `Node-RED` using NPM package manager as shown below:

{{<source-code>}}
sudo npm install -g --unsafe-perm node-red
{{</source-code>}}

Once installed, you can start `node-red` using the below command:

{{<source-code>}}

$ node-red

Welcome to Node-RED
===================

12 Sep 23:43:39 - [info] Node-RED version: v1.3.5
12 Sep 23:43:39 - [info] Node.js  version: v14.7.2
12 Sep 23:43:39 - [info] Darwin 19.6.0 x64 LE
12 Sep 23:43:39 - [info] Loading palette nodes
12 Sep 23:43:44 - [warn] rpi-gpio : Raspberry Pi specific node set inactive
12 Sep 23:43:44 - [info] Settings file  : /Users/nol/.node-red/settings.js
12 Sep 23:43:44 - [info] HTTP Static    : /Users/nol/node-red/web
12 Sep 23:43:44 - [info] Context store  : 'default' [module=localfilesystem]
12 Sep 23:43:44 - [info] User directory : /Users/nol/.node-red
12 Sep 23:43:44 - [warn] Projects disabled : set editorTheme.projects.enabled=true to enable
12 Sep 23:43:44 - [info] Creating new flows file : flows_noltop.json
12 Sep 23:43:44 - [info] Starting flows
12 Sep 23:43:44 - [info] Started flows
12 Sep 23:43:44 - [info] Server now running at http://127.0.0.1:1880/red/
{{</source-code>}}

### Connecting to the Node-RED server locally
Open up a browser and point it to `http://127.0.0.1:1880/red/`.


{{<image-format src="/assets/img/remote-access-node-red-server/localhost-1880-node-red-server.jpg" alt="remote access localhost node-red server in iot or raspberry pi from internet">}}

Right now the Node-RED server can be accessed only from a local network because it runs on your IoT behind a NAT router or Firewall.

To remote connect to your Node-RED instance from the internet, follow the instructions below:

## Connecting to the Node-RED web dashboard remotely
We'll be using [SocketXP IoT Remote Access Solution](/iot-remote-access) to create a secure HTTPS tunnel and also a [SocketXP Public Web URL](/iot/remote-access-to-your-localhost-nodejs-app/) to remotely access your Node-RED web dashboard.

### Step 1: Download and Install SocketXP Agent
[Download and install](https://www.socketxp.com/download) SocketXP IoT agent on your IoT or IoT device.

### Step 2: Get your Authentication Token
Sign up at [https://portal.socketxp.com](https://portal.socketxp.com) and get your authentication token.

{{<image-format src="/assets/img/AuthToken.jpg" alt="remote access JS web app in IoT over the Internet">}}

Click the copy button to copy the command string and paste in the terminal window in your IoT device or server where the node-red instance is running.

{{<source-code>}}$ sudo socketxp login [auth-token]{{</source-code>}}

After registering the SocketXP Client with the SocketXP IoT Cloud Gateway, use the following command to create a secure HTTPS tunnel between the Node-RED server and the SocketXP IoT Cloud Gateway.

{{<source-code>}}$sudo socketxp connect http://127.0.0.1:1880
Public URL -&gt; https://test-user-00r91xfq3wre08c5.socketxp.com{{</source-code>}}

Let's access the `node-red` server's dashboard from the internet using the SocketXP Public URL provided in the above output.

{{<image-format src="/assets/img/remote-access-node-red-server/remote-access-node-red-server-localhost-1880.jpg" alt="remote access node-red web server in IoT from outside network 127.0.0.1 1880">}}

Congratulations! You have successfully setup remote access to your local Node-RED instance using SocketXP.

The above SocketXP Public Web URL is a unique permanent link exclusively assigned to your Node-RED app and it doesn't change until you manually delete it from the [SocketXP web portal](https://portal.socketxp.com).

## Alternate Method:
If you are looking for an alternate method (again using SocketXP solution) that will keep your Node-RED instance private without exposing it to the public internet, but still be able to remotely access it, follow the instructions in the second half of this video to remotely access your Node-RED web dashboard:

[![HTTP Web Service Remote Access](https://img.youtube.com/vi/Fhl-PBVmEeA/0.jpg)](https://www.youtube.com/watch?v=Fhl-PBVmEeA "HTTP Web Service Remote Access")

This method will leverage the [SocketXP IoT Slave Mode access](https://docs.socketxp.com/guide/getting-started/iot-slave-mode/) feature to connect securely over the internet without having to publicy expose your node red server instance.

## Conclusion:
Node-RED provides web browser based visual programming blocks for wiring together hardware devices, APIs and online services as part of the Internet of Things.  

With [SocketXP IoT Remote Access](/iot-remote-access) Solution -- part of [IoT Device Management and Remote Access Platform](/iot/iot-device-management-platform), it is easy to securely access a Node-RED server running in your IoT or Raspberry Pi from anywhere over the internet.

By following the steps outlined in this article, you can quickly set up remote access to a Node-RED instance running in your IoT and access it from anywhere conveniently. 

Whether you're managing a IoT project remotely or accessing your IoT for troubleshooting or maintenance purposes via SSH or RDP or VNC, [SocketXP IoT Remote Access solution](/iot-remote-access) is a powerful tool that enables you to stay connected to your IoT with ease. 

