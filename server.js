const express = require("express");
const app = express();


const { createServer } = require("http");

const httpServer = createServer(app);


const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
require("dotenv").config({ path: "./config.env" });

const connectDb = require("./utilsServer/connectDb");


app.use(express.json());






app.use(express.json());

const PORT = process.env.PORT || 3000;


nextApp.prepare().then(() => {

   app.use("/api/signup", require("./api/signup"));
  
  app.use("/api/auth", require("./api/auth"));
 
  app.use("/api/shop", require("./api/shop"));
  app.use("/api/profile", require("./api/profile"));
  app.use("/api/search", require("./api/search"));
  app.use("/api/appointment", require("./api/appointment"));
  app.use("/api/addtocart",require("./api/addtocart"))
  app.all("*", (req, res) => handle(req, res));
  
  connectDb().then(() => {
    httpServer.listen(PORT, err => {
    
    if (err) throw err;
    console.log(`Express server  running ${PORT}`);
  });
  });
});
