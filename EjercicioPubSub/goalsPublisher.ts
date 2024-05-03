import express from "express";
import dotenv from "dotenv";
import {createClient} from "redis";
import {Goal} from "./types";

dotenv.config();

const app = express();
app.use(express.json());
const port = 3000;
const client = createClient();

app.post("/goals/publish", async function (req, res) {
  const message: Goal = req.body;
  try {
    await client.connect();
    await client.publish(message.scorer, JSON.stringify(message));
  } catch (error) {
    console.log(error);
    res.send("The post has failed")
  } finally {
    await client.disconnect();
  }
  res.send("Goal of " + message.scorer + " was published");
});

app.listen(port, () => {
  console.log(`Publisher listening on port ${port}`);
});