import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import v3 from './api/v3.js';
import v4 from './api/v4.js';

config();

const app = express();
app.use(cors(), express.json());
app.use((req, res, next) => {
  req.db = mongoose.connection
  if (req.db.readyState !== 1) {
    return res.status(503).send({ message: 'Service Unavailable' })
  }

  next()
});

app.get('/', (_req, res) => res.redirect('https://grafana.eartharoid.me/d/n5IceB34z/discord-tickets-h4?orgId=1'))
app.use('/api/v3', v3)
app.use('/api/v4', v4)

app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.DB_URI)
    console.log('Connected to MongoDB!')
  } catch (error) {
    console.error(error)
  }

  const db = mongoose.connection
  db.on('error', console.error)
  console.log('Started the app!')
})