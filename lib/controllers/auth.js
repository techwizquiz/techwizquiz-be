import { Router } from 'express';
import User from '../models/User.js';
import UserService from '../services/UserService.js';

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

export default Router()
  .post('/auth/signup', (req, res, next) => {
    UserService.create(req.body)
      .then((user) => {
        res.cookie('session', user.authToken(), {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        });
        res.send(user);
      })
      .catch(next);
  })

  .post('/auth/login', (req, res, next) => {
    UserService.authorize(req.body)
      .then((user) => {
        res.cookie('session', user.authToken(), {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        });
        res.send(user);
      })
      .catch(next);
  });
