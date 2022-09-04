import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema.js';
import connectDB from './config/db.js';

const app = express();
dotenv.config();

app.get('/', (req, res) => {
  res.send('APP IS RUNNING');
});

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`App is running on port ${port}`));

connectDB();
