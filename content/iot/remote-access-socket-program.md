---
title: How to Remote Access a TCP Socket Server from the Internet
slug: remote-access-tcp-socket-server-python-c-java-go-from-internet
description: "Learn how to remote access a TCP socket program written in Python, C, Go or Java running in your local network from outside network over the internet using SocketXP Remote Access solution."
author: Ganesh Velrajan
tags: [
    Remote Access, TCP Socket Program, UDP Socket Program, Python, C, Java, Go, Raspberry Pi, IoT, Internet, localhost, local network
]
date: 2024-12-09
lastmod: 2024-12-09
categories: [
    IoT
]
images: ["/assets/img/remote-access-tcp-socket-server/remote-access-tcp-socket-server-python-c-java-golang.jpg"]
aliases: []
---

In this article, we'll discuss how to **remote access a TCP socket server** from the internet using [SocketXP Remote Access solution](/iot-remote-access), without having to setup port forwarding.
      
Let's assume you have a TCP socket server that runs on **localhost IP address 127.0.0.1** in your personal laptop or in a office server in your office network, behind NAT router and firewall.

Anyone outside of your office network cannot access the TCP socket server because the server runs in your local network or local IP address 127.0.0.1. Local IP addresses such as **127.0.0.1, 10.1.1.1 or 192.168.1.1** etc., cannot be accessed from the internet.  

Let's say, you want to expose the TCP socket server to the internet or make it externally visible, so that your colleagues, customers or a remote app can access the TCP socket server from the internet.

Today, there are three ways to expose your TCP socket server to the internet.

- Deploy the TCP socket server in an externally visible server such as your office server which has a public IP address and domain name.
- Deploy the TCP socket server in a cloud platform such as AWS, MS Azure, Google Cloud Platform or Digital Ocean Cloud.
- Create a secure SSL/TLS encrypted remote access tunnel using [SocketXP](/).

The first two options require more time, cost more money and require more effort in terms of purchasing your own IP address, domain name, configuring and managing them in the cloud. 

To address the above problems and provide an alternate cost-effective solution, we have created [SocketXP](/).  Moreover, SocketXP solution is quick and easy to setup remote access in just few mins.

In this article, we'll discuss in detail how to create a secure remote access to your TCP socket server using [SocketXP Remote Access Solution](/iot/iot-remote-access/).

## What is SocketXP

[SocketXP](/) is a cloud based [IoT Remote Access and Device Management Platform](/socketxp-iot-device-management-platform/), which is a simple, quick and cost-effective solution to deploy your TCP services and remotely access them from anywhere in the world over the internet.

### How it works?

{{<image-format src="/assets/img/remote-access-tcp-socket-server/remote-access-tcp-socket-server-python-c-java-golang.jpg" alt="remote-access-TCP-socket-program-from-internet">}}

- Run your TCP socket server in your office server or VM using localhost IP address 127.0.0.1 or 10.x.x.x or 192.x.x.x.
- Download SocketXP Client and install in the office server where the TCP socket server runs.
- SocketXP Client will create a secure SSL/TLS reverse proxy tunnel from your TCP socket server to the SocketXP Cloud Gateway.
- **Slave Mode**: Remote access the TCP socket server using SocketXP agent in Slave Mode(Hint: Imagine a VPN client) from any remote machine such as your Laptop or PC.  In this method, your TCP socket server will NOT be exposed to the internet through a public TCP IP/port.  Also no port forwarding setup is required.

### TCP Socket Server - Quick Demo:
Let's use the following TCP socket server written in Python for the demo.  The solution discussed in this article would work well for any socket program: written in C, Java or Golang or any language.  

{{<source-code>}}
# tcp_server.py
import socket
s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
address = ("127.0.0.1",8000)
s.bind(address)
s.listen(1)
c , addr = s.accept()
data = c.recv(100).decode()
print("Data: ", str(data))
c.close()

{{</source-code>}}

Here is the TCP socket client program written in Python:

{{<source-code>}}
# tcp_client.py
import socket
s = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
address = ("127.0.0.1",8000)
s.connect(address)
s.send(str.encode("Hello, World!"))
s.close()
{{</source-code>}}

Now, let's check if the server and client socket program can talk to each other locally.

### Access the local TCP socket server using the local TCP client socket
Let's run the TCP socket server program using Python in a terminal:

``` sh
python3 tcp_server.py 

```

Now, in another terminal window on the same machine, run the TCP socket client program using Python:

``` sh
python3 tcp_client.py
```

The TCP socket server window will print:

``` sh
Data:  Hello, World!
```

Right now, the TCP socket server can be accessed only from your local network.  It cannot be accessed from the outside network or from the internet.

Now, to make it accessible from outside network over the internet, we need to install and setup the SocketXP agent in your server(the host machine where the TCP socket server runs).

## Remote Access to TCP Socket Server

Configuring remote access to the TCP socket server.  We are planning to setup the following:

>`TCP client socket` ==> `SocketXP Slave Mode agent(Local Proxy)` ==> `SocketXP Cloud Gateway` ==> `SocketXP agent running in your TCP socket server in master mode` ==> `TCP server socket`

### Download and install SocketXP agent
Let's download and run the SocketXP agent from the [download page](https://www.socketxp.com/download).

Next, authenticate and register the SocketXP agent/client with the SocketXP Cloud Gateway, using the auth-token from the [Portal Page](https://portal.socketxp.com)

{{<image-format src="/assets/img/AuthToken.jpg" alt="remote-access-flask-app-from-internet">}}

Click the copy button to copy the command string and paste it in the terminal window in your laptop or server.

{{<source-code>}}$ sudo socketxp login "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
{{</source-code>}}

After registering the SocketXP Client with the SocketXP Cloud Service, you can create a SSL/TLS encrypted reverse proxy tunnel between the TCP socket server running in your office server and the SocketXP Cloud Gateway, via the SocketXP Client (Hint: Imagine a VPN server and client.)

### Connect Server Socket to SocketXP Cloud Gateway

Use the following command to create a secure SSL/TLS encrypted reverse proxy tunnel between the TCP socket server and the SocketXP Cloud Gateway.  

{{<source-code>}}$ sudo socketxp connect tcp://127.0.0.1:8000
Connected to SocketXP Cloud Gateway.
Access the TCP service securely from the web portal or using the SocketXP agent in IoT slave mode.
{{</source-code>}}

## Secure Remote Access to your TCP Socket Server using Slave Mode 
To securely remote access any TCP service or application (including a TCP socket program), we will be using the SocketXP's Slave Mode feature. (Hint: Imagine a VPN client).

### SocketXP Agent Slave Mode Setup
Now to securely remote access the TCP socket server, from a remote machine (such as your laptop), [download and install](/download) the appropriate version of SocketXP agent binary on your laptop running windows OS or Linux OS or MacOS.

Next, setup the SocketXP agent to run in Slave Mode or the Local Proxy mode, as shown below. 

{{<source-code>}}
$ sudo socketxp connect tcp://127.0.0.1:4000 --iot-slave --authtoken eyJhbGciOiJIUzI1Ni... --peer-device-id cf7936fa-8b12-4df4-ab37-a3692cc8ec38 --peer-device-port 8000

Listening for TCP connections at:
Local URL -> tcp://127.0.0.1:4000
{{</source-code>}}

**Note**: you can use any local port instead of port 4000 used in the example above. Make sure you edit your TCP client socket program to connect to the server on that new port (in this case, 4000), because we are trying to proxy the TCP socket connection via the SocketXP agent running locally on your Laptop.

You can find the peer `device ID` of your TCP socket server from the `/var/lib/socketxp/device.key` file in your host machine where the SocketXP agent is running in master mode(the default mode) along side your TCP socket server.  

Alternatively, you can find the Device ID from the Devices tab in the SocketXP Web Portal.

SocketXP agent run in Slave Mode or Local Proxy mode, will proxy all connections to a local port(TCP 4000) to a remote host and remote port(8000) where the TCP socket server is running.  This tunnel/connection will be proxy'ed through the SocketXP Cloud Gateway.

### Remote Connect to the TCP socket Server via the SocketXP Local Proxy
Run your TCP client program and connect to the TCP socket server remotely and more securely via an SSL/TLS connection.

``` sh
python3 tcp_client.py

```

Now check the TCP server socket terminal window:

```sh
Data:  Hello, World!
```

Finally, check the terminal window where the SocketXP agent is running in the slave mode or local proxy mode:

```sh
Listening for TCP connections at:
Local URL -> tcp://127.0.0.1:4000
Connecting to device (cf7936fa-8b12-4df4-ab37-a3692cc8ec38, ) port (8000)
```

**Explanation**: 

What we see here is: `TCP client socket` ==> `SocketXP Slave Mode agent(Local Proxy)` ==> `SocketXP Cloud Gateway` ==> the `SocketXP agent running in your TCP socket server in master mode` ==> `TCP server socket`, working in sync behind the screen to securely encrypt and forward the traffic between the TCP socket client running in your Laptop and the TCP socket server running in your office server.

You can use the same method to securely remote access any HTTP web service:

- Apache Web Server, 
- NGINX Web Proxy Server,
- Python Web App, 
- NodeJS Web App 
    
or any TCP services such as:

- SSH server
- SMTP server
- SFTP server
- RDP/VNC server
- Database server: SQL-DB, Postgresql DB, MongoDB etc. 
    
remotely over the internet.

## Conclusion:

With [SocketXP Remote Access Solution](/iot/iot-remote-access/) – part of [IoT Device Management and Remote Access Platform](/socketxp-iot-device-management-platform), it is easy to securely remote access any TCP socket application running in your IoT device on any OS.

By following the steps outlined in this article, you can quickly set up remote access to TCP socket server or application running in your local IoT device or Linux server and access it from anywhere, anytime.

Whether you’re managing a project remotely or accessing your server or IoT device for troubleshooting or maintenance purposes, TCP socket server remote access is a powerful tool that enables you to stay connected to your remote machine with ease.

## Got questions?
If you have any questions, please write to us at: support@socketxp.com






