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

    expect(res.body).toEqual({
      statId: '1',
      ...score1
    });
  });

  it('updates score via PATCH', async () => {
    const user = await UserService.create({
      email: 'peaches@peaches.com',
      password: 'peaches'
    });

    await agent 
      .post('/api/v1/stats')
      .send(score1)
      .set('Cookie', process.env.TEST_JWT);

    const res = await agent
      .patch(`/api/v1/stats/${user.id}`)
      .send({ score: 8 })
      .set('Cookie', process.env.TEST_JWT);

    expect(res.body).toEqual({
      statId: '1',
      userId: '1',
      score: 8
    });
  });

  it('gets score by user id', async () => {
    const user = await UserService.create({
      email: 'peaches@peaches.com',
      password: 'peaches'
    });

    await agent 
      .post('/api/v1/stats')
      .send(score1)
      .set('Cookie', process.env.TEST_JWT);

    const res = await agent
      .get(`/api/v1/stats/${user.id}`);
    
    expect(res.body).toEqual({
      statId: '1',
      userId: '1',
      score: 8
    });
  });
});
