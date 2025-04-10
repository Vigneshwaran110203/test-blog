---
title: How to Remote Access a Web App in IoT from Internet
slug: remote-access-iot-web-app-from-internet
description: "Remote access a NodeJS or Python Flask web application in your IoT from outside network over the internet using SocketXP IoT Remote Access solution."
author: Ganesh Velrajan
tags: [
    Remote Access, Nodejs App, Python App, Java App, Webservice, IoT
]
date: 2023-06-23
lastmod: 2024-10-18
categories: [
    IoT
]
images: ["/assets/img/remote-access-flask-app-from-internet/remote-access-raspberry-pi-web-app-from-internet.jpg"]
aliases: ["remote-access-raspberry-pi-web-app-from-internet"]
---
Internet of Things(IoT) has gained immense popularity among technology enthusiasts and hobbyists alike. 

Establishing secure remote access to an IoT device is important for end-users who need to remotely access and control an IoT device using an app or web browser; service partners who must have access to devices that have been installed in the corresponding remote location; and product support teams who need the ability to log onto installed devices located on customer sites

In this blog article, we will explore the exciting combination of IoT and web applications, delving into how to remotely access the following web applications from the internet.

1. [NodeJS Web App Remote Access](/iot/remote-access-localhost-nodejs-app-from-internet/)
2. [Python Flask Web App Remote Access](/iot/remote-access-python-flask-app-from-internet/)
3. [Golang Web Server App Remote Access](/iot/remote-access-golang-web-server-app-from-internet/)
4. [Websocket Server Remote Access](/iot/remote-access-websocket-server-from-internet/)
5. [File Server Web App Remote Access](/iot/remote-access-iot-web-app-from-internet#remotely-access-file-server-web-app)
6. [NGINX Web Server Remote Access](/iot/remote-access-nginx-web-server-from-internet)
7. Java Web Server App Remote Access
8. [API Gateway Server Remote Access](/iot/remote-access-api-gateway-server-from-internet/)
9. [Node-RED server dashboard Remote Access](/iot/remote-access-node-red-server-iot-from-internet/)

Whether you are a coding enthusiast, a DIY enthusiast, or just curious about writing web applications for [IoT and remotely accessing](/iot-remote-access) it, this article will provide you with a step-by-step instructions on how to remotely connect to a web app running in your IoT over the internet. 

So, let's dive in.

## Remotely Connect to a NodeJS Web Application in IoT

[We will be using a nodeJS web app as an example for illustration purposes.  But our solution should work for any web app written in any language: python, go, java, or .Net]

Let's assume you have a nodejs webserver application(as shown below), running in your IoT device. Let's say, the nodejs webserver app listens on localhost port 3000.

{{<source-code>}}$ cat myapp.js
var http = require('http');
//create a server object:
http.createServer(function (req, res) {
 res.writeHead(200, {'Content-Type': 'text/html'});
 res.write("&lt;h2&gt;Hello World!&lt;/h2&gt;"); //write a response to the client
 res.end(); //end the response
}).listen(3000); //the server object listens on port 3000
${{</source-code>}}

We'll use the above web app to explain how to remote access IoT webserver from the internet.

Now run the myapp.js on your IoT, as shown below.

{{<source-code>}}$ node myapp.js{{</source-code>}}

Open up a browser in your IoT and point to http://localhost:3000 to connect to the local web application.

{{<image-format src="/assets/img/remote-access-localhost-nodejs-app/localhost-nodejs-app-server.png" alt="remote access iot web application from internet">}}

Right now the web application can be accessed only from a local network because it runs on your IoT behind a NAT router or Firewall.

Now to remote access your nodejs webserver application from the internet, follow the instructions below to create a SocketXP HTTPS tunnel and a SocketXP Public Web URL for your nodejs webserver app.

### Step 1: Download and Install
[Download and install](https://www.socketxp.com/download) SocketXP IoT agent on your IoT or IoT device.

### Step 2: Get your Authentication Token
Sign up at [https://portal.socketxp.com](https://portal.socketxp.com) and get your authentication token.

{{<image-format src="/assets/img/AuthToken.jpg" alt="remote access JS web app in IoT over the Internet">}}

Click the copy button to copy the command string and paste in the terminal window in your laptop or server.

{{<source-code>}}$ socketxp login "eyJhbGciOiJIUzI1NiIsInR5cCI..."{{</source-code>}}

After registering the SocketXP Client with the SocketXP Cloud Service, use the following command to create a secure HTTP proxy tunnel between the nodejs webserver application and the SocketXP Cloud Gateway.

{{<source-code>}}$socketxp connect http://localhost:3000
Public URL -&gt; https://test-user-59129dd68b58.socketxp.com{{</source-code>}}

Let's access the nodejs webserver application from the internet using the SocketXP Public URL provided in the above output.

{{<image-format src="/assets/img/remote-access-localhost-nodejs-app/Access-Public-URL-localhost-nodejs-app.png" alt="remote access nodejs web app in IoT from outside network">}}

The above SocketXP public URL is a permanent link just assigned to your webserver app and it doesn't change until you manually delete it from the [SocketXP web portal](https://portal.socketxp.com).

## Remotely access Python Flask Web App in IoT from Internet

Let's use the following simple Python flask web application for the demo.

{{<source-code>}}$ cat myapp.py
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return '&lt;h2&gt;Hello, World!&lt;/h2&gt;'

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=3000, debug=True)
{{</source-code>}}

Run the myapp.py on a local server or laptop.

{{<source-code>}}$ python myapp.py{{</source-code>}}
Using a browser, let's point to http://localhost:3000 to connect to the flask web application.

{{<image-format src="/assets/img/remote-access-localhost-nodejs-app/localhost-nodejs-app-server.png" alt="remote-access-flask-app-from-internet">}}

Right now the flask application can be accessed only from a local network because it runs on your IoT behind a NAT router or Firewall.

Now to make the python flask application accessible from the internet, let's download and run the SocketXP Client from the [download page](https://www.socketxp.com/download).

Next authenticate and register the SocketXP Client with the SocketXP Cloud Gateway, using the auth-token from the [Portal Page](https://portal.socketxp.com)

{{<image-format src="/assets/img/AuthToken.jpg" alt="remote-access-flask-app-from-internet">}}

Click the copy button to copy the command string and paste it in the terminal window in your laptop or server.

{{<source-code>}}$ socketxp login "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
{{</source-code>}}

After registering the SocketXP Client with the SocketXP Cloud Service, you could create HTTP proxy tunnel between the application running in your laptop and the SocketXP Cloud Service, via the SocketXP Client.

As our flask app is a web application(HTTP server), let's create a HTTP proxy tunnel. 

### Make Python Flask app accessible from Internet

Use the following command to create a HTTP proxy tunnel between the flask web application and the SocketXP Cloud Gateway.  This will generate a public web URL.  Use the SocketXP public web URL to expose your flask app to the internet.

{{<source-code>}}$socketxp connect http://localhost:3000
Public URL -&gt; <strong>https://679aa48b-1162-44f7-b6c6-59129dd68b58.socketxp.com</strong>{{</source-code>}}

Let's access the flask web application from the internet using the SocketXP Public URL provided in the above output.

{{<image-format src="/assets/img/remote-access-flask-app-from-internet/Access-Public-URL-localhost-flask-app.png" alt="remote-access-flask-app-from-internet">}}

You could use this public URL to integrate with your IoT controller or dashboard or with your mobile app.

### Remotely Access File Server Web App

Here is a sample Python Flask web app to remotely access and dowload any file from your IoT

{{<source-code>}}$ cat get_files.py
from flask import Flask, send_from_directory

app = Flask(__name__)

@app.route('/&lt;path:path&gt;')
def send_report(path):
    return send_from_directory('/', path)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=3000, debug=True)
{{</source-code>}}

Use a browser or the curl utility to access any file as long as you know the correct file path:

{{<source-code>}}
curl https://679aa48b-1162-44f7-b6c6-59129dd68b58.socketxp.com/var/log/syslog
{{</source-code>}}

You can access any static files in your IoT such as logs, images or videos from an on-board camera, configuration files etc.

## Remote Access Websocket Server
If you have a websocket server running in your private network or in your IoT device and you want to connect to it remotely using a websocket client app, you could follow this article: [How to Remote Access Websocket Server](/iot/remote-access-websocket-server-from-internet)


## Conclusion:
Developing web applications for IoT is made easy by using Python and NodeJS.

With SocketXP [IoT Remote Access](/iot-remote-access) Solution -- part of [IoT Device Management and Remote Access Platform](/iot/iot-device-management-platform), it is easy to securely access any web application running in your IoT from any browser on any OS, be it Windows or Mac or Linux.

By following the steps outlined in this article, you can quickly set up remote access to web app running in your IoT and access it from anywhere, anytime. 

Whether you're managing a IoT project remotely or accessing your IoT for troubleshooting or maintenance purposes, web application remote access is a powerful tool that enables you to stay connected to your IoT with ease. 

