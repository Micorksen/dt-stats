import joi from 'joi';
import { Router } from 'express';
import { baseSchema } from './common.js';

const router = Router();
const schema = baseSchema.keys({
  guilds: joi.array().items(joi.object({

  })).required(),
})

export default router;