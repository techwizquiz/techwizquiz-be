import { Router } from 'express';
import ensureAuth from '../middleware/ensure-auth.js';
import UserService from '../services/UserService.js';

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

export default Router()
  .post('/api/v1/auth/signup', (req, res, next) => {
    UserService.create(req.body)
      .then((user) => {
        res.cookie('session', user.authToken(), {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
          sameSite: 'none',
          secure: true
        });
        res.send(user);
      })
      .catch(next);
  })

  .post('/api/v1/auth/login', (req, res, next) => {
    UserService.authorize(req.body)
      .then((user) => {
        res.cookie('session', user.authToken(), {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
          sameSite: 'none',
          secure: true
        });
        res.send(user);
      })
      .catch(next);
  })

  .get('/api/v1/auth/verify', ensureAuth, (req, res, next) => {
    try { 
      res.send(req.user);
      next();
    } catch(err) {
      next(err);
    }
  })

  .get('/api/v1/auth/logout', (req, res) => {
    res.clearCookie('session', {
      httpOnly: true,
      maxAge: ONE_DAY_IN_MS,
    });
  });
