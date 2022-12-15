const app = require("./app");
const mongoose = require("mongoose");
require('colors')

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database connection successful".cyan.bold);
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
