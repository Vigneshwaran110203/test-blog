---
title: How to configure and setup SSH certificates for SSH authentication
slug: configure-setup-ssh-certificates-for-ssh-authentication
description: "We'll be creating two SSH Certificate Authorities(CA) - a host CA and a user CA, to sign the SSH host certificates and user certificates respectively. (Note: You can create just a single CA to sign both user and host certificates. But it is better to keep them separate, so that you could rotate them separately when the situation warrants.) We'll show how to configure the host and user machines to trust certificates issued by these host and user CAs."
author: Ganesh Velrajan
tags: [
    SSH Bastion Host, SSH Public Private Keys, SSH certificates, SSH certificate management, SSH key management, SSH CA
]
date: 2022-02-12
lastmod: 2024-10-14
categories: [
    blog
]
images: ["/assets/img/tighten-ssh-access-using-ssh-certificates/setup-ssh-certificates.jpg"]
aliases: ["how-to-configure-and-setup-ssh-certificates-for-ssh-authentication"]
---

SSH public key based authentication has several drawbacks and operational challenges that could potentially compromise your organization's SSH access security. We discussed the drawbacks in detail in our earlier blog on: [Tightening SSH access using short-lived SSH certificates](https://www.bastionxp.com/blog/tightening-ssh-access-using-short-lived-ssh-certificates/).  

SSH certificate based authentication addresses most of these security problems while simplifying certificate and key management. 

In this article, we'll discuss how to configure and set up SSH certificates for SSH access to your servers and cloud resources.

## Overview:
Here is an overview of what we are about to discuss in this article.

- We'll be creating two SSH Certificate Authorities(CA) - a host CA and a user CA, to sign the SSH host certificates and user certificates respectively. (Note: You can create just a single CA to sign both user and host certificates. But it is better to keep them separate, so that you could rotate them separately when the situation warrants.) 

- We'll show how to configure the host and user machines to trust certificates issued by these host and user CAs.

- We'll be creating an SSH host certificate for each host and sign it using the host CA's private key.

- We'll be creating an SSH user certificate for each user and sign it using the user CA's private key.

- Finally, we'll discuss the benefits and drawbacks of using SSH certificate based authentication.


## Step 1 - Creating CA certificates
Before we could create the CA certificates, we needed an SSH key pair to work with.  We'll be using the `ssh-keygen` tool to generate an SSH key pair, as usual.  We'll be executing the following set of commands on the server designated to be the CA.

**User CA SSH key pair:**

{{<source-code>}}
# ssh-keygen -t rsa -b 4096 -f ~/.ssh/ssh_user_ca

Generating public/private rsa key pair.
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /root/.ssh/ssh_user_ca
Your public key has been saved in /root/.ssh/ssh_user_ca.pub
The key fingerprint is:
SHA256:ShpCF11/fYjujAVDYivNKpNM6QdVwh8Z9sX00PIspdo 
The key's randomart image is:
+---[RSA 4096]----+
|    .oooBo.o+.   |
|     +o*o* .o=o. |
|  . = ..+.= o*+ .|
| . = o o.  =o o. |
|  . B + S  oo.   |
|   . B .  .=Z    |
|    . .   . o    |
|                 |
|                 |
+----[SHA256]-----+
{{</source-code>}}

**Host CA SSH key pair:**

{{<source-code>}}

# ssh-keygen -t rsa -b 4096 -f ~/.ssh/ssh_host_ca
Generating public/private rsa key pair.
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /root/.ssh/ssh_host_ca
Your public key has been saved in /root/.ssh/ssh_host_ca.pub
The key fingerprint is:
SHA256:ShpCF11/fYjujAVDYivNKpNM6QdVwh8Z9sX00PIadsfj 
The key's randomart image is:
+---[RSA 4096]----+
|    .oooBo.o+.   |
|     +o*o* .o=o. |
|  . = ..+.= o*+ .|
| . = o o.  =o o. |
|  . B + S  oo.   |
|   . B .  .=F    |
|    . .   . o    |
|                 |
|                 |
+----[SHA256]-----+
{{</source-code>}}

We are requesting an RSA type key using the -t flag and the key length to be 4096 bits using the -b flag.  The longer the key, the harder it is to crack.

It is highly recommended to provide a passphrase for the private key.  If an unauthorized user gets hold of the private key with no passphrase, they will be able to log in to any server you've configured with the associated public key.

The above command would have generated an SSH pair - public key and a private key, in the default `.ssh` folder in your home directory. For example: `/home/bob/.ssh/`

### Step 1a - Signing the CA's Host Certificate
Now, using the following command, let's create the host CA's certificate using the host public key and sign it using the corresponding host private key generated in the previous step.

{{<source-code>}}
# ssh-keygen -s ~/.ssh/ssh_host_ca -I my-ca -h -n my-ca.example.com -V +52w ~/.ssh/ssh_host_ca.pub  
{{</source-code>}}

The -s specifies the host private key to be used for signing the certificate.  The -h option is used for generating a host type certificate.  

The -n option above sets the FQDN (Fully Qualified Domain Name) of the host as the principals in the certificate.  

The -V option sets the validity period of the certificate.  

In the example above, the certificate will be valid from today and expires one year (52 weeks) from now.

You can verify the details of the certificate using the following command:

{{<source-code>}}
# ssh-keygen -Lf ~/.ssh/ssh_host_ca-cert.pub
/root/.ssh/ssh_host_ca-cert.pub:
        Type: ssh-rsa host certificate
        Public key: RSA-CERT SHA256:7sCdBjn0...
        Signing CA: RSA SHA256:7sCdBjn0... (using rsa-sha2-512)
        Key ID: "my-ca"
        Serial: 0
        Valid: from 2022-02-12T10:09:00 to 2023-02-11T10:10:29
        Principals: 
                my-ca.example.com
        Critical Options: (none)
        Extensions: (none)
{{</source-code>}}

Copy the CA's host certificate to the `/etc/ssh/` folder in the CA server.

### Step 1b - Signing the CA's User Certificate

Now, let's create and sign the user CA certificate using the user CA public private keys.

{{<source-code>}}
# ssh-keygen -s ~/.ssh/ssh_user_ca -I root@example.com  -n root -V +52w ~/.ssh/ssh_user_ca.pub
{{</source-code>}}

Again the user CA's certificate will be valid for one year (52 weeks) from now.

## Step 2 - Distributing and trusting the CA certificates

We need to copy the user CA certificate to all the hosts in the organization.  This is to make the hosts trust the user certificate's signing authority.

Similarly we need to copy the host CA certificate to all the user's machines.  This is to make the ssh clients in the user's machine trust the host certificate's signing authority.

### Step 2a - Making hosts to trust user CA certificate

{{<source-code>}}
# scp ~/.ssh/ssh_user_ca-cert.pub  root@host1.example.com:/etc/ssh/
{{</source-code>}}

Next edit the SSH server config file at /etc/ssh/sshd_config and make the `TrustedUserCAKeys` directive to point to the user CA certificate we just copied over.

{{<source-code>}}
TrustedUserCAKeys /etc/ssh/ssh_user_ca-cert.pub
{{</source-code>}}

Restart the host to make the config change to take effect.

{{<source-code>}}
# systemctl restart sshd
{{</source-code>}}

### Step 2b - Making clients to trust the host CA certificate
For this, you need to copy the contents of the host CA certificate and append it to the `/etc/ssh/ssh_known_hosts` file using the `@cert-authority` directive as shown below.

{{<source-code>}}
# cat /etc/ssh/ssh_host_ca-cert.pub
ssh-rsa AAAAHHNzaC1yc2EtY2....  root@example.com
{{</source-code>}}

Now copy this content to the SSH global config file `ssh_known_hosts` in all the user systems.

{{<source-code>}}
# vi /etc/ssh/ssh_known_hosts
@cert-authority *.example.com ssh-rsa AAAAHHNzaC1yc2EtY2....  root@example.com
{{</source-code>}}

The `*.example.com` wildcard entry above instructs the user systems to trust the host certificates received from any hosts in the `example.com` domain, signed by the host CA.

Now that we have the host and user CA certificates in place, we are ready to issue SSH certificates to hosts and user machines using them. Let's see how to issue the host certificate first.

## Step 3 - Creating SSH Host Certificates

To create the host certificate, we needed an SSH key pair to work with.  Let's create one as usual using the `ssh-keygen` command.  Login to the host machine that needs the certificate and execute the below command.

{{<source-code>}}
# ssh-keygen -t rsa -b 4096 -f ~/.ssh/ssh_host
{{</source-code>}}

The above command will generate a public key (ssh_host.pub) and a private key (ssh_host) in the `.ssh` folder in the home directory (/root/.ssh/).

You should retain the private key safely within the host system.  You should never copy or transfer the file to any other location. 

We'll copy just the host public key the CA server using the `scp` command as shown below:

{{<source-code>}}
# scp /root/.ssh/ssh_host.pub root@my-ca:/root/tmp/
{{</source-code>}}

Next, create the host certificate from the host public key and sign the certificate using the host CA's private key.

{{<source-code>}}
# ssh-keygen -s ~/.ssh/ssh_host_ca -I host1@example.com -h -n host1.example.com -V +52w /root/tmp/ssh_host.pub
{{</source-code>}}

Once signed, copy the host SSH certificate (ssh_host-cert.pub) to the host machine using the `scp` command.  It is safe to copy SSH certificates around because they are public objects and can be shared with anyone.

{{<source-code>}}
# scp /root/tmp/ssh_host-cert.pub  root@host1.example.com:/etc/ssh/
{{</source-code>}}

Now configure the host to use the signed host certificate for any connections coming from the SSH clients.  Edit the `/etc/ssh/sshd_config` file and set the `HostCertificate` directive to point to the host certificate as shown below:

{{<source-code>}}
# vim /etc/ssh/ssh_config
…
HostCertificate  /etc/ssh/ssh_host-cert.pub
…
{{</source-code>}}

Finally, restart the SSH server for the configuration changes to take effect.

{{<source-code>}}
# systemctl restart sshd
{{</source-code>}}

## Step 4 - Creating SSH User Certificates
First, let's create an SSH key pair for the user certificate as usual.

{{<source-code>}}
# ssh-keygen -t rsa -b 4096 -f ~/.ssh/ssh_user
{{</source-code>}}

Next, we should copy the user public key to the CA server for signing it.

{{<source-code>}}
# scp ~/.ssh/ssh_user.pub  /root/tmp/.
{{</source-code>}}

Login to the CA server and sign the user certificate using the user CA's private key as shown below:

{{<source-code>}}
# ssh-keygen -s ~/.ssh/ssh_user_ca -I bob@example.com  -n root -V +4w /root/tmp/ssh_user.pub
{{</source-code>}}

Secure copy the signed user certificate back to the user machine.

{{<source-code>}}
# scp /root/tmp/ssh_user-cert.pub bob@user1.example.com:~/.ssh/.
{{</source-code>}}

Next edit the ssh client config file `/etc/ssh/ssh_config`(global config file) or `~/.ssh/config` file (local config file) in the user's home directory and add the following line to it, so that SSH client will be able to automatically pick up the user's private key file and the certificate during authentication.

{{<source-code>}}
IdentityFile ~/.ssh/ssh_user
{{</source-code>}}

Note that the `IdentityFile` directive is made to point to the user's private key and not the public key or the certificate.

Try login to the host machine from the user machine to verify that everything is set properly and working just fine

{{<source-code>}}
$ ssh bob@host1.example.com
{{</source-code>}}

Delete any existing public key for this host from the `~/.ssh/known_hosts` file in the user machine, if required, to prevent the SSH client from complaining about the host key has changed. 

The host public key in the `~/.ssh/known_hosts` file is irrelevant for SSH certificate based authentication because it uses the host CA certificate to validate the signature in the host certificate.

## Benefits of using SSH certificate based authentication:

- SSH certificates have a validity period, so user and host certificates expire eventually sometime in the future.

- User certificates need not be copied to all the host machines.
- Short-lived SSH certificates can be issued to users to access privileged resources.

- No more weird messages (about recognizing and accepting the host key fingerprint) shown by the SSH client when login to the host machines for the first time.

- When a security compromise is detected, invalidate the old CA, create a new CA and issue new certificates to hosts and users. This is called as certificate rotation.

## Drawbacks of using SSH certificate based authentication:

- Certificates need to be rotated periodically with proper planning and resource allocation
- Short-lived user certificates are great for privileged access to production resources. However, issuing user certificates more frequently and copying them to the user machines is still a laborious process.

[BastionXP Bastion Host solution](https://www.bastionxp.com) with built-in CA, automates and simplifies the certificate creation, signing and distribution process. It also automates the ability to rotate certificates when situation warrants. SocketXP Bastion Host CA also issues short-lived user certificates to end users to access cloud resources or on-prem servers. Moreover, the solution works seamlessly with OpenSSH server and clients.

So when a privileged user leaves an origanization, you don't need to clean up the public keys or certificates in your host machines becuase we don't copy them to the host machines in the first place under the SSH certificate based authentication method. 

Moreover, the privileged user's short-lived certificates would have expired by the time he/she leaves the office on the last day of work.

Learn more about the BastionXP here: [https://www.bastionxp.com](https://www.bastionxp.com)
