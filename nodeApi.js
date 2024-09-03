const cors = require("cors");
const http = require("http");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
app.use(cors());
var fs = require("fs");
const { Pool, Client } = require("pg");

// Database connection configuration
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "admin",
  port: 5432,
});

client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database", err);
  });

urlencoded = bodyParser.json();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(express.static("public"));

app.get("/", function (req, res, next) {
  //res.end();
  console.log("First url called...");
  next();
  //res.sendFile(path.join(__dirname, "node/form.html"));
});

app.use("/", function (req, res, next) {
  console.log("Second url called...");
  next();
});

app.get("/users", function (req, res) {
  client.query("SELECT * FROM learnz.userdetails", (err, result) => {
    if (err) {
      console.error("Error executing query", err);
    } else {
      res.end(JSON.stringify(result.rows));
      //console.log("Query result:", result.rows);
    }
  });
});

app.post("/signUp", function (req, res) {
  let response = {
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    age: req.body.age,
    mail: req.body.mail,
    username: req.body.mail,
    password: req.body.password,
    confirm_password: req.body.password,
  };

  client.query(
    `SELECT username from learnz.userdetails WHERE username = '${response.username}'`,
    (err, data) => {
      if (err) {
        let errorResponse = {
          status: false,
          msg: err,
        };
        res.send(JSON.stringify(errorResponse));
      } else {
        if (data.rows.length === 0) {
          client.query(
            `INSERT INTO learnz.userdetails(firstname,secondname,age,mail,username,password,confirm_password) VALUES('${response.firstName}','${response.secondName}','${response.age}','${response.mail}','${response.username}','${response.password}','${response.confirm_password}')`,
            (err, data) => {
              if (err) {
                let errorResponse = {
                  status: false,
                  msg: err,
                };
                res.send(JSON.stringify(errorResponse));
              } else {
                let successResponse = {
                  status: true,
                  msg: "Register successfully...",
                };
                res.send(JSON.stringify(successResponse));
              }
            }
          );
        } else {
          let successResponse = {
            status: true,
            msg: "Mail ID already registered",
          };
          res.send(JSON.stringify(successResponse));
        }
      }
    }
  );
});

app.post("/login", function (req, res) {
  const userData = req.body;
  let response = {
    username: userData.username,
    password: userData.password,
  };
  client.query(
    `SELECT username,password from learnz.userdetails WHERE username = '${response.username}' AND password = '${response.password}' `,
    function (err, data) {
      console.log(data.rows);
      if (data.rows.length === 1) {
        let loginStatus = {
          status: true,
          msg: "Logged in successfully",
        };
        res.send(JSON.stringify(loginStatus));
      } else {
        let loginStatus = {
          status: false,
          msg: "Invalid Credentails",
        };
        res.send(JSON.stringify(loginStatus));
      }
    }
  );
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
