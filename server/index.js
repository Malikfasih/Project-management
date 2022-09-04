import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema.js';
import connectDB from './config/db.js';
// const path = require('node:path');

const app = express();
dotenv.config();

// if (process.env.NODE_ENV === 'production') {
//   //this will serve our react app to server
//   app.use(express.static(path.join(__dirname, '/client/build')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
//   });
// } else {
//   app.get('/', (req, res) => {
//     res.send('Api is running');
//   });
// }

// app.use(express.static('public'));

// app.get('*', (req, res) => {
//   res.sendFile(path.reslove(__dirname, 'public', 'index.html'));
// });

app.get('/', (req, res) => {
  res.send('APP IS RUNNING');
});

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    // graphiql: process.env.NODE_ENV === 'production',
    graphiql: true,
  })
);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`App is running on port ${port}`));

connectDB();
