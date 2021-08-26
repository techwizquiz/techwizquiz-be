import { Router } from 'express';
import Question from '../models/Question.js';

export default Router()
  .post('/api/v1/questions', async (req, res) => {
    try {
      const question = await Question.insert(req.body);
      res.send(question);
    } catch(err) {
      res.status(401).send(err);
    }
  })

  .get('/api/v1/questions', async (req, res) => {
    try {
      const questions = await Question.findAllQuestions();
      res.send(questions);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
