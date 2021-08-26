import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import authController from './controllers/auth.js';
import cors from 'cors';

const app = express();

app.use(dotenv);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use(authController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
