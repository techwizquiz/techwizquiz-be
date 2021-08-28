import { Router } from 'express';
import Response from '../models/Response.js';

export default Router() 
  .post('/api/v1/responses', async (req, res) => {
    try {
      const response = await Response.insert(req.body);
      res.send(response);
    } catch(err) {
      res.status(401).send(err);
    }
  });
