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
  })

  .get('/api/v1/responses/:userId/:questionId/status', async (req, res) => {
    try {
      const response = await Response.DidUserAnswerCorrectly(req.params.userId, req.params.questionId);
      res.send(response);
    } catch(err) {
      res.status(400).send(err);
    }
  })

  .get('/api/v1/responses/:id/correct', async (req, res) => {
    try {
      const response = await Response.findAllCorrectResponsesByUserId(req.params.id);
      res.send(response);
    } catch(err) {
      res.status(400).send(err);
    }
  })

  .get('/api/v1/responses/:id/incorrect', async (req, res) => {
    try {
      const response = await Response.findAllIncorrectResponsesByUserId(req.params.id);
      res.send(response);
    } catch(err) {
      res.status(400).send(err);
    }
  });

  
