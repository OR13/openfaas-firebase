# OpenFaaS Firebase

This project is for exploring interoperation between legacy REST APIs, Firebase Functions and OpenFaaS.

## Getting Started

I recommend following this tutorial first. 

https://www.openfaas.com/blog/digitalocean-one-click/

After completing the tutorial, you will likely want to explore customizing templates, or porting some small exisiting codebase.

## Testing Locally


Take a look at the docker image you built as part of the tutorial:

```
docker images
```

Run the image directly:

```
docker run -p 3000:3000 or13/express-api
```

Make some changes to `./template/node10-express-legacy-swagger` and rebuild your function:

```
faas-cli build
```


Run the image again to see the changes:

```
docker run -p 3000:3000 or13/express-api
```

Next steps are to test integration with firebase functions, which I find easier to do in another repo... If you are interested in that part, I'm basically tweaking this:

https://codeburst.io/express-js-on-cloud-functions-for-firebase-86ed26f9144c