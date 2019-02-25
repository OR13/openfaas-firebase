// Copyright (c) Alex Ellis 2017. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const handler = require("./function/handler");
const createMiddleware = require("./src/openfaas/createMiddleware");
const middleware = createMiddleware(handler);

const routes = require("./src/routes");

app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text({ type: "text/*" }));
app.disable("x-powered-by");

// 404 Middleware
const pageNotFound = (req, res, next) => {
  if (["/", "/swagger"].indexOf(req.url) === -1) {
    res.status(404).json({
      message: "OpenFaaS REST API Endpoint Not Found",
      url: req.url
    });
  } else {
    next();
  }
};

const swaggerDoc = swaggerJSDoc({
  definition: {
    info: {
      title: "OpenFaaS Express API",
      version: "0.0.0",
      description: "OpenFaaS Express API"
    },
    basePath: "/function/express-api/"
  },
  // Path to the API docs
  apis: ["./src/routes/index.js"]
});

// Swagger
app.use(
  "/swagger",
  swaggerUi.serve,
  pageNotFound,
  swaggerUi.setup(swaggerDoc, {
    explorer: true
  })
);

app.use("/legacy/*", routes);
app.use("/", middleware);

const port = process.env.http_port || 3000;

app.listen(port, () => {
  console.log(`🦄 OpenFaaS Node.js Express API listening on port: ${port}`);
});
