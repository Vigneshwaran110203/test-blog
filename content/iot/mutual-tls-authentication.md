---
title: Mutual TLS Authentication - Everything you need to know
slug: mutual-tls-authentication
description: "Learn about what is mutual TLS or mTLS, its benefits, usefulness, limitations, how it works, why it is more secure than regular TLS connections and some real world usecase."
author: Ganesh Velrajan
tags: [
    SSL certificates, TLS certificates, X.509 certificates, SSL certificate management, SSL key management, SSL PKI CA, Self-signed Certificates, OpenSSL, BastionXP CA, SSL X.509 Server Certificate, SSL X.509 Client Certificate, Mutual TLS mTLS, SocketXP, IoT Management Platform, mTLS, mutual TLS, Raspberry Pi, IoT,
]
date: 2024-11-09
lastmod: 2024-11-09
categories: [
    IoT
]
images: ["/assets/img/iot-zero-trust-security/zero-trust-security-iot-devices.jpg"]
aliases: []
---

## What is mTLS?

Mutual Transport Layer Security (mTLS), also known as two-way TLS, is a security protocol that allows both the client and server to authenticate each other before establishing a secure connection. This is in contrast to traditional TLS, where only the client authenticates the server.

## How mTLS Works:

Certificate Exchange: Both the client and server present their respective digital certificates to each other.

Certificate Verification: Each party verifies the authenticity and validity of the other's certificate using a trusted certificate authority (CA).

Session Establishment: If both certificates are valid, a secure encrypted session is established between the client and server.

## mTLS vs TLS 
mTLS (Mutual Transport Layer Security) and traditional TLS (Transport Layer Security) share many similarities, but there is one key difference:

**Traditional TLS**: In traditional TLS, only the server is authenticated. The client trusts the server's certificate, but the server does not verify the client's identity. This means that an attacker could potentially impersonate the server and intercept communications without being detected.

**mTLS**: In mTLS, both the client and server must authenticate each other. This means that both parties present their digital certificates, and each verifies the other's identity. This added layer of authentication provides a higher level of security and helps prevent man-in-the-middle attacks.

The primary difference between mTLS and traditional TLS is that mTLS requires mutual authentication of both parties involved in the communication, while traditional TLS only requires the server to be authenticated.  mTLS authentication is a key component in setting up a Zero Trust Security architecture.

## Benefits of mutual TLS

mutual TLS is useful and important because it provides a number of security benefits, including:

- **Mutual authentication:** mTLS ensures that both the client and server are who they claim to be. This prevents man-in-the-middle(MITM) attacks, where an attacker intercepts communication between two parties and impersonates one of them.
- **Improved security:** mTLS encrypts all data transmitted over the connection, protecting it from eavesdropping and tampering.
- **Reduced complexity:** mTLS can simplify security architecture by eliminating the need for separate authentication mechanisms.

## Key Considerations for Implementing mTLS:
Here are some key considerations for implementing mTLS:

- **Certificate Management:** Proper management of digital certificates is crucial to ensure the security and validity of mTLS sessions.  

- **Complexity:** Implementing mTLS can be more complex than traditional TLS, requiring careful configuration and management.

- **Compatibility:** Ensure that both the client and server applications support mTLS and can exchange certificates correctly.

> [SocketXP IoT Remote Access and Management Platform](/) has a built-in digital certificate manager that can manage digital certificates at scale.  It handles all the complexities involved in implementing mTLS and simplifies end user workflow involved in securing IoT devices.

## Use cases for mTLS

mTLS is used in a variety of applications, including:

### 1. HTTPS Web Service Security
mTLS can be used in the context of HTTPS server and HTTPS client communications to provide mutual authentication and encryption.

In a typical HTTPS connection, only the server is authenticated to the client using a TLS certificate. This is sufficient for many applications, such as browsing a website. However, in some cases, it is also desirable to authenticate the client to the server. This can be done using mTLS.

To implement [mTLS for HTTPS server and client communications](/blog/golang-https-web-server-self-signed-ssl-tls-x509-certificate/), both the server and client must have a TLS certificate. The server's certificate must be signed by a trusted certificate authority (CA), and the client's certificate must be signed by the same CA or by a CA that is trusted by the server.

When the client connects to the server, it sends its TLS certificate to the server. The server verifies the client's certificate and, if valid, authenticates the client. The server then sends its own TLS certificate to the client. The client verifies the server's certificate and, if valid, authenticates the server.

Once both the client and server have been authenticated, they can establish a secure HTTPS connection. All data transmitted over the connection will be encrypted using TLS.

**Examples:** [Nginx](https://www.bastionxp.com/blog/configure-nginx-server-ssl-certificate-mutual-tls-client-authentication/), Apache web servers, or any web service applications written in Golang, Java, Python support mTLS authentication.

### 2. Database Security
In a typical database connection, only the database server authenticates to the client using a TLS certificate. This is sufficient for many applications, such as a web application connecting to a database to retrieve data. However, in some cases, it is also desirable to authenticate the client to the database server. This can be done using mTLS.

To implement [mTLS for database server and client communications](https://www.bastionxp.com/blog/configure-mysql-database-server-client-ssl-certificate-mutual-tls/), both the database server and client must have a TLS certificate. The database server's certificate must be signed by a trusted certificate authority (CA), and the client's certificate must be signed by the same CA or by a CA that is trusted by the database server.

When the client connects to the database server, it sends its TLS certificate to the database server. The database server verifies the client's certificate and, if valid, authenticates the client. The database server then sends its own TLS certificate to the client. The client verifies the database server's certificate and, if valid, authenticates the database server.

Once both the client and database server have been authenticated, they can establish a secure database connection. All data transmitted over the connection will be encrypted using TLS.

Here are some specific examples of how mTLS can be used for database server and client communications:

- A company could use mTLS to protect access to its production database. This would help to prevent unauthorized users from accessing the database and stealing data.
- A healthcare provider could use mTLS to protect access to its patient database. This would help to prevent unauthorized users from accessing patient records.
- A financial services company could use mTLS to protect access to its customer database. This would help to prevent unauthorized users from accessing customer accounts and stealing money.

**Examples:** MySQL DB, Postgresql DB, and MongoDB support mTLS authentication.

### 3. API security

To use [mTLS for API security](https://www.bastionxp.com/blog/api-gateway-security-mtls-authentication), the API provider would need to generate a TLS certificate for the API. The API provider would then need to configure the API to require clients to authenticate using mTLS.

Clients would need to obtain a TLS certificate from a trusted CA. The client would then need to configure the client to authenticate to the API using mTLS.

When a client wants to access the API, it would send its TLS certificate to the API. The API would verify the client's certificate to ensure that it is signed by a trusted CA and that it belongs to the client.

If the client's certificate is valid, the API would allow the client to access the API. Otherwise, the API would deny the client access.

### 4. Microservices architecture

To use mTLS in a microservices architecture, each microservice would need to generate a TLS certificate. Each microservice would also need to be configured to require other microservices to authenticate using mTLS.

When a microservice wants to communicate with another microservice, it would send its TLS certificate to the other microservice. The other microservice would verify the certificate to ensure that it is signed by a trusted CA and that it belongs to the sending microservice.

If the certificate is valid, the other microservice would allow the sending microservice to communicate with it. Otherwise, the other microservice would deny the sending microservice access.

### 5. IoT security

To use mTLS for IoT security, the IoT device would need to obtain a TLS certificate. The IoT device would also need to be configured to authenticate to the server using mTLS.

When the IoT device wants to communicate with the server, it would send its TLS certificate to the server. The server would verify the certificate to ensure that it is signed by a trusted CA and that it belongs to the IoT device.

If the certificate is valid, the server would allow the IoT device to communicate with it. Otherwise, the server would deny the IoT device access.

[SocketXP IoT Device Management Platform](/) implements [mTLS authentication for IoT device access security](https://docs.socketxp.com/guide/mutual-tls-security/mutual-tls/).  All IoT devices are issued a TLS certificate and key.  Device connect to the platform using TLS client certificates for mTLS authentication.

### 6. Zero Trust security

To use mTLS for Zero Trust security, all users, devices, and network traffic would need to be configured to authenticate using mTLS.

When a user, device, or network traffic wants to access a resource, it would send its TLS certificate to the resource. The resource would verify the certificate to ensure that it is signed by a trusted CA and that it belongs to the user, device, or network traffic.

If the certificate is valid, the resource would allow the user, device, or network traffic to access it. Otherwise, the resource would deny access.

### 7. Service Mesh

A service mesh is a network infrastructure layer that provides a number of features for microservices, including mTLS. Service meshes can be used to deploy and manage microservices in a secure and reliable way.  Eg: Istio, Linkerd, AWS App Mesh

Service meshes work by intercepting all traffic between microservices. This allows the service mesh to provide a number of features, such as:

- **Load balancing:** The service mesh can distribute traffic between microservices in a balanced way. This helps to improve performance and reliability.
- **Service discovery:** The service mesh can help microservices to discover each other. This makes it easier for microservices to communicate with each other.
- **Fault tolerance:** The service mesh can help to make microservices more fault-tolerant. This helps to ensure that microservices remain available even if some of them fail.
- **Security:** The service mesh can help to secure communication between microservices. This can be done using a variety of mechanisms, such as mTLS.

mTLS plays an important role in service meshes by providing a secure way to authenticate and authorize microservices. mTLS ensures that only authorized microservices can communicate with each other. This helps to prevent unauthorized access to microservices and data.

Here is an example of how mTLS is used in a service mesh:

1. A microservice wants to communicate with another microservice.
2. The microservice sends its TLS certificate to the other microservice.
3. The other microservice verifies the certificate to ensure that it is signed by a trusted CA and that it belongs to the sending microservice.
4. If the certificate is valid, the other microservice allows the sending microservice to communicate with it.
5. The microservices communicate with each other using TLS encryption.

This process ensures that only authorized microservices can communicate with each other and that the communication is encrypted.

Service meshes and mTLS can be used to improve the security and reliability of microservices architectures. If you are using microservices, it is recommend using a service mesh to deploy and manage your microservices. You should also use mTLS to secure communication between your microservices.

## How to implement mTLS

To implement mTLS, both the client and server must have a TLS certificate. The certificate contains the public key of the owner and is signed by a [trusted certificate authority (CA)](/), for example [BastionXP CA](/).

To establish an mTLS connection, the client and server first exchange their certificates. The client then verifies the server's certificate to ensure that it is signed by a trusted CA and that it belongs to the server.

The server then verifies the client's certificate to ensure that it is signed by a trusted CA and that it belongs to the client.

Once the client and server have verified each other's certificates, they can establish a secure connection using TLS. All data transmitted over the connection will be encrypted and protected from eavesdropping and tampering.

## Open Source Tools to implement mTLS
There are a number of different open source and open standards based tools available today to implement mTLS in production. Here are some of the open source tools and technologies that generates TLS certificates for use with mTLS:

- **OpenSSL:** [OpenSSL](https://openssl.org) is a free and open-source toolkit for cryptography. OpenSSL can be used to generate and manage TLS certificates manually.
- **Let's Encrypt:** [Let's Encrypt](https://letsencrypt.org) is a public certificate authority that provides limited free TLS certificates to public servers and devices.
- **BastionXP PKI/CA:**  [BastionXP PKI/CA](/) is an enterprise-grade free and open standards based private certificate authority that provides unlimited free TLS certificates to servers and clients after a successful 2FA based authentication using OIDC SSO based 2FA login.  Also, it automates certificate rotation before well before the certificates expire, reducing the manual work involved and bolstering security.

Which tools and technologies you use to implement mTLS will depend on your specific needs.

## Real World mTLS Examples
Here are some specific examples of how mTLS is being used in the real world:

- Google Cloud Platform (GCP) uses mTLS to secure communication between its various services.
- Netflix uses mTLS to secure communication between its microservices in its IT datacenters.
- Amazon Web Services (AWS) uses mTLS to secure communication between its various services and with its customers' devices.
- Tesla uses mTLS to secure communication between its cars and its servers.
- The US Department of Defense is using mTLS to secure communication between its systems and with its contractors' systems.
- [SocketXP IoT Platform](https://www.socketxp.com) uses mTLS tunnels to secure communication between its cloud gateway, IoT devices and end user applications.


## How SSL certificates implement mTLS

SSL certificates implement mTLS by providing a method for the client and server to exchange their public keys. The public key is contained in the `subjectPublicKeyInfo` field of the certificate.

SSL certificates implement the [public key cryptography](https://ieeexplore.ieee.org/document/507642) which provides a very high level of security.

### Important fields in the certificate

The following fields in the certificate are important for mTLS:

- **Subject:** This field contains the identity of the certificate owner.  For example, the `common name` or `CN` filed could be set to the server's IP address, domain name, or the user's ID, name or email adddress.
- **Subject Alternative Name (SAN):** This field can contain additional identities for the certificate owner.
- **Issuer:** This field contains the identity of the CA that signed the certificate.
- **SubjectPublicKeyInfo:** This field contains the public key of the certificate owner.


### How the server and client identities are verified

To verify the server and client identities in mTLS, the following steps are typically taken:

1. The client sends its certificate to the server.
2. The server verifies the client's certificate by checking the following:
    - The certificate is signed by a trusted CA.
    - The certificate is valid (i.e., it has not expired and has not been revoked).
    - The certificate belongs to the client (i.e., the subject of the certificate matches the identity of the client).
3. The server sends its certificate to the client.
4. The client verifies the server's certificate by checking the following:
    - The certificate is signed by a trusted CA.
    - The certificate is valid (i.e., it has not expired and has not been revoked).
    - The certificate belongs to the server (i.e., the subject of the certificate matches the identity of the server).
 

In addition to the above steps, the following important fields in the certificates can be used to verify server and client identities:

- **Subject:** The subject field contains the identity of the certificate owner. This field can be used to verify that the client or server is who they claim to be.
- **Subject Alternative Name (SAN):** The SAN field can contain additional identities for the certificate owner. This field can be used to verify that the client or server is authorized to access the requested resource.
- **Issuer:** The issuer field contains the identity of the CA that signed the certificate. This field can be used to verify that the certificate is signed by a trusted CA.
- **SubjectPublicKeyInfo:** The subjectPublicKeyInfo field contains the public key of the certificate owner. This field can be used to verify the signature on the certificate.

For example, the client could verify the server's identity by checking that the server's certificate is signed by a trusted CA and that the subject of the certificate matches the hostname of the server that the client is trying to connect to.

The server could verify the client's identity by checking that the client's certificate is signed by a trusted CA and that the subject of the certificate matches the identity of the client that is trying to connect.


Here is a Sample Server Certificate with Server Identity issued by SocketXP IoT Gateway's CA Module:

{{<source-code>}}
$ openssl x509 -in /var/lib/socketxp/tls_server.crt -noout  -text
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            a2:d3:99:a7:9a:25:54:cb:05:fc:46:25:ed:12:93:c9
        Signature Algorithm: ecdsa-with-SHA256
        Issuer: CN=ca.socketxp.com
        Validity
            Not Before: Nov  7 10:56:24 2024 GMT
            Not After : Oct 14 10:56:24 2124 GMT
        Subject: CN=device123.internal.example.local
        Subject Public Key Info:
            Public Key Algorithm: id-ecPublicKey
                Public-Key: (256 bit)
                pub:
                    04:e3:71:06:ab:48:1b:62:ad:96:3f:7a:e0:be:4b:
                    6f:42:08:7f:1e:2a:10:85:89:98:12:12:68:1a:a0:
                    19:14:a4:ef:87:00:7b:42:14:0b:b9:67:59:88:0e:
                    74:55:e1:57:65:2f:45:36:a1:8b:d6:cb:8e:50:22:
                    c2:46:2f:7f:bf
                ASN1 OID: prime256v1
                NIST CURVE: P-256
        X509v3 extensions:
            X509v3 Key Usage: critical
                Digital Signature, Key Encipherment
            X509v3 Extended Key Usage: 
                TLS Web Server Authentication, TLS Web Client Authentication
            X509v3 Basic Constraints: critical
                CA:FALSE
            X509v3 Authority Key Identifier: 
                87:67:A2:BF:77:6E:6F:61:1C:0E:77:72:4D:95:7D:E6:54:D6:FF:3C
            X509v3 Subject Alternative Name: 
                DNS:device123.internal.example.local
    Signature Algorithm: ecdsa-with-SHA256
    Signature Value:
        30:45:02:20:28:32:03:08:1d:fe:3c:10:26:2f:29:b7:1d:8a:
        d4:f2:fc:6e:8a:24:82:74:88:0e:c5:d8:a0:d3:19:2f:...

{{</source-code>}}

Here is a sample Client Certificate with Client Identity issued by SocketXP IoT Gateway's CA Module:

{{<source-code>}}
$ openssl x509 -in ~/.bsh/tls_client.crt -noout  -text
Certificate:
    Data:
        Version: 3 (0x2)
        Serial Number:
            04:c5:84:c0:ec:09:21:2e:ca:71:20:09:74:f8:c1:fe
        Signature Algorithm: ecdsa-with-SHA256
        Issuer: CN=ca.socketxp.com
        Validity
            Not Before: Nov  7 10:56:35 2024 GMT
            Not After : Nov  8 10:56:35 2024 GMT
        Subject: CN=bob@example.com
        Subject Public Key Info:
            Public Key Algorithm: id-ecPublicKey
                Public-Key: (256 bit)
                pub:
                    04:0c:ee:3a:48:73:46:38:68:6a:5c:05:2e:d2:52:
                    92:6b:67:74:96:9f:59:c2:58:92:e3:84:aa:a0:33:
                    08:5b:69:e9:ca:97:06:86:bb:11:e7:fd:3b:5c:21:
                    04:6f:49:2a:6f:d9:b4:c3:85:23:c9:d9:b1:bc:82:
                    ef:42:0e:27:29
                ASN1 OID: prime256v1
                NIST CURVE: P-256
        X509v3 extensions:
            X509v3 Key Usage: critical
                Digital Signature, Key Encipherment
            X509v3 Extended Key Usage: 
                TLS Web Client Authentication
            X509v3 Basic Constraints: critical
                CA:FALSE
            X509v3 Authority Key Identifier: 
                87:67:A2:BF:77:6E:6F:61:1C:0E:77:72:4D:95:7D:E6:54:D6:FF:3C
            X509v3 Subject Alternative Name: 
                email:bob@example.com
    Signature Algorithm: ecdsa-with-SHA256
    Signature Value:
        30:45:02:20:3d:df:ad:e4:c7:53:0c:ed:23:63:e7:93:39:44:
        17:e4:57:b7:8d:74:ea:89:fe:61: ...
{{</source-code>}}  

The above certificates contains the server identity and user/client identity in the `Subject` field and `Subject Alternative Name` fields.

>Note: SocketXP IoT Gateway's CA module issues short-lived SSL TLS X.509 client certificates [valid for 24 hours only] by default to the end users or clients.  Users must renew their client certificates after the expiry period.  The CA provides granular control over who can access what resource and for how long.

By verifying the server and client identities, mTLS helps to prevent `man-in-the-middle` (MITM) attacks and other security threats.

## Limitations of mTLS

mTLS has a few limitations, including:

- **Increased complexity:** mTLS is slightly more complex to implement and configure than traditional TLS because now we need to get and use a client certificate in addition to getting the server certificate.  mTLS requires two-way authentication, while the traditional TLS requires just one-way authentication.
- **Performance overhead:** mTLS can add a small performance overhead to connections, given the extra authentication and validation it needs to perform on the identities of the endpoints involved.  But mTLS improves the endpoint security several fold and therefore the performance overhead is worth it.
- **Compatibility:** Not all clients and servers support mTLS.  Some legacy applications do not support mTLS.  But, all modern development tools and modern softwares support mTLS today.

### mTLS best practices for security:

Here are some mTLS best practices that should be followed for better security:

- Use a trusted CA such as [BastionXP CA](/) to sign your certificates.
- Keep your certificates up to date and rotate them frequently.  
- Use strong and latest encryption algorithms.
- Configure your clients and servers to verify certificates and identities properly.
- Monitor your server logs for suspicious activity.

## Conclusion

mTLS is a powerful security protocol that can be used to protect a variety of applications. It is becoming increasingly popular as organizations look to improve the security of their systems and data.

mTLS offers a number of benefits, including:

- Mutual authentication: mTLS ensures that both the client and server are who they claim to be. This prevents man-in-the-middle attacks, where an attacker intercepts communication between two parties and impersonates one of them.
- Improved security: mTLS encrypts all data transmitted over the connection, protecting it from eavesdropping and tampering.
- Reduced complexity: mTLS can simplify security architecture by eliminating the need for separate authentication mechanisms.

mTLS is used in a variety of applications, including: Web Services security, Databases security, API security, Microservices architecture, Service Mesh, IoT Security, Zero Trust Security.

If you are looking for a way to improve the security of your application, mTLS is a good option to consider.

[SocketXP IoT Management Platform's](/) built-in CA module automates certificate generation, distribution and rotation at scale, thereby eleminating the manual work and reducing the complexity involved, without compromising the security.

