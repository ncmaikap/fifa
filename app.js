const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const fs = require("fs");
const csvParser = require("csv-parser");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/v1/players/:id", (req, res) => {
  var id = req.params.id;
  const results = [];

   fs.createReadStream("fifa.csv")
    .pipe(csvParser())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      if(results.length > 0){
        var data=results.filter((item) => item.id === id);
        res.status(200);
        if(data.length > 0){
          res.status(200);
          res.send({"data":data,"message":"Data Fetched Successfully"});
        }
        else{
          res.status(200);
          res.send({"data": [], "message":"No data found"});
        }
      }else{
        res.status(400);
        res.send({"data": [], "message":"No data found"});
      }
      //console.log(results); // Outputs array of objects
    });
    
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
