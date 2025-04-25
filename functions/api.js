import express from "express";
import ServerlessHttp from "serverless-http";

const api = express();
api.get("/.netlify/functions/api", (req, res) => {
  res.send("Hello World!");
});
api.get("/.netlify/functions/api/hello", (req, res) => {
  res.send("Hello World!");
});
export const handler = ServerlessHttp(api);
