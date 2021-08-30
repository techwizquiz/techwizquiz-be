import Question from './lib/models/Question.js';
import { questions } from './data/questions.js';

run();

async function run() {
  try {
    await Promise.all(
      questions.map(question => {
        Question.insert(question);
      })
    );
    console.log('seed data load complete');
  }
  catch(err) {
    console.log(err);
  }
}
