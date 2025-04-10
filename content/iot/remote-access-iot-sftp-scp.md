---
title: Securely Transfer Files to your Remote IoT Devices - A Step-by-Step Guide
slug: remote-iot-device-secure-file-transfer-sftp-scp
description: "Learn how to securely transfer files to and from IoT or any remote device using SFTP and SCP. Step-by-step practical guide for efficient IoT device file management."
author: Ganesh Velrajan
tags: [
    IoT device, Embedded Linux Devices, Remote Access, SSH, Internet, Firewall, NAT Router, Outside Network, IoT VPN, Secure File Transfer, Secure File Copy, SFTP, SCP, PSFTP, PuTTY, Filezilla, OpenSSH SCP, OpenSSH SFTP, SSH SFTP using two-factor authentication 2FA,
]
date: 2025-02-27
lastmod: 2025-02-27
categories: [
    IoT
]
images: ["/assets/img/raspberry-pi-remote-ssh-access/iot-remote-ssh.png"]
aliases: []
---

In this article, we will show you how to securely transfer files to and from your remote IoT or embedded Linux devices using SCP/SFTP.

The Internet of Things (IoT) has revolutionized the way we interact with the world around us. 

With the ability to connect and control devices from anywhere in the world, IoT technology has brought convenience and efficiency to our daily lives. 

However, with this increased connectivity comes the need for secure transfer of file to/from these devices. One way to achieve this is through the use of [SFTP or SCP](/iot/secure-file-transfer-sftp-scp) tools.

{{<image-format src="/assets/img/iot-secure-file-transfer-sftp-scp/secure-file-transfer-sftp-scp-filezilla-remote-iot-device-drag-n-drop-files-gui.png"  alt="IoT Remote SSH and Secure File Transfer using Filezilla, PuTTY PSFTP, GUI based secure file transfer, drag-n-drop file transfer" >}}

By the end of this article, you will have a better understanding of how to use SSH, SFTP, and SCP to securely access, transfer files to/from your IoT devices such as Nvidia Jetson Nano, Arduino, Raspberr Pi or any embedded Linux device over the internet from an outside network.


## Overview
Here is an overview of what we plan to achieve in this article:

1. Install and setup SSH server in your Linux based IoT device.  The SSH server will act like a secure file server that understands SFTP/SCP protocols.  We will use SCP/SFTP client software (PuTTY PSFTP/Filezilla) that implements SSH based secure file transfer protocols such as SFTP/SCP to transfer the files.

2. Install and setup SocketXP agent in your IoT device.  SocketXP will create an SSL/TLS based reverse proxy connection to the SSH server running in your IoT device using the [SocketXP Remote Access Solution](/iot-remote-access).  No port forwarding setup required in your WiFi router or Firewall settings.  You can remotely connect to your devices behind a NAT router and firewall, over the internet.

3. Remotely upload or download files to or from your IoT device from the SocketXP Web Portal or using your favorite SSH, SFTP, SCP clients such as Filezilla, PuTTY's PSFTP or OpenSSH SCP/SFTP command line client.

##  Understanding SSH

### What is SSH? 
SSH stands for Secure Shell, which is a cryptographic network protocol for secure remote access to devices over an unsecured network such as the internet.

###  How does SSH work?
SSH uses encryption to secure the connection between two devices. It creates a secure tunnel through which data can be transmitted and received.  

SSH uses a client server model, wherein the SSH server runs in your IoT device and the SSH client runs in your access devices such as your PC or Laptop.

## What are SFTP and SCP?

### SFTP (SSH File Transfer Protocol):
SFTP is a secure file transfer protocol that operates over the SSH (Secure Shell) protocol.
It provides a secure, interactive session for transferring files, similar to FTP, but with encryption.
SFTP allows for various file operations, including uploading, downloading, renaming, deleting, and managing directories.

### SCP (Secure Copy Protocol):
SCP is also a secure file transfer protocol that uses SSH.
It's designed for simple file transfers between a local and remote host or between two remote hosts.
SCP is primarily used for copying files and directories, and it's less interactive than SFTP.

## How to install and setup SSH server

You need to [download, install and setup SSH server in your IoT device](/iot/install-setup-ssh-server-client-iot-device) so that you could connect to it remotely via the internet.

You also need to [download and install SSH client on your access device](/iot/install-setup-ssh-server-client-iot-device), such as your laptop or PC.

## Why is SSH important for remote access? 
SSH allows for remote management and monitoring of these devices from anywhere in the world. By using SSH, users can securely access their IoT devices and perform tasks such as updating firmware, changing settings, and troubleshooting issues.

## Remotely connecting to IoT device via SSH 
Let's say you have an IoT device in your office or in your customer location or far out in the field.  

Let's say the device is connected to the internet through a WiFi network or SIM card or cellular internet or satellite internet.  

You want to remotely connect to the device via SSH over the internet, so that you could execute a remote command in the device terminal.

You need to ensure that SSH is enabled in your IoT device and the SSH server is up and running in your device.  

To remotely access the SSH server, you need an [IoT secure remote access solution](/iot-remote-access) like [SocketXP](/) to remotely SSH/SFTP/SCP into your IoT device in 3 simple steps.

## What is SocketXP
[SocketXP](/) is a cloud based [IoT remote access and device management solution](/iot/iot-device-management-platform) that provides remote connectivity to your IoT devices such as a Raspberry Pi, Nvidia Jetson, or any embedded Linux devices behind NAT router or firewall over the internet using secure SSL/TLS VPN tunnels. 

[SocketXP IoT Remote Access Solution](/iot-remote-access) does not require any changes to your gateway NAT router configuration.  No port forwarding setup or firewall pinholing is required, when you use SocketXP.

SocketXP creates a secure SSL/TLS encrypted tunnel through your firewall, NAT router and over the internet for secure remote SSH access, similar to how a secure VPN solution works. VPN also uses the same SSL/TLS encryption technology.

SocketXP uses two-factor authentication(2FA) to authenticate users before they could SSH login to any remote device.


## How SocketXP IoT Remote Access solution works
First, you need to install a SocketXP IoT agent on your IoT device.  

The SocketXP agent would connect the device to the SocketXP IoT Cloud Gateway by creating a secure SSL/TLS reverse proxy tunnel.

You could then remote SSH into the IoT device from the SocketXP IoT Cloud Gateway's web portal page (via this secure SSL/TLS tunnel).

{{<image-format src="/assets/img/raspberry-pi-remote-ssh-access/iot-remote-ssh.png"  alt="IoT Remote SSH" >}}

Follow the below 3 steps to setup SocketXP IoT agent and remote SSH into your IoT using SocketXP IoT Remote Access solution.  We will also show you how to securely transfer file to and from your devices using SFTP/SCP client tools.

### Step 1:  Download and Install

[Download and install](/download/) the SocketXP IoT agent on your IoT device first.


### Step 2: Get your Authentication Token

Sign up at [https://portal.socketxp.com]("https://portal.socketxp.com/") and get your authentication token.


{{<image-format src="/assets/img/AuthToken.jpg"  alt="SocketXP Portal - Authtoken for IoT Remote SSH SFTP/ SCP Access" >}}


Use the following command to login to the SocketXP IoT Cloud Gateway using the auth token.

{{<source-code>}}
$ socketxp login [your-auth-token-goes-here]
{{</source-code>}}

### Step 3: Create SocketXP SSL Tunnel Endpoint for Remote SSH

Use the following command to create a secure and private SSL reverse proxy tunnel endpoint at the SocketXP IoT Cloud Gateway.

{{<source-code>}} $ socketxp connect tcp://localhost:22

Connected to SocketXP Cloud Gateway.
Access the TCP service securely using the SocketXP agent in IoT Slave Mode.
{{</source-code>}}

**Note:**

From the SocketXP web portal's "Devices" page, click the "terminal" icon to SSH into your remote device.

{{<image-format src="/assets/img/iot-remote-ssh-access/socketxp-web-portal-iot-devices-summary-page.png"  alt="SocketXP IoT SSH Remote Access from Web Browser" >}}

{{<image-custom-size src="/assets/img/iot-remote-ssh-access/socketxp-ssh-login-password-authentication.png"  alt="IoT SSH Remote Access using SSH Password Based Authentication" max-width="40%">}}

{{<image-format src="/assets/img/iot-remote-ssh-access/socketxp-ssh-web-terminal-using-xterm.png"  alt="IoT SSH Remote Access using Web Terminal and xtermjs" >}}


You have the option of using SSH password based authetication or SSH public private key based authentication to login to your remote devices.  SocketXP will automatically create and download a public key to your remote device.  It does key mamagement behind the screen automatically.

{{<image-custom-size src="/assets/img/iot-remote-ssh-access/socketxp-ssh-login-public-key-authentication.png"  alt="IoT SSH Remote Access using SSH Public Private Key Based Authentication" max-width="40%">}}


For secure file transfer, click the "File Upload" or "File Download" icon button next to your IoT device.  It will open up a SCP dialog window.  Follow the instructions to securely transfer a file using SCP from the web client.

**File Download Dialog Window**:
{{<image-custom-size src="/assets/img/iot-remote-ssh-access/socketxp-secure-file-transfer-SFTP-SCP-file-download.png"  alt="IoT SSH secure file transfer using SCP/SFTP PuTTY PSTF Filezilla OpenSSH SCP/SFTP client" max-width="40%">}}

If the file download is successfull, it will open up a file browser window to select a folder location in your local machine where to store the download file.  If there was any login error or error finding the source file in the IoT device, the download will abort.

**File Upload Dialog Window**:
{{<image-custom-size src="/assets/img/iot-remote-ssh-access/socketxp-secure-file-transfer-SFTP-SCP-file-upload.png"  alt="IoT SSH secure file transfer using SCP/SFTP PuTTY PSTF Filezilla OpenSSH SCP/SFTP client" max-width="40%">}}

For the security of your device, SocketXP IoT Solution doesn't create any public TCP tunnel endpoints that can be connected by any SSH client from the internet. 

SocketXP private tunnel endpoints are not exposed to the internet and can be accessed only using the SocketXP agent (using the auth token of the user) or through the XTERM terminal in the SocketXP Portal page.

More importantly, this also means port scanners or hackers from the internet cannot access your IoT device SSH server port.


### Secure File Transfer using Third-Party Tools: Filezilla, PuTTY PSFTP, OpenSSH SFTP/SCP Clients

This is an alternate method for remotely connecting and transfering file to/from your IoT device from a remote location using the SocketXP solution.

If you don't want to remotely access your IoT device from the SocketXP web portal and you want to access it using your favorite third-party SSH and SFTP/SCP client software such as OpenSSH SSH/SFTP/SCP client, PuTTY, Filezilla, SecureCRT then follow the instructions below.

First [download and install](/download) the regular SocketXP agent software on your accessing device (such as a laptop running Windows or Mac OS). This is in-addition to installing the agent in your IoT device, we did in the previous section.  Why? Hint: Imagine a VPN client connecting to a VPN server.

Next, configure the agent to run in slave mode using the command option "--iot-slave" as shown in the example below. 

{{<source-code>}}
$ socketxp connect tcp://localhost:3000 --iot-slave --peer-device-id "2233-4455-abcd-34445" --peer-device-port 22 --authtoken &lt;auth token&gt;

Listening for TCP connections at:
Local URL -&gt; tcp://localhost:3000
{{</source-code>}}

You shall find the device ID of your IoT device from the [SocketXP Portal page in the IoT Devices section](https://portal.socketxp.com/#/devices).

If your SSH server is configured to run in a non-default SSH port, then you need to specify that in the "---peer-device-port" option in the above command, instead of the default port 22.

### Connecting to your IoT SSH through SocketXP Local Proxy

Now you can use any third-party SSH clients to connect to your IoT device's SSH server using the above SocketXP local endpoint, as shown in the below examples.  The examples below use the OpenSSH client tools such as `scp`, `sftp`, and `scp` that are command line based tools.

{{<source-code>}}$ ssh -i ~/.ssh/john-private.key john@localhost -p 3000
{{</source-code>}}

Securely transfer files from the remote IoT device to your local machine using the OpenSSH SCP command as shown below.

{{<source-code>}}$ scp -i ~/.ssh/john-private.key john@localhost:/path/to/remote/file.txt /path/to/local/directory/ -p 3000

file.txt                                      100%   12KB  12.0KB/s   00:00
{{</source-code>}}

Securely transfer files from the local machine to your remote device using the OpenSSH SCP command as shown below.

{{<source-code>}}$ scp -i ~/.ssh/john-private.key /path/to/local/file.txt john@localhost:/path/to/remote/directory/  -p 3000

file.txt                                      100%   12KB  12.0KB/s   00:00
{{</source-code>}}

Note: 

1. The above method uses SSH private key based authentication to SSH into your IoT device.  You can also login use SSH password based authentication by skipping the "-i" option in the above command.

2. Secondly, we connect our SSH/SFTP/SCP client tools to our local proxy server listening TCP port 3000 in your local machine.

3. Thirdly, you can use any third-party SSH/SFTP/SCP client tool to securely transfer files to and from your remote IoT devices or embedded Linux devices or any Linux machine/server.

Below we show you the step-by-step instructions on how to securely transfer files using a free SFTP tool named Filezilla.  Filezilla provides a GUI window to login, drag-n-drop files between your local machine and your remote IoT devices.  

Note that Filezilla connects to the localhost IP 127.0.0.1 TCP port 3000 where the  SocketXP agent running as a local proxy server in the IoT Slave Mode is waiting to create secure reverse proxy tunnels between Filezilla and your remote IoT device.

{{<image-format src="/assets/img/iot-secure-file-transfer-sftp-scp/secure-file-transfer-sftp-scp-using-filezilla-putty.png"  alt="IoT Remote SSH and Secure File Transfer using Filezilla, PuTTY PSFTP, GUI based secure file transfer, drag-n-drop file transfer" >}}

In the above window, you will notice that we have input the localhost IP address 127.0.0.1 and changed the default SFTP port from 22 to 3000.  

This is required because:

- The Filezilla client should connect to the remote IoT device via the SocketXP agent running locally in "IoT Slave" mode.

> [SocketXP Remote Access Solution](/iot-remote-access) DOES NOT perform hole-punching or port-forwarding or create any open doors in your NAT router or firewall.  SocketXP DOES NOT create any public IP and port as a proxy for your device's private IP and port.  SocketXP solution creates and uses SSL encrypted reverse proxy tunnels to remotely access your IoT devices in the field.  Moreover, SocketXP agent requires an authentication token to connect to your remote devices.  This is because we care for your device and organization's security and reputation.  Imagine a VPN client-server architecture for better understanding.

- The SocketXP agent when configured to run in "IoT Slave" mode will function as a "local-proxy server".
The local-proxy server, listens on local IP 127.0.0.1 and local TCP port 3000.

- When the local-proxy server receives any TCP connection on the IP 127.0.0.1:3000, it will proxy the connection to the SocketXP IoT Cloud Gateway, which in-turn will proxy/relay the connection to your remote IoT device, after authenticating the auth token provided by the agent.

- The SocketXP agent creates an SSL encrypted secure reverse proxy tunnel between the Filezilla client and your remote IoT device's SSH server.

{{<image-format src="/assets/img/iot-secure-file-transfer-sftp-scp/secure-file-transfer-sftp-scp-filezilla-ssh-login.png"  alt="IoT Remote SSH and Secure File Transfer using Filezilla, PuTTY PSFTP, GUI based secure file transfer, drag-n-drop file transfer" >}}

Login using your IoT device's login username and password.

{{<image-format src="/assets/img/iot-secure-file-transfer-sftp-scp/secure-file-transfer-sftp-scp-host-key-verification.png"  alt="IoT Remote SSH and Secure File Transfer using Filezilla, PuTTY PSFTP, GUI based secure file transfer, drag-n-drop file transfer" >}}

{{<image-format src="/assets/img/iot-secure-file-transfer-sftp-scp/secure-file-transfer-sftp-scp-filezilla-putty-view-local-files-remote-files.png"  alt="IoT Remote SSH and Secure File Transfer using Filezilla, PuTTY PSFTP, GUI based secure file transfer, drag-n-drop file transfer" >}}

Filezilla securely transfer files (using SFTP) between the local machine and remote device using the SocketXP agent's local-proxy server (that listens on local IP 127.0.0.1 and local TCP port 3000).  

The local-proxy server creates a secure reverse proxy tunnel between the Filezilla client and your remote IoT device's SSH server.

{{<image-format src="/assets/img/iot-secure-file-transfer-sftp-scp/secure-file-transfer-sftp-scp-filezilla-remote-iot-device-drag-n-drop-files-gui.png"  alt="IoT Remote SSH and Secure File Transfer using Filezilla, PuTTY PSFTP, GUI based secure file transfer, drag-n-drop file transfer" >}}

You can drag and drop files from the local machine to your remote device or vice-versa, from the GUI window.

### Secure File Transfer using PuTTY's PSTFP Client
Below we show you the step-by-step instructions on how to securely transfer files (using SFTP protocol) to and from your remote IoT device using another free SFTP tool named PuTTY's PSFTP.  

PSFTP is a command line tool that can be accessed from your Windows 10 or Windows 11 machine's "terminal" window or the "command" tool.

Login using your IoT device's username and password.

{{<image-format src="/assets/img/iot-secure-file-transfer-sftp-scp/secure-file-transfer-SFTP-SCP-PuTTY-PSFTP-login.png"  alt="IoT Remote SSH and Secure File Transfer using PuTTY PSFTP command line file transfer" >}}

Use the "get" command to copy the file from the remote device to your local machine (Windows 10, for example).

{{<image-format src="/assets/img/iot-secure-file-transfer-sftp-scp/secure-file-transfer-SFTP-SCP-PuTTY-PSFTP.png"  alt="IoT Remote SSH and Secure File Transfer using PuTTY PSFTP command line file transfer - file upload to IoT device" >}}

Open another terminal window to verify the contents of the file transferred to your Windows machine's local directory.

{{<image-format src="/assets/img/iot-secure-file-transfer-sftp-scp/secure-file-transfer-SFTP-SCP-PuTTY-PSFTP-file-download-file-upload.png"  alt="IoT Remote SSH and Secure File Transfer using PuTTY PSFTP command line file transfer - file download from IoT device" >}}


### Single-Touch Installation and Configuration Command
The 3 step instruction explained earlier to setup SocketXP on your IoT device is a tedious process, if you have thousands of IoT devices to install, configure and register.

With this in mind, SocketXP IoT Remote Access Solution also provides a single-touch installation command for installing and configuring SocketXP IoT Agent on large number IoT devices.  

Copy and paste the single-touch installation and configuration command from the SocketXP Web Portal's devices page to the Linux shell terminal of your IoT device. 

The device registration command shown below will download a shell script that will install, configure, setup SocketXP IoT agent on your IoT device.  

{{<image-format src="/assets/img/iot-remote-ssh-access/socketxp-web-portal-iot-devices-summary-page.png"  alt="SocketXP IoT SSH Remote Access from Web Browser" >}}

After the command completes, the IoT device would show up as online in the SocketXP Web Portal's "Devices" page.  

You can connect to it using any SSH client or by clicking the "terminal" icon shown next to it.


### SocketXP SSH Public Key Management Tool: 
SSH password based authentication is vulnerable to attacks and generally not recommended for production usecases.  SSH Public Private key based authentication is a secure and recommended method for production usecases.

By default, SocketXP Web Portal will create and sync a very short-lived single-use SSH public key to your Ubuntu Linux machine, so that you can securely remote login to your Ubuntu Linux from anywhere in the world, without having to use password based authentication. The key will be cleaned up or trashed immediately after the user logs in.  

You should remember that a user can SSH into your IoT or embedded Linux device from the SocketXP web portal, only after a successful SSO login (and 2FA authentication) provided by your SSO OAuth provider such: Microsoft 365 or Google G-Suite.

SocketXP has a built-in SSH public key management tool, that automates SSH public key management or syncing it between your Ubuntu Linux system and the SSH web client.  It even cleans up the key immediately, so that a new public key setup is required for the next login attempt by the same user.

For better security, you can even disable password based authentication completely on your Ubuntu Linux SSH server.  But, if you prefer to use password based authentication, then select the "Password authentication" option during the login prompt in the web portal.  The default option is "SSH Public Key Authentication."


## Need Assistance?
If you are facing issues with using the SocketXP Remote Access Solution and need assistance, or you have a query that needs to be answered, please feel free to reach out to us.  We'll get back to you as soon as possible.  Please email us at: [support@socketxp.com]("support@socketxp.com")

## SocketXP Features:
[SocketXP IoT Device Management and Remote Access Platform](/socketxp-iot-device-management-platform) provides the following feature that simplifies [remote device management, access, control and monitoring](/iot/iot-device-management-platform).

  - [SocketXP IoT Remote Access Solution](/iot-remote-access)
  - [Remote SSH Access from anywhere](/iot/remote-access-ssh-from-anywhere/)
  - [Remote File Transfer - SFTP/SCP](/iot/remote-access-ssh-from-anywhere/)
  - [Remote VNC Desktop Access - RDP/VNC](/iot/connect-iot-remote-desktop-xrdp-over-internet)
  - [Remote IoT Device Monitoring](/iot-remote-monitoring)
  - [Remote Asset Live Tracking](/iot-asset-tracking)
  - [Remote IoT Software OTA Update](/iot-ota-update)

## SocketXP Scaling and Performance

SocketXP IoT Cloud Platform can easily support 100K or more devices per customer account. SocketXP IoT Gateway is a cloud native application that has the capability to grow to cloud scale on demand.

If your requirements are unique or have a question regarding customizing our solution to your requirements, please write to us at: [support@socketxp.com]("support@socketxp.com")  


## Conclusion:

The [SocketXP Remote Access Solution](/iot-remote-access) discussed in this article is a secure method to transfer files to your IoT devices behind NAT router and Firewall or connected via a cellular network.  The file data will be encrypted using SSH when transmitted over the internet using SocketXP.


SSH uses the same cryptography technology used by banks and governments to exchange highly confidential data over the internet.

The data transferred gets encrypted end-to-end between the SSH client and the SSH server.

SocketXP has no way to decrypt or eavesdrop your encrypted data without knowing your SSH private keys.  SocketXP merely acts as an online reverse proxy server for your encrypted data traffic transmitted through the SSH connection.


## IoT Remote SSH Security - Do's and Don'ts
## What is IoT
IoT means Internet of Things.  The term IoT refers to the devices that are connected to the internet.  

Today, almost all electrical and electronic gadgets at home such as your air conditioner, refrigerator, washing machine, light bulbs, fans, and security video cameras can be connected to the internet using home automation devices or IoT devices.


Automobiles such as cars, trucks, trains, airplanes and ships are connected to the internet through IoT devices to track the movement and operation of these vehicles.


Even industrial heavy machineries are connected to the internet via the IoT devices.  Sensors are added to the machineries or placed at various locations in a plant to monitor the performance and operation of these machineries.


A simple IoT device based IoT device can be used to monitor, control and operate smart electronic gadgets and electrical appliances in your home or factory.


## Remote SSH access to IoT devices

The primary reason why you deployed these IoT devices and connected them to the internet was to monitor, track and operate these devices from any remote locations.

Sometimes you need a way to gain access to those IoT devices for troubleshooting, configuration updates, and other operational tasks. 

For example, a sensor device deployed at a factory that is hundreds of miles away is having trouble measuring the factory temperature. 

You can use [secure remote access tunnels](/iot/create-secure-reverse-ssh-tunnel-to-iot-devices/) to open and quickly start a session to that sensor device. 

After you have identified the problem (for example, a misconfiguration or disk full error), you can reset the configuration, delete unwanted files or logs history and restart the sensor device through the same session.

In the  traditional methods of troubleshooting you would typically wait until the next day to send a technician to the factory to investigate the sensor device.  

But remote access using secure tunneling (using SocketXP) decreases incident response and recovery time and operational costs.

But gaining remote access to IoT devices is no simple task. 

So often people take shortcuts and perform quick hacks on routers/firewall settings to permit internet traffic into the corporate network. 

In the next section, we'll discuss about some of these unsafe practices and the security risks associated with such configuration options.

## Insecure methods used to remotely access IoT devices

IoT devices in industries, factories, offices and homes are placed behind a firewall and NAT(Wifi Router or Gateway Router).  

IoT devices are always assigned a Local IP address using mechanisms such as DHCP.  The local IP addresses are usually assigned in the 10.X.X.X  or 192.X.X.X range.  

IoT devices do not have publicly reachable IP addresses assigned to them.

The IoT devices behind the firewall can talk to servers on the internet (via the gateway router) but not the other way around.  

This is because you want to prevent your IoT devices from being accessed from the internet by unwanted people or hackers.

So to gain remote access from the internet to IoT devices in your home or factory is not easy and straightforward.

Many people would practice the unsafe method of opening up ports (SSH port 22 or HTTP/HTTPS ports 80/443) in their firewall settings(ACL rules) or gateway router NAT configuration to allow a particular traffic to sneak into the local network. 

Then they would use Dynamic DNS (DDNS) solutions to track the non-static public IP address of the gateway router.  

This method is prone for errors and would create a security risk for your IoT installation.  

Online hackers could scan such open ports and try sneaking into your local network and servers.

The common myth or the misunderstanding here is that, people falsely believe that as long as they use a secure shell connection (SSH) everything going to that port 22 is safe.  

But they fail to understand that they have left a door to their industrial, corporate or home network wide open for any strangers to sneak in without being noticed. 

The same door will be shared by hackers and your secure SSH session alike. 

The problem is not in the SSH session but in the door you left wide open for anyone to sneak in.

## Why SocketXP IoT Remote Access Solution Is More Secure?
[SocketXP IoT Remote Access and Device Management Platform](/socketxp-iot-device-management-platform) provides [secure remote access to your remote IoT devices](/iot-remote-access),  that [doesn't require setting up port-forwarding on your WiFi router or firewall](/iot/remote-access-ssh-without-port-forwarding/).  

SocketXP solution works without making any changes to your WiFi router or firewall settings.  

No hole-punching or port-forwarding setup or back-door opening required.

[SocketXP IoT Platform](/), unlike all other vendor solutions, does not open up your device ports to the internet. Therefore, port scanners and hackers cannot scan your device ports (SSH or HTTP or VNC ports). 

SocketXP IoT Platform protects and handles all direct attacks from the internet, eliminating unnecessary traffic from the internet reaching your IoT devices.

SocketXP connects users with remote devices over secure SSL/TLS connections(vpn tunnels).  

This is the same technology used by the banks and Governments to exchange confidential data securely over the internet.


