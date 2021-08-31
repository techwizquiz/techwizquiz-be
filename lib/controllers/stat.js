import { Router } from 'express';
import Stat from '../models/Stat.js';
import ensureAuth from '../middleware/ensure-auth.js';

export default Router()
  .post('/api/v1/stats', ensureAuth, async (req, res) => {
    try {
      const stat = await Stat.insert({ ...req.body, userId: req.user.id });
      res.send(stat);
    } catch (err) {
      res.status(401).send(err);
    }
  });


