import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';
import Question from '../lib/models/Question.js';
import Comment from '../lib/models/Comment.js';

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

const perlQ = {
  level: 1,
  questionTitle: 'Answer',
  questionText: 'Does Perl have a cat\'s name?',
  answer: 'b',
  a: 'no',
  b: 'yes',
  c: 'maybe',
  d: 'actually a dog',
  explanation: 'it is known',
  language: 'Perl'
};

const comment1 = {
  userId: '1',
  questionId: '1',
  name: 'KittyCat',
  comment: 'Who is Peaches??'
};

const comment2 = {
  userId: '1',
  questionId: '1',
  name: 'KittyCat',
  comment: 'Peaches is a dog'
};

const comment3 = {
  userId: '1',
  questionId: '2',
  name: 'KittyCat',
  comment: 'Who is Peaches??'
};

describe.skip('comments routes', () => {
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

  // find all comments by question id

  it('gets all comments by question id', async () => {
    await UserService.create({
      email: 'peaches@peaches.com',
      password: 'peaches'
    });

    const peaches = await Question.insert(peachesQ);
    await Question.insert(perlQ);
    await Comment.insert(comment1);
    await Comment.insert(comment2);
    await Comment.insert(comment3);

    const res = await agent
      .get(`/api/v1/comments/${peaches.questionId}`);
    expect(res.body).toEqual([
      {
        commentId: '1',
        userId: '1',
        questionId: '1',
        name: 'KittyCat',
        comment: 'Who is Peaches??'
      },
      {
        commentId: '2',
        userId: '1',
        questionId: '1',
        name: 'KittyCat',
        comment: 'Peaches is a dog'
      }
    ]);
  });
    
  // find all comments by user id

});
