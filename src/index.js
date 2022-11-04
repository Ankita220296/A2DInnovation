const express = require("express");
const mongoose = require("mongoose");
const route = require("./route/route");
const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://Ankita220296:Ankita704696@cluster0.d9vvv.mongodb.net/A2DInnovationDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(3000, function () {
  console.log("Express app running on port " + 3000);
});
