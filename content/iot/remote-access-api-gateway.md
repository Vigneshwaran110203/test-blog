---
title: How to Remote Access API Gateway Server from the Internet
slug: remote-access-api-gateway-server-from-internet
description: "Learn how to remotely access your API gateway server from outside network over the internet using SocketXP HTTP Web Service Remote Access solution."
author: Ganesh Velrajan
tags: [
    Remote Access, API gateway server, Go App, Python Flask App, Python API gateway example, Java App, Webservice, IoT, Mobile devices.
]
date: 2024-10-19
lastmod: 2024-10-19
categories: [
    IoT
]
images: ["/assets/img/remote-access-flask-app-from-internet/remote-access-flask-app-from-internet.png"]
aliases: []
---

In this tutorial, we will discuss how to setup remote access to a private API gateway server in your local machine, so that you can connect to it remotely and securely over the internet.

Whether you are a coding enthusiast, a professional developer, or just a beginner, this article will provide you with a step-by-step instructions on how to setup remote connectivity to your private API gateway server running in your local machine over the internet. 

So, let's dive in.

## Python Flask App Example:

Let's assume you have a Python Flask based API gatewway web server application that runs on **localhost IP address 127.0.0.1** in your local machine, say a personal laptop, a server, a Raspberry Pi.  

The device is in your home or office network, behind NAT router and firewall.

Anyone outside of your home or office network cannot access the API gateway server because the application runs in your local network or local IP address 127.0.0.1. Local IP addresses such as **127.0.0.1, 10.1.1.1 or 192.168.1.1** etc., cannot be accessed from the internet.  

Let's say, you want to expose the API gateway web server to the internet or make it externally visible, so that your colleagues, customers or a remote person or a web app can access the API gateway server from the internet.

Today, there are three ways to expose your API gateway web server app to the internet.

1. Deploy the API gateway in an externally visible server such as your office server which has a public IP address and domain name.
2. Deploy the API gateway web application in a cloud platform such as AWS, MS Azure, Google Cloud Platform or Digital Ocean Cloud.
3. Create a permanent and unique public web URL for your API gateway web app using [SocketXP](/).

The first two options cost more money and require more time and effort in terms of purchasing your own IP address, domain name, configuring and managing them in the cloud. 

To address the above problems and provide an alternate cost-effective solution, we have created [SocketXP](/) solution.

In this article, we'll discuss in detail how to create a permanent and unique public web URL for your API gateway server using [SocketXP Web Service Remote Access Solution](/iot/remote-access-iot-web-app-from-internet/).

## What is SocketXP

SocketXP is a simple, quick and cost-effective way to deploy your private web application or API gateway server online in just few seconds.

### How it works?

{{<image-format src="/assets/img/remote-access-flask-app-from-internet/remote-access-flask-app-from-internet.png" alt="remote-access-api-gateway-from-internet">}}

- Run your flask web application/API gateway in your local machine using localhost IP address 127.0.0.1.
- Download the SocketXP Client and install it in your local machine say, laptop or server.
- SocketXP Client will create a secure HTTPS tunnel from your server to the SocketXP Cloud Gateway.
- SocketXP Cloud Gateway will provide a secure public web URL (HTTPS URL) that you can use to access your python flask web application from anywhere over the internet.

### A Simple Python Flask App - Quick Demo:
Let's use the following simple Python flask based API gateway web server for the demo.  

By default, a python flask app will listen on localhost IP address 127.0.0.1 and TCP port 5000.  But, in the below example, we instruct the app to listen on IP 127.0.0.1 and port 3000.

{{<source-code>}}$ cat myapp.py
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/books', methods=['GET'])
def get_books():
  books_data = [
		{'id': "1001", 'title': 'Book1', 'author': 'Author1'}, 
		{'id': "1002", 'title': 'Book2', 'author': 'Author2'}
	] 
  return jsonify({'books': books_data})

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
Using a web client such as `curl` or a web browser, let's try connecting to http://localhost:3000 and access the flask based API gateway web application.

{{<source-code>}}$ curl http://localhost:5000/api/books{{</source-code>}}

``` json
{
  "books": [
    {
      "author": "Author1",
      "id": "1001",
      "title": "Book1"
    },
    {
      "author": "Author2",
      "id": "1002",
      "title": "Book2"
    }
  ]
}

```
Right now the private flask application can be accessed only by you because it runs on your laptop locally.

### Download and install SocketXP client
Now to make the python flask application accessible from the internet, let's download and run the SocketXP client from the [download page](https://www.socketxp.com/download).

Next, authenticate and register the SocketXP client with the SocketXP Cloud Gateway, using the auth-token from the [Portal Page](https://portal.socketxp.com)

{{<image-format src="/assets/img/AuthToken.jpg" alt="remote-access-api-gateway-from-internet">}}

Click the copy button to copy the command string and paste it in the terminal window in your laptop or server.

{{<source-code>}}$ sudo socketxp login "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
{{</source-code>}}

After registering the SocketXP Client with the SocketXP Cloud Service, you could create HTTP proxy tunnel between the application running in your laptop and the SocketXP Cloud Service, via the SocketXP Client.

As our flask app is a web application(HTTP server), let's create a HTTP proxy tunnel. 

### Expose flask app to the internet

Use the following command to create a HTTP proxy tunnel between the flask web application and the SocketXP Cloud Gateway.  This will generate a public web URL.  Use the SocketXP public web URL to expose your flask app to the internet.

{{<source-code>}}$sudo socketxp connect http://localhost:3000
Public URL -&gt; <strong>https://679aa48b-1162-44f7-b6c6-59129dd68b58.socketxp.com</strong>{{</source-code>}}

Let's access the flask web application from the internet using the SocketXP Public URL provided in the above output.

{{<source-code>}}$ curl https://679aa48b-1162-44f7-b6c6-59129dd68b58.socketxp.com/api/books{{</source-code>}}

``` json
{
  "books": [
    {
      "author": "Author1",
      "id": "1001",
      "title": "Book1"
    },
    {
      "author": "Author2",
      "id": "1002",
      "title": "Book2"
    }
  ]
}

```

You could now share the above link with your customers or remote employees or any web app, so that they could access your API gateway web server application from anywhere in the world.  

The above SocketXP public URL is a random, permanent and unique URL link created just for you. It doesn't change until you manually delete it from the HTTP tunnels section in the SocketXP web portal.

Congratulations!! You have successfully setup remote access to your API gateway server and accessed it remotely using a web client.

## Conclusion:
Developing API gateway server for your applications is made easy by using Python or Go web frameworks.

With [SocketXP HTTP Web Service Remote Access Solution](/iot-remote-access) (part of [IoT Device Management and Remote Access Platform](/iot/iot-device-management-platform)), it is easy to securely remote access any web application including API gateway servers running in your local machine such as your IoT device, from any browser on any OS, be it Windows or Mac or Linux.

By following the steps outlined in this article, you can quickly set up remote access to private API gateway server running in your local device and access it from anywhere, anytime. 

