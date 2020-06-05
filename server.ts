import { moduleCollector } from "@cbto/rest-helper";
import express from "express";

// first configuration
const app = express();

// put your middlewares here

// register routes
moduleCollector.getRegisteredModule().forEach((module) => {
    module.registerEndpoints(app);
});

// start your server with custom port
app.listen(2002, (err) => {
    if (err) {
        console.log(err);
    }
});