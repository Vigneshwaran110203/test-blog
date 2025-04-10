---
title: How to Remote Access Websocket Server from the Internet
slug: remote-access-websocket-server-from-internet
description: "Learn how to remotely access a websocket server in your IoT from outside network over the internet using SocketXP IoT Remote Access solution. We'll use NodeJS based websocket server and websocket client examples for this tutorial."
author: Ganesh Velrajan
tags: [
    Remote Access, Websocket server client, Nodejs App, Python App, Java App, Webservice, IoT
]
date: 2023-10-10
lastmod: 2024-10-19
categories: [
    IoT
]
images: ["/assets/img/remote-access-localhost-nodejs-app/remote-access-localhost-nodejs-app.png"]
aliases: []
---

In this tutorial, we will discuss how to setup remote access to a websocket server in your local machine so that you can connect to the websocket securely over the internet.

Whether you are a coding enthusiast, a DIY enthusiast, or just curious about writing web applications for [IoT and remotely accessing](/iot-remote-access) it, this article will provide you with a step-by-step instructions on how to remotely connect to a websocket app running in your IoT over the internet. 

So, let's dive in.

## NodeJS Websocket server example

We'll use the following simple NodeJS based Websocket server to illustrate our solution.

{{<source-code>}}$
// ws-server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    //websocket client connection is up.

    //Listen for messages from the client and print
    ws.on('message', (message) => {
        console.log('Msg received: %s', message);
    });

    //send a message to the incoming client connection    
    ws.send('Hi there, I am a WebSocket server');
});

//start the HTTP WS server
server.listen(3000, () => {
    console.log(`HTTP server started on port ${server.address().port}`);
});
{{</source-code>}}

Now run the Websocket server using the following command:

{{<source-code>}}
$ node ws-server.js
HTTP server started on port 3000
{{</source-code>}}

## NodeJS Websocket client example

We'll use the following simple NodeJS websocket client for our illustration:

{{<source-code>}}
//ws-client.js
const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3000')
ws.onopen = () => {
  console.log('Websocket opened on browser')
  ws.send('Hello, I am a Websocket client')
}

ws.onmessage = (message) => {
  console.log(`Msg received: `, message.data)
}
{{</source-code>}}

Now, let's run the Websocket client locally on the same machine as the server and test if the client is able to connect to the Websocket server.

{{<source-code>}}$ node ws-client.js
Websocket opened on browser
Msg received:  Hi there, I am a WebSocket server
{{</source-code>}}

Now if you watch the Websocket server's terminal window, you'll see the following message:
{{<source-code>}}
$ node ws_server.js
HTTP server started on port 3000
Msg received: Hello, I am a Websocket client
{{</source-code>}}

Right now the Websocket server application can be accessed only from a local network because it runs on your server, Raspberry Pi or IoT behind a NAT router or Firewall.

Now, to remote access your Websocket server application from the internet, we'll use a simple and easy to use [SocketXP IoT Remote Access Solution](/iot-remote-access) to setup remote access to your websocket server.

You can use SocketXP to [remote access any web application](/iot/remote-access-iot-web-app-from-internet/) over the internet.

## Remote Access Websocket Server From Internet
Follow the instructions below to create a SocketXP HTTPS tunnel and a Public Web URL for your Websocket Server application, so that it can be remotely accessed from anywhere using a Websocket client.

### Step 1: Download and Install
[Download and install](https://www.socketxp.com/download) SocketXP IoT agent on your server, IoT or Raspberry Pi device where the Websocket server runs.

### Step 2: Get your Authentication Token
Sign up at [https://portal.socketxp.com](https://portal.socketxp.com) and get your authentication token.

{{<image-format src="/assets/img/AuthToken.jpg" alt="remote access JS web app in IoT over the Internet">}}

Click the copy button to copy the command string and paste in the terminal window in your laptop or server.

{{<source-code>}}$ socketxp login "eyJhbGciOiJIUzI1NiIsInR5cCI..."{{</source-code>}}

After registering the SocketXP Client with the SocketXP Cloud Service, use the following command to create a secure HTTP proxy tunnel between the nodejs websocket server and the SocketXP Cloud Gateway.

{{<source-code>}}$socketxp connect http://localhost:3000
Public URL -&gt; https://test-user-59129dd68b58.socketxp.com{{</source-code>}}

Let's access the nodejs websocket server application from the internet using the SocketXP Public URL provided in the above output.

The above SocketXP public URL is a permanent link just assigned to your Websocket server app and it doesn't change until you manually delete it from the [SocketXP web portal](https://portal.socketxp.com).

We have modified the Websocket client to use the above SocketXP Public Web URL to connect to the Websocket server over the internet or from any outside network.

{{<source-code>}}
//ws-client.js
const WebSocket = require('ws');
const ws = new WebSocket('ws://test-user-59129dd68b58.socketxp.com')
ws.onopen = () => {
  console.log('Websocket opened on browser')
  ws.send('Hello, I am a Websocket client')
}
ws.onmessage = (message) => {
  console.log(`Msg received: `, message.data)
}
{{</source-code>}}

Now let's try connecting the Websocket client to the Websocket server over the internet.

Note: Usually the Websocket client runs in a browser. But to keep our discussion simple we use NodeJS to execute the Websocket client app.

{{<source-code>}}
$ node ws-client.js
Websocket opened on browser
Msg received:  Hi there, I am a WebSocket server
{{</source-code>}}

Congratulations!! You have successfully setup remote access to your Websocket server and accessed it remotely using a Websocket client.

## Conclusion:
Developing websocket applications for IoT is made easy by using Javascript or Python.

With [SocketXP IoT Remote Access Solution](/iot-remote-access) -- part of [IoT Device Management and Remote Access Platform](/iot/iot-device-management-platform), it is easy to securely access any websocket application running in your IoT from any browser on any OS, be it Windows or Mac or Linux.

By following the steps outlined in this article, you can quickly set up remote access to websocket app running in your IoT and access it from anywhere, anytime. 

Whether you're managing a IoT project remotely or accessing your IoT for troubleshooting or maintenance purposes, web application remote access is a powerful tool that enables you to stay connected to your IoT with ease. 

