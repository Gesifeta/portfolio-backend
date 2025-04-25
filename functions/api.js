import express from "express";
import ServerlessHttp from "serverless-http";

const api = express();
api.get("/api", (req, res) => {
  res.send("SERVER RUNNING....");
});
api.get("/api/hello", (req, res) => {
  res.send("Hello World!");
});
export const handler = ServerlessHttp(api);
