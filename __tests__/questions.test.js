import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

const peachesQ = {

};

const perlQ = {

};

it('creates a question via POST', async () => {
  const res = await request(app)
    .post('/api/v1/questions')
    .send(peachesQ);
  expect(res.body).toEqual({
    id: '1',
    ...peachesQ
  });
});
