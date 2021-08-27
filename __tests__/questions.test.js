import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Question from '../lib/models/Question.js';

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

const mamaQ = {
  level: 1,
  questionTitle: 'Answer',
  questionText: 'Does Mama have a dog\'s name?',
  answer: 'b',
  a: 'no',
  b: 'yes',
  c: 'maybe',
  d: 'actually a cat',
  explanation: 'it is known',
  language: 'JavaScript'
};

describe('questions routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a question via POST', async () => {
    const res = await request(app)
      .post('/api/v1/questions')
      .send(peachesQ);
    expect(res.body).toEqual({
      questionId: '1',
      ...peachesQ
    });
  });

  it('finds all questions', async () => {
    await Question.insert(peachesQ);
    await Question.insert(perlQ);

    const res = await request(app)
      .get('/api/v1/questions');
    expect(res.body).toEqual([{
      questionId: '1',
      ...peachesQ
    },
    {
      questionId: '2',
      ...perlQ
    }]);
  });

  it('gets a question by id', async () => {
    const perl = await Question.insert(perlQ);
    const res = await request(app)
      .get(`/api/v1/questions/${perl.questionId}`);
    expect(res.body).toEqual(perl);
  });

  it('filters questions by difficulty', async () => {
    const perl = await Question.insert(perlQ);
    await Question.insert(peachesQ);
    const mama = await Question.insert(mamaQ);

    const res = await request(app)
      .get('/api/v1/questions/difficulty/1');
    expect(res.body).toEqual([
      perl,
      mama
    ]);
  });
});


