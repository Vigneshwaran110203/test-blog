---
title: How to Remote Access Kubernetes Worker Node SSH over the Internet
slug: remote-access-kubernetes-worker-node-ssh-over-the-internet
description: "Take full control of your Kubernetes Master and Worker Nodes with our comprehensive guide to SSH remote access. Learn step-by-step how to set up, configure, and troubleshoot SSH for seamless remote control of your Kubernetes Master or Worker Node."
author: Ganesh Velrajan
tags: [
    Kubernetes cluster, Worker Node, Master Node, Linux server, RedHat Linux, CentOS, Ubuntu, IoT, Remote Access, SSH, Internet, Firewall, NAT Router, Outside Network, SSH keys
]
date: 2023-10-11
lastmod: 2024-10-14
categories: [
    Linux Server
]
images: ["/assets/img/linux-remote-ssh-access/linux-server-remote-ssh-access-from-windows-internet.jpg"]
aliases: []
---

In this article, we will discuss how to remotely access your Kubernetes Master or Worker Node's Secure Shell (SSH) over the internet, making it easier than ever to manage your Kubernetes Worker Nodes or cluster from anywhere in the world.

One of the key features of a Linux based cluster node is its ability to be accessed remotely, which allows you to control and manage your Kubernetes Worker Node from another machine over the internet. 

One common method to remotely access a Kubernetes cluster node is using Secure Shell (SSH), a network protocol that provides a secure way to communicate with a remote server or node. 

Let's dive in and unlock the full potential of your Kubernetes Worker Node with remote access via SSH!

## Step 1: Set Up Your Kubernetes Worker Node  for remote SSH access
Before you can [remotely access your Kubernetes Worker Node](/remote-access-linux-server), you need to make sure that it is set up correctly. 

This includes installing an operating system (such as RedHat, CentOS, Ubuntu), connecting it to the internet using an ethernet cable or through Wi-Fi and verify if you can ping ‘www.google.com’ from the Kubernetes Worker Node. 

Once your Kubernetes Worker Node is up and running, you are ready to proceed with remote access.

## Step 2: Enable SSH on Your Kubernetes Worker Node
By default, SSH is disabled on a Kubernetes Worker Node for security reasons. However, you can easily enable it using the following steps:

1.	Open a terminal window on your Kubernetes Worker Node.
2.	Run `systemctl status sshd` and check if the OpenSSH server is already running.
3.  If not, run `systemctl start sshd`
4.  Recheck the status of the sshd server by running `systemctl status sshd` again.

If SSH server(sshd) is not installed in your Linux machine, [install the OpenSSH server and client on your Kubernetes Worker Node](/iot/install-setup-ssh-server-client-iot-device/) first.

## Step 3: Set up SocketXP Remote Access software
Remote access to the SSH server running in your Linux server requires installing and running a secure remote access software (a VPN like software) on the Kubernetes Worker Node.  

Once the remote access software is installed on the Kubernetes Worker Node, the Kubernetes Worker node can be securely accessed from anywhere in the world. 

SocketXP, a popular [Linux server remote access](/remote-access-linux-server) software platform,  enables you to easily manage, control, monitor and remote access a cluster of worker nodes from a web portal.

### How SocketXP Remote Access solution works
1. First, you need to install the SocketXP agent on your Kubernetes Worker Node.  

2. The agent will securely connect (using an SSL/TLS tunnel) to the SocketXP IoT Cloud Gateway using an authentication token. 

3. You can then SSH connect to your Kubernetes Worker Node from the SocketXP Web Portal or using your own SSH client such as PuTTY.

{{<image-format src="/assets/img/linux-remote-ssh-access/linux-server-remote-ssh-access-from-windows-internet.jpg"  alt="Kubernetes Worker Node remote ssh access from windows over the internet from outside network" >}}

Follow the steps below to install and setup  SocketXP agent on your Kubernetes Worker Node.

### Step 3.1:  Download and Install

Follow the [download and install](https://www.socketxp.com/download/) instructions to install the SocketXP agent on your Kubernetes Worker Node. 

### Step 3.2: Get your Authentication Token

Sign up at [https://portal.socketxp.com]("https://portal.socketxp.com/") and get your authentication token.

{{<image-format src="/assets/img/AuthToken.jpg"  alt="remotely access Kubernetes Worker Node SSH  over the internet" >}}

Use the following command to login to the SocketXP IoT Cloud Gateway using the auth token.

{{<source-code>}}
$ socketxp login [your-auth-token-goes-here]
{{</source-code>}}

### Step 3.3: Connect the node to the SocketXP Cloud Gateway

Use the following command to connect the Kubernetes Worker Node to the cloud gateway using a secure SSL/TLS connection.

{{<source-code>}} $ socketxp connect tcp://localhost:22

Connected to SocketXP Cloud Gateway.
Access the device securely using the SocketXP agent in IoT Slave Mode.
{{</source-code>}}

For the security of your worker node or cluster, SocketXP IoT Solution doesn't create any public TCP endpoints that can be connected by any SSH client from the internet. 

SocketXP private tunnel endpoints are not exposed to the internet and can be accessed only using the SocketXP agent (in IoT slave mode using the auth token of the user) or through the web terminal in the SocketXP web portal as shown below.

### Single-Touch Installation Command
The 3 step instruction explained above to setup SocketXP on your Kubernetes Worker Node is a tedious process, if you have tens or hundreds of Linux server cluster to install, configure and manage.

With this in mind, SocketXP Remote Access Solution also provides a single-touch installation command for installing and configuring SocketXP IoT Agent on large number Kubernetes Worker Node.  

Copy and paste the below single-touch installation command from the SocketXP Portal page on to the terminal of your Kubernetes Worker Node. The command shown below will download a shell script that will install, configure, setup SocketXP IoT agent on your Kubernetes Worker Node.  After the command completes, the Kubernetes Worker Node would show up as online in the SocketXP Portal page.

{{<image-format src="/assets/img/raspberry-pi-remote-ssh-access/SocketXP-IoT-Agent-Install-Script.png"  alt="SocketXP IoT Remote SSH installation script" >}}

## Step 4: Accessing the Kubernetes Worker Node SSH from your laptop
Your Kubernetes Worker Node is now ready to be accessed remotely from anywhere in the world using SSH by simply logging in to the [SocketXP Web Portal](/login). 

Head to the "Devices" section, find your Kubernetes Worker Node listed in the table.  Click the terminal icon next to your node.  It will take you to a SSH login screen.  

Provide the login and password setup for your node.  Once the login is successful, it will put you in a shell prompt.

{{<image-format src="/assets/img/raspberry-pi-remote-ssh-access/SocketXP-IoT-Remote-SSH-2.png"  alt="SocketXP Kubernetes Worker Node Remote SSH access from web browser" >}}


{{<image-format src="/assets/img/raspberry-pi-remote-ssh-access/SSH-from-browser-2.jpg"  alt="Kubernetes Worker Node cluster SSH remote access" >}}

The above screen capture shows the "htop" command output from an SSH session created using the SSH web terminal window in the SocketXP web portal.

### Step 4.1: Configuring SocketXP agent to run in slave mode

This is an alternate method for connecting to your Kubernetes Worker Node from a remote location using the SocketXP solution.

If you don't want to access your Kubernetes Worker Node from the browser and you want to access it using your own SSH client such as PuTTY then follow the instructions below.

This method is extremely useful if you want to setup and use SSH public private keys to remote access your Kubernetes Worker Node.

First [download and install](/download) the SocketXP agent software on your accessing device (such as a laptop running Windows or Mac OS). 

Next, configure the agent to run in slave mode (or local proxy mode) using the command option "--iot-slave" as shown in the example below. 

{{<source-code>}}
$ socketxp connect tcp://localhost:3000 --iot-slave --peer-device-id "2233-4455-abcd-34445" --peer-device-port 22 --authtoken &lt;auth token&gt;

Listening for TCP connections at:
Local URL -&gt; tcp://localhost:3000
{{</source-code>}}

You shall find the device ID of your Kubernetes Worker Node from the [SocketXP Portal page in the IoT Devices section](https://portal.socketxp.com/#/devices).

Now you can access your Kubernetes Worker Node's SSH server using the above SocketXP local endpoint, as shown below.  

You can use your own SSH client such as PuTTY to connect to your remote Kubernetes Worker Node SSH shell.  The following example uses a command line based SSH client tool.

{{<source-code>}}$ ssh -i ~/.ssh/john-private.key john@localhost -p 3000
{{</source-code>}}

## How to install OpenSSH server on your Kubernetes Worker Node

All Linux servers come with SSH Server installed.  If your server is not installed with OpenSSH server and you want to know how to install and configure SSH server, SSH clients, SSH public/private keys for remote SSH access, continue reading the below sections.

[OpenSSH](https://www.openssh.com/) is a free open source software that uses SSH protocol to create secure and encrypted communication channels over computer networks.  

Open SSH is developed by the [Open BST Community](https://www.openbsd.org/) and it is released under a Simplified BSD License

OpenSSH comes with additional features such as SFTP and SCP to perform secure file transfer and secure copy over a computer network.

To install and run SSH server on your Kubernetes Worker Node, execute the following commands:

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
Use the following command to install SSH client on your laptops or any device from where you would remote SSH into your Kubernetes Worker Node.

### Debian/Ubuntu
{{<source-code>}}$ sudo apt-get update
$ sudo apt-get install openssh-client{{</source-code>}}
### RHEL/CentOS
{{<source-code>}}$ sudo yum update
$ sudo yum -y install openssh-client{{</source-code>}}

## How to create and setup SSH public private keys

SSH uses a public/private key based encryption algorithm for encrypting the communication channel.  Use the ssh-keygen command to generate SSH keys for those clients that need to SSH into your Linux server.

Go to your client machine (Laptop, for eg.) and open up a terminal and execute the following command.  Follow the instructions on the screen to create a public/private key pair.

{{<source-code>}}$ ssh-keygen -b 4096
Generating public/private rsa key pair.
Enter file in which to save the key (/home/your_home/.ssh/id_rsa):
{{</source-code>}}
The keys will be saved usually in your home directory under the “.ssh” folder.  

Leave the private key in your client machine.  Copy just the contents of /home/your_)home/.ssh/id_rsa.pub file and paste it (actually append it) to the “~/.ssh/authorized_keys” file in your Kubernetes Worker Node where the SSH server runs.

From now on, you can login to your Kubernetes Worker Node remotely using the SSH private key in your client machine using the following command

{{<source-code>}}$ ssh -i ~/.ssh/id_rsa.key john@tunnel.socketxp.com -p 23224

{{</source-code>}}
## Disable Password Authentication on your SSH Server

After configuring your SSH server and client to use private/public key for authentication, it is wise and safe to turn off password based authentication, because passwords are relatively easy to crack.

Before you perform this step, make sure you have setup your public/private key pairs correctly and you are able to login using them.  Otherwise, once you disable password authentication, you’ll be locked out of your Kubernetes Worker Node.

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
As with any remote access solution, enabling SSH on a Kubernetes Worker Node comes with security implications.

You need to follow [SSH remote access security best practices](/iot/remote-access-raspberry-pi-ssh-security-best-practices) to keep your Kubernetes Worker Node secure from any potential threats.

It is essential that you periodically review these security best practices and ensure that your Kubernetes Worker Node is adhering strictly to the security guidelines.

## Advantages of using SocketXP for Kubernetes Worker Node remote SSH access:

SocketXP uses secure reverse proxy SSL/TLS tunnels to connect to your Kubernetes Worker Node over the internet, so that your node is not directly exposed to the internet.  Also, the data transmitted is encrypted using SSL/TLS.

SSH uses the same cryptography technology used by banks and governments to exchange highly confidential data over the internet.

The data transferred gets encrypted end-to-end between the SSH client and the SSH server.

SocketXP has no way to decrypt or eavesdrop your encrypted data without knowing your SSH private keys.  SocketXP merely acts as an SSL/TLS reverse proxy server for your encrypted data traffic transmitted through the SSH connection.

## Conclusion

Remotely connecting to your Kubernetes Worker Node via SSH provides a convenient and powerful way to control your Kubernetes Worker Node from anywhere in the world. 

By following the steps outlined in this article, you can easily enable SSH, install SocketXP [Kubernetes Worker Node Remote Access](/remote-access-linux-server) agent on it, and connect to it remotely using SSH. 

Once connected, you can perform various tasks to manage your Kubernetes Worker Node remotely, including updating packages, installing/removing software, configuring settings, transferring files, managing processes, and performing system maintenance. 

With remote access, you can unlock the full potential of your Kubernetes Worker Node and use it for a wide range of applications with ease and convenience. 


