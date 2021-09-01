var express = require('express');
var app = express();
var absolutePath = __dirname + "/views/index.html";
require("dotenv").config();
console.log("Hello World");

// Root level request logger middleware
app.use((req, res, next)=>{
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
})


app.get("/1", function(req, res){
  res.send("Hello Express");
})

app.get("/2", (req, res)=>{
  res.sendFile(absolutePath);
});

/*
app.use(express.static(__dirname + "/"));
// The path of .use function's first argument is by default "/" if first argument is not mention and it will match any path which is immediately after "/" 
*/
console.log(__dirname);

app.use(express.static(__dirname + "/views"));
// In index.html file the link tag have href attribute is set to /public/style.css so only call root ("/") in next static file implementation and that will directly attach the style.css file to index.html file
app.use(express.static(__dirname + "/"));

// Transfer json format
app.get("/json1", (req, res)=>{
  res.json({ message: "Hello json"});
});

// .env for passing enviroment variable
//console.log(process.env.MESSAGE_STYLE);
app.get("/json", (req, res)=>{
  if(process.env.MESSAGE_STYLE === "uppercase"){
    res.json({message: "HELLO JSON"});
  }
  else{
    res.json({message: "Hello json"});
  }
})

// To create time server chain the middleware
app.get("/now", (req, res, next)=>{
  req.time = new Date().toString();
  next();
}, (req, res)=>{
  res.json({time: req.time});
})


























 module.exports = app;
