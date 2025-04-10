---
title: How to Monitor IoT System Resources and Performance using Python
slug: monitor-iot-system-resources-performance-using-python
description: "In this tutorial, you'll learn how to monitor IoT system resources( CPU usage, GPU usage, Memory usage, Disk usage and Network usage) and performance using Python.  We'll also generate alerts to the administrator by invoking a webhook URL when the system resource usage exceeds a certain threshold."
author: Ganesh Velrajan
tags: [
    System Resource monitoring, Performance monitoring, CPU usage, Memory usage, Disk usage, Python, Raspberry Pi, IoT, Over the Internet, From outside network
]
date: 2023-03-21
lastmod: 2025-02-21
categories: [
    IoT
]
images: ["/assets/img/iot-remote-monitoring/iot-performance-system-resource-monitoring.jpg"]
aliases: ["how-to-monitor-raspberry-pi-system-resources-and-performance-using-python", "monitor-raspberry-pi-system-resources-performance-using-python",]
---

In this tutorial, you'll learn how to [monitor the performance of IoT device system resources](/iot-remote-monitoring) such as CPU, Memory, Disk and Network using Python.  

You'll also learn how to generate alerts by invoking a webhook URL when the system resource usage exceeds a certain threshold. This is useful if you want to generate webhook alerts to your `Slack` app when the CPU or memory usage exceeds, for example, 80%. 

We'll use the Python's standard library `psutil` to read and monitor CPU, memory, disk and network usages.

## Install the psutil module
Run the below command on your Raspberry Pi to install the `psutil` python library module.

```sh

    python3 -m pip install psutil

```

## A simple resource monitoring program in python

Here is a simple python program that monitors the performance of system resources such as CPU, memory, disk, and network usages.  We'll look at a very detailed version of the python app in the next section below.

{{<source-code>}}
import psutil

def main():
    print("CPU usage %: ", psutil.cpu_percent(), "%")
    print("Mem Usage %:", psutil.virtual_memory().percent, "%")
    print("Swap Usage %:", psutil.swap_memory().percent, "%")

    for dp in psutil.disk_partitions():
        print("\nDisk usage of partition [", dp.mountpoint, "]: ",
                psutil.disk_usage(dp.mountpoint).percent, "%")

    print("Network bytes sent: ", psutil.net_io_counters().bytes_sent, "Bytes")
    print("Network bytes received: ", psutil.net_io_counters().bytes_recv, "Bytes")

    
if __name__ == "__main__":
    main()
{{</source-code>}}

Here is a sample output from executing the above program:

```sh
    $ python3.9 simple-res-mon.py 
    CPU usage %:  72.0 %
    Mem Usage %: 89.3 %
    Swap Usage %: 95.3 %

    Disk usage of partition [ / ]:  10.6 %

    Disk usage of partition [ /System/Volumes/Preboot ]:  2.4 %

    Disk usage of partition [ /System/Volumes/VM ]:  34.6 %

    Disk usage of partition [ /System/Volumes/Update ]:  0.0 %

    Disk usage of partition [ /System/Volumes/Data ]:  62.3 %
    Network bytes sent:  3892295680 Bytes
    Network bytes received:  4136247296 Bytes
```

## Linux System Resource Performance Monitoring and Generating Alerts in Python

Here is the python program that continously monitors the performance of CPU, Memory, Disk and Network usage in a Raspberry Pi.  The program also sends an alert when the CPU, memory, disk or network usage crosses certain threshold.

You can run the program in the background (or as a systemd daemon). It will continously monitor the system resources and generate alerts.

{{<source-code>}}
import psutil
import http.client
import json


def main():
    while True:
        print("CPU: \n")
        getCPUUsage()
        print("\n\nMem: \n")
        getMemUsage()
        print("\n\nDisk: \n")
        getDiskUsage()
        print("\n\nNetwork: \n")
        getNetworkUsage()
        time.sleep(10*60) # sleep for 10 minutes

def getCPUUsage():
    print("CPU usage %: ", psutil.cpu_percent(), "%")
    print("CPU count: ", psutil.cpu_count(), "cores")
    cpuUsagePercent = psutil.cpu_percent(1)
    print("CPU usage in last 10 secs: ", cpuUsagePercent, "%")
    if (cpuUsagePercent > 20):
        print("Sending alert on high cpu usage.")
        alertMsg = {"device_name": os.uname().nodename, "cpu_alert": "cpu usage is high: "+ str(cpuUsagePercent) + "%"}
        sendWebhookAlert(alertMsg)


def getMemUsage():
    print("Mem Total:", int(psutil.virtual_memory().total/(1024*1024)), "MB")
    print("Mem Used:", int(psutil.virtual_memory().used/(1024*1024)), "MB")
    print("Mem Available:", int(psutil.virtual_memory().available/(1024*1024)), "MB")
    memUsagePercent = psutil.virtual_memory().percent
    print("Mem Usage %:", memUsagePercent, "%")
    print("Swap Usage %:", psutil.swap_memory().percent, "%")
    if (memUsagePercent > 80):
        print("Sending alert on high memory usage.")
        alertMsg = {"device_name": os.uname().nodename, "memory_alert": "memory usage is high: "+ str(memUsagePercent) + "%"}
        sendWebhookAlert(alertMsg)

def getDiskUsage():
    for dp in psutil.disk_partitions():
        # print(x)
        print("\nDisk usage of partition ", dp.mountpoint, ": ") 
        print("Total: ", int(psutil.disk_usage(dp.mountpoint).total/(1024*1024)), "MB")
        print("Used: ", int(psutil.disk_usage(dp.mountpoint).used/(1024*1024)), "MB")
        print("Free: ", int(psutil.disk_usage(dp.mountpoint).free/(1024*1024)), "MB")
        diskUsagePercent = psutil.disk_usage(dp.mountpoint).percent
        print("Used %: ", diskUsagePercent, "%")
        if (diskUsagePercent > 60):
            print("Sending alert on high disk usage.")
            alertMsg = {"device_name": os.uname().nodename, "disk_alert": "disk usage is high: "+ str(diskUsagePercent) + "%" +" in partition: " + 
                            dp.mountpoint}
            sendWebhookAlert(alertMsg)

def getNetworkUsage():
    print("Total bytes sent: ", psutil.net_io_counters().bytes_sent, "Bytes")
    print("Total bytes received: ", psutil.net_io_counters().bytes_recv, "Bytes")
    print("Total packets sent:", psutil.net_io_counters().packets_sent, "Packets")
    print("Total packets received:", psutil.net_io_counters().packets_recv, "Packets")
    print("Total incoming packets dropped:", psutil.net_io_counters().dropin, "Packets")
    print("Total outgoing packets dropped:", psutil.net_io_counters().dropout, "Packets")
    if (psutil.net_io_counters().dropin > 10000 or psutil.net_io_counters().dropout > 10000):
        print("Sending alert on high network packet drop.")
        alertMsg = {"device_name": os.uname().nodename, "network_alert": "network packet drop is high: in: "+ 
                    str(psutil.net_io_counters().dropin) + " out: " + 
                    str(psutil.net_io_counters().dropout)}
        sendWebhookAlert(alertMsg)

def sendWebhookAlert(alertMsg):
    conn = http.client.HTTPSConnection('www.httpbin.org')
    headers = {'Content-type': 'application/json'}
    jsonData = json.dumps(alertMsg)
    conn.request('POST', '/post', jsonData, headers)
    response = conn.getresponse()
    print(response.read().decode())
    
if __name__ == "__main__":
    main()
{{</source-code>}}

We use the free HTTP testing website `http://www.httpbin.org/post` to test our webhook.  You should replace this URL with your custom webhook URL.  

You could even use a `Slack` webhook to receive alerts on your `Slack app`.  Please refer to the {{<ahref href="https://api.slack.com/messaging/webhooks" rel="nofollow" target="_blank">}}slack webhook integration documentation{{</ahref>}} for more information.

Here is a sample output from running the python program:

```bash

    $ python3.9 resource-mon.py 
    CPU: 

    CPU usage %:  25.7 %
    CPU count:  8 cores
    CPU usage in last 10 secs:  23.2 %
    Sending alert on high cpu usage.

    {
    "args": {}, 
    "data": "{\"device_name\": \"raspberry-pi-1234\", \"cpu_alert\": \"cpu usage is high: 23.2%\"}", 
    "files": {}, 
    "form": {}, 
    "headers": {
        "Accept-Encoding": "identity", 
        "Content-Length": "41", 
        "Content-Type": "application/json", 
        "Host": "www.httpbin.org", 

    }, 
    "json": {
        "cpu_alert": "cpu usage is high: 23.2%"
    }, 
    "origin": "0.0.0.0", 
    "url": "https://www.httpbin.org/post"
    }



    Mem: 

    Mem Total: 16384 MB
    Mem Used: 6319 MB
    Mem Available: 2693 MB
    Mem Usage %: 83.6 %
    Swap Usage %: 91.0 %
    Sending alert on high memory usage.
    {
    "args": {}, 
    "data": "{\"device_name\": \"raspberry-pi-1234\", \"memory_alert\": \"memory usage is high: 83.6%\"}", 
    "files": {}, 
    "form": {}, 
    "headers": {
        "Accept-Encoding": "identity", 
        "Content-Length": "47", 
        "Content-Type": "application/json", 
        "Host": "www.httpbin.org", 

    }, 
    "json": {
        "memory_alert": "memory usage is high: 83.6%"
    }, 
    "origin": "0.0.0.0", 
    "url": "https://www.httpbin.org/post"
    }


    Disk: 


    Disk usage of partition  / : 
    Total:  239072 MB
    Used:  8527 MB
    Free:  71587 MB
    Used %:  10.6 %


    Disk usage of partition  /System/Volumes/Preboot : 
    Total:  239072 MB
    Used:  1723 MB
    Free:  71586 MB
    Used %:  2.4 %


    Disk usage of partition  /System/Volumes/VM : 
    Total:  239072 MB
    Used:  37889 MB
    Free:  71586 MB
    Used %:  34.6 %


    Disk usage of partition  /System/Volumes/Update : 
    Total:  239072 MB
    Used:  2 MB
    Free:  71586 MB
    Used %:  0.0 %

    Disk usage of partition  /System/Volumes/Data : 
    Total:  239072 MB
    Used:  118131 MB
    Free:  71586 MB
    Used %:  62.3 %
    Sending alert on high disk usage.
    {
    "args": {}, 
    "data": "{\"device_name\": \"raspberry-pi-1234\", \"disk_alert\": \"disk usage is high: 62.3% in partition: /System/Volumes/Data\"}", 
    "files": {}, 
    "form": {}, 
    "headers": {
        "Accept-Encoding": "identity", 
        "Content-Length": "77", 
        "Content-Type": "application/json", 
        "Host": "www.httpbin.org", 

    }, 
    "json": {
        "disk_alert": "disk usage is high: 62.3% in partition: /System/Volumes/Data"
    }, 
    "origin": "0.0.0.0", 
    "url": "https://www.httpbin.org/post"
    }

    Network: 

    Total bytes sent:  3876892672 Bytes
    Total bytes received:  4118461440 Bytes
    Total packets sent: 12182033 Packets
    Total packets received: 18241393 Packets
    Total incoming packets dropped: 105942526610 Packets
    Total outgoing packets dropped: 0 Packets
    Sending alert on high network packet drop.
    {
    "args": {}, 
    "data": "{\"device_name\": \"raspberry-pi-1234\", \"network_alert\": \"network packet drop is high: in: 105942526610 out: 0\"}", 
    "files": {}, 
    "form": {}, 
    "headers": {
        "Accept-Encoding": "identity", 
        "Content-Length": "73", 
        "Content-Type": "application/json", 
        "Host": "www.httpbin.org", 

    }, 
    "json": {
        "network_alert": "network packet drop is high: in: 105942526610 out: 0"
    }, 
    "origin": "0.0.0.0", 
    "url": "https://www.httpbin.org/post"
    }
```

## SocketXP IoT Management Platform

[SocketXP IoT Management Platform](/) can be used to remotely manage, control, access and monitor your Raspberry Pi fleet at scale.

SocketXP, not only [monitors your device resource utilization](https://docs.socketxp.com/guide/monitoring/device-monitoring) and sends notifications, but also monitors change in your devices status (up/down events, offline/online events), monitor files for any modifications, [monitors log files](https://docs.socketxp.com/guide/monitoring/file-monitoring) for a specific error using regex pattern match etc., and sends a notification to admins via webhooks.

Learn more about [SocketXP IoT Management Platform here](/).

