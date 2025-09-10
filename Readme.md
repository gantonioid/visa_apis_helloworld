# Visa APIs HelloWorld - Complete Setup Guide

## What We've Built

### Backend (Express)
Express backend, just and endpoint `http://localhost:4000/api/visa-test` that makes a request to `https://sandbox.api.visa.com/vdp/helloworld`, signing the request with the proper certificates and adding Basic Authorization encoding user and password in B64

The response is like this
```json
{
  "timestamp": "2025-09-10T17:27:25",
  "message": "helloworld"
}
```

We need a folder `./backend/certs` with three files
#### cert.pem
You can get this file from the developer portal, in the Credentials section, under 'Credentials'. Mine was `C4YIFRHI0QGTZAFDPFQF.....`

Here you'll see a small arrow pointing down, to the left of `C4YIFRHI0QGTZAFDPFQF.....`. There you will see User ID and Password, that you'll need to set in your `.env` file.

#### key.pem
The key of your VISA project, you got this when you created the project in the developer portal.

#### ca.pem
Concatenation of the Internal + Root files. You get these from the developer portal, in the Credentials section. Under 'Common Certificates' there are `Visa Development Platform Root Certificate` and `Visa Development Platform Intermediate Certificate`.

You can run 
```bash
cat SBX-2024-Prod-Inter.pem SBX-2024-Prod-Root.pem > ca.pem
```
Ensure there is a line break between the two blocks.
```txt
-----BEGIN CERTIFICATE-----
MIIFHTCCAwWgAwIBAgIPZfGeAAAAbDk7n91zmlPLMA0GCSqGSIb3DQEBCwUAME4x
.....
ucP9PVoi5t8Q1+oIjU1YCdE=
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
MIIFZzCCA0+gAwIBAgIPZfGeAAAAaBpuTsP3rfE3MA0GCSqGSIb3DQEBCwUAME4x
....
-----END CERTIFICATE-----
```

#### Run it
```bash
cd backend
npm i
node index.js
# Backend running at http://localhost:4000
```

### Frontend (React)

Super simple website with a button "Call Visa API" that invokes the backend's `http://localhost:4000/api/visa-test` API and shows the response.

#### Run it
```bash
cd web
npm i
npm run dev
#   VITE v7.1.5  ready in 177 ms
#
#  ➜  Local:   http://localhost:5173/
#  ➜  Network: use --host to expose
#  ➜  press h + enter to show help
```