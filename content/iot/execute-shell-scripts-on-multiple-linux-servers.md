---
title: How to Execute Shell Scripts on Multiple Linux Servers
slug: execute-shell-scripts-on-multiple-remote-linux-servers
description: "Learn how to execute shell commands or scripts on multiple Linux servers over SSH using SocketXP IoT Remote Access solution."
author: Ganesh Velrajan
tags: [
    Remote Access, Remote Device, Device Management, Raspberry Pi, IoT
]
date: 2021-08-09
lastmod: 2024-10-15
categories: [
    IoT
]
images: ["/assets/img/execute-remote-commands-multiple-linux-server.jpg"]
aliases: ["how-to-execute-shell-commands-or-scripts-on-multiple-remote-linux-servers-over-ssh"]
---

When you have hundreds or thousands of linux servers or embedded Linux devices deployed in the field, it becomes very hard, challenging and time consuming to manually remote SSH login to each one of those Linux servers to run the same set of shell commands to re-configure, update software, or execute a script.

SocketXP OTA (Over The Air) or Remote Job Automation feature automates and simplifies the execution of shell commands or scripts on multiple Linux servers over SSH. 

SocketXP OTA or Remote Job Automation feature eliminates the need to manually SSH login to multiple remote Linux devices to execute shell commands to perform (device software management) tasks such as re-configuring, updating software, debugging or simply running a shell script. 

SocketXP is absolutely free to try for all users.
## What is a Remote Job
A Remote Job is nothing but a Linux shell command or a shell script that needs to be scheduled to run on single or multiple Linux servers or IoT devices.

## Usecases:
In this section, we’ll discuss how to create and deploy SocketXP Remote Jobs (OTA updates) to execute shell commands or scripts on multiple remote linux servers for the following usecases:

- Execute a shell command or a shell script in multiple Linux servers
- Execute a Python program or any program or application in multiple IoT devices
- Update configuration file in multiple Linux devices
- Update the application software running in multiple Linux devices
- Update software packages or tools (such as Java, Python, NodeJS, NPM) installed in a group of IoT devices.

## Pre-Requisites
You need to install the SocketXP remote SSH agent on your Linux servers or IoT devices to securely remote access them from anywhere in the world. 

Follow the instructions to setup [remote SSH access for your IoT or Linux server over the internet](https://www.socketxp.com/iot/remote-access-iot-ssh-over-the-internet/). 

It takes less than a minute to [install and setup SocketXP agent](/download) on your devices using the instructions.

## Remote Jobs or OTA Deployment Types
Remote Jobs or OTA deployments can be classified into two broad categories:
1. Script File Deployment
2. Config File Deployment

In the following sections, we’ll demonstrate how to perform various device software management tasks using these two OTA deployment types.

## 1. Script File Deployment
When you want to run a single shell command or a set of shell commands or a shell script or a python program on multiple Linux based IoT devices(or Linux servers), you could use `Script File Deployment` to automate the task. 

Script File Deployment uploads the shell script or the python program from your local machine to a specific directory path in your remote IoT devices.  

It then executes the script execution command you specify to run the script or python program. 

Script File Deployment also collects the log (outputs and errors) from each one of the IoT devices in the group and presents it to you in the OTA dashboard.

Here are the two IoT Devices we’ll use for this demo:

{{<image-format src="/assets/img/ota-update/iot-devices-summary.png" alt="List of IoT Devices" >}}

### Step #1:
Go to the [Remote Job Automation page in the portal](https://portal.socketxp.com/#/ota). Click the `Create a Deployment` button to create a new deployment.

{{<image-format src="/assets/img/ota-update/ota-deployment-summary.png" alt="Remote Job Automation deployment Summary" >}}


### Step #2:
Click the `Script File Deployment` button to create a config file deployment.

{{<image-format src="/assets/img/ota-update/ota-deployment-type-selection.png" alt="Remote Job Automation  deployment type selection form" >}}


### Step #3:
Fill in the Script File Deployment form. Provide a deployment name that describes about the deployment task. Choose a script file to upload from your local machine to your IoT devices. 

Also specify a destination filepath in the IoT device where the script file needs to be uploaded. 

Finally, specify the Device Group to apply the deployment.

**Note:**
A deployment can be applied only to a specific device group. If you want to deploy the script file on all IoT devices that you manage, then create additional Script File Deployments for each one of the device groups.

{{<image-format src="/assets/img/ota-update/ota-script-deployment-form.png" alt="Remote Job Automation script file deployment form" >}}

Now submit the deployment by clicking the `CREATE DEPLOYMENT` button in the bottom right corner.

### Step #4:
Track the status of the deployment from the OTA deployment summary page. Click the deployment to view more details about the set of IoT devices in which the deployment is being run.

{{<image-format src="/assets/img/ota-update/ota-deployment-summary-script.png" alt="Remote Job Automation script deployment summary" >}}

### Sample Script Files For Various Use Cases
**Usecase #1: To Update SocketXP Agent on your Linux Servers or IoT devices:**
{{<source-code>}}
#!/bin/sh 
curl -O https://portal.socketxp.com/download/arm/socketxp && 
chmod +wx socketxp && 
sudo mv socketxp /usr/local/bin 
systemctl restart socketxp
{{</source-code>}}
You could use the sample script above to update your IoT application too. All you need to do is upload your IoT application to AWS S3 or DropBox or Google Drive. Make the artifact publicly accessible. Obtain the public URL to access your artifact from your cloud storage provider. Update the CURL command above with the appropriate public URL.

**Usecase #2: To Install Python packages:**
{{<source-code>}}
#!/bin/sh 
pip3 install psutil
pip3 install flask

{{</source-code>}}

**Usecase #3: To Update a config file and restart an app**
{{<source-code>}}
#!/bin/sh 
echo 'MOTOR_SPEED=300 
LED_DISPLAY=true 
TEST_RUN=yes 
LOG_FILE="/var/log/mylogfile.log" 
DEBUG_LEVEL=2' > /var/lib/myapp/app.config 
systemctl restart myapp
{{</source-code>}}

**Usecase #4: To Run a Python script/program**
You could even run a python program on your IoT devices using the Script File Deployment. Upload a python program instead of a script file and specify the script execution command as python /home/john/get_system_info.py
For example, the following Python script could be used to retrieve system information such as CPU, Memory, and Disk Size.
{{<source-code>}}
# Name: get_system_info.py 
import psutil
import datetime
### *** CPU FUNCTIONS ***
# Number of logical CPUs in the system
print ("psutil.cpu_count() = {0}".format(psutil.cpu_count()))
### *** DISK FUNCTIONS ***
# List of named tuples containing all mounted disk partitions
dparts = psutil.disk_partitions()
print("psutil.disk_partitions() = {0}".format(dparts))
# Disk usage statistics
du = psutil.disk_usage('/')
print("psutil.disk_usage('/') = {0}".format(du))
### *** MEMORY FUNCTIONS ***
# System memory usage statistics
mem = psutil.virtual_memory()
print("psutil.virtual_memory() = {0}".format(mem))
THRESHOLD = 100 * 1024 * 1024  # 100MB
if mem.available <= THRESHOLD:
    print("warning, available memory below threshold")
{{</source-code>}}    
Need help? Please write to us at support@socketxp.com if you need any assistance with creating a script or python program for your special use-case.

### REST APIs
SocketXP also provides you with REST APIs to write your own tool or application around this OTA feature. You can find the REST API documentation here.

## 2. Config File Deployment
When you want to update a configuration file in a group of IoT devices, you could use the Config File Deployment to automate the task. 

Config File Deployment simply uploads a new config file from your local machine to a specific directory path in your remote IoT devices.

Here are the two IoT Devices we’ll use for this demo:

{{<image-format src="/assets/img/ota-update/iot-devices-summary.png" alt="List of IoT Devices" >}}

### Step #1:
Go to the [Remote Job Automation page in the portal](https://portal.socketxp.com/#/ota).  Click the `Create a Deployment` button to create a new deployment.

{{<image-format src="/assets/img/ota-update/ota-deployment-summary.png" alt="Remote Job Automation deployment Summary" >}}

### Step #2:
Click the `Config File Deployment` button to create a config file deployment.

{{<image-format src="/assets/img/ota-update/ota-deployment-type-selection.png" alt="Remote Job Automation deployment type selection form" >}}

### Step #3:
Fill in the Config File Deployment form. Provide a deployment name that describes about the deployment task. Choose a new config file to upload from your local machine to your IoT devices. Also specify a destination filepath in the IoT device where the config file needs to be uploaded. Finally, specify the Device Group to apply the deployment.

**Note:**
A deployment can be applied only to a specific device group. If you want to deploy the config file on all IoT devices that you manage, then create additional Config File Deployments for each one of the device groups.

{{<image-format src="/assets/img/ota-update/ota-config-deployment-form.png" alt="Remote Job Automation config file deployment form" >}}

Now submit the deployment by clicking the `CREATE DEPLOYMENT` button in the bottom right corner.
### Step #4:
Track the status of the deployment from the OTA deployment summary page

{{<image-format src="/assets/img/ota-update/ota-deployment-summary-config.png" alt="Remote Job Automation config deployment summary" >}}

### Step #5:
Click the deployment to see more details about the IoT devices in which the config file is being deployed.

{{<image-format src="/assets/img/ota-update/ota-config-deployment-details.png" alt="Remote Job Automation config deployment summary" >}}

You can click the “VIEW LOG” button to see the output log and error log. For Config File Deployments, which involve a simple file copy, logs will be mostly empty.

If you wish, but not required, you could SSH into your devices to confirm the deployment is successful.

{{<source-code>}}temp-sensor-1$ ls /var/lib/myapp/ config.json{{</source-code>}}

## Conclusion:
SocketXP OTA or Remote Command Execution feature is an extremely useful tool in your devops arsenal when you have to run a shell command or script (a.k.a Remote Jobs) on multiple Linux servers.  

By following the steps outlined in this article, you can easily enable SSH, install SocketXP [Linux server Remote Access](/remote-access-linux-server) agent on your Linux server, and execute command remotely on them.

Managing multiple remote Linux machines or IoT devices is a breeze when you use [SocketXP Device Management and Remote Job Automation](/) platform.
