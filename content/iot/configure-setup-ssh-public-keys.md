---
title: How to configure and setup SSH public keys, the right way
slug: configure-setup-ssh-public-keys-right-way
description: "Mostly, users login to their servers using SSH passwords.  SSH password based authentication is not safe for enterprise usecases because passwords are usually short in length, contain dictionary words, and can be easily guessed.  Using SSH public key based authentication is safe for enterprise deployments."
author: Ganesh Velrajan
tags: [
    SSH Bastion Host, SSH Public Private Keys, SSH certificates, SSH certificate management, SSH key management, SSH CA
]
date: 2022-02-11
lastmod: 2024-10-11
categories: [
    blog
]
images: ["/assets/img/tighten-ssh-access-using-ssh-certificates/setup-ssh-public-keys.jpg"]
aliases: ["how-to-configure-and-setup-ssh-public-keys-the-right-way"]
---

Mostly, users login to their servers using SSH passwords.  SSH password based authentication is not safe for enterprise usecases because passwords are usually short in length, contain dictionary words, and can be easily guessed.  Using SSH public key based authentication is safe for enterprise deployments.  

In this article we'll discuss how to configure and setup SSH public key based login for a linux server.


## Step #1  Create the SSH keys
When you install SSH, it comes with a bunch of handy tools.  One of them is named `ssh-keygen`.  We'll use `ssh-keygen` to create SSH public keys.

{{<source-code>}}$ ssh-keygen -t rsa -b 4096
Generating public/private rsa key pair.
Enter file in which to save the key (/home/bob/.ssh/id_rsa): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/bob/.ssh/id_rsa
Your public key has been saved in /home/bob/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:ShpCF11/fYjujAVDYivNKpNM6QdVwh8Z9sX00PIspdo 
bob@localhost
The key's randomart image is:
+---[RSA 4096]----+
|    .oooBo.o+.   |
|     +o*o* .o=o. |
|  . = ..+.= o*+ .|
| . = o o.  =o o. |
|  . B + S  oo.   |
|   . B .  .=E    |
|    . .   . o    |
|                 |
|                 |
+----[SHA256]-----+
{{</source-code>}}

We are requesting a RSA type key and the key length should be 4096 bits.  The longer the key, the harder it is to crack it.

It is highly recommended to provide a passphrase for the private key, when prompted.  If an unauthorized user gets hold of the private key with no passphrase, they will be able to log in to any server you've configured with the associated public key.

The above command would have generated an SSH pair - public key and a private key, in the default `.ssh` folder in your home directory. For example: `/home/bob/.ssh/`

**Public Key:** /home/bob/.ssh/id_rsa.pub
**Private Key:** /home/bob/.ssh/id_rsa

You should neither share the private key with anyone nor copy it to your online storage or emails or chat window.

## Step 2: Configure the server to use the public key

Next, we need to copy the SSH public key to the server.  We'll use a tool named `ssh-copy-id` that is part of the ssh toolkit. 

{{<source-code>}}
$ ssh-copy-id bob@server-name {{</source-code>}}


Once the above command completes, you can login to your server using the SSH public key.  If you have set up a passphrase during the key generation, the `ssh-copy-id` command will ask for it.
Alternatively, you can copy the SSH public key manually to the server.  You need to copy-paste or append the public key to the `~/.ssh/authorized_keys` file  on the server.

{{<source-code>}} 
$ cat /home/bob/.ssh/authorized_keys 
#Bob's key
ssh-rsa AAAAB3NzaC1yc2EAAAADAQAB... bob{{</source-code>}}


## Step 3 Verify SSH login using the key
Verify if you can login to the server using the ssh key generated above.   Run the SSH client command as shown below:

{{<source-code>}}ssh -i /home/bob/.ssh/id_rsa bob@server-name{{</source-code>}}


The -i option is used to specify the identity file or the SSH private key file.  You may be prompted for the passphrase to unlock the private key, if you provided one during the step #1 above.

When you login using the SSH key for the first time, you'll see a weird message on the console, something like this:

{{<source-code>}}
The authenticity of host 'server-name (10.1.1.1)' can't be established.
ED25519 key fingerprint is SHA256:LKVs+g5kgmIXsYkU2Fl8XmNOmW4Rz1/AoXBLdRoanzM.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])?{{</source-code>}}


This is a catch22 situation where you can neither deny nor agree with the message.  If you know this is your host or server, then say yes and continue.  The SSH public key of the host will be stored in the `~/.ssh/known_hosts` file in your client machine for future reference.  Next time when you SSH login, you'll not see the message again.

If you prefer not to input the SSH key file location and the username everytime you use the ssh command, you could setup the SSH config in your user machine as shown below:

{{<source-code>}}
$ cat ~/.ssh/config
	
Host host1
   HostName host1.example.com
   User bob
   IdentityFile ~/.ssh/id_rsa
{{</source-code>}}

Description of the fields used in the above config file:

- Host — the nickname for the host.
- HostName — the IP address or domain of the remote server.
- User — the username associated with the account in the server.
- IdentityFile — the location of your SSH key to be used for login to this host.


If you prefer to use a different private key for each host, then you could setup your config file as shown below:

{{<source-code>}}
$ cat ~/.ssh/config
	
Host host1
   HostName host1.example.com
   User bob
   IdentityFile ~/.ssh/id_rsa_host1

Host host2
   HostName host2.example.com
   User bob
   IdentityFile ~/.ssh/id_rsa_host2

Host host3
   HostName host3.example.com
   User bob
   IdentityFile ~/.ssh/id_rsa_host3
{{</source-code>}}

Here after you could SSH into any host with a simple command like:

{{<source-code>}}
$ ssh [host-nickname] {{</source-code>}}

For example, to login to host1:

{{<source-code>}}
$ ssh host1 {{</source-code>}}


## Step 4:  Disable password based authentication, if required.

Now that you have set up your SSH keys for login, it is the right time to completely disable password based login in your SSH server.  

>**Note:** Make sure that all other users of the server also have setup SSH public key based login successfully, before you turn-off the password based SSH login.  Because once you disable password based authentication, any user still using password for SSH login wouldn't be able to do so after this.

Edit the `/etc/ssh/sshd_config` file in the server using any editor of your choice, say nano or vim.  Change the setting named `PasswordAuthentication:` to `no` as shown below.

{{<source-code>}}
$ nano /etc/ssh/sshd_config
…
PasswordAuthentication: no
…
{{</source-code>}}

If you see any '#' at the beginning of the line, make sure you delete it.  # is used to comment out a configuration.  You need to uncomment it to make the configuration effective. Save the change and restart the SSH server daemon using the following command as sudo user:

{{<source-code>}} $ sudo systemctl restart sshd {{</source-code>}}

Verify sshd server is up and running.

{{<source-code>}} $ sudo systemctl status sshd {{</source-code>}}

## Problems at Scale:

Now that you have set up one user for SSH public key based authentication, you as an admin of your organization, should repeat the same procedure to set up SSH public key based authentication for the remaining users.

If you have more than one server in your organization(which would most likely be the case), then you need to copy each user's SSH public key to the `authorized_keys` file in all the servers.  This becomes a M * N problem set.

{{<image-format src="/assets/img/tighten-ssh-access-using-ssh-certificates/setup-ssh-public-keys.jpg" alt="SSH public key setup" >}}

It is not possible to do this task manually with a scaled infrastructure. Some sort of a software or automation tool is required to complete the task.

It is highly recommended that a user doesn't reuse the same SSH public key to login to all SSH servers.  If an unwanted user were to get hold of the private key, the potential attack surface becomes large.

There are some  additional problems & operational challenges associated with using SSH public key based authentication.  We discuss this in detail in our next article here: [**Tightening SSH access using short-lived SSH certificates**
](https://www.bastionxp.com/blog/tightening-ssh-access-using-short-lived-ssh-certificates/)

### SocketXP SSH Public Key Management Tool: 
SSH password based authentication is vulnerable to attacks and generally not recommended for production usecases.  SSH Public Private key based authentication is a secure and recommended method for production usecases.

[SocketXP remote device management platform](/) provides an [SSH remote access solution](/remote-access-linux-server) that has a built-in SSH public key management tool.

By default, SocketXP Web Portal or Dashboard will create and sync a very short-lived single-use SSH public key to your Ubuntu Linux machine, so that you can securely remote login to your Ubuntu Linux from anywhere in the world, without having to use password based authentication. The key will be cleaned up or trashed immediately after the user logs in.  

You should remember that a user can SSH into your Ubuntu Linux machine from the SocketXP web portal, only after a successful SSO login (and 2FA authentication) provided by your SSO OAuth provider such: Microsoft 365 or Google G-Suite.

SocketXP's built-in SSH public key management tool, that automates SSH public key management or syncing it between your Ubuntu Linux system and the SSH web client, even cleans up the key immediately after the user logs in, so that a new public key setup is required for the next login attempt by the same user.

For better security, you can even disable password based authentication completely on your Ubuntu Linux SSH server.  But, if you prefer to use password based authentication, then select the "Password authentication" option during the login prompt in the web portal.  The default option is "SSH Public Key Authentication."

## Got any questions?
If you have any questions about SocketXP SSH Remote Access and SSH Public Key Management Solution, please write to us at: support@socketxp.com

