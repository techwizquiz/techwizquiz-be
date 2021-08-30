import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

const agent = request.agent(app);

const score1 = {
  userId: 1,
  score: 3
};

describe('stats routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST score to stats table', async () => {
    const res = await agent
      .post('/api/v1/stats')
      .send(score1);
    expect(res.body).toEqual({
      statsId: '1',
      ...score1
    });
  });
});
