---
title: How to Remote Access NGINX web server from the internet
slug: remote-access-nginx-web-server-from-internet
description: "Remote access a NGINX web server in your local network from outside network over the internet using SocketXP Web Service Remote Access solution."
author: Ganesh Velrajan
tags: [
    Remote Access, NGINX web server, Raspberry Pi, IoT, Internet, localhost, local network
]
date: 2024-12-01
lastmod: 2024-12-01
categories: [
    IoT
]
images: ["/assets/img/nginx-web-server-remote-access/nginx-web-proxy-server-remote-acces.jpg"]
aliases: ["how-to-access-python-flask-app-from-internet"]
---

In this article, we'll discuss how to **remote access an NGINX web server** from the internet using [SocketXP Remote Access solution](/iot-remote-access).

NGINX can be configured to run as a web server or a web proxy server.
      
Let's assume you have a NGINX web server that runs on **localhost IP address 127.0.0.1** in your personal laptop or in a office server or as a Docker container in your home or office network, behind NAT router and firewall.

Anyone outside of your home or office network cannot access the NGINX server because the server runs in your local network or local IP address 127.0.0.1. Local IP addresses such as **127.0.0.1, 10.1.1.1 or 192.168.1.1** etc., cannot be accessed from the internet.  

Let's say, you want to expose the NGINX instance to the internet or make it externally visible, so that your colleagues, customers or a remote app can access the web proxy server from the internet.

Today, there are three ways to expose your NGINX proxy to the internet.

1. Deploy the NGINX server in an externally visible server such as your office server which has a public IP address and domain name.
2. Deploy the web server in a cloud platform such as AWS, MS Azure, Google Cloud Platform or Digital Ocean Cloud.
3. Create a public web URL for your NGINX instance using [SocketXP](/).

The first two options require more time, cost more money and require more effort in terms of purchasing your own IP address, domain name, configuring and managing them in the cloud. 

To address the above problems and provide an alternate cost-effective, quick easy setup solution, we have created [SocketXP](/).

In this article, we'll discuss in detail how to create a permanent and unique public web URL for your NGINX web proxy server using [SocketXP Web Service Remote Access Solution](/iot/remote-access-iot-web-app-from-internet/).

## What is SocketXP

SocketXP is a simple, quick and cost-effective way to deploy your web application online and remotely access them from anywhere in the world over the internet.

### How it works?

{{<image-format src="/assets/img/nginx-web-server-remote-access/nginx-web-proxy-server-remote-acces.jpg" alt="remote-access-nginx-web-proxy-server-from-internet">}}

- Run your NGINX web server in any VM, Docker container or laptop using localhost IP address 127.0.0.1 or 10.x.x.x or 192.x.x.x.
- Download SocketXP Client and install in the office server or laptop where the NGINX instance runs.
- SocketXP Client will create a secure SSL/TLS reverse proxy tunnel from your NGINX server to the SocketXP Cloud Gateway.
- **Option #1: Public Web URL**: SocketXP Cloud Service will provide a secure public web URL (HTTPS URL) that you can use to access your NGINX server from the internet.  This is option #1.
- **Option #2: Slave Mode**: Alternatively, you can remote access the NGINX web proxy server using SocketXP agent in Slave Mode from any remote machine.  In this method, your web server will not be exposed to the internet through a public web URL.  

### An NGINX Docker Container - Quick Demo:
Let's use the following NGINX Docker container for the demo.  

By default, a NGINX server will listen on localhost IP address 0.0.0.0 and TCP port 80.  But, in the below example, we instruct the NGINX server docker containter should be port mapped to TCP port 8080 in the host machine.

{{<source-code>}}$ 
$ docker run -it -d -p 8080:80 --name nginx nginx:latest
429982f942f54d7db1ebe150bb684fbe138ecda4921e02d378545437aaf7a3a4

$ docker ps
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS        PORTS                  NAMES
429982f942f5   nginx:latest   "/docker-entrypoint.…"   3 seconds ago   Up 1 second   0.0.0.0:8080->80/tcp   nginx


{{</source-code>}}


### Access the NGINX web server
Using a browser, let's point to http://localhost:8080 to connect to the NGINX home page.

{{<image-format src="/assets/img/nginx-web-server-remote-access/nginx-web-server-proxy-remote-access.jpg">}}

Right now, the NGINX server can be accessed only from your local network.  It cannot be accessed from the outside network or from the internet.

Now, to make it accessible from outside network over the internet, we need to install and setup the SocketXP agent in your server(the host machine where the NGINX server/container runs).

### Download and install SocketXP client
Let's download and run the SocketXP client from the [download page](https://www.socketxp.com/download).

Next, authenticate and register the SocketXP client with the SocketXP Cloud Gateway, using the auth-token from the [Portal Page](https://portal.socketxp.com)

{{<image-format src="/assets/img/AuthToken.jpg" alt="remote-access-flask-app-from-internet">}}

Click the copy button to copy the command string and paste it in the terminal window in your laptop or server.

{{<source-code>}}$ sudo socketxp login "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
{{</source-code>}}

After registering the SocketXP Client with the SocketXP Cloud Service, you can create a HTTPS reverse proxy tunnel between the NGINX server running in your office server and the SocketXP Cloud Gateway, via the SocketXP Client.

### Expose NGINX server to the internet

Use the following command to create a HTTPS reverse proxy tunnel between the NGINX server and the SocketXP Cloud Gateway.  This will generate a public web URL.  Use the SocketXP public web URL to access your web server to the internet.

{{<source-code>}}$ sudo socketxp connect http://127.0.0.1:8080
Connected to SocketXP Cloud Gateway.
Public URL -> https://testsocketxp-8d35e2cd-706d-4c67-87fd-2b3786e7cd39.socketxp.com
{{</source-code>}}

### Remote Access the NGINX server using the Public Web URL -- Option #1

Let's access the NGINX web server from the internet using the SocketXP Public URL provided in the above output.

{{<image-format src="/assets/img/nginx-web-server-remote-access/remote-access-nginx-web-proxy-server-internet.jpg">}}

You could now share the above link with your customers or remote employees or remote app, so that they could remotely access your NGINX web server from anywhere in the world.  

The above SocketXP public URL is a permanent link just assigned to you and it doesn't change until you manually delete it from the HTTP tunnels section in the SocketXP web portal.

## Secure Remote Access to your NGINX Server using Slave Mode -- Option #2
If you want to remote access your NGINX server instance more securely, and do not want to access it using a Public Web URL, you can use the alternate method discussed in this section.

We will discuss how to securely remote access any web server application including NGINX or Apache web server using the SocketXP's Slave Mode feature.

### Setup SocketXP agent on the NGINX server
[Download and install SocketXP agent](/download) on the server where the NGINX container is running, as discussed above.
To remote access the NGINX server in Slave Mode, the SocketXP agent running in the host machine where the NGINX container is running, must be setup differently.

Setup SocketXP agent to connect the NGINX server instance to the SocketXP Cloud Gateway as a `TCP service`, instead of an `HTTP service`, as shown below:

{{<source-code>}}
$ sudo socketxp connect tcp://127.0.0.1:8080

Connected to SocketXP Cloud Gateway.
Access the TCP service securely from the web portal or using the SocketXP agent in IoT slave mode.
{{</source-code>}}

### SocketXP Agent Slave Mode Setup
Now to securely remote access the NGINX web proxy server, from a remote machine (such as your laptop), [download and install](/download) the appropriate version of SocketXP agent binary on your laptop running windows OS or Linux OS or MacOS.

Next, setup the SocketXP agent to run in Slave Mode or the Local Proxy mode, as shown below. 



{{<source-code>}}
$ sudo socketxp connect tcp://127.0.0.1:4000 --iot-slave --authtoken eyJhbGciOiJIUzI1Ni... --peer-device-id cf7936fa-8b12-4df4-ab37-a3692cc8ec38 --peer-device-port 8080

Listening for TCP connections at:
Local URL -> tcp://127.0.0.1:4000
{{</source-code>}}

You can find the `device ID` of your NGINX server from the `/var/lib/socketxp/device.key` file in your host machine where the SocketXP agent is running in master mode(the default mode) or from the Devices tab in the SocketXP Web Portal.

SocketXP agent run in Slave Mode or Local Proxy mode, will proxy all connections to a local port(TCP 4000) to a remote host and remote port(8080) where the NGINX server is running, through the SocketXP Cloud Gateway.

### Remote Connect to the NGINX Server via the SocketXP Local Proxy
Using a favorite browser in your Laptop, point to http://localhost:4000 and connect to the NGINX web server remotely and more securely via an SSL/TLS connection.

{{<image-format src="/assets/img/nginx-web-server-remote-access/remote-access-nginx-server.jpg">}}

**What we see here is**: `SocketXP Slave Mode agent(Local Proxy)` ==> `SocketXP Cloud Gateway` ==> the `SocketXP agent running in your NGINX server`, working in sync behind the screen to securely encrypt and forward the traffic between the browser and the NGINX server running in your office server.

You can use the same method to securely remote access any HTTP web service(Apache Web Server, Python Web App, JS Web App) or TCP service(SSH/SMTP/SFTP/RDP/SQL-DB) remotely over the internet.

## Conclusion:

NGINX web server is a free open source web server, typically used as as web proxy.

With [SocketXP Web Service Remote Access Solution](/iot/remote-access-iot-web-app-from-internet/) – part of [IoT Device Management and Remote Access Platform](/socketxp-iot-device-management-platform), it is easy to securely access any web application running in your IoT from any browser on any OS, be it Windows or Mac or Linux.

By following the steps outlined in this article, you can quickly set up remote access to web server, web app running in your local IoT device or Linux server and access it from anywhere, anytime.

Whether you’re managing a project remotely or accessing your server or IoT device for troubleshooting or maintenance purposes, web application remote access is a powerful tool that enables you to stay connected to your remote machine with ease.

## Got questions?
If you have any questions, please write to us at: support@socketxp.com






