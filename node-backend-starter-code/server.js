var express = require("express");
var bodyParser = require('body-parser'); //Added body-parser require
var app = express();
var fs = require("fs");
var path = require("path");

app.use(express.static(path.join(__dirname, "/public"))); //Closed  parenthesis
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "public")));

app.get("/favorites", function(res){
  var data = fs.readFileSync("./data.json");
  res.setHeader("Content-Type", "application/json");
  res.send(data);
});

app.get("favorites", function(req, res){
  if(!req.body.name || !req.body.oid){
    res.send("Error");
    return;

  var data = JSON.parse(fs.readFileSync("./data.json"));
  data.push(req.body);
  fs.writeFile("./data.json", JSON.stringify(data)); //Closed parenthesis
  res.setHeader("Content-Type", "application/json");
  res.send(data);
}

app.listen(3000, function(){ //Corrected to app.listen
  console.log("listening on port 3000!");
});
}); //Closed function