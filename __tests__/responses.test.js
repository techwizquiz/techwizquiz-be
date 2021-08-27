import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

const response1 = {
  user_id: 1,
  question_id: 7,
  correct: true
};

describe('responses routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a response via POST', async () => {
    const res = await request(app)
      .post('/api/v1/questions')
      .send(response1);
    expect(res.body).toEqual({
      responseId: '1',
      ...response1
    });
  });
});

