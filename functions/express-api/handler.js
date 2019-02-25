"use strict";

module.exports = (event, context) => {
  const result = {
    status: {
      emoji: "🦄",
      body: event.body,
      path: event.path
    }
  };

  context.status(200).succeed(result);
};
