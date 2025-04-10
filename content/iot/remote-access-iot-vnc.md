---
title: >
    Remotely Connect to IoT via VNC : A Step-by-Step Guide
slug: remotely-connect-iot-via-vnc
description: "Remote access IoT desktop via VNC by installing TightVNC Server on IoT, and installing the TightVNC client on your Windows laptop."
author: Ganesh Velrajan
tags: [
    IoT, VNC, Remote Desktop, Remote Access, TightVNC, Internet, Behind Firewall, NAT Router
]
date: 2023-06-23
lastmod: 2024-11-18
categories: [
    IoT
]
images: ["/assets/img/iot-remote-access-vnc/remote-access-iot-via-vnc.jpg"]
aliases: ["how-to-iot-remote-access-remote-desktop-from-windows-using-vnc", "how-to-remote-access-raspberry-pi-remote-desktop-from-windows-using-vnc", "remotely-connect-raspberry-pi-via-vnc"]
---
One of the key features of IoT is its ability to be accessed remotely, allowing you to control it from another device. One of the most common methods to achieve this is by using Virtual Network Computing (VNC). 

In this article, we will guide you through the process of remotely connecting to a IoT such as Raspberry Pi, Nvidia Jetson Nano, or Google Coral via VNC.

Remotely connecting and accessing a IoT Remote Desktop involves the following steps:

1. Setting up a desktop environment (XFCE) for your IoT
2. Installing TightVNC Server on IoT, as well as install the TightVNC client for Windows or Mac.  
3. Installing SocketXP IoT Remote Access[/iot-remote-access] agent on IoT.
4. Connecting to IoT remotely via the TightVNC client from a Windows or Mac laptop over the internet.



## Step 1: Setting up XFCE desktop environment on IoT 

Before you can remotely connect to your IoT via VNC, you need to make sure your IoT is set up and running. 

This includes installing an operating system (such as Raspbian) and connecting your IoT to a display, keyboard, and mouse. 

Additionally, make sure your IoT is connected to the internet via an Ethernet cable or Wi-Fi.

For this tutorial we will assume that your IoT doesn't have a GUI desktop environment installed. We will install XFCE desktop environment, to have the actual desktop accessible on IoT. 

{{<source-code>}}sudo apt install -y xfce4 xfce4-goodies {{</source-code>}}

Next, we will install tightvncserver to be able to access that GUI desktop.

## Step 2: Installing TightVNC server on IoT

Use the following command to install TightVNC server on IoT.

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

Now we're ready to access our IoT desktop via VNC from our Windows or Mac PC on a local network.  

But our goal is to connect to IoT remotely via VNC over the internet.

For this, we'll use the [SocketXP IoT Remote Access solution](/iot-remote-access) as shown in the next step.

## Step 3: Installing SocketXP IoT Remote Access Agent

We need to install SocketXP IoT Remote Access Agent to run in two different places:


  - IoT - in IoT Master Mode (Default Mode)
  - Laptop or PC - in IoT Slave Mode

Follow the SocketXP [download and install](https://www.socketxp.com/download) instructions to install the SocketXP Remote Access agent on IoT and the access devices.

To make SocketXP agent to run in IoT Master Mode (which is the default mode of SocketXP agent) use the below command.

{{<source-code>}}
$ socketxp  connect tcp://localhost:5901

Connected to SocketXP Cloud Gateway.
Access the TCP service securely using the SocketXP agent in IoT Slave Mode.
{{</source-code>}}
where localhost port 5901 is the VNC server port, on which tightvncserver is listening for connections from a VNC viewer .

Next, to access IoT device from your Windows laptop or PC, install SocketXP Agent for Windows and run the below command:


{{<source-code>}}
$ ./socketxp.exe connect tcp://localhost:10111 --iot-slave --peer-device-id "2233-abcdefgh-2342abc" --peer-device-port 5901 --authtoken &lt;auth token&gt;
Listening for TCP connections at:
Local URL -> tcp://localhost:10111  
{{</source-code>}}
where 10111 is a local port on your PC at which you want to access IoT.  You can choose to use any free local port instead of port 10111.
You shall find the device ID of your IoT device from the [SocketXP Portal page in IoT Devices section](https://portal.socketxp.com/#/devices).

## Step 4: Connecting remotely to IoT via VNC viewer from Windows:

Install TightVNC Viewer from the {{<ahref href="https://www.tightvnc.com/download.php" rel="nofollow">}}TightVNC website.{{</ahref>}}


Launch TightVNC Viewer and it will bring you straight to the login window. Fill it out with the following details:

    - Remote Host: localhost:10111.

{{<image-format src="/assets/img/iot-remote-access-vnc/tightvnc-viewer.png"  alt="access rasperry pi remotely via vnc" >}}

When done click on "Connect". This will bring you to the authentication window.


{{<image-format src="/assets/img/iot-remote-access-vnc/tightvnc-viewer-login.png"  alt="connect rasperry pi via vnc remotely" >}}


This is where you provide your access password that you've set up in the first section of this article. When you click OK, you will see the desktop of your IoT.


{{<image-format src="/assets/img/iot-remote-access-vnc/iot-remote-access-via-vnc.jpg"  alt="rasperry pi remote access via vnc" width="800" height="600">}}

Please keep in mind that there's a lot of data being transferred in between your IoT and your Windows PC in order to provide live desktop experience, so the quality and response time might not be exactly as on a local desktop.


## Conclusion:
Remote access to your IoT via VNC can be a powerful tool that allows you to control your IoT from any device with a VNC viewer installed. 

[SocketXP IoT Remote Access Solution](/iot-remote-access) -- part of [IoT Device Management and Remote Access Platform](/iot/iot-device-management-platform),  is a highly scalable solution that uses secure SSL/TLS tunnel to remotely connect and access IoT VNC server from a Windows Laptop or a Mac Book.

With the simple steps outlined in this article, you can easily set up and connect to your IoT remotely via VNC. 

This can be particularly useful in scenarios where you want to access your IoT headless (without a display, keyboard, and mouse), or when you need to manage your IoT from a different location.

So go ahead and try remote access via VNC for your IoT and enjoy the flexibility and convenience it offers!




 