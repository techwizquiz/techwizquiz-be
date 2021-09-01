import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService';

describe('auth routes', () => {
  const user = {
    email: 'peachy@peachy.com',
    avatar: 'octopus',
    password: 'peachesthedog'
  };

  beforeEach(() => {
    return setup(pool);
  });

  test('POST user to /auth/signup', async () => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send(user);

    expect(res.body).toEqual({
      id: '1',
      email: user.email,
      avatar: 'octopus'
    });
  });

  test('POST user to /auth/login', async () => {
    await UserService.create(user);

    const res = await request.agent(app)
      .post('/api/v1/auth/login')
      .send(user);
    expect(res.body).toEqual({
      id: '1',
      email: 'peachy@peachy.com',
      avatar: 'octopus'
    });
  });

});
