---
title: How to Install and Setup SSH Server and Client on your Embedded Linux Device
slug: install-setup-ssh-server-client-iot-device
description: "Learn how to install and setup Open SSH server and client software on your IoT device so that you could remotely access it over the internet."
author: Ganesh Velrajan
tags: [
    IoT device, IoT, Remote Access, SSH, Internet, Firewall, NAT Router, Outside Network, OpenSSH
]
date: 2023-05-10
lastmod: 2024-10-18
categories: [
    IoT
]
images: ["/assets/img/raspberry-pi-remote-ssh-access/iot-remote-ssh.png"]
aliases: []
---
{{<ahref href="https://www.openssh.com/" rel="nofollow" target="_blank">}}
OpenSSH{{</ahref>}} is a free open source software that uses Secure Shell(SSH) protocol to create secure and encrypted communication channels over computer networks.  

OpenSSH is developed by the {{<ahref href="https://www.openbsd.org/" rel="nofollow" target="_blank">}}Open BST Community{{</ahref>}} and it is released under a Simplified BSD License.

OpenSSH comes with additional features such as SFTP and SCP to perform secure file transfer and secure copy over a computer network.

Setting up SSH server in your IoT device is essential for enabling [secure remote access to your IoT device](/iot-remote-access).

## How to install OpenSSH server on your IoT device

To install and run SSH server on your IoT device, execute the following commands:

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
SSH uses port 22 for communication.  If it is not enabled already, execute the following command to open up the SSH port on your linux system.

{{<source-code>}}$ sudo /sbin/iptable -A INPUT -m state --state NEW -m tcp -p tcp --dport 22 -j ACCEPT
$ sudo service iptables save
{{</source-code>}}
&nbsp;

## How to install SSH client on your client machines
Use the following command to install SSH client on your laptops or any device from where you would remote SSH into your IoT device.

### Debian/Ubuntu
{{<source-code>}}$ sudo apt-get update
$ sudo apt-get install openssh-client{{</source-code>}}
### RHEL/CentOS
{{<source-code>}}$ sudo yum update

$ sudo yum -y install openssh-client{{</source-code>}}

## How to create and setup SSH Keys

SSH uses a public/private key based encryption algorithm for encrypting the communication channel.  Use the ssh-keygen command to generate SSH keys for those clients that need to SSH into your IoT devices.


Go to your client machine (Laptop, for eg.) and open up a terminal and execute the following command.  Follow the instructions on the screen to create a public/private key pair.

{{<source-code>}}$ ssh-keygen -b 4096

Generating public/private rsa key pair.

Enter file in which to save the key (/home/your_home/.ssh/id_rsa):
{{</source-code>}}
The keys will be saved usually in your home directory under the “.ssh” folder.  Leave the private key in your client machine.  Copy just the contents of /home/your_)home/.ssh/id_rsa.pub file and paste it (actually append it) to the “~/.ssh/authorized_keys” file in your IoT device where the SSH server runs.


From now on, you can login to your IoT device remotely using the SSH private key in your client machine using the following command

{{<source-code>}}$ ssh -i ~/.ssh/id_rsa.key john@tunnel.socketxp.com -p 23224

{{</source-code>}}
## Disable Password Authentication on your SSH Server

After configuring your SSH server and client to use private/public key for authentication, it is wise and safe to turn off password based authentication, because passwords are relatively easy to crack.


Before you perform this step, make sure you have setup your public/private key pairs correctly and you are able to login using them.  Otherwise, once you disable password authentication, you’ll be locked out of your IoT device.


To disable password authentication, open the SSH server’s configuration file as a sudo user.

{{<source-code>}}sudo nano /etc/ssh/sshd_config
{{</source-code>}}
Inside the file, search for a directive called PasswordAuthentication.  This may be commented out. Uncomment the line and set the value to “no”.  This will disable your ability to log in to the SSH server using account passwords:


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

## Conclusion:
SSH uses encryption to securely communicate with your IoT device  over any unsecure network such as the internet.

Setting up SSH server in your IoT device and the client software in your access devices is essential for enabling [remote access to your IoT device](/iot-remote-access).

Disabling password based SSH authentication and enabling SSH key based authentication for SSH login significantly improves IoT device remote access security.

OpenSSH server and client software, combined with the power of SocketXP IoT Remote Access Solution is a great combination for managing and maintaining your IoT device fleet remotely.