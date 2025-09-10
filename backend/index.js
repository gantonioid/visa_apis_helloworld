import express from "express";
import axios from "axios";
import https from "https";
import fs from "fs";
import cors from 'cors'

const app = express();
app.use(cors({
    origin: "http://localhost:5173"
}))

// Load Visa sandbox certificates (downloaded from Visa Developer project)
const agent = new https.Agent({
    cert: fs.readFileSync("./certs/cert.pem"),
    key: fs.readFileSync("./certs/key.pem"),  // private key
    ca: fs.readFileSync("./certs/ca.pem"),         // combined Sandbox CA
    rejectUnauthorized: false               // ensure TLS verification
});

// Replace with your Visa sandbox creds
const USER_ID = process.env.USER_ID ?? '';
const PASSWORD = process.env.PASSWORD ?? '';

app.get("/api/visa-test", async (req, res) => {
    try {
        const response = await axios.get(
            "https://sandbox.api.visa.com/vdp/helloworld",
            {
                httpsAgent: agent,
                headers: {
                    Authorization:
                        "Basic " +
                        Buffer.from(`${USER_ID}:${PASSWORD}`).toString("base64"),
                },
            }
        );

        res.json(response.data);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: "Visa API call failed" });
    }
});

app.listen(4000, () => {
    console.log("Backend running at http://localhost:4000");
});
