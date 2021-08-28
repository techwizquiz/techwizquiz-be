import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth.js';
import Response from '../models/Response.js';

export default Router() 
  .post('/api/v1/responses', ensureAuth, async (req, res) => {
    try {
      const response = await Response.insert({ ...req.body, userId: req.user.id });
      res.send(response);
    } catch(err) {
      res.status(401).send(err);
    }
  });
