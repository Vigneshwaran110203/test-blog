---
title: How to Remotely Access Nvidia Jetson Nano over the Internet
slug: remote-access-nvidia-jetson-nano-over-the-internet
description: "SocketXP Remote Access Platform provides secure remote access to Nvidia Jetson Nano behind NAT router or firewall over the internet using secure SSL/TLS VPN tunnels."
author: Ganesh Velrajan
tags: [
    Nvidia Jetson Nano, IoT device, IoT, Remote Access, SSH, Internet, Firewall, NAT Router, Outside Network, IoT VPN
]
date: 2025-01-27
lastmod: 2025-02-26
categories: [
    IoT
]
images: ["/assets/img/raspberry-pi-remote-ssh-access/iot-remote-ssh.png"]
aliases: []
---

In this article, we will show you how to configure and setup remote access to your Nvidia Jetson Nano's Secure Shell(SSH) command line, so that you could connect to it over the internet from anywhere.

We will also discuss how to securely remote connect to your Nvidia Jetson Nano based embedded Linux device using Remote Desktop Application.

The [NVIDIA Jetson Nano](/iot/nvidia-jetson-nano-vs-raspberry-pi-which-one-is-better-for-your-project) is a small, powerful computer that can be used for robotics and many AI-based applications. It's a popular choice for prototyping AI products and creating embedded AI solutions. 

However, with this increased popularity and wide range of embedded AI deployments based on Jetson Nano comes the need for secure remote access to these devices. One way to achieve this is through the use of [Secure Shell (SSH)](/iot/ssh-secure-shell/).

By the end of this article, you will have a better understanding of how to use SSH to securely and remotely access Nvidia Jetson Nano based embedded Linux devices over the internet from outside network.

## Overview
Here is an overview of how to configure and setup SSH remote access to your Nvidia Jetson device:
- Install, configure and enable SSH server in your Linux based Nvidia Jetson Nano device.
- Install, configure and setup SSL/TLS Reverse Proxy Tunnel to the SSH server running in your Jetson device using the [SocketXP Remote Access Solution](/iot-remote-access).  No port forwarding setup required in your WiFi router.
- Remotely connect to your Jetson Nano device's SSH server from the SocketXP Web Portal or using your favorite SSH client such as PuTTY, SecureCRT or SSH CLI client.
- Remotely upload or download files to or from your Jetson device from the SocketXP Web Portal or using your favorite SSH client such as Filezilla, PuTTY, SecureCRT or SCP/SFTP CLI client.

##  Understanding SSH

To access a Jetson Nano remotely using SSH, you need to first ensure SSH is enabled on the device, then connect to it using an SSH client on your computer by entering the Jetson Nano's IP address, username, and password, allowing you to securely manage the device from a remote location over the network. 

### What is SSH? 
SSH stands for Secure Shell, which is a cryptographic network protocol for secure remote access to devices over an unsecured network such as the internet.

###  How does SSH work?
SSH uses encryption to secure the connection between two devices. It creates a secure tunnel through which data can be transmitted and received.  

SSH uses a client server model, wherein the SSH server runs in your embedded Linux device and the SSH client runs in your access devices such as your PC or Laptop.

### How to install and setup SSH server

You need to [download, install and setup SSH server in your Nvidia Jetson Nano](/iot/install-setup-ssh-server-client-iot-device) so that you could connect to it remotely via the internet.  Most Linux distributions come with SSH server pre-installed.

You also need to [download and install SSH client on your access device](/iot/install-setup-ssh-server-client-iot-device), such as your laptop or PC.

### Enable SSH on Jetson Nano:
Connect to the Jetson Nano via a local connection (either Ethernet or Wi-Fi). 
Open a terminal window. 

Run the command: 

``` sh
sudo systemctl enable ssh
```
### Find Jetson Nano IP address:
In the terminal, run the command `ifconfig` to identify the IP address assigned to your Jetson Nano.

### Connect using SSH client:
On your computer, open an SSH client (like PuTTY on Windows, or the built-in terminal on macOS/Linux). 
Enter the Jetson Nano's IP address. 

When prompted, provide the username (usually "ubuntu" or "jetson") and password. 

### Security Tips:
Consider using SSH key pairs for a more secure authentication method instead of relying solely on passwords.

### Firewall settings:
Ensure your network firewall is configured to allow incoming SSH connections on the appropriate port (typically 22). 

### Why is SSH important for remote access? 
SSH allows for remote management and monitoring of these devices from anywhere in the world. By using SSH, users can securely access their Linux devices and perform tasks such as updating firmware, changing settings, and troubleshooting issues.

## Remotely connect to Nvidia Jetson Nano via SSH 
Let's say you have a Jetson Nano in your office connected to the WiFi network or far out in the field connected to the internet through cellular internet or satellite internet.  

You can connect to the local device via SSH if your access device such as your Laptop or PC is also connected to the same local network such as WiFi Network or via an Ethernet cable. 

But our goal is to configure and setup the Jetson Nano device for remote access so that you could connect remotely via SSH over the internet and execute a command in the device terminal.

To remotely access the device's SSH server, you need a [secure remote access solution](/iot-remote-access) like [SocketXP](/) to remotely connect to your Nvidia Jetson Nano based embedded Linux device.

SocketXP solution works in 3 simple steps.

## What is SocketXP
[SocketXP](/) is a cloud based [remote access and device management solution](/iot/iot-device-management-platform) that provides remote SSH access to embedded Linux devices such as a Raspberry Pi, Arduino, Nvidia Jetson, or any embedded Linux devices(based on any hardware platform or OS) behind NAT router or firewall over the internet using secure SSL/TLS VPN tunnels. 

[SocketXP Remote Access Solution](/iot-remote-access) does not require any changes to your WiFi or gateway NAT router configuration.  No port forwarding setup or firewall pinholing is required, when you use SocketXP.

SocketXP creates a secure SSL/TLS encrypted tunnel through your firewall, NAT router, and over the internet, for secure remote SSH access, similar to how a secure VPN solution works.  SocketXP uses the SSL/TLS encryption technology used by VPN services.

### SocketXP Remote Access Features For Nvidia Jetson Nano:
[SocketXP Remote Access Solution for Nvidia Jetson Nano](/iot-remote-access) provides you the ability to remote access your Nvidia Jetson Nano device via the following methods:
  - [Remote SSH Access from anywhere](/iot/remote-access-ssh-from-anywhere/)
  - [Remote File Transfer - SFTP/SCP](/iot/remote-access-ssh-from-anywhere/)
  - [Remote VNC Desktop Access - RDP/VNC](/iot/connect-iot-remote-desktop-xrdp-over-internet)
  - [Remote Access to Web Application](/iot/remote-access-iot-web-app-from-internet)
  - [Remote Device Management](/)
  - [Remote Device Monitoring](/iot-remote-monitoring)
  - [Remote Asset Live Tracking](/iot-asset-tracking)

## How SocketXP Nvidia Jetson Nano Remote Access solution works
SocketXP solution works in 3 simple steps.

First, you need to install a SocketXP agent on your Jetson Nano.  

The SocketXP agent would connect the device to the SocketXP Cloud Gateway by creating a secure SSL/TLS tunnel.

You could then remote SSH into the device from the SocketXP Cloud Gateway's portal page (via this secure SSL/TLS tunnel).

{{<image-format src="/assets/img/raspberry-pi-remote-ssh-access/iot-remote-ssh.png"  alt="Nvidia Jetson Nano Remote SSH Access" >}}

Follow the 3 simple steps listed below to setup SocketXP agent and remote SSH into your Nvidia Jetson Nano using [SocketXP Remote Access solution]((/iot-remote-access)).

### Step 1:  Download and Install

[Download and install](https://www.socketxp.com/download/) the SocketXP agent on your Jetson Nano based embedded Linux device from [here.](https://www.socketxp.com/download/)


### Step 2: Get your Authentication Token

Sign up at [https://portal.socketxp.com]("https://portal.socketxp.com/") and get your authentication token.


{{<image-format src="/assets/img/AuthToken.jpg"  alt="SocketXP Portal - Authtoken for Nvidia Jetson Nano Remote SSH Access" >}}


Use the following command to login to the SocketXP Cloud Gateway using the auth token.

{{<source-code>}}
$ socketxp login [your-auth-token-goes-here]
{{</source-code>}}

### Step 3: Create SocketXP SSL Tunnel Endpoint for Remote SSH

Use the following command to create a secure and private SSL tunnel endpoint at the SocketXP Cloud Gateway.

{{<source-code>}} $ socketxp connect tcp://localhost:22

Connected to SocketXP Cloud Gateway.
Access the TCP service securely using the SocketXP agent in Slave Mode.
{{</source-code>}}

**Note:**

For the security of your device, SocketXP Remote Access Solution doesn't create any public TCP tunnel endpoints(IP address + Port combo) that can be connected by any SSH client from the internet. 

SocketXP private tunnel endpoints are not exposed to the internet and can be accessed only using the SocketXP agent (using the auth token of the user) or through the XTERM terminal in the SocketXP Portal page.

More importantly, this also means port scanners or hackers from the internet cannot access your IoT device SSH server port.


{{<image-format src="/assets/img/raspberry-pi-remote-ssh-access/SocketXP-IoT-Remote-SSH-2.png"  alt="SocketXP IoT Remote SSH IoT device Remote SSH xterm access from browser" >}}


{{<image-format src="/assets/img/raspberry-pi-remote-ssh-access/SSH-from-browser-2.jpg"  alt="IoT Remote SSH IoT device Remote SSH IoT device Fleet management" >}}


The screen capture above shows the "htop" command being executed from an SSH session created using the XTERM window from the SocketXP Portal page using a web browser.  You could use any browser of your choice to remote SSH into your Jetson device.


### Single-Touch Installation Command
The 3 step instruction explained above to setup SocketXP on your Jetson device is a tedious process, if you have thousands of devices to install, configure and manage.


With this in mind, SocketXP Remote Access Solution also provides a single-touch installation command for installing and configuring SocketXP Agent on large number of devices.  

Copy and paste the below single-touch installation command from the SocketXP Portal page on to the terminal of your embedded Linux device. The command shown below will download a shell script that will install, configure, setup SocketXP agent on your Jetson device.  After the command completes, the Jetson Nano device would show up as online in the SocketXP Portal page.


{{<image-format src="/assets/img/raspberry-pi-remote-ssh-access/SocketXP-IoT-Agent-Install-Script.png"  alt="SocketXP Nvidia Jetson Nano Remote SSH Access Remote Desktop Access - installation script" >}}

### SocketXP SSH Public Key Management Tool: 
SSH password based authentication is vulnerable to attacks and generally not recommended for production usecases.  SSH Public Private key based authentication is a secure and recommended method for production usecases.

By default, SocketXP Web Portal will create and sync a very short-lived single-use SSH public key to your Ubuntu Linux machine, so that you can securely remote login to your Ubuntu Linux from anywhere in the world, without having to use password based authentication. The key will be cleaned up or trashed immediately after the user logs in.  

You should remember that a user can SSH into your Ubuntu Linux machine from the SocketXP web portal, only after a successful SSO login (and 2FA authentication) provided by your SSO OAuth provider such: Microsoft 365 or Google G-Suite.

SocketXP has a built-in SSH public key management tool, that automates SSH public key management or syncing it between your Ubuntu Linux system and the SSH web client.  It even cleans up the key immediately, so that a new public key setup is required for the next login attempt by the same user.

For better security, you can even disable password based authentication completely on your Ubuntu Linux SSH server.  But, if you prefer to use password based authentication, then select the "Password authentication" option during the login prompt in the web portal.  The default option is "SSH Public Key Authentication."

### Configuring SocketXP agent to run in slave mode

This is an alternate method for connecting to your Nvidia Jetson device from a remote location using the SocketXP solution.

If you don't want to access your Jetson device from the browser and you want to access it using your SSH client (Eg: PuTTY, SecureCRT) then follow the instructions below.

First download and install the regular SocketXP agent software on your accessing device (such as a laptop running Windows or Mac OS). 

Next, configure the agent to run in slave mode using the command option "--iot-slave" as shown in the example below. 

{{<source-code>}}
$ socketxp connect tcp://localhost:3000 --iot-slave --peer-device-id "2233-4455-abcd-34445" --peer-device-port 22 --authtoken &lt;auth token&gt;

Listening for TCP connections at:
Local URL -&gt; tcp://localhost:3000
{{</source-code>}}

You shall find the device ID of your Jetson Nano from the [SocketXP Portal page in the Devices section](https://portal.socketxp.com/#/devices).

### Accessing the Jetson Nano device's SSH from your laptop
Now you can access your Jetson Nano device's SSH server using the above SocketXP local endpoint, as shown below.

{{<source-code>}}$ ssh -i ~/.ssh/john-private.key john@localhost -p 3000
{{</source-code>}}

The above method uses SSH private key based authentication to SSH into your Linux device.

## Need Assistance?
If you are stuck and need assistance with our SocketXP Remote Access Solution, or you have a query that needs to be answered, please feel free to reach out to us.  We'll get back to you as soon as possible.  Please email us at: [support@socketxp.com]("support@socketxp.com")


## Conclusion:

The solution discussed in this article is a secure method to remote SSH into your home or office computer because the data is encrypted using SSL.


SSH uses the same cryptography technology used by banks and governments to exchange highly confidential data over the internet.


The data transferred gets encrypted end-to-end between the SSH client and the SSH server.


SocketXP has no way to decrypt or eavesdrop your encrypted data without knowing your SSH private keys.  SocketXP merely acts as an online TCP reverse proxy server for your encrypted data traffic transmitted through the SSH connection.



## Nvidia Jetson Nano Remote SSH Security - Do's and Don'ts

## Remote SSH access to Nvidia Jetson devices

The primary reason why you deployed these Nvidia Jetson based embedded Linux devices and connected them to the internet was to monitor, track and operate these devices from any remote locations.

Sometimes you need a way to gain access to those Nvidia devices for troubleshooting, configuration updates, and other operational tasks. 

For example, a sensor device deployed at a factory that is hundreds of miles away is having trouble measuring the factory temperature. 

You can use secure remote access tunnels to open and quickly start a session to that sensor device. 

After you have identified the problem (for example, a misconfiguration or disk full error), you can reset the configuration, delete unwanted files or logs history and restart the sensor device through the same session.


In the  traditional methods of troubleshooting you would typically wait until the next day to send a technician to the factory to investigate the sensor device.  

But remote access using secure tunneling (using SocketXP) decreases incident response and recovery time and operational costs.

But gaining remote access to Jetson devices is no simple task. 

So often people take shortcuts and perform quick hacks on routers/firewall settings to permit internet traffic into the corporate network. 

In the next section, we'll discuss about some of these unsafe practices and the security risks associated with such configuration options.

## Unsafe Methods of Remotely SSH into Nvidia Jetson Nano devices

Embedded Linux devices in industries, factories, offices and homes are placed behind a firewall and NAT(Wifi Router or Gateway Router).  These devices are always assigned a Local IP address using mechanisms such as DHCP.  The local IP addresses are usually assigned in the 10.X.X.X  or 192.X.X.X range.  These devices do not have publicly reachable IP addresses assigned to them.


Nvidia Jetson Nano devices behind the firewall can talk to servers on the internet (via the gateway router) but not the other way around.  This is because you want to prevent your devices from being accessed from the internet by unwanted people or hackers.


So to gain remote access from the internet to Jetson devices in your home or factory is not easy and straightforward.


Many people would practice the unsafe method of opening up ports (SSH port 22 or HTTP/HTTPS ports 80/443) in their firewall settings(ACL rules) or gateway router NAT configuration to allow a particular traffic to sneak into the local network. 

Then they would use Dynamic DNS (DDNS) solutions to track the non-static public IP address of the gateway router.  

This method is prone for errors and would create a security risk for your embedded AI based application.  

Online hackers could scan such open ports and try sneaking into your local network and servers.

The common myth or the misunderstanding here is that, people falsely believe that as long as they use a secure shell connection (SSH) everything going to that port 22 is safe.  

But they fail to understand that they have left a door to their industrial, corporate or home network wide open for any strangers to sneak in without being noticed. 

The same door will be shared by hackers and your secure SSH session alike. 

The problem is not in the SSH session but in the door you left wide open for anyone to sneak in.

## Why SocketXP Remote Access Solution For Nvidia Jetson Nano Is More Secure?
[SocketXP Nvidia Jetson Remote Access solution](/iot-remote-access) -- part of [IoT Device Management and Remote Access Platform](/iot/iot-device-management-platform),  doesn't require setting up port-forwarding on your WiFi router.  SocketXP solution works without making any changes to your WiFi router settings.

[SocketXP IoT Platform](/), unlike all other vendor solutions, does not open up your device ports to the internet. Therefore, port scanners and hackers cannot scan your device ports (SSH or VNC ports).  SocketXP IoT Platform protects and handles all direct attacks from the internet, eliminating unnecessary traffic from reaching your Nvidia Jetson Nano devices.

SocketXP connects users with remote devices over secure SSL/TLS connections(vpn tunnels).  This is the same technology used by the banks and Governments to exchange confidential data securely over the internet.


