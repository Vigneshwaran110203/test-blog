---
title: How to Remote Access Golang Web Server App from Internet
slug: remote-access-golang-web-server-app-from-internet
description: "Remote access a Golang web service application in your local private network from Internet using SocketXP Remote Access solution."
author: Ganesh Velrajan
tags: [
    Remote Access, Remote Connect, Golang HTTP Web Server App, Webservice, Raspberry Pi, Internet
]
date: 2023-01-30
lastmod: 2024-10-18
categories: [
    IoT
]
images: ["/assets/img/remote-access-golang-web-server-app-from-internet/remote-access-golang-web-server-app-from-internet.png"]
aliases: ["how-to-access-golang-web-server-app-from-internet"]
---
      
Let's assume you have a Golang web server application that runs in your personal laptop or in a server or in a Raspberry Pi in your office LAN network.

Anyone outside of your office network cannot access the Golang web server application because the application runs in your local network.

Suppose, let's say, you want to expose the Golang web service app to the internet, so that your customers or remote employees can access the Golang web app from the internet.

Today, there are 3 ways to expose your Golang web server application to the internet.

1. Deploy the web application in your office server which has a public IP address and domain name.
2. Deploy the web application in the cloud such as AWS, MS Azure, GCP or web hosting companies like GoDaddy, SiteGround, A2Hosting etc.
3. Use [SocketXP](https://www.socketxp.com/) to create a unique public web URL for your Golang web service application.

The first two options above cost more money and more effort in terms of purchasing your own IP address, domain name, configuring and managing them. 

To address the above problems and provide an alternate cost-effective solution, we have created **SocketXP**.

## What is SocketXP

SocketXP is a simple, quick and cost-effective way to deploy any web application online in just few seconds.

### How it works?

{{<image-format src="/assets/img/remote-access-golang-web-server-app-from-internet/remote-access-golang-web-server-app-from-internet.png" alt="remote-access-golang-web-server-app-from-internet">}}

- Run your Golang web server application in your laptop or any private server in your office LAN network or in a VM in a cloud.
- Download SocketXP Client and install in the office server or laptop
- SocketXP Client will create a secure SSL/TLS tunnel from your laptop/server to the SocketXP Cloud Gateway.
- SocketXP Cloud Gateway will provide a unique public web URL that you can use to access your Golang web service app from the internet.

### A Quick Demo:
Let's use the following simple Golang web application for our demo.

{{<source-code>}}$ cat myapp.go
package main

import (
	"net/http"
)

func httpHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("&lt;h2&gt;Hello World!&lt;/h2&gt;"))
}

func main() {
    http.HandleFunc("/", httpHandler)
    http.ListenAndServe(":3000", nil)
}
{{</source-code>}}

Run the myapp.go on a local server or your laptop.

{{<source-code>}}$ go run myapp.go{{</source-code>}}
Using a browser, let's point to http://localhost:3000 to connect to the Golang web app.

{{<image-format src="/assets/img/remote-access-localhost-nodejs-app/localhost-nodejs-app-server.png" alt="remote-access-golang-web-serice-from-internet">}}

Right now the Golang web service app can be accessed only by you because it runs on your laptop.

Now to make the Golan web application accessible from the internet, let's download and run the SocketXP Client from the [download page](https://www.socketxp.com/download).

Next authenticate and register the SocketXP Client with the SocketXP Cloud Gateway, using the auth-token from the [Portal Page](https://portal.socketxp.com)

{{<image-format src="/assets/img/AuthToken.jpg" alt="remote-access-flask-app-from-internet">}}

Click the copy button to copy the command string and paste it in the terminal window in your laptop or server.

{{<source-code>}}$ socketxp login "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
{{</source-code>}}

After registering the SocketXP Client with the SocketXP Cloud Service, you can expose your Golang web server application to the internet by obtaining a unique public web URL as shown in the next section.

## Expose Golang web server app to the internet

Use the following command to create a HTTP SSL/TLS tunnel between the Golang web application and the SocketXP Cloud Gateway.  This will generate a unique public web URL.  Use the SocketXP public web URL to access your Golang web server app from the internet.

{{<source-code>}}$socketxp connect http://localhost:3000
Public URL -&gt; <strong>https://679aa48b-1162-44f7-b6c6-59129dd68b58.socketxp.com</strong>{{</source-code>}}

Let's access the Golang web service app from the internet using the SocketXP Public URL provided in the above output.

{{<image-format src="/assets/img/remote-access-flask-app-from-internet/Access-Public-URL-localhost-flask-app.png" alt="remote-access-golang-web-app-from-internet">}}

You could now share the above link with your customers or remote employees, so that they could access your web application from anywhere in the world.  

The above SocketXP public URL is a permanent link just assigned to you and it doesn't change until you manually delete it from the HTTP tunnels section in the portal.