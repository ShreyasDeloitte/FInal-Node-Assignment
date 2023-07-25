const express = require("express");
const bodyParser = require("body-parser");
const { signUpRoute } = require("./routes/signUpRoute");
const { loginRoute } = require("./routes/loginRoute");
const app = express();
const mongoose = require("mongoose");
const { hackathonRoute } = require("./routes/hackathonRoute");
const { employeeRoute } = require("./routes/employeeRoute");
const { companyRoute } = require("./routes/companyRoute");
const PORT = process.env.PORT | 5006;

mongoose
  .connect(
    "mongodb+srv://shreyaskulal:shreyaskulal@cluster0.f4u7pcj.mongodb.net/node_db?retryWrites=true&w=majority"
  )
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to shreyas assignment file");
});

app.use("/signup", signUpRoute);
app.use("/login", loginRoute);
app.use("/hackathon", hackathonRoute);
app.use("/employee", employeeRoute);
app.use("/company", companyRoute);

app.listen(PORT, (req, res) => {
  console.log(`Server listening to Port ${PORT}`);
});
