import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth.js';
import Comment from '../models/Comment';

export default Router() 
  .post('/api/v1/comments', ensureAuth, async (req, res) => {
    try {
      const comment = await Comment.insert({ ...req.body, userId: req.user.id });
      res.send(comment);
    } catch(err) {
      res.status(401).send(err);
    }
  });
