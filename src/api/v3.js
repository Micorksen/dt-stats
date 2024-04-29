import joi from 'joi';
import { Router } from 'express';
import { baseSchema } from './common.js';

const router = Router()
const schema = baseSchema.keys({
  avg_resolution_time: joi.number(), // in minutes
  avg_response_time: joi.number(), // in minutes
  categories: joi.number().integer(),
  guilds: joi.number().integer(),
  members: joi.number().integer(),
  messages: joi.number().integer(),
  tags: joi.number().integer(),
  tickets: joi.number().integer().required(),
}).rename('client', 'id')

router.get('/current', (req, res) => {
   
})

router.get('/history', async (req, res) => {
  const days = req.query.days || 30;
  const date = new Date(Date.now() - (days * 24 * 60 * 60 * 1000))
  res.send(await req.db.collection('snapshots').find({ date: { $gte: date } }))
})

router.post('/houston', async (req, res) => {
  const { error, value } = schema.validate(req.body)
  if (error) {
    return res.status(400).send(error)
  }

  const id = value.id;
  delete value.id;
  value.last_seen = new Date();
  return await req.db.collection('clients').updateOne(
    { _id: id },
    { $set: value },
    { $setOnInsert: { first_seen: new Date() } },
    { upsert: true },
  )
})

export default router