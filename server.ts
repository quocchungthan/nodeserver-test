import "./trello";
import {
  moduleCollector,
  useJsonConfig,
  loadJsonConfig,
} from "@cbto/rest-helper";
import express from "express";
import bodyParser from "body-parser";

// first configuration
const app = express();

// put your middlewares here
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// register routes
moduleCollector.getRegisteredModule().forEach((module) => {
  module.registerEndpoints(app);
});

loadJsonConfig("default").then(() => {
  const port = +(useJsonConfig("port") || process.env.PORT);
  // start your server with custom port
  app.listen(port, (err) => {
    if (err) {
      console.log(err);
    }
  });
});
