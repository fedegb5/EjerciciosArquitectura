import express, { Request, Response } from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());
const port = 3001;
const listOfSubscriptions: { [key: string]: boolean } = {};

const subscribe = async (topics: string[]) => {
    const client = createClient();
    const subscriber = client.duplicate();
    await subscriber.connect();
    for (const scorer of topics) {
        if (!listOfSubscriptions[scorer]) {
            listOfSubscriptions[scorer] = true; 
            console.log(`Subscribing to "${scorer}" topic`);
            await subscriber.subscribe(scorer, (message) => {
                console.log(message);
            });
        } else {
            console.log(`Already subscribed to "${scorer}" topic`);
        }
    }
};

app.post("/goals/subscribe", async (req: Request, res: Response) => {
    const { scorers } = req.body;
    try {
      await subscribe(scorers);
      res.send(`You are suscribed to "${scorers}"`);
    } catch (error) {
      console.error("Error subscribing:", error);
      res.status(500).send("Error subscribing");
    }
  });
  
  app.listen(port, () => {
    console.log(`Subscriber server listening on port ${port}`);
  });