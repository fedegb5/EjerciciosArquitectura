import express from "express";
import Pipeline from "./Pipeline";
import {badWords} from "./filters";
import axios from "axios"; 

 
const app = express();
app.use(express.json());
const port = 3000;
 
app.get("/api/posts", function (req, res) {
  const id: string = req.query.id?.toString()||"";

  if (!id || isNaN(parseInt(id))) {
    res.status(400).send({ error: "ID must be a number" });
    return;
  }

  axios
  .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
  .then(function (response) {
    const post = response.data; 

    axios
    .get(`https://jsonplaceholder.typicode.com/comments?postId=1&id=1`)
    .then(function (responseComment) {
      const comment = responseComment.data;   
      const bodies = 'Post: \n' + post.body + '\n Comment: \n' + comment[0].body


      var pipeline = new Pipeline();
      pipeline.use(badWords);

      const result = pipeline.run(bodies);
      res.send(result);
     })
    .catch(function (error) {
    console.log(error);
      res.send("Unable to retrieve comments from the API");
    });
  })
  .catch(function (error) {
    console.log(error);
    res.send("Unable to retrieve posts from the API");
  });
});

 


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});