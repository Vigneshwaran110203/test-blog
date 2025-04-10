---
title: IoT Remote Access, Control and Management Over the Internet
slug: iot-remote-access-control-over-the-internet
description: "Learn how to remotely access, control and manage your IoT device securely over the internet using SSH, Remote Desktop, VNC and RDP through SocketXP secure SSH tunnels.  No port-forwarding or router configuration changes required."
author: Ganesh Velrajan
tags: [
    IoT, Remote Access, Over the Internet, SSH, Remote Desktop RDP, VNC, Web Server, Firewall, NAT Router, Outside Newtork, secure connection, Without Port Forwarding
]
date: 2023-08-12
lastmod: 2024-10-17
categories: [
    IoT
]
images: ["/assets/img/raspberry-pi-remote-ssh-access/iot-remote-ssh.png"]
aliases: ["how-to-access-raspberry-pi-remotely-over-the-internet-using-ssh-vnc-remote-desktop", "how-to-access-raspberry-pi-remotely-over-the-internet", "access-raspberry-pi-remotely-over-the-internet"]
---

In this article, we'll discuss how to remotely access, control and manage your IoT devices from outside of our home or office network over the internet, allowing you to remotely manage your IoT device from anywhere.

IoT is quickly becoming popular worldwide because of the unlimited workflow automation opportunities that comes with it. However, if not managed properly, these IoT devices can become a liability and lead to customer churn, resulting in lost revenue. 

>**The biggest challenge for any IoT vendor is:**  
How to securely connect and manage IoT device remotely over the internet to login, debug, monitor, reboot, reconfigure and update it? 

There are several ways to [securely access IoT device remotely over the Internet](/iot-remote-access) but the most common ones are:

1.	[Secure Shell (SSH)](/iot/ssh-secure-shell/)
2.	Remote Desktop Protocol(RDP)
3.	Virtual Network Connection(VNC)
4.	Web Application
5.	Remote Command Execution

In this article, we’ll discuss how to configure and setup IoT device for:

- [Remote access IoT device via SSH over the internet](/iot/remote-access-iot-ssh-over-the-internet)
- [Remote access IoT device GUI desktop using VNC over the internet](/iot/remotely-connect-iot-via-vnc)
- [Remote access IoT device GUI desktop using RDP over the internet](/iot/connect-iot-remote-desktop-xrdp-over-internet)
- [Remote access IoT device web application over the internet](/iot/remote-access-iot-web-app-from-internet)
- [Execute remote commands on IoT device over the internet](/iot/remote-command-script-execution-iot)

We will be using [SocketXP IoT Management and Remote Access Platform](/) to [remotely connect to IoT device](/iot-remote-access).

You can use SocketXP to remotely connect to any IoT device behind NAT router and firewall from outside network such as the internet.


## What is SocketXP

SocketXP is a cloud based secure remote access solution to access, manage and debug embedded Linux devices such as IoT device, Nvidia Jetson or any IoT device over the internet. SocketXP creates a secure SSL/TLS connection over the internet to your [IoT device for secure remote access](/iot-remote-access).  

No configuration changes are required in your home or office router to make the SocketXP solution work.  No public IP is required.

It simply works out of the box.

SocketXP creates SSL/TLS reverse proxy tunnels to securely connect to remote devices.

SocketXP does not use insecure methods such as port-forwarding techniques or Dynamic DNS(DDNS) to provide remote access to your  IoT device.

SocketXP is an enterprise-grade IoT remote access and management platform trusted by thousands of customers around the world today for [secure remote access to their IoT](/iot-remote-access) device over the internet from outside network. 

Let's dive in and get started.

## 1.  Remotely connect to IoT behind NAT router or firwall over the Internet using SSH
[Secure Shell (SSH)](/iot/ssh-secure-shell/) is a network protocol that provides a secure means to connect to a raspberry terminal over an unsecured network such as the internet. 

SSH follows a client server model – the SSH server runs on the IoT and the SSH client runs on the user laptop or PC.   SSH server listens on TCP port 22 by default.

OpenSSH provides an open source implementation of the SSH server and client software.  

**Note:** Your IoT device comes installed with an SSH server software in it.

SSH client needs to know the IP address of the device in which the SSH server runs so that it can connect to it.  

Because IoT devices installed behind a NAT router and firewall cannot be access from the internet, we’ll use SocketXP's [IoT Remote Access solution](/iot-remote-access) to remotely connect to the IoT terminal using SSH over the internet.

{{<image-format src="/assets/img/raspberry-pi-remote-ssh-access/iot-remote-ssh.png"  alt="remote access IoT behind NAT router or Firewall over the internet from outside network" >}}

To learn more refer to: [how to setup and configure your IoT for remote SSH access over the internet](/iot/remote-access-iot-ssh-over-the-internet/)

## 2. Connect to IoT remotely over the Internet using VNC
Virtual Network Connection(VNC)  is a protocol for safely accessing the IoT Graphical User Interface(GUI) or desktop.   VNC is typically used for remotely accessing the GUI of a Linux based platforms such as IoT.

VNC follows a client server model – the VNC server runs on the IoT and the VNC client runs on the user laptop or PC.   VNC server listens on TCP port 5901 by default.

TightVNC is a open source based VNC software that can be installed on  IoT for remote desktop access.

Because IoT devices installed behind a NAT router and firewall cannot be access from the internet, we’ll use SocketXP's [IoT Remote Access solution](/iot-remote-access) to remotely connect to the IoT GUI desktop using VNC over the internet.

{{<image-format src="/assets/img/raspberry-pi-remote-access-vnc/remote-access-raspberry-pi-via-vnc.jpg"  alt="iot remote access behind NAT router or firewall over the internet from outside network" width="800" height="600">}}

To learn more refer to: [how to setup and configure your IoT for remote VNC access over the internet](/iot/remotely-connect-iot-via-vnc/)


## 3. Connect to IoT Remote Desktop(RDP) over the Internet using xrdp
Remote Desktop Protocol(RDP)  is a proprietary protocol invented by Microsoft for accessing the Windows desktop of one Windows machine from another Windows machine in a local network.  

RDP follows a client server model – the RDP server runs on the IoT and the RDP client runs on the user laptop or PC.   RDP server listens on TCP port 3389 by default.

Microsoft has opened up the RDP for third parties to implement the same.  xrdp is a open source implementation of the Microsoft RDP.  xrdp is typically used for remotely accessing the GUI desktop of a Linux based platforms such as IoT.

Because IoT devices installed behind a NAT router and firewall cannot be access from the internet, we’ll use SocketXP's [IoT Remote Access solution](/iot-remote-access) to remotely connect to the IoT GUI desktop using xrdp over the internet.

{{<image-format src="/assets/img/raspberry-pi-remote-desktop-access/remote-access-raspberry-pi-remote-desktop-xrdp-from-internet.jpg"  alt="IoT behind NAT router or firewall remote desktop access from outside network over the internet from windows 10" width="800" height="600">}}


To learn more refer to: [how to setup and configure your IoT for remote desktop access over the internet using xrdp](/iot/connect-iot-remote-desktop-xrdp-over-internet/)

## 4. Remote Control IoT Behind NAT router or Firewall using a Web App
Installing and running a web application on your IoT is one way  to remotely connect and control your IoT using a web client.

For example, you could write a simple python flask web server application to remotely access the files – images, videos from a web camera, configuration files, log files etc.

{{<source-code>}}
$ cat get_files.py
from flask import Flask, send_from_directory

app = Flask(__name__)

@app.route('/<path:path>')
def send_report(path):
    return send_from_directory('/', path)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=3000, debug=True)
{{</source-code>}}

You can use a web browser to  access this web server application running in your IoT from a local network. Just point your browser to: http://localhost:3000

But, IoT devices installed behind a NAT router and firewall cannot be access from the internet.  

We’ll use SocketXP's [IoT Remote Access solution](/iot-remote-access) to remotely connect to the python flask web  server application over the internet.  

SocketXP creates a secure public web URL (HTTPS) for the local web app running in your Pi.

{{<image-format src="/assets/img/remote-access-flask-app-from-internet/remote-access-raspberry-pi-web-app-from-internet.jpg" alt="remotely connect to IoT behind NAT router or firewall over the internet from outside network">}}


To learn more refer to: [how to remote access IoT web app over the internet](/iot/remote-access-iot-web-app-from-internet/)

## 5.  Send Remote Commands to IoT over the Internet from Outside Network
Remote Command  Execution - the ability to send one-off shell commands to your IoT to quickly fetch crucial information or take some corrective action on  your remote IoT is immensely important.  

It is cumbersome to always having to SSH login to your IoT using your login and password to execute even a simple command or a program.

This becomes even more tedious if you have to execute the same script or command on a fleet of IoT.

SocketXP's [IoT Remote Access solution](/iot-remote-access) provides you the ability to remotely execute shell script, command or any python program on a single IoT or on a fleet of IoT over the internet.

To learn more refer to: [how to setup and configure your IoT for remote command execution over the internet](/iot/remote-command-script-execution-iot)

## Conclusion:

In this article, we discused the five different options available to remotely access IoT, such as: SSH, VNC, RDP, Web App and Remote Command Execution.

We also discussed how SocketXP’s [IoT Remote Access solution](/iot-remote-access) offers a secure, powerful and convenient way to remotely manage and control your IoT devices. 

With its user-friendly interface, advanced features, and unparalleled flexibility, this innovative solution is a must-have tool for IoT enthusiasts.

Take advantage of this cutting-edge solution and unlock the full potential of your IoT devices. Try SocketXP’s IoT Remote Access solution today and discover the convenience and versatility it can bring to your IoT projects.


