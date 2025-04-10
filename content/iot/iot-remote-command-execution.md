---
title: How to Remotely Execute Shell Commands or Scripts on your IoT device
slug: remote-command-script-execution-iot
description: "Learn how to execute shell commands or scripts remotely on your IoT using SocketXP IoT Remote Access solution."
author: Ganesh Velrajan
tags: [
    Remote Access, Remote Device, Device Management, Raspberry Pi, IoT, Remote Command Execution, Remote Script Execution, Python Scripts
]
date: 2023-04-15
lastmod: 2024-10-16
categories: [
    IoT
]
images: ["/assets/img/execute-remote-commands-multiple-linux-server.jpg"]
aliases: ["remote-command-script-execution-raspberry-pi"]
---

Are you looking for a way to control your IoT projects from anywhere in the world? 

Want to break free from the limitations of physical proximity and execute commands remotely with ease? Remote command execution is the ultimate solution! 

It's a game-changer for IoT enthusiasts and professionals alike, offering unparalleled convenience and flexibility. Picture being able to execute commands on your IoT from the comfort of your  home, office or even while on the go. 

In this article, we'll explore the exciting world of remote command execution on IoT, delving into a simple method that don't require you to login to your IoT via SSH. 

Yes. You heard that right. You don't need to [remote SSH into your IoT](/iot/remote-access-iot-ssh-over-the-internet)!

You could simply use the remote command execution feature of the [SocketXP IoT Remote Access solution](/iot-remote-access) to send commands to your IoT over the internet.

Get ready to unlock the full potential of your IoT projects and experience a new level of control and accessibility!

## How to send commands to IoT over the internet

In this section, we'll discuss how to configure and setup IoT so that you could send commands remotely to IoT over the internet using simple APIs.

1. We’ll install a simple, secure and lightweight SocketXP agent to run in your IoT or IoT device. 

2. The agent would connect your IoT privately and securely using an SSL/TLS tunnel to our SocketXP Cloud Gateway. 

3. You could then access the APIs provided by the cloud gateway using a secure authentication token created exclusively for you. 

4. You could then simply send commands or scripts to execute in your remotely located IoT via our APIs.

Let’s get started.

### Step #1: Install and Setup SocketXP Agent
Follow the instructions here to [download, install and setup SocketXP agent](https://www.socketxp.com/download) on your IoT.

**Note:** You don’t have to run an SSH server (port 22) to run this agent. You could even point the agent to connect to some local unused port such as 52233.

### Step #2: Send a Remote Command
In SocketXP parlance, remote commands are called as Remote Jobs or Deployments.

We will use the `curl` utility to submit a job. Alternatively, you could use the `Postman` tool to perform the same request.

Before submitting a remote command or job, you need to define a workflow first. 

Use the workflow to submit a deployment/job to run in a specific device (DeviceId) or a group of devices.

The idea behind separating workflow and deployment is reusability and repeatability.

{{<source-code>}}
curl https://api.socketxp.com/v1/workflow \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [your-auth-token-goes-here]" \
  -d '{“Name”: "print-date-workflow”, “Command": "date"}'

{{</source-code>}}

The response to this POST API call, on success (200 OK), would look something like this.

{{<source-code>}}
{"WorkflowId": "678edc16-96d1-4ea2-a99c-0474c2449381"}
{{</source-code>}}

Next, we could deploy this workflow to a device or a group of devices or a device tag as shown below.

### Device
Submit a deployment/job to a device using the `DeviceId` option.

{{<source-code>}}
curl https://api.socketxp.com/v1/job \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [your-auth-token-goes-here]" \
  -d '{“Name”: “test-job-123”, “DeviceId”: "sensor-dev12345”, "WorkflowId": "678edc16-96d1-4ea2-a99c-0474c2449381" }'
{{</source-code>}}

### Device Group
Submit a deployment/job to a group of devices using the `DeviceGroup` option.
{{<source-code>}}
curl https://api.socketxp.com/v1/job \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [your-auth-token-goes-here]" \
  -d '{“Name”: “test-job-123”, “DeviceGroup”: "temp-sensor”, "WorkflowId": "678edc16-96d1-4ea2-a99c-0474c2449381" }'
{{</source-code>}}
 
### Device Tag

Use the TagId option to submit a deployment/job to a group of devices with a given tag.
{{<source-code>}}

curl https://api.socketxp.com/v1/job \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [your-auth-token-goes-here]" \
  -d '{“Name”: “test-job-123”, “TagId”: "temp-sensor”, "WorkflowId": "678edc16-96d1-4ea2-a99c-0474c2449381" }'
{{</source-code>}}

Here is the sample response from submiting a job.

{{<source-code>}}
{"JobId": "4cad67dd-ab67-42ee-a293-4db493cab9ea"}
{{</source-code>}}

 
Now you could retrieve the status or the result of the job (remote command) using the above JobId, as shown below.

{{<source-code>}}
curl https://api.socketxp.com/v1/job/4cad67dd-ab67-42ee-a293-4db493cab9ea \
  -X GET \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [your-auth-token-goes-here]" 

{{</source-code>}}

And the response to the curl request would look like this:

{{<source-code>}}
{
	“JobId”: “4cad67dd-ab67-42ee-a293-4db493cab9ea”,
	“JobName”: “test-job-123”,
	“DeviceId”: “sensor-dev12345”,
	“Command”: “date”,
	“StartTime”: “Feb 8, 2002, 15:04:13 PST”,
	“EndTime”: “Feb 8, 2002, 15:04:14 PST”,
	“Result”: “Fri Feb 8 15:04:14 UTC 2002”
}
{{</source-code>}}

The result field will have the result (Std output and Std errors) of the remote command executed on your IoT.

### Sample Commands

Here are some sample commands you could execute remotely on your IoT using SocketXP REST API's.

- “sh /home/john/script.sh”
- “python /home/john/check_temperature.py”
- "reboot"
- "systemctl restart sshd"
- "echo 'This is the content of the new config file.' > /home/test-user/config"

Refer to our documentation for the complete set of SocketXP API's to submit and execute remote commands or scripts to run in your IoT.

### Advantanges of Remote Command Execution on IoT:
The following are the advantages of using SocketXP REST APIs to send commands to IoT remotely over the internet:
- secure access to your devices via REST API (using access token and HTTPS/TLS connection) to the API Gateway
- ability to automate the API’s using a python or shell script or your own dashboard web application.
- execute remote commands without having to manually login to the SSH server.
- ability to execute the same command or script on a fleet of IoT and fetch the results from all.

## Conclusion:

In conclusion, remote command execution is a must have feature in any [IoT Management Platform](iot-remote-management-platform-ultimate-guide/) for automating repeated tasks that need to be performed on a remote IoT.  

SocketXP's [IoT Remote Access](/iot-remote-access) solution offers a powerful and convenient way to remotely manage and control IoT devices. With its user-friendly interface, advanced features, and unparalleled flexibility, this innovative solution is a must-have tool for IoT enthusiasts. 

Whether you're a hobbyist, a professional, or a IoT administrator, SocketXP's solution can revolutionize your IoT remote command execution experience, making it easier and more efficient than ever before. 

Take advantage of this cutting-edge solution and unlock the full potential of your IoT devices. Try [SocketXP IoT Remote Access solution](/iot-remote-access) today and discover the convenience and versatility it can bring to your IoT projects.

