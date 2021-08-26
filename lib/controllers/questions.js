import { Router } from 'express';
import Question from '../models/Question';

export default Router()
  .get('/api/v1/questions', async (req, res) => {
    try {
      const questions = await Question.findAllQuestions();
      res.send(questions);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
