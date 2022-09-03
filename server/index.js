import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema.js";
import connectDB from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, console.log(`App is running on port ${port}`));
