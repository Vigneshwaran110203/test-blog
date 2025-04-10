---
title: How to Remote Access Linux Desktop GUI from Windows over the Internet
slug: remote-connect-linux-desktop-gui-rdp-from-windows-over-internet
description: "Remote access Linux desktop via RDP by installing xrdp server on the Linux server, and installing the RDP client on your Windows or Mac laptop."
author: Ganesh Velrajan
tags: [
    Linux server, RDP, xrdp, Remote Desktop Connection, Remote Access, Remmina, Over the Internet, Behind Firewall, NAT Router, Linux, Ubuntu, Windows
]
date: 2023-08-05
lastmod: 2024-10-17
categories: [
    Linux Server
]
images: ["/assets/img/raspberry-pi-remote-desktop-access/remote-access-raspberry-pi-remote-desktop-xrdp-from-internet.jpg"]
aliases: []
---

In this article, we'll discuss how to remotely access your Linux or Ubuntu desktop GUI from Windows using RDP, making it easier than ever to manage your Linux server from anywhere in the world.

One of the most powerful features of the Linux is its ability to be accessed remotely, allowing you to control and interact with your Linux server or Ubuntu over the internet from outside network. 

And when it comes to remote desktop access on a Linux server, xrdp (X Remote Desktop Protocol) is the go-to solution. 

With xrdp, you can unlock a world of possibilities, from setting up a headless Linux server to accessing your Linux server's graphical desktop from any machine, be it a Windows, macOS, or Linux machine.

{{< youtube T_ss1-a7qW8 >}}




## What is RDP 
{{<ahref href="https://learn.microsoft.com/en-us/troubleshoot/windows-server/remote/understanding-remote-desktop-protocol" rel="nofollow" >}}Remote Desktop Protocol{{</ahref>}}(RDP) is a network protocol developed by Microsoft and is widely used by users to remotely access and interact with the graphical user interface of a remote machine such as Windows Server, Mac, or Linux machine including Linux server.

RDP follows the client-server model, where an RDP client is installed on a local machine, and an RDP server is installed on the remote server or Linux server.

## What is xrdp
xrdp is an open-source software package that allows for remote desktop access to Linux-based operating systems, including Linux server. 

xrdp stands for "X Remote Desktop Protocol" and is a protocol that enables users to connect to a Linux-based desktop environment from a remote device, such as a Windows, macOS, or another Linux machine.

xrdp uses the Remote Desktop Protocol (RDP) developed by Microsoft.

xrdp is often used as an alternative to other remote desktop solutions, such as Virtual Network Computing (VNC), as it provides a more seamless and integrated experience for connecting to Linux-based systems. 

It allows users to access their Linux desktop environment remotely, run applications, edit files, and perform other tasks using a graphical interface, making it convenient for remote administration, support, and other use cases.

## Linux server Remote Desktop Access using xrdp

In this blog article, we will delve into the fascinating concept of Linux server remote desktop access using xrdp. 

We will guide you through the step-by-step process of setting up xrdp on your Linux server, exploring its features and configuration options, and providing tips and tricks to optimize your remote desktop experience. 

So, grab your Linux server, and let's embark on an exciting journey of unlocking the true potential of remote desktop access with xrdp!

>**Recommended for you:**  How to securely [remote access Linux Servers using SSH from Windows](/iot/remote-access-linux-server-ssh-over-the-internet-from-windows).

## Step 1: Setting up a Desktop environment on Linux server 

Before you can remotely connect to your Linux server via xrdp, you need to make sure your Linux server is set up and running. 

This includes installing an operating system (such as Ubuntu) and connecting your Linux server to a display, keyboard, and mouse. 

Additionally, make sure your Linux server is connected to the internet via an Ethernet cable or Wi-Fi.

For this tutorial we will assume that your Linux server doesn't have a GUI desktop environment installed. We will install XFCE desktop environment, to have the actual desktop accessible on the Linux server. 

**Note:** If your Linux server already has a desktop environment set up, say Ubuntu Desktop, then you can skip this step and jump to the next step.

{{<source-code>}}sudo apt install -y xfce4 xfce4-goodies {{</source-code>}}

Next, we will install xrdp to access this GUI desktop environment from a different machine.

## Step 2: Install and setup xrdp on Linux server
Following the below instructions to install xrdp on your Linux server:
1.	Open a terminal window.
2.	Update the package list on your system by running the following command: 
    {{<source-code>}}sudo apt update{{</source-code>}}
3.	Install xrdp by running the following command: 
    {{<source-code>}}sudo apt install xrdp{{</source-code>}}
4.	Once the installation is complete, start the xrdp service by running the following command: 
    {{<source-code>}}sudo systemctl start xrdp{{</source-code>}}
5.	Optionally, you can enable the xrdp service to start automatically at boot by running the following command: 
    {{<source-code>}}sudo systemctl enable xrdp{{</source-code>}}

7.  It's important to configure your firewall settings in your Linux server to allow incoming RDP traffic to your Linux server on TCP port 3389 using the following command: 
    {{<source-code>}}sudo ufw allow 3389/tcp{{</source-code>}}

Now you can access your Linux server desktop via xrdp from your Windows or Mac PC in a local network.  You can jump to Step #4 if you want to access Linux server remote desktop using an RDP client from a local network.

But our goal is to connect to Linux server desktop remotely over the internet.

For this, we'll use the SocketXP [Linux Server Remote Access](/remote-access-linux-server) solution as shown in the next step.

## Step 3: Install SocketXP Linux Server Remote Access Agent

We need to install SocketXP Linux Server Remote Access Agent to run in two different places:

  - Linux server - in IoT Master Mode (Default Mode)
  - Laptop or PC - in IoT Slave Mode

Follow the SocketXP [download and install](https://www.socketxp.com/download) instructions to install the SocketXP Remote Access agent on the Linux server and the access devices.

To make SocketXP agent to run in IoT Master Mode (which is the default mode of SocketXP agent) use the below command.

{{<source-code>}}
$ socketxp  connect tcp://localhost:3389

Connected to SocketXP Cloud Gateway.
Access the TCP service securely using the SocketXP agent in IoT Slave Mode.
{{</source-code>}}

where localhost port 3389 is the RDP server port, on which xrdp is listening for connections from a RDP client such as RDC.

Next, to access the Linux server device from your Windows laptop or PC, install SocketXP Agent for Windows and run the below command:

{{<source-code>}}
$ ./socketxp.exe connect tcp://localhost:3000 --iot-slave --peer-device-id "2233-abcdefgh-2342abc" --peer-device-port 3389 --authtoken &lt;auth token&gt;
Listening for TCP connections at:
Local URL -> tcp://localhost:3000  
{{</source-code>}}
where 3000 is a local port on your PC at which you want to access the Linux server.  You can choose to use any free local port instead of port 3000.

You shall find the device ID of your Linux server device from the [SocketXP Portal page in the IoT Devices section](https://portal.socketxp.com/#/devices).  For our illustration, we assume `2233-abcdefgh-2342abc` is the device ID of your IoT device.

## Step 4: Connect to Linux server remote desktop using RDP Client
With xrdp up and running on your Linux server, you can now connect to it using an RDP client such as Remote Dekstop Connection (RDC) in Windows or Remmina in Linux.
 
If you are using Linux, use the following command to install Remmina on your Ubuntu Linux based access device such as your laptop: 
{{<source-code>}}sudo apt update
sudo apt install remmina{{</source-code>}}

### Connecting from Local Network

To access the remote desktop GUI of your Linux server connected to your local network, simply open the Windows Remote Desktop Client(RDC), enter the IP address or hostname of your Linux server, and click "Connect". Enter your Linux server's username and password when prompted.

If you are using Linux, you can use the Remmina Remote Desktop Client, which is a popular RDP client for Linux. Open Remmina, click on "New" to create a new connection, select "RDP" as the protocol, and enter your Linux server's IP address or hostname, username, and password. Click "Connect" to establish the remote desktop connection.

### Connecting from Outside Network Over the Internet

If you want to remotely access Linux server desktop from Windows over the internet using SocketXP [Linux Server Remote Access](/remote-access-linux-server) solution, then enter `localhost` or `127.0.0.1` as the IP address and port `3000` on the RDC client.  

This is the IP address and port on which SocketXP agent configured to run in `iot-slave` mode, in Step#3 above, is listening for local proxy connections.

{{<image-format src="/assets/img/raspberry-pi-remote-desktop-access/raspberry-pi-remote-desktop-access-using-xrdp.png"  alt="linux server remote desktop access RDP xrdp from anywhere" width="800" height="600">}}

Once connected, you will be able to see and interact with your Linux server's desktop environment, just as if you were physically sitting in front of it. You can run applications, edit files, and perform other tasks remotely.


{{<image-format src="/assets/img/raspberry-pi-remote-desktop-access/remote-access-raspberry-pi-remote-desktop-xrdp-from-internet.jpg"  alt="linux server remote desktop access RDP xrdp from windows over the internet" width="800" height="600">}}

## Conclusion:

With xrdp, remote access to your Linux server desktop GUI has never been easier. 

[SocketXP Linux Server Remote Access Solution](/remote-access-linux-server) is a highly scalable solution that uses secure SSL/TLS tunnel to remotely connect and access Linux server VNC server from a Windows Laptop or a Mac Book.

By following the steps outlined in this article, you can quickly set up xrdp on your Linux server and establish a secure and convenient remote desktop connection from anywhere, anytime. 

Whether you're managing a Linux server remotely or accessing your Linux server for troubleshooting or maintenance purposes, xrdp is a powerful tool that enables you to stay connected to your Linux server with ease. 

Happy remote controlling your Linux server!

## Recommended Suggestions
Based on your interest, you may also be interested in: 
- How to securely [remote access Linux Server using SSH from Windows](/iot/remote-access-linux-server-ssh-over-the-internet-from-windows).

{{< youtube 489xTArHxCY >}}

