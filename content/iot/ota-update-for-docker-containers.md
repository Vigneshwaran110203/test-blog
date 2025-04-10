---
title: Update Docker Containers in your IoT using SocketXP OTA Update
slug: update-iot-docker-containers-using-socketxp-ota-update
description: "Effortlessly update Docker or Linux containers in your IoT devices remotely with SocketXP OTA update. Learn how to streamline your IoT device software updates and ensure seamless deployments."
author: Ganesh Velrajan
tags: [
    Remote Access, Remote Device, IoT Device Management, Raspberry Pi, Nvidia Jetson, IoT, IoT OTA Update Platform, IoT Device Management Platform, IoT Device Management Cloud Platform, SocketXP OTA update, Docker Container Update, Linux container update, Remote Software Update,
]
date: 2025-03-04
lastmod: 2025-03-04
categories: [
    IoT
]
images: ["/assets/img/ota-update/container/socketxp-iot-ota-update-docker-containers.jpg"]
aliases: []
---

In this article, we will show you how to build and update an IoT application as a Docker container on a fleet of IoT devices using [SocketXP's Over-the-Air(OTA) update](/iot-ota-update) feature.

SocketXP is an [IoT device management platform](/socketxp-iot-device-management-platform) that can be used to remotely manage, monitor, access, update and control IoT or any embedded Linux devices at massive scale.

[SocketXP's OTA update](/iot-ota-update) feature is extremely useful when you have to deploy software update on a fleet of IoT devices in your customer's network behind a NAT router or Firewall or out in the field connected via a cellular network.

The OTA update feature can be used to update the following types of artifacts:

  - [Firmware](/iot/update-iot-firmware-using-socketxp-ota-update)
  - [Software packages (Debian, RPM)](/iot/update-iot-debian-packages-using-socketxp-ota-update)
  - [Application binaries](/iot/update-iot-app-using-socketxp-ota-update)
  - Docker containers
  - Program files
  - Config files
  - Execute a script or command

on multiple remote devices.

## Creating and Deploying OTA Updates
Creating and deploying Docker container OTA updates using the tool is a two step process:
1.	Create and upload an artifact workflow script to the SocketXP Artifact Registry
2.	Deploy the artifact workflow script on a group of devices

The basic concept behind this two-step approach is to reuse the uploaded artifact to deploy OTA updates on  different group of devices.

The workflow script will download Docker container images from a third-party container registry and update the Docker containers running in the target IoT devices.

### Simple IoT App Example:
We will be using a simple C program to demonstrate SocketXP's OTA update capabilities.  We will build a Docker container using the compiled C program binary.

**Note**: We are using a C program for our example but the IoT app can be created using any programming language or script.  Eg: Java, C++, Golang, Python, Javascript, C# etc.

The app will print `“Hello, OTA update!”` every 10 minutes.

We also assume that the app is running as a Linux systemd service in the IoT devices.

{{<source-code>}}
/*
 * To build: gcc myapp.c -o myapp
 * To run: ./myapp
 * Output: "Hello, OTA update!"
 */

#include &lt;stdio.h&gt;
#include &lt;unistd.h&gt; 

int main() {
    while (1) {
        printf("Hello, OTA update!\n");
        fflush(stdout); // Ensure immediate output
        sleep(600); // in seconds
    }
    return 0;
}
{{</source-code>}}

The above C program, the build script and the Dockerfile we will use for this demo can be downloaded from our [official git repository here](https://github.com/ampaslabs/ota-update-build-artifacts):

### Build the App Binary
First, let’s clone the git repository using the link provided above:

{{<source-code>}}
$ git clone https://github.com/ampaslabs/ota-update-build-artifacts
{{</source-code>}}


For this exercise, we will use the example in the `container` folder.  So let’s get into the `container` folder.

``` sh
 ~/$ cd ota-update-build-artifacts/container
```
Let's look into the contents of the `container` folder.

```sh
~/ota-update-build-artifacts/container$ ls 
myapp  update.sh
```
```sh
~/ota-update-build-artifacts/container$ ls myapp/
Dockerfile  makefile  myapp.c
```

The `container` folder contains the following three items: 

1.	A `myapp` folder containing our `app` code written in the the C language and a `makefile` to compile the app and build the app binary.  The `myapp` folder also includes a Dockerfile that has the necessary instructions to build a Docker container.  The `makefile` will eventually build a Docker container image using the Dockerfile and push the image to the `DockerHub Registry` using the login credentials provided by the user.

2.	An `update.sh` shell script – the workflow script that runs in the target devices and updates the myapp Docker container.

3.	No `make_artifact.sh` shell script exists for this example because we'll not build a `tar.gz` style artifact using the Docker image. The docker images are uploaded to a thirdy-party container registry (Eg: `DockerHub`). We will just upload the `update.sh` workflow script to the SocketXP Artifact Registry as a "script" type artifact and deploy container OTA updates using the workflow script.  
 
**Create a New Version of the App:**

Let’s get into the myapp directory and start building our app.

Before we do that, we will edit the `myapp.c` file and make it to print `"Hello, OTA update! Version 1.0.0"`.  Let's call it as the version 1.0.0 of the app.

{{<source-code>}}
/*
 * To build: gcc myapp.c -o myapp
 * To run: ./myapp
 * Output: "Hello, OTA update!"
 */

#include &lt;stdio.h&gt;
#include &lt;unistd.h&gt; 

int main() {
    while (1) {
        printf("Hello, OTA update! Version 1.0.0\n");
        fflush(stdout); // Ensure immediate output
        sleep(600); // in seconds
    }
    return 0;
}
{{</source-code>}}

Next build the app and package the app binary into a Docker container image using the `"make all"` command.

```bash
~/ota-update-build-artifacts/container$ cd myapp
~/ota-update-build-artifacts/container/myapp$ make all
gcc -o myapp myapp.c
docker build -t test-user/myapp:1.0.0 .
[+] Building 0.9s (8/8) FINISHED                                                                      docker:default
 => [internal] load build definition from Dockerfile                                                            0.0s
 => => transferring dockerfile: 284B                                                                            0.0s
 => [internal] load metadata for docker.io/library/ubuntu:latest                                                0.9s
...
...
...
```

```sh 
~/ota-update-build-artifacts/container/myapp# ls
Dockerfile makefile  myapp  myapp.c
~/ota-update-build-artifacts/container/myapp$ docker image ls
REPOSITORY           TAG       IMAGE ID       CREATED             SIZE
test-user/myapp      1.0.0     28a75833fed7   5 minutes ago      101MB
``` 

Login to your DockerHub account and verify if the new Docker image version 1.0.0 got pushed to the registry.

Now that we have finished creating a Docker container image for the app, let's create an OTA update workflow script that specifies how to download and update the newly created containers on IoT devices.

### Workflow Script - update.sh

The OTA update workflow script contains all the instructions required to update the `myapp` Docker container running in the IoT devices.  

Let’s quickly look at the contents of the `update.sh` workflow script.

``` sh
~/ota-update-build-artifacts/container$ cat update.sh
```

{{<source-code>}}
#!/bin/bash

#================================================
# MyApp Container Update Workflow Script
#================================================

DOCKER_USER="dockerhub-username"
DOCKER_REPO="myapp"
NEW_VERSION="1.0.0"
OLD_VERSION="0.0.1"
CONTAINER_NAME="myapp"


# Function to check if a container is running and healthy
check_container_status() {
    local container_id="$1"
    local status=$(docker inspect --format='{{.State.Health.Status}}' "$container_id" 2>/dev/null)
    local state=$(docker inspect --format='{{.State.Running}}' "$container_id" 2>/dev/null)

    if [[ "$state" == "true" ]]; then
        if [[ -z "$status" ]]; then
            return 0 # Running, no healthcheck
        elif [[ "$status" == "healthy" ]]; then
            return 0 # Running and healthy
        else
            return 1 # Running, but unhealthy
        fi
    else
        return 1 # Not running
    fi
}

# Function to rollback to the previous version
rollback() {
    echo "Rolling back to version $OLD_VERSION..."

    # Stop and remove the new container
    docker stop "${CONTAINER_NAME}-${NEW_VERSION}" 2>/dev/null
    docker rm "${CONTAINER_NAME}-${NEW_VERSION}" 2>/dev/null

    # Delete the new image
    docker image rm "$DOCKER_USER/$DOCKER_REPO:$NEW_VERSION" 2>/dev/null

    # Run the old container
    docker start "$${CONTAINER_NAME}-${OLD_VERSION}" 2>/dev/null
}

# Main update process
echo "Updating to version $NEW_VERSION..."

# Pull the new image
docker pull "$DOCKER_USER/$DOCKER_REPO:$NEW_VERSION"

# Stop the old container
docker stop "$${CONTAINER_NAME}-${OLD_VERSION}" 2>/dev/null

# Run the new container
docker run -d --name ${CONTAINER_NAME}-${NEW_VERSION} "$DOCKER_USER/$DOCKER_REPO:$NEW_VERSION"

# Check container status
sleep 30 # Give the container time to start and healthcheck to run. Adjust as needed.
container_id=$(docker ps -q --filter name=${CONTAINER_NAME}-${NEW_VERSION})

if [[ -n "$container_id" ]] && check_container_status "$container_id"; then
    echo "Update successful!"
    # Clean up the old container and image
    docker rm ${CONTAINER_NAME}-${OLD_VERSION} 2>/dev/null
    docker image rm "$DOCKER_USER/$DOCKER_REPO:$OLD_VERSION" 2>/dev/null
else
    echo "Update failed! Rolling back..."
    rollback
    echo "Rollback complete."
fi

{{</source-code>}}

**Explanation**:

What the `update.sh` workflow script does is:

- Downloads the new version of the `myapp` Docker container image `1.0.0` on the device.

- Stops the old version (0.0.1) of the `myapp` Docker container already running in the device.  It doesn't remove the old container yet, but keeps it as a backup.  The backup will be restored on failure.

- Creates a new container named `myapp-1.0.0` using the newly downloaded Docker image.

- Verifies if the newly created container is running successfully.  If the new version is running successfully, it will remove the old version of the container in the device.

- If the new version of the container fails to run due to an error, the script will stop the container and remove it.  The old version of the container will be restored.

### Upload the artifact
We will upload the workflow script `update.sh` directly to the SocketXP Artifact Registry as a `script` type artifact.

Login to your SocketXP account using the web potal and go to the OTA update page.  In the Artifacts table, click the “Upload new artifact” button.

A new window will popup as show below.

{{<image-custom-size src="/assets/img/ota-update/container/iot-ota-update-docker-container-update-artifact-upload.png"  alt="SocketXP IoT OTA Update - Update IoT app Docker container on remote embedded Linux devices" max-width="50%" >}}

Select the `artifact type` as `"script"`.

Browse and select the `update.sh` file.

Specify the appropriate version for the artifact, `1.0.0` in this example.

Specify the destination folder in the target device where the script should be downloaded and executed.  For example: `/tmp or /home/user/myapp or /usr/bin`

Specify the command to execute the script in the target device. For example: `/bin/bash update.sh`

Finally, click the "Upload" button to upload the artifact to the cloud registry.  

You’ll see a message saying “File uploaded successfully”

### Deploy the Artifact
Now that the artifact has been uploaded to the SocketXP Artifact Registry in the cloud, let’s deploy the artifact on target devices.

{{<image-format src="/assets/img/ota-update/container/iot-ota-update-docker-container-update-artifact-summary.png"  alt="SocketXP OTA Update upload an IoT app binary to SocketXP cloud artifact registry" >}}


From the Artifacts table, view and select the artifact you have just uploaded.

**Note**: If you don't see your artifact yet, click the "Refresh" button to reload the table data.

Click the `“+” icon` next to the artifact to create a new deployment.

A new window will popup, as shown below. 

{{<image-custom-size src="/assets/img/ota-update/container/iot-ota-update-docker-linux-container-update-create-deployment.png"  alt="SocketXP OTA Update - deploy and update an IoT app as Docker container on a fleet of remote iot and embedded Linux devices" max-width="50%">}}

Give a name for the deployment, say for example, `“deploy-version-1.0.0-to-test-devices”`.  

Specify the target device ID or the device group or select a tag to deploy the artifact on.

**Note**: You can deploy the artifact on a single device ID, or a device group or a device tag.  If you want to deploy the artifact on more than one device group or device tag, repeat the "Create New Deployment" process for the different group or tag.

Finally, click the “Create Deployment” button.

Now, go to the “Deployments” tab, hit the refresh button.

{{<image-format src="/assets/img/ota-update/container/iot-ota-update-docker-linux-container-update-deployments-summary.png"  alt="SocketXP OTA Update - View the summary of Docker Container OTA updates deployed" >}}


View and select the deployment we just created to see its progress. 

Click the `“More Info < >”` button to view and monitor the progress of the deployment on each target devices (in the device group or tag).

Click the “Refresh” button to view the progress.

{{<image-format src="/assets/img/ota-update/container/iot-ota-update-docker-linux-container-update-deployment-progress.png"  alt="SocketXP OTA Update - View the progress of Docker Container OTA updates deployed on each IoT or embedded Linux device" >}}


You can check the stdout and stderr logs generated by the update process, by clicking the “view log” buttons.

Let’s login into one of the devices to check if the `myapp` deployment is successful.

{{<source-code>}}
$ docker ps
CONTAINER ID   IMAGE                      COMMAND            CREATED          STATUS          PORTS     NAMES
cdc95577be33   test-user/myapp:1.0.0      "/usr/bin/myapp"   5 minutes ago    Up 5 minutes              myapp-1.0.0


{{</source-code>}}

We can also view the app logs using `docker logs` command.
{{<source-code>}}
$ docker logs myapp-1.0.0
Hello, OTA update! Version 1.0.0
{{</source-code>}}

Congratulations!  We have successfully updated the `myapp` Docker container in the remote IoT devices using [SocketXP OTA update](/iot-ota-update).

Now that you have learnt how to create and publish a Docker container as OTA updates to remote devices, you can learn to create OTA updates for the following artifacts:

- [App Binary](/iot/update-iot-app-using-socketxp-ota-update)
- [Debian Package](/iot/update-iot-debian-packages-using-socketxp-ota-update)
- [Firmware](/iot/update-iot-firmware-using-socketxp-ota-update)
- Config File
- Script File



