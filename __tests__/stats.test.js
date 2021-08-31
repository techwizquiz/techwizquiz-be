import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';

const agent = request.agent(app);

const score1 = {
  userId: '1',
  score: 3
};

describe('stats routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST score to stats table', async () => {
    await UserService.create({
      email: 'peaches@peaches.com',
      password: 'peaches'
    });

    const res = await agent
      .post('/api/v1/stats')
      .send(score1)
      .set('Cookie', process.env.TEST_JWT);
    console.log('HELLO', res.body);
    expect(res.body).toEqual({
      statId: '1',
      ...score1
    });
  });
});
