---
title: How to Share Your Linux Terminal with Your Team Members
slug: linux-terminal-sharing-ssh-session-sharing
description: "SocketXP is a powerful tool for sharing your Linux terminal or SSH session with people you trust. Your customers or team members can connect to your Linux terminal session via a browser over HTTPS protocol."
author: Ganesh Velrajan
tags: [
    Linux server, Ubuntu, IoT, Remote Access, SSH, Internet, Firewall, NAT Router, Outside Network, SSH keys, Windows 10, Windows 11, Without Port Forwarding, SSH session sharing, Linux terminal sharing
]
date: 2025-01-22
lastmod: 2025-01-22
categories: [
    Linux Server
]
images: ["/assets/img/linux-remote-ssh-access/linux-server-remote-ssh-access-from-windows-internet.jpg"]
aliases: []
---

SocketXP is a powerful tool for securely sharing your Linux terminal or SSH session with people you trust to quickly perform a joint debugging. Your customers or team members can connect to your Linux terminal session via a browser over HTTPS protocol using a public web URL.

In this article, we will discuss how to configure and setup SocketXP in your Linux machine or device so that you can share your Linux terminal with your team members, customers or anyone you trust.

## Overview
Here is an overview of what we plan to do in this exercise:
- Download, install and configure SocketXP in your Linux machine or device, so that you can remotely connect to it from anywhere via SSH.
- Visit the SocketXP web portal and SSH into your Linux machine as a moderator of the SSH session using the SocketXP's SSH Web Terminal.
- An new SSH session will be created automatically and a random public web URL will created for this session.
- Share the unique public web URL created for your SSH session with anyone you trust, so that they could join the SSH session and view the Linux terminal in a browser as a passive user(view-only mode).

## SocketXP - Download, Install and Configure
Remote access to the SSH server running in your Linux machine requires installing and running a secure remote access software (a VPN like software) on the Linux machine.  

Once the remote access software is installed on the Linux server, the Linux server or device can be securely accessed from anywhere in the world without setting up port forwarding on your router. 

SocketXP, a popular [Linux server remote access](/remote-access-linux-server) solution that enables you to easily manage, control, monitor and remote access a cluster of Linux server from a web portal.

### How SocketXP Linux server Remote Access solution works
1. First, you need to install the SocketXP agent on your Linux server.  

2. The agent will securely connect (using an SSL/TLS tunnel) to the SocketXP IoT Cloud Gateway using an authentication token. 

3. You can then SSH connect to your Linux server from the SocketXP Web Portal or using your own SSH client such as PuTTY.

{{<image-format src="/assets/img/linux-remote-ssh-access/linux-server-remote-ssh-access-from-windows-internet.jpg"  alt="Linux terminal sharing SSH session sharing using random Public Web URL" >}}

Follow the steps below to install and setup  SocketXP agent on your Linux server.

### Step 1:  Download and Install

Follow the [download and install](https://www.socketxp.com/download/) instructions to install the SocketXP agent on your Linux server device. 

### Step 2: Get your Authentication Token

Sign up at [https://portal.socketxp.com](https://portal.socketxp.com/) and get your authentication token.

{{<image-format src="/assets/img/AuthToken.jpg"  alt="remotely access Linux server SSH  over the internet" >}}

Use the following command to login to the SocketXP IoT Cloud Gateway using the auth token.

{{<source-code>}}
$ socketxp login [your-auth-token-goes-here]
{{</source-code>}}

### Step 3: Connect the device to the SocketXP Cloud Gateway

Use the following command to connect the Linux server to the cloud gateway using a secure SSL/TLS connection.

{{<source-code>}} $ socketxp connect tcp://localhost:22

Connected to SocketXP Cloud Gateway.
Access the device securely using the SocketXP agent in IoT Slave Mode.
{{</source-code>}}

For the security of your device, SocketXP IoT Solution doesn't create any public TCP endpoints that can be connected by any SSH client from the internet. 

SocketXP private tunnel endpoints are not exposed to the internet and can be accessed only using the SocketXP agent (in IoT slave mode using the auth token of the user) or through the web terminal in the SocketXP web portal as shown below.

The Linux machine or device is ready to be remotely accessed via SSH from the SocketXP Web Portal.

## Create a New SSH Session
After you have setup the SocketXP agent in your Linux machine and connected it to the SocketXP Cloud Gateway, login to the SocketXP web portal and visit the Devices page.  

Find your Linux machine or device listed in the table.  

Click the console or terminal icon next to your Linux machine to SSH login to your device.  

Provide your SSH login credentials.

After a successfull login, you will be shown a Linux terminal shell prompt to enter any commands.

## Copy the Random Public Web URL
Now, go back to the browser tab that shows the devices table in the web portal, click the "Sessions" button above the devices table.

You'll be taken to the "Sessions" page, where you'll find all the live and recorded SSH sessions for all your devices.

{{<image-format src="/assets/img/ssh-session-sharing/ssh-session-sharing-public-web-url.jpg"  alt="Linux terminal sharing SSH session sharing with team members" >}}

Find the device ID and the SSH session ID associated with the SSH session you have started above.

All live SSH sessions will have a unique random public web URL created.  You can copy the random public web URL by clicking the copy button listed under the column named "Public URL" for your session.

## Share the Random Public Web URL

Share the public web URL with anyone you trust, so that they could use the public web URL to view the shared Linux terminal from any web browser.

Anyone who knows the random public URL can view your Linux terminal without any login credentials.  It is your responsibility to ensure that you share the link with only those you trust.

It is almost impossible for anyone to guess the unique session ID assigned to your SSH session and the random token present in the public web URL generated for each session.

## View the SSH Session Live
Click the random public web URL shared with you via an email or a messager app.  Alternatively, copy and paste the web URL in a web browser of your choice.  

Your browser will display, in real-time, the Linux terminal of the SSH session shared with you.  You can only view the terminal session(in read-only mode).  You cannot enter any commands in the Linux terminal shared.

{{<image-format src="/assets/img/ssh-session-sharing/ssh-terminal-sharing.jpg"  alt="Linux terminal sharing SSH session sharing with team members" >}}


Maximize the browser window to the maximum size possible.  Refresh the browser, if required, to view the session content clearly.

You can close the browser tab when you are done.

