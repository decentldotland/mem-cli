import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { archive } from "./arseed.js";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: "*",
  }),
);

app.use(bodyParser.json({ limit: "50mb" }));

app.use((err, req, res, next) => {
  res.status(500).send({ error: "invalid JSON input" });
  return;
});

app.post("/mem-cli", async (req, res) => {
  try {
    const arseedTx = await archive(req?.body);
    if (!arseedTx) {
      res.json({ status: "error" });
      return;
    }
    res.json({
      status: "ok",
      bytesSize: Number(req.headers["content-length"]),
      txid: arseedTx,
    });
    return;
  } catch (error) {
    res.json({ status: "error" });
    return;
  }
});

console.log(`[mem-cli-server] server running @ :${port}`);
app.listen(port);
