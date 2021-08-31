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
  })

  .get('/api/v1/stats/:id/', async (req, res) => {
    try {
      const response = await Stat.findScoreByUserId(req.params.id);
      res.send(response);
    } catch(err) {
      res.status(400).send(err);
    }
  })

  .patch('/api/v1/stats/:id/', ensureAuth, async (req, res) => {
    try {
      const response = await Stat.updateScore(req.body.score, req.params.id);
      res.send(response);
    } catch(err) {
      res.status(401).send(err);
    }
  });

  


