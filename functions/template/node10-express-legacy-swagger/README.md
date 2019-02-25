This template is adapted from https://github.com/openfaas-incubator/node10-express-template

Its main purpose is to explore how legacy express REST apis can be combined with an OpenFaaS template.

Swagger and a legacy router based endpoint are provided for demonstration purposes.

http://YOUR_IP:8080/function/express-api/swagger/#/System/get_legacy_


http://localhost:3000/legacy


http://localhost:3000/swagger/#/System/get_legacy_

You will note there are still pathing issues when testing locally vs deployed.