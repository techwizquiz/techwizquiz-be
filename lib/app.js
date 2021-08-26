import express from 'express';
import cookieParser from 'cookie-parser';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import authController from './controllers/auth.js';
import questionController from './controllers/questions.js';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use(authController);
app.use(questionController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
