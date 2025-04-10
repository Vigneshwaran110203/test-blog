---
title: How to Remote Access Python Flask App from Internet
slug: remote-access-python-flask-app-from-internet
description: "Remote access a Python Flask web application in your local network from outside network over the internet using SocketXP Remote Access solution."
author: Ganesh Velrajan
tags: [
    Remote Access, Python Flask App, Webservice, Raspberry Pi, Internet, localhost
]
date: 2021-08-04
lastmod: 2024-10-19
categories: [
    IoT
]
images: ["/assets/img/remote-access-flask-app-from-internet/remote-access-flask-app-from-internet.png"]
aliases: ["how-to-access-python-flask-app-from-internet"]
---

In this article, we'll discuss how to **remote access a Python Flask app** from the internet using [SocketXP IoT Remote Access solution](/iot-remote-access).
      
Let's assume you have a Python Flask web server application that runs on **localhost IP address 127.0.0.1** in your personal laptop or in a server or in a Raspberry Pi in your home or office network, behind NAT router and firewall.

Anyone outside of your home or office network cannot access the Flask web application because the application runs in your local network or local IP address 127.0.0.1. Local IP addresses such as **127.0.0.1, 10.1.1.1 or 192.168.1.1** etc., cannot be accessed from the internet.  

Let's say, you want to expose the flask app to the internet or make it externally visible, so that your colleagues, customers or a remote person or an app can access the flask app from the internet.

Today, there are three ways to expose your Python Flask Web Application to the internet.

1. Deploy the flask app in an externally visible server such as your office server which has a public IP address and domain name.
2. Deploy the web application in a cloud platform such as AWS, MS Azure, Google Cloud Platform or Digital Ocean Cloud.
3. Create a public web URL for your web app using [SocketXP](/).

The first two options cost more money and require more effort in terms of purchasing your own IP address, domain name, configuring and managing them in the cloud. 

To address the above problems and provide an alternate cost-effective solution, we have created [SocketXP](/).

In this article, we'll discuss in detail how to create a permanent and unique public web URL for your python flask app using [SocketXP Web Service Remote Access Solution](/iot/remote-access-iot-web-app-from-internet/).

## What is SocketXP

SocketXP is a simple, quick and cost-effective way to deploy your web application online.

### How it works?

{{<image-format src="/assets/img/remote-access-flask-app-from-internet/remote-access-flask-app-from-internet.png" alt="remote-access-flask-app-from-internet">}}

- Run your flask web application in any server or laptop using localhost IP address 127.0.0.1.
- Download SocketXP Client and install in the office server or laptop
- SocketXP Client will create a secure tunnel from your server to the SocketXP Cloud Gateway.
- SocketXP Cloud Service will provide a secure public web URL (HTTPS URL) that you can use to access your python flask web application from the internet.

### A Simple Python Flask App - Quick Demo:
Let's use the following simple Python flask web application for the demo.  

By default, a python flask app will listen on localhost IP address 127.0.0.1 and TCP port 5000.  But, in the below example, we instruct the app to listen on IP 127.0.0.1 and port 3000.

{{<source-code>}}$ cat myapp.py
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return '&lt;h2&gt;Hello, World!&lt;/h2&gt;'

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=3000, debug=True)
{{</source-code>}}

### Run the Python Flask App

**Note:** You need to install Flask module using the following command:
{{<source-code>}}$ python3 -m pip install flask {{</source-code>}}

Run the myapp.py on a local server or laptop using any of the following commands:

{{<source-code>}}$ python3 -m flask --app myapp.py run{{</source-code>}}
or simply run as:
{{<source-code>}}$ python3 myapp.py
 * Serving Flask app 'myapp.py'
 * Debug mode: off
 * Running on http://127.0.0.1:3000
Press CTRL+C to quit
{{</source-code>}}

### Access the python flask app
Using a browser, let's point to http://localhost:3000 to connect to the flask web application.

{{<image-format src="/assets/img/remote-access-localhost-nodejs-app/localhost-nodejs-app-server.png" alt="remote-access-flask-app-from-internet">}}

Right now the flask application can be accessed only by you because it runs on your laptop.

### Download and install SocketXP client
Now to make the python flask application accessible from the internet, let's download and run the SocketXP client from the [download page](https://www.socketxp.com/download).

Next, authenticate and register the SocketXP client with the SocketXP Cloud Gateway, using the auth-token from the [Portal Page](https://portal.socketxp.com)

{{<image-format src="/assets/img/AuthToken.jpg" alt="remote-access-flask-app-from-internet">}}

Click the copy button to copy the command string and paste it in the terminal window in your laptop or server.

{{<source-code>}}$ socketxp login "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
{{</source-code>}}

After registering the SocketXP Client with the SocketXP Cloud Service, you could create HTTP proxy tunnel between the application running in your laptop and the SocketXP Cloud Service, via the SocketXP Client.

As our flask app is a web application(HTTP server), let's create a HTTP proxy tunnel. 

### Expose flask app to the internet

Use the following command to create a HTTP proxy tunnel between the flask web application and the SocketXP Cloud Gateway.  This will generate a public web URL.  Use the SocketXP public web URL to expose your flask app to the internet.

{{<source-code>}}$socketxp connect http://localhost:3000
Public URL -&gt; <strong>https://679aa48b-1162-44f7-b6c6-59129dd68b58.socketxp.com</strong>{{</source-code>}}

Let's access the flask web application from the internet using the SocketXP Public URL provided in the above output.

{{<image-format src="/assets/img/remote-access-flask-app-from-internet/Access-Public-URL-localhost-flask-app.png" alt="remote-access-flask-app-from-internet">}}

You could now share the above link with your customers or remote employees, so that they could access your web application from anywhere in the world.  

The above SocketXP public URL is a permanent link just assigned to you and it doesn't change until you manually delete it from the HTTP tunnels section in the portal.

## Debugging Python Flask Web App Remote Access Issues
Here are some common problems encounter while developing, testing and deploying your Python Flask Web App for the first time:

### Python flask app not accessible from remote machine or across networks:
By default, a python flask application will listen on the `localhost IP address 127.0.0.1` and TCP `port 5000`.  This IP address is not externally visible to other machines in your local network.  This app can be accessed only from the same machine in which it is running.  

You need to change your Python Flask web app to either listen on the network IP address of your machine such as `192.168.X.X, 10.1.X.X` etc., or using the `anycast IP address 0.0.0.0`.  The anycast IP address `0.0.0.0` will make the flask app to listen on all IP addresses in the machine and accept all incoming connections to this flask app from any network interface (loopback, ethernet, wifi) irrespective of its IP address.  

**Hint:** Anycast IP address `0.0.0.0` is equivalent to using `*.*.*.*` in the IP address field, where `*` means match any string or number in the IP address.

{{<source-code>}}$ cat myapp.py
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return '&lt;h2&gt;Hello, World!&lt;/h2&gt;'

if __name__ == '__main__':
    <b>app.run(host='0.0.0.0', port=3000, debug=True)</b>
{{</source-code>}}

### What is Localhost IP address 127.0.0.1?

Localhost IP address or Loopback IP address 127.0.0.1 belongs to the Loopback interface of your system. Loopback(lo) interface is a software network interface (unlike Ethernet or WiFi interfaces which are hardware network interfaces) created automatically by the OS.   

Only programs(a web browser, for example) running in your laptop or server can connect to the flask web server listening on the loopback IP address (localhost) 127.0.0.1 and some TCP port say 5000 or 3000.  Other servers or laptops in your local network cannot connect to the python flask web server listening on IP address 127.0.0.1.

Localhost or Loopback IP address 127.0.0.1 is useful for developing and testing any web server application locally on your laptop without having to deploy on a production server.  But the loopback IP address is not suitable for exposing your web application to any other external machine, including other machines in your local network.

>"Loopback or Localhost IP address 127.0.0.1 is not suitable for exposing your web application to any other external machine."

### How to connect to Python Flask Web App in my local network

If you want to allow other machines(say, a colleague's laptop) in your local network to connect to your python flask app, you should make your flask web app to listen on a local network IP address such as `192.168.X.X or 10.1.X.X` assigned by your WiFi router to your machine (or using the anycast IP address `0.0.0.0`), as shown in the example below:

{{<source-code>}}$ cat myapp.py
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return '&lt;h2&gt;Hello, World!&lt;/h2&gt;'

if __name__ == '__main__':
    <b>app.run(host='192.168.10.7', port=3000, debug=True)</b>
{{</source-code>}}

The above code assumes that `192.168.10.7` is the local network IP address of your laptop's WiFi adapter.  This IP address assigned to your laptop may vary depening on how your WiFi's DHCP (Dynamic Host Configuration Protocol) server is configured.

You need to execute a command such as `ifconfig` in Linux based systems and `ipconfig` in Windows systems to find the local network IP address of your machine.

{{<source-code>}}
$ ifconfig
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1460
        <b>inet 192.168.10.7  netmask 255.255.255.255  broadcast 0.0.0.0</b>
        ether 42:01:0a:80:00:02  txqueuelen 1000  (Ethernet)
        RX packets 6445195824  bytes 697982309275 (697.9 GB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 5107947877  bytes 1316487081762 (1.3 TB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 2388090363  bytes 832100026992 (832.1 GB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 2388090363  bytes 832100026992 (832.1 GB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

{{</source-code>}}

You can use a network utility like `ping` tool to check if one machine can talk to another machine in the same network or another network.

{{<source-code>}}
$ ping 192.168.10.7
PING 192.168.10.7 (192.168.10.7) 56(84) bytes of data.
64 bytes from 192.168.10.7: icmp_seq=1 ttl=64 time=0.050 ms
64 bytes from 192.168.10.7: icmp_seq=2 ttl=64 time=0.040 ms
64 bytes from 192.168.10.7: icmp_seq=3 ttl=64 time=0.060 ms
^C
--- 192.168.10.7 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3049ms
rtt min/avg/max/mdev = 0.040/0.048/0.060/0.007 ms{{</source-code>}}

However, it is always better to use the anycast IP address `0.0.0.0` so that anyone in your any local network could access your web app.

Finally, if you want your Python Flask app to be externally visible or accessible from the public internet or from any outside network, you need to use a [remote access solution](/iot-remote-access) such as the [SocketXP Web Service Remote Access Solution](/iot/remote-access-iot-web-app-from-internet/) that we discussed above in this article.

### Python flask app remote access not working

The primary reason why python flask app remote access not working is probably your WiFi router or firewall setting is preventing connection from outside network.  

You need to use a reverse proxy service like [SocketXP Web Service Remote Access Solution](/iot/remote-access-iot-web-app-from-internet/), discussed above in this article, to remotely access your Python Flask app without having to worry about manipulating your WiFi router setttings or your firewall rules.

