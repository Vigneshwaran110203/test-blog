---
title: How to Remote Access Ubuntu SSH Server over the Internet
slug: remote-access-ubuntu-ssh-server-over-the-internet
description: "Take full control of your Ubuntu Linux machine with our comprehensive guide to SSH remote access without port forwarding. Learn step-by-step how to set up, configure, and troubleshoot SSH for seamless remote control of your Ubuntu Linux server. Unlock the power of your Ubuntu Linux server from anywhere, anytime with our expert tips and tricks. Get started now!"
author: Ganesh Velrajan
tags: [
    Linux server, Ubuntu, IoT, Remote Access, SSH Server, Internet, Firewall, NAT Router, Outside Network, SSH keys, Windows 10, Windows 11
]
date: 2024-11-18
lastmod: 2024-11-18
categories: [
    Linux Server
]
images: ["/assets/img/linux-remote-ssh-access/linux-server-remote-ssh-access-from-windows-internet.jpg"]
aliases: []
---

In this article, we will discuss how to remote access your Ubuntu Linux [Secure Shell (SSH)](/iot/ssh-secure-shell/) server from Windows or any OS without comprimising security, making it easier than ever to manage your Ubuntu Linux remotely from anywhere in the world.

One of the key features of the [Ubuntu Linux is its ability to be accessed remotely](/remote-access-linux-server), which allows you to control and manage your Ubuntu Linux from another machine over the internet. 

One common method to [remotely access a Ubuntu Linux from anywhere is using Secure Shell (SSH)](/iot/remote-access-ssh-from-anywhere), a network protocol that provides a secure way to communicate with a remote device. 

Key to Ubuntu SSH remote access is not compromising your organizational security.  

Ideally you shouldn't resort to solutions that require you to open up any ports or setup port-forwarding in your WiFi router or Firewall settings. You should always adhere to [ssh remote access security best practices](/iot/remote-access-iot-ssh-security-best-practices/) to avoid compromising your organization's IT infra security.

The solution we will discuss in this article, is a more secure way to remote access your Ubuntu SSH or command line.

Yes, you heard that right.  [No port-forwarding or firewall pinholing required to remote access your Ubuntu SSH server](/iot/remote-access-ssh-without-port-forwarding) using the method we will discuss in this article.

Let's dive in and unlock the full potential of your Ubuntu Linux with secure remote access via SSH!

## Step 1: Set Up Your Ubuntu Linux for remote SSH access
Before you can [remotely access your Ubuntu Linux](/remote-access-linux-server), you need to make sure that it is set up correctly. 

This includes installing an operating system (such as Ubuntu), connecting it to the internet using an ethernet cable or through Wi-Fi and verify if you can ping ‘www.google.com’ from the Ubuntu Linux. 

Once your Ubuntu Linux server is up and running, you are ready to proceed with remote access.

## Step 2: Enable SSH on Your Ubuntu Linux
By default, SSH is disabled on a Ubuntu Linux for security reasons. However, you can easily enable it using the following steps:

1.	Open a terminal window on your Ubuntu Linux.
2.	Run `systemctl status sshd` and check if the OpenSSH server is already running.
3.  If not, run `systemctl start sshd`
4.  Recheck the status of the sshd server by running `systemctl status sshd` again.

If SSH server(sshd) is not installed in your Linux machine, [install the OpenSSH server and client on your Ubuntu Linux](/iot/install-setup-ssh-server-client-iot-device/) first.

## Step 3: Set up Ubuntu Linux Remote Access software
Remote access to the SSH server running in your Ubuntu Linux machine requires installing and running a secure remote access software (a VPN like software) on the Ubuntu Linux.  

Once the remote access software is installed on the Ubuntu Linux, the [Ubuntu Linux machine SSH server can be securely remote accessed from anywhere](/iot/remote-access-ssh-from-anywhere) in the world. 

SocketXP, a popular [Linux server remote access solution](/remote-access-linux-server), enables you to easily manage, control, monitor, debug, execute commands and remote access a fleet of Ubuntu Linux machines from a web portal.  Try SocketXP for free for 30-days.  No credit card required.

### How SocketXP Ubuntu Linux Remote Access solution works
1. First, you need to [install the SocketXP agent](/download) on your Ubuntu Linux.  SocketXP is absolutely free to try without any strings attached.

2. The agent will securely connect (using an SSL/TLS tunnel) to the SocketXP IoT Cloud Gateway using an authentication token. 

3. You can then SSH connect to your Ubuntu Linux machine from the SocketXP Web Portal or using your own SSH client such as PuTTY.

{{<image-format src="/assets/img/linux-remote-ssh-access/linux-server-remote-ssh-access-from-windows-internet.jpg"  alt="Ubuntu Linux server remote ssh access from windows over the internet from outside network without port forwarding or firewall pinholing" >}}

Follow the steps below to install and setup  SocketXP agent on your Ubuntu Linux device.

### Step 3.1:  Download and Install

Follow the [download and install](https://www.socketxp.com/download/) instructions to install the SocketXP agent on your Ubuntu Linux device. 

### Step 3.2: Get your Authentication Token

Sign up at [https://portal.socketxp.com]("https://portal.socketxp.com/") and get your authentication token.

{{<image-format src="/assets/img/AuthToken.jpg"  alt="remotely access Ubuntu Linux SSH  over the internet without port forwarding" >}}

Use the following command to login to the SocketXP IoT Cloud Gateway using the auth token.

{{<source-code>}}
$ socketxp login [your-auth-token-goes-here]
{{</source-code>}}

### Step 3.3: Connect the device to the SocketXP Cloud Gateway

Use the following command to connect the Ubuntu Linux to the cloud gateway using a secure SSL/TLS connection.

{{<source-code>}} $ socketxp connect tcp://localhost:22

Connected to SocketXP Cloud Gateway.
Access the device securely using the SocketXP agent in IoT Slave Mode.
{{</source-code>}}

For the security of your device, SocketXP IoT Solution doesn't create any public TCP endpoints that can be connected by any SSH client from the internet. 

SocketXP private tunnel endpoints are not exposed to the internet and can be accessed only using the SocketXP agent (in slave mode using the auth token of the user) or through the web terminal in the SocketXP web portal as shown below.

### Single-Touch Installation Command
The 3 step instruction explained above to setup SocketXP agent on your Ubuntu Linux is a tedious process, if you have hundreds or thousands of Ubuntu Linux systems to install, configure and manage.

With this in mind, SocketXP IoT Remote Access Solution also provides a single-touch installation command for installing and configuring SocketXP IoT Agent on large number Ubuntu Linux devices.  

Copy and paste the below single-touch installation command from the SocketXP Portal page on to the terminal of your Ubuntu Linux. The command shown below will download a shell script that will install, configure, setup SocketXP IoT agent on your Ubuntu Linux machine.  After the command completes, the Ubuntu Linux device would show up as online in the SocketXP Portal page.

{{<image-format src="/assets/img/raspberry-pi-remote-ssh-access/SocketXP-IoT-Agent-Install-Script.png"  alt="SocketXP IoT Remote SSH installation script" >}}

## Step 4: Accessing the Ubuntu Linux SSH Command Line from your laptop
Your Ubuntu Linux server is now ready to be accessed remotely from anywhere in the world using SSH by simply logging in to the [SocketXP Web Portal](/login). 

Head to the "Devices" section, find your Ubuntu Linux device listed in the table.  Click the terminal icon next to your device.  It will take you to a SSH login screen.  

Provide the login and password setup for your device.  Once the login is successful, it will put you in a shell prompt.

{{<image-format src="/assets/img/raspberry-pi-remote-ssh-access/SocketXP-IoT-Remote-SSH-2.png"  alt="SocketXP Ubuntu Linux Remote SSH access from web browser" >}}


{{<image-format src="/assets/img/raspberry-pi-remote-ssh-access/SSH-from-browser-2.jpg"  alt="Ubuntu Linux cluster SSH remote access" >}}

The above screen capture shows the "htop" command output from an SSH session created using the SSH web terminal window in the SocketXP web portal.

### SocketXP SSH Public Key Management Tool: 
SSH password based authentication is vulnerable to attacks and generally not recommended for production usecases.  SSH Public Private key based authentication is a secure and recommended method for production usecases.

By default, SocketXP Web Portal will create and sync a very short-lived single-use SSH public key to your Ubuntu Linux machine, so that you can securely remote login to your Ubuntu Linux from anywhere in the world, without having to use password based authentication. The key will be cleaned up or trashed immediately after the user logs in.  

You should remember that a user can SSH into your Ubuntu Linux machine from the SocketXP web portal, only after a successful SSO login (and 2FA authentication) provided by your SSO OAuth provider such: Microsoft 365 or Google G-Suite.

SocketXP has a built-in SSH public key management tool, that automates SSH public key management or syncing it between your Ubuntu Linux system and the SSH web client.  It even cleans up the key immediately, so that a new public key setup is required for the next login attempt by the same user.

For better security, you can even disable password based authentication completely on your Ubuntu Linux SSH server.  But, if you prefer to use password based authentication, then select the "Password authentication" option during the login prompt in the web portal.  The default option is "SSH Public Key Authentication."


### Step 4.1: Configuring SocketXP agent to run in slave mode

This is an alternate method for connecting to your Ubuntu Linux from a remote location using the SocketXP solution.

If you don't want to access your Ubuntu Linux from the web browser and you want to access it using your own SSH client such as PuTTY, SecureCRT, or Filezilla then follow the instructions below.

This method is extremely useful if you want to setup and use SSH public private keys to remote access your Ubuntu Linux.

First [download and install](/download) the SocketXP agent software on your accessing device (such as a laptop running Windows or Mac OS). 

Next, configure the agent to run in slave mode (or local proxy mode) using the command option "--iot-slave" as shown in the example below. 

{{<source-code>}}
$ socketxp connect tcp://localhost:3000 --iot-slave --peer-device-id "2233-4455-abcd-34445" --peer-device-port 22 --authtoken &lt;auth token&gt;

Listening for TCP connections at:
Local URL -&gt; tcp://localhost:3000
{{</source-code>}}

You shall find the device ID of your Ubuntu Linux from the [SocketXP Portal page in the IoT Devices section](https://portal.socketxp.com/#/devices).

Now you can access your Ubuntu Linux's SSH server using the above SocketXP local endpoint, as shown below.  

You can use your own SSH client such as PuTTY to connect to your remote Ubuntu Linux SSH shell.  The following example uses a command line based SSH client tool.

{{<source-code>}}$ ssh -i ~/.ssh/john-private.key john@localhost -p 3000
{{</source-code>}}

You can use this method to [remote access your Linux SSH Server from windows or any OS from anywhere over the internet](/iot/remote-access-linux-server-ssh-over-the-internet-from-windows/).

## How to install OpenSSH server on your Ubuntu Linux device

All Ubuntu Linux devices come with SSH Server installed.  If your device is not Ubuntu Linux based and you want to know how to install and configure SSH server, SSH clients, SSH public/private keys for remote SSH access, continue reading the below sections.

[OpenSSH](https://www.openssh.com/) is a free open source software that uses SSH protocol to create secure and encrypted communication channels over computer networks.  

Open SSH is developed by the [Open BST Community](https://www.openbsd.org/) and it is released under a Simplified BSD License

OpenSSH comes with additional features such as SFTP and SCP to perform secure file transfer and secure copy over a computer network.

To install and run SSH server on your Ubuntu Linux device, execute the following commands:

### Debian/Ubuntu Linux:
First update your linux and then install the openssh server
{{<source-code>}}$ sudo apt-get update
$ sudo apt-get install openssh-server{{</source-code>}}
The following commands will enable and run SSH server as a daemon in the background.
{{<source-code>}}$ sudo systemctl enable ssh
$ sudo systemctl start ssh
{{</source-code>}}
### RHEL/CentOS Linux:
{{<source-code>}}$ sudo yum update
$ sudo yum -y install openssh-server{{</source-code>}}
Then enable SSH server and start it.
{{<source-code>}}$ sudo chkconfig sshd on
$ sudo service sshd start
{{</source-code>}}
SSH uses port 22 for communication.  If it is not enabled already, execute the following command to open up the SSH port on your linux system.

{{<source-code>}}$ sudo /sbin/iptable -A INPUT -m state --state NEW -m tcp -p tcp --dport 22 -j ACCEPT
$ sudo service iptables save
{{</source-code>}}

## How to install SSH client on your client machines
Use the following command to install SSH client on your laptops or any device from where you would remote SSH into your Ubuntu Linux.

### Debian/Ubuntu
{{<source-code>}}$ sudo apt-get update
$ sudo apt-get install openssh-client{{</source-code>}}
### RHEL/CentOS
{{<source-code>}}$ sudo yum update
$ sudo yum -y install openssh-client{{</source-code>}}

## How to create and setup SSH public private keys

SSH uses a public/private key based encryption algorithm for encrypting the communication channel.  Use the ssh-keygen command to generate SSH keys for those clients that need to SSH into your Ubuntu Linux devices.

Go to your client machine (Laptop, for eg.) and open up a terminal and execute the following command.  Follow the instructions on the screen to create a public/private key pair.

{{<source-code>}}$ ssh-keygen -b 4096
Generating public/private rsa key pair.
Enter file in which to save the key (/home/your_home/.ssh/id_rsa):
{{</source-code>}}
The keys will be saved usually in your home directory under the “.ssh” folder.  

Leave the private key in your client machine.  Copy just the contents of /home/your_)home/.ssh/id_rsa.pub file and paste it (actually append it) to the “~/.ssh/authorized_keys” file in your Ubuntu Linux device where the SSH server runs.

From now on, you can login to your Ubuntu Linux remotely using the SSH private key in your client machine using the following command

{{<source-code>}}$ ssh -i ~/.ssh/id_rsa.key john@tunnel.socketxp.com -p 23224

{{</source-code>}}
## Disable Password Authentication on your SSH Server

After configuring your SSH server and client to use private/public key for authentication, it is wise and safe to turn off password based authentication, because passwords are relatively easy to crack.

Before you perform this step, make sure you have setup your public/private key pairs correctly and you are able to login using them.  Otherwise, once you disable password authentication, you’ll be locked out of your Ubuntu Linux.

To disable password authentication, open the SSH server’s configuration file as a sudo user.

{{<source-code>}}sudo nano /etc/ssh/sshd_config
{{</source-code>}}
Inside the file, search for a directive called PasswordAuthentication.  This may be commented out. Uncomment the line and set the value to “no”.  This will disable your ability to log in to the SSH server using account passwords:


{{<source-code>}}PasswordAuthentication no
{{</source-code>}}
Save and close the file when you are finished.


To actually implement the changes we just made, you must restart the service.

On Ubuntu or Debian machines, you can issue this command:

{{<source-code>}}sudo service ssh restart
{{</source-code>}}
On CentOS/Fedora machines, issue the following command:

{{<source-code>}}sudo service sshd restart
{{</source-code>}}
After completing this step, you’ve successfully transitioned your SSH daemon to only respond to SSH keys.

## Security Best Practices:
As with any remote access solution, enabling SSH on a Ubuntu Linux comes with security implications.

You need to follow [SSH remote access security best practices](/iot/remote-access-raspberry-pi-ssh-security-best-practices) to keep your Ubuntu Linux machine secure from any potential threats.

It is essential that you periodically review these security best practices and ensure that your Ubuntu Linux is adhering strictly to the security guidelines.

## Advantages of using SocketXP for Ubuntu Linux remote SSH access:

SocketXP uses secure reverse proxy SSL/TLS tunnels to connect to your Ubuntu Linux over the internet, so that your device is not directly exposed to the internet.  Also, the data transmitted is encrypted using SSL/TLS.

SSH uses the same cryptography technology used by banks and governments to exchange highly confidential data over the internet.

The data transferred gets encrypted end-to-end between the SSH client and the SSH server.

SocketXP has no way to decrypt or eavesdrop your encrypted data without knowing your SSH private keys.  SocketXP merely acts as an SSL/TLS reverse proxy server for your encrypted data traffic transmitted through the SSH connection.

## Conclusion

Remotely connecting to your Ubuntu Linux via SSH to access the command line provides a convenient and powerful way to control your Ubuntu Linux from anywhere in the world. 

By following the steps outlined in this article, you can easily enable SSH in your Ubuntu Linux, install SocketXP [Ubuntu Linux Remote Access](/remote-access-linux-server) agent on it, and connect to it remotely using SSH. 

Once connected, you can perform various tasks to manage your Ubuntu Linux remotely, including executing commands, updating packages, installing/removing software, configuring settings, transferring files, managing processes, and performing system maintenance. 

With remote access, you can unlock the full potential of your Ubuntu Linux and use it for a wide range of applications with ease and convenience. 

[SocketXP Linux Server Remote Access](/remote-access-linux-server) solution is a secure remote access solution that is trusted by thousands of users and hundreds of organizations worldwide.  SocketXP also provides you the option to:
-  [Securely remote access Ubuntu server desktop GUI from windows](/iot/remote-connect-linux-desktop-gui-rdp-from-windows-over-internet/), 
- [Securely remote access a private HTTP web service using a secure public web URL](/iot/remote-access-iot-web-app-from-internet/) and more.
- [Securely execute remote commands or scripts on multiple Ubuntu Linux machines](/iot/remote-command-script-execution-linux-server/)


## Got any questions?

If you have any questions, please write to us at: support@socketxp.com


