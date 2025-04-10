---
title: >
    Remotely Connect to Linux Desktop via VNC from Windows: A Step-by-Step Guide
slug: remotely-connect-linux-desktop-gui-via-vnc-from-windows
description: "Remote access Linux server desktop GUI via VNC by installing TightVNC Server on the Linux server, and installing the TightVNC client on your Windows laptop."
author: Ganesh Velrajan
tags: [
    Linux server, Windows, VNC, Remote Desktop, Remote Access, TightVNC, Internet, Behind Firewall, NAT Router
]
date: 2023-08-05
lastmod: 2024-10-15
categories: [
    Linux Server
]
images: ["/assets/img/raspberry-pi-remote-access-vnc/remote-access-raspberry-pi-via-vnc.jpg"]
aliases: []
---
In this article, we'll discuss how to remotely access your Linux or Ubuntu desktop GUI from Windows using VNC, making it easier than ever to manage your Linux server from anywhere in the world.

One of the key features of the Linux server is its ability to be accessed remotely, allowing you to control it from another device. One of the most common methods to achieve this is by using Virtual Network Computing (VNC). 

In this article, we will guide you step-by-step through the process of remotely connecting to a Linux desktop GUI via VNC.

Remotely connecting and accessing a Linux server Remote Desktop involves the following steps:

1. Setting up a desktop environment (XFCE) for your Linux server
2. Installing TightVNC Server on the Linux server, as well as install the TightVNC client for Windows or Mac.  
3. Installing SocketXP Linux Server Remote Access[/remote-access-linux-server] agent on the Linux server.
4. Connecting to Linux server remotely via the TightVNC client from a Windows or Mac laptop over the internet.


## Step 1: Setting up XFCE desktop environment on Linux server 

Before you can remotely connect to your Linux server via VNC, you need to make sure your Linux server is set up and running. 

This includes installing an operating system (such as Ubuntu) and connecting your Linux server to a display, keyboard, and mouse. 

Additionally, make sure your Linux server is connected to the internet via an Ethernet cable or Wi-Fi.

For this tutorial we will assume that your Linux server doesn't have a GUI desktop environment installed. We will install XFCE desktop environment, to have the actual desktop accessible on the Linux server. 

**Note:** If your Linux server already has a desktop environment set up, say Ubuntu Desktop, then you can skip this step and jump to the next step.

{{<source-code>}}sudo apt install -y xfce4 xfce4-goodies {{</source-code>}}

Next, we will install `tightvncserver` to be able to access that GUI desktop.

## Step 2: Installing TightVNC server on Linux server

Use the following command to install TightVNC server on Linux server.

{{<source-code>}}sudo apt install -y tightvncserver{{</source-code>}}

The next thing we'll have to do is to set up an access password for VNC clients. This is done on the first run of your VNC server. Simply run the command below:

{{<source-code>}}vncserver{{</source-code>}}

You will be asked to provide two passwords. 

One is an access password and the other is a view-only password. 

The access password lets you connect to the desktop and interact with it using keyboard and mouse whereas the view-only password will only let a user observe your desktop. 

The view only password is optional so you can skip setting it up when asked by pressing the enter key on your keyboard.

Now that the password is set up we will configure a startup file for VNC. 

Firstly, we'll have to shut down our currently running VNC server.

{{<source-code>}}vncserver -kill :1{{</source-code>}}

Then we'll create a backup of current startup file, in case we'd like to revert back to it.

{{<source-code>}}mv ~/.vnc/xstartup ~/.vnc/xstartup.bak{{</source-code>}}

Finally, we'll create a new startup file.

{{<source-code>}}printf '#!/bin/bash\nxrdb $HOME/.Xresources\nstartxfce4 &\n' > ~/.vnc/xstartup
sudo chmod +x ~/.vnc/xstartup{{</source-code>}}

This will create the following file:

{{<source-code>}}
#!/bin/bash
xrdb $HOME/.Xresources
startxfce4 & 
{{</source-code>}}

The first line xrdb $HOME/.Xresources tells the VNC's GUI framework to read the server user's Xresource file.

The second line starts the Xfce in background.

Now, re-start the VNC server using the command below.

{{<source-code>}}$ vncserver{{</source-code>}}

Now we're ready to access our Linux server desktop via VNC from our Windows or Mac PC on a local network.  

But our goal is to connect to Linux server remotely via VNC over the internet.

For this, we'll use the [SocketXP Linux server Remote Access solution](/remote-access-linux-server) as shown in the next step.

## Step 3: Installing SocketXP Linux server Remote Access Agent

We need to install SocketXP Linux server Remote Access Agent to run in two different places:


  - Linux server - in IoT Master Mode (Default Mode)
  - Windows Laptop or PC - in IoT Slave Mode

Follow the SocketXP [download and install](https://www.socketxp.com/download) instructions to install the SocketXP Remote Access agent on the Linux server and the access devices.

To make SocketXP agent to run in IoT Master Mode (which is the default mode of SocketXP agent) use the below command.

{{<source-code>}}
$ socketxp  connect tcp://localhost:5901

Connected to SocketXP Cloud Gateway.
Access the TCP service securely using the SocketXP agent in IoT Slave Mode.
{{</source-code>}}
where localhost port 5901 is the VNC server port, on which tightvncserver is listening for connections from a VNC viewer .

Next, to access the Linux server device from your Windows laptop or PC, install SocketXP Agent for Windows and run the below command:


{{<source-code>}}
$ ./socketxp.exe connect tcp://localhost:10111 --iot-slave --peer-device-id "2233-abcdefgh-2342abc" --peer-device-port 5901 --authtoken &lt;auth token&gt;
Listening for TCP connections at:
Local URL -> tcp://localhost:10111  
{{</source-code>}}
where 10111 is a local port on your PC at which you want to access the Linux server.  You can choose to use any free local port instead of port 10111.
You shall find the device ID of your Linux server device from the [SocketXP Portal page in the IoT Devices section](https://portal.socketxp.com/#/devices).

## Step 4: Connecting remotely to Linux server via VNC viewer from Windows:

Install TightVNC Viewer from the {{<ahref href="https://www.tightvnc.com/download.php" rel="nofollow">}}TightVNC website.{{</ahref>}}

Launch TightVNC Viewer and it will bring you straight to the login window. Fill it out with the following details:

    - Remote Host: localhost:10111.

{{<image-format src="/assets/img/raspberry-pi-remote-access-vnc/tightvnc-viewer.png"  alt="access linux server remotely via vnc" >}}

When done click on "Connect". This will bring you to the authentication window.


{{<image-format src="/assets/img/raspberry-pi-remote-access-vnc/tightvnc-viewer-login.png"  alt="connect linux server via vnc remotely" >}}


This is where you provide your access password that you've set up in the first section of this article. When you click OK, you will see the desktop of your Linux server.


{{<image-format src="/assets/img/raspberry-pi-remote-access-vnc/remote-access-raspberry-pi-via-vnc.jpg"  alt="linux server remote access via vnc" width="800" height="600">}}

Please keep in mind that there's a lot of data being transferred in between your Linux server and your Windows PC in order to provide live desktop experience, so the quality and response time might not be exactly as on a local desktop.


## Conclusion:
Remote access to your Linux server via VNC can be a powerful tool that allows you to control your Linux server from any device with a VNC viewer installed. 

[SocketXP Linux Server Remote Access Solution](/remote-access-linux-server) is a highly scalable solution that uses secure SSL/TLS tunnel to remotely connect and access Linux server VNC server from a Windows Laptop or a Mac Book.

With the simple steps outlined in this article, you can easily set up and connect to your Linux server remotely via VNC. 

This can be particularly useful in scenarios where you want to access your Linux server headless (without a display, keyboard, and mouse), or when you need to manage your Linux server from a different location.

So go ahead and try remote access via VNC for your Linux server and enjoy the flexibility and convenience it offers!




 