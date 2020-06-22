import './auth0'
import './user-data';
import "./trello";
import { moduleCollector, logDebug } from "@cbto/rest-helper";
import {
  useJsonConfig,
  loadJsonConfig,
} from "@cbto/rest-helper/dist/lib/util/Configuration";
import express from "express";
import bodyParser from "body-parser";
import { mongoHelper } from "@cbto/data-helper";

// first configuration
const app = express();

// put your middlewares here
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// register routes
moduleCollector.getRegisteredModule().forEach((module) => {
  module.applyMiddlewares(app);
  module.registerEndpoints(app);
});

loadJsonConfig("default")
  .then(() => {
    return mongoHelper.connect(useJsonConfig("mongo.connectionString"));
  })
  .then(() => {
    mongoHelper.setDbName(useJsonConfig("mongo.dbname"));
  })
  .then(() => {
    const port = +(useJsonConfig("port") || process.env.PORT);
    // start your server with custom port
    app.listen(port, (err) => {
      if (err) {
        console.log(err);
      }
    });
  })
  .catch((err) => {
    logDebug(JSON.stringify(err));
  });
