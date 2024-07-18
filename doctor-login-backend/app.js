const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const connectDB = require("./config/db");
const port = 4000;
const app = express();
const apiRoutes = require('./routes/api')

connectDB();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
 
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.json());
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Connection Started ${port}`);
});
