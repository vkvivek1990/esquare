const http = require("http");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
var fs = require("fs");

urlencoded = bodyParser.json();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "form.html"));
});

app.get("/signUp", function (req, res) {
  console.log(req.query, "test");
  let response = {
    firstName: req.query.firstName,
    secondName: req.query.secondName,
  };
  res.send(JSON.stringify(response));
});
app.post("/postSignUp", function (req, res) {
  console.log(req.body, "Post request");
  let response = {
    firstName: req.body.firstName,
    secondName: req.body.secondName,
  };
  res.send(JSON.stringify(response));
});

app.get("/:id", function (req, res) {
  fs.readFile(__dirname + "/" + "users.json", "utf8", (err, data) => {
    const users = JSON.parse(data);
    const user = users["user" + req.params.id];
    res.end(JSON.stringify(user));
  });
});

app.post("/addUser", urlencoded, (req, res) => {
  fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
    var users = JSON.parse(data);
    var user = req.body;
    console.log(req.body);
    users = { ...users, ...user };
    res.end(JSON.stringify(users));
  });
});

app.delete("/:id", function (req, res) {
  fs.readFile(__dirname + "/" + "users.json", "utf8", (err, data) => {
    const users = JSON.parse(data);
    const id = "user" + req.params.id;
    const user = users[id];
    delete users[id];
    res.end(JSON.stringify(users));
  });
});

app.put("/:id", urlencoded, function (req, res) {
  fs.readFile(__dirname + "/" + "users.json", "utf8", (err, data) => {
    const users = JSON.parse(data);
    const id = "user" + req.params.id;
    users[id] = req.body;
    res.end(JSON.stringify(users));
  });
});

app.listen(5000, function () {
  console.log("Port running at 5000");
});

// http
//   .createServer(function (req, res) {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end(`
//       <h1>With Node Js http</h1>
//       <form action = "/api/upload" method="post" enctype ="multipart/form-data">
//       <div>Upload file : <input type="file" name="multiplefiles" multiple="multiple"/></div>
//       <input type="submit" value="upload"/>
//       </form>
//       `);
//   })
//   .listen(3000);
// server.listen(3000);

// setTimeout(() => {
//   console.log("Waiting time over");
// }, 1000);

// const data = fs.readFileSync("input.txt");
// console.log(data.toString());
// fs.readFile("input.txt", (err, data) => {
//   if (err) console.log(err + "error throws");
//   console.log(data.toString());
// });

// let i = 1;
// while (i <= 5) {
//   console.log("loop runs with" + i);
//   i++;
// }
// console.log("Port running @ 3000");
