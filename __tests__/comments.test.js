import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';
import Question from '../lib/models/Question.js';

const agent = request.agent(app);

const peachesQ = {
  level: 2,
  questionTitle: 'Answer',
  questionText: 'Does Peaches have a dog\'s name?',
  answer: 'a',
  a: 'yes',
  b: 'no',
  c: 'maybe',
  d: 'actually a cat',
  explanation: 'it is obvious',
  language: 'JavaScript'
};

const comment1 = {
  userId: '1',
  questionId: '1',
  name: 'KittyCat',
  comment: 'Who is Peaches??'
};

describe('comments routes', () => {

  beforeEach(async() => {
    await setup(pool);
  });

  it('creates a comment via POST', async () => {
    await UserService.create({
      email: 'peaches@peaches.com',
      password: 'peaches'
    });

    await Question.insert(peachesQ);

    const res = await agent
      .post('/api/v1/comments')
      .send(comment1)
      .set('Cookie', process.env.TEST_JWT);
    expect(res.body).toEqual({
      commentId: '1',
      ...comment1
    });
  });

});
