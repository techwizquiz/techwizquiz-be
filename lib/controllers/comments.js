import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth.js';
import Comment from '../models/Comment.js';

export default Router() 
  .post('/api/v1/comments', ensureAuth, async (req, res) => {
    try {
      const comment = await Comment.insert({ ...req.body, userId: req.user.id });
      res.send(comment);
    } catch(err) {
      res.status(401).send(err);
    }
  })

  .get('/api/v1/comments/:id', async (req, res) => {
    try {
      const question = await Comment.findAllCommentsByQuestionId(req.params.id);
      res.send(question);
    } catch (err) {
      res.status(400).send(err);
    }
  });
