---
title: How to Access IoT Remote Desktop Over the Internet
slug: connect-iot-remote-desktop-xrdp-over-internet
description: "Remote access IoT desktop via RDP by installing xrdp Server on IoT, and installing the RDP client on your Windows or Mac laptop."
author: Ganesh Velrajan
tags: [
    IoT, RDP, xrdp, Remote Desktop Connection, Remote Access, Remmina, Over the Internet, Behind Firewall, NAT Router, Linux, Ubuntu
]
date: 2023-06-23
lastmod: 2024-10-18
categories: [
    IoT
]
images: ["/assets/img/iot-remote-desktop-access/remote-access-iot-remote-desktop-xrdp-from-internet.jpg"]
aliases: ["connect-raspberry-pi-remote-desktop-xrdp-over-internet"]
---

Welcome to the exciting world of Internet of Things(IoT)! Whether you're a tech enthusiast, a DIY hobbyist, or a coding aficionado, IoT has taken the world by storm. 

With its wide-ranging usecases and applications, IoT has become a go-to solution for various projects, from home automation to mission critical tasks, and much more.

One of the most powerful features of IoT is its ability to be accessed remotely, allowing you to control and interact with your IoT from anywhere in the world. 

And when it comes to remote desktop access on a IoT device such as Raspberry Pi, Nvidia Jetson Nano, Google Coral or any embedded Linux device, xrdp (X Remote Desktop Protocol) is the go-to solution. 

With xrdp, you can unlock a world of possibilities, from setting up a headless IoT to accessing your IoT's graphical desktop from any device, be it a Windows, macOS, or Linux machine.

## What is RDP 
{{<ahref href="https://learn.microsoft.com/en-us/troubleshoot/windows-server/remote/understanding-remote-desktop-protocol" rel="nofollow" >}}Remote Desktop Protocol{{</ahref>}}(RDP) is a network protocol developed by Microsoft and is widely used by users to remotely access and interact with the graphical user interface of a remote machine such as Windows Server, Mac, or Linux machine including IoT.

RDP follows the client-server model, where an RDP client is installed on a local machine, and an RDP server is installed on the remote server or IoT.

## What is xrdp
xrdp is an open-source software package that allows for remote desktop access to Linux-based operating systems, including IoT. 

xrdp stands for "X Remote Desktop Protocol" and is a protocol that enables users to connect to a Linux-based desktop environment from a remote device, such as a Windows, macOS, or another Linux machine.

xrdp uses the Remote Desktop Protocol (RDP) developed by Microsoft.

xrdp is often used as an alternative to other remote desktop solutions, such as Virtual Network Computing (VNC), as it provides a more seamless and integrated experience for connecting to Linux-based systems. 

It allows users to access their Linux desktop environment remotely, run applications, edit files, and perform other tasks using a graphical interface, making it convenient for remote administration, support, and other use cases.

## IoT Remote Desktop Access using xrdp

In this blog article, we will delve into the fascinating world of IoT remote desktop access using xrdp. 

We will guide you through the step-by-step process of setting up xrdp on your IoT, exploring its features and configuration options, and providing tips and tricks to optimize your remote desktop experience. 

So, grab your IoT, and let's embark on an exciting journey of unlocking the true potential of remote desktop access with xrdp!

## Step 1: Setting up a Desktop environment on IoT 

Before you can remotely connect to your IoT device such as Raspberry Pi or any embedded Linux device via xrdp, you need to make sure your IoT device is set up and running correctly. 

This includes installing an operating system (such as Raspbian, Ubuntu or Debian Linux or Android OS) and connecting your IoT to a display, keyboard, and mouse. 

Additionally, make sure your IoT is connected to the internet via an Ethernet cable or Wi-Fi.

For this tutorial we will assume that your IoT doesn't have a GUI desktop environment installed. We will install XFCE desktop environment, to have the actual desktop accessible on IoT. 

{{<source-code>}}sudo apt install -y xfce4 xfce4-goodies {{</source-code>}}

Next, we will install xrdp to access this GUI desktop environment from a different machine.

## Step 2: Install and setup xrdp on IoT
Following the below instructions to install xrdp on your IoT:
1.	Open a terminal window.
2.	Update the package list on your system by running the following command: 
    {{<source-code>}}sudo apt update{{</source-code>}}
3.	Install xrdp by running the following command: 
    {{<source-code>}}sudo apt install xrdp{{</source-code>}}
4.	Once the installation is complete, start the xrdp service by running the following command: 
    {{<source-code>}}sudo systemctl start xrdp{{</source-code>}}
5.	Optionally, you can enable the xrdp service to start automatically at boot by running the following command: 
    {{<source-code>}}sudo systemctl enable xrdp{{</source-code>}}

7.  It's important to configure your firewall settings in your IoT to allow incoming RDP traffic to your IoT on TCP port 3389 using the following command: 
    {{<source-code>}}sudo ufw allow 3389/tcp{{</source-code>}}

Now you can access your IoT desktop via xrdp from your Windows or Mac PC in a local network.  You can jump to Step #4 if you want to access IoT remote desktop using an RDP client from a local network.

But our goal is to connect to IoT desktop remotely over the internet.

For this, we'll use the SocketXP [IoT Remote Access](/iot-remote-access) solution as shown in the next step.

## Step 3: Install SocketXP IoT Remote Access Agent

We need to install SocketXP IoT Remote Access Agent to run in two different places:

  - IoT - in IoT Master Mode (Default Mode)
  - Laptop or PC - in IoT Slave Mode

Follow the SocketXP [download and install](https://www.socketxp.com/download) instructions to install the SocketXP Remote Access agent on IoT and the access devices.

To make SocketXP agent to run in IoT Master Mode (which is the default mode of SocketXP agent) use the below command.

{{<source-code>}}
$ socketxp  connect tcp://localhost:3389

Connected to SocketXP Cloud Gateway.
Access the TCP service securely using the SocketXP agent in IoT Slave Mode.
{{</source-code>}}

where localhost port 3389 is the RDP server port, on which xrdp is listening for connections from a RDP client such as RDC.

Next, to access IoT device from your Windows laptop or PC, install SocketXP Agent for Windows and run the below command:

{{<source-code>}}
$ ./socketxp.exe connect tcp://localhost:3000 --iot-slave --peer-device-id "2233-abcdefgh-2342abc" --peer-device-port 3389 --authtoken &lt;auth token&gt;
Listening for TCP connections at:
Local URL -> tcp://localhost:3000  
{{</source-code>}}
where 3000 is a local port on your PC at which you want to access IoT.  You can choose to use any free local port instead of port 3000.

You shall find the device ID of your IoT device from the [SocketXP Portal page in IoT Devices section](https://portal.socketxp.com/#/devices).  For our illustration, we assume `2233-abcdefgh-2342abc` is the device ID of your IoT device.

## Step 4: Connect to IoT remote desktop using RDP Client
With xrdp up and running on your IoT, you can now connect to it using an RDP client such as Remote Dekstop Connection (RDC) in Windows or Remmina in Linux.
 
If you are using Linux, use the following command to install Remmina on your Ubuntu Linux based access device such as your laptop: 
{{<source-code>}}sudo apt update
sudo apt install remmina{{</source-code>}}

### Connecting from Local Network

To access the remote desktop of your IoT connected to your local network, simply open the RDC client, enter the IP address or hostname of your IoT, and click "Connect". Enter your IoT's username and password when prompted.

If you are using Linux, you can use the Remmina Remote Desktop Client, which is a popular RDP client for Linux. Open Remmina, click on "New" to create a new connection, select "RDP" as the protocol, and enter your IoT's IP address or hostname, username, and password. Click "Connect" to establish the remote desktop connection.

### Connecting from Outside Network Over the Internet

If you want to remotely access IoT desktop over the internet using SocketXP [IoT Remote Access](/iot-remote-access) solution, then enter `localhost` or `127.0.0.1` as the IP address and port `3000` on the RDC client.  

This is the IP address and port on which SocketXP agent configured to run in `iot-slave` mode, in Step#3 above, is listening for local proxy connections.

{{<image-format src="/assets/img/iot-remote-desktop-access/iot-remote-desktop-access-using-xrdp.png"  alt="iot-remote-desktop-access-xrdp-from-outside-network" width="800" height="600">}}

Once connected, you will be able to see and interact with your IoT's desktop environment, just as if you were physically sitting in front of it. You can run applications, edit files, and perform other tasks remotely.


{{<image-format src="/assets/img/iot-remote-desktop-access/remote-access-iot-remote-desktop-xrdp-from-internet.jpg"  alt="iot-remote-desktop-access-xrdp-from-outside-network" width="800" height="600">}}

## Conclusion:

With xrdp, remote access to your IoT has never been easier. 

[SocketXP IoT Remote Access Solution](/iot-remote-access) -- part of [IoT Device Management and Remote Access Platform](/iot/iot-device-management-platform), is a highly scalable solution that uses secure SSL/TLS tunnel to remotely connect and access IoT VNC server from a Windows Laptop or a Mac Book.

By following the steps outlined in this article, you can quickly set up xrdp on your IoT and establish a secure and convenient remote desktop connection from anywhere, anytime. 

Whether you're managing a IoT project remotely or accessing your IoT for troubleshooting or maintenance purposes, xrdp is a powerful tool that enables you to stay connected to your IoT with ease. 

Happy remote accessing your IoT!

