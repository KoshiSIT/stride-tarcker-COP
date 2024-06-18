"use strict";

if (process.env.NODE_ENV === "production") {
  module.exports = require("./cjs/react-jsx-runtime.production.min.js");
} else {
  console.log("NODE_ENV developmentttttttttttttttttttttttttttttttttttttt");
  module.exports = require("./cjs/react-jsx-runtime.development.js");
}
