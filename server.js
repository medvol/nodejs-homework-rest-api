const app = require("./app");
const mongoose = require("mongoose");
// Password gzzO7DSY4QtKXGec
const { PORT = 3000 } = process.env;
const DB_HOST =
  "mongodb+srv://admin:gzzO7DSY4QtKXGec@cluster0.vnec5ua.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => console.log("database connect success"))
  .catch((error) => console.log(error.message));

app.listen(PORT, () => {
  console.log("Server running. Use our API on port: 3000");
});
