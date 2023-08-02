import { app } from "./app.js";
import { config } from "dotenv";
import { connectDB } from "./data/database.js";

//configuring the env file with our server so that file is accessible everywhere
config({ path: "./data/config.env" });

//connecting the database with our server
connectDB();

//server listening on specified port in env file
app.listen(process.env.PORT, () =>
  console.log("listening on port " + process.env.PORT)
);
