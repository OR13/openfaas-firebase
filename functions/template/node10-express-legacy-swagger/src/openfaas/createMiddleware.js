let isArray = a => {
  return !!a && a.constructor === Array;
};

let isObject = a => {
  return !!a && a.constructor === Object;
};

class FunctionEvent {
  constructor(req) {
    this.body = req.body;
    this.headers = req.headers;
    this.method = req.method;
    this.query = req.query;
    this.path = req.path;
  }
}

class FunctionContext {
  constructor(cb) {
    this.value = 200;
    this.cb = cb;
    this.headerValues = {
      "content-type": "application/json"
    };
  }

  status(value) {
    if (!value) {
      return this.value;
    }

    this.value = value;
    return this;
  }

  headers(value) {
    if (!value) {
      return this.headerValues;
    }

    this.headerValues = value;
    return this;
  }

  succeed(value) {
    let err;
    this.cb(err, value);
  }

  fail(value) {
    let message;
    this.cb(value, message);
  }
}

const createMiddleware = handler => {
  const middleware = (req, res) => {
    let cb = (err, functionResult) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      if (isArray(functionResult) || isObject(functionResult)) {
        res
          .set(fnContext.headers())
          .status(fnContext.status())
          .send(JSON.stringify(functionResult));
      } else {
        res
          .set(fnContext.headers())
          .status(fnContext.status())
          .send(functionResult);
      }
    };

    let fnEvent = new FunctionEvent(req);
    let fnContext = new FunctionContext(cb);

    handler(fnEvent, fnContext, cb);
  };
  return middleware;
};

module.exports = createMiddleware;
