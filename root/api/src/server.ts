import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import { errorMiddleware } from './modules/shared/middlewares/errorMiddleware';
import { AppError } from './modules/shared/errors/AppError';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('AlzCheck says hello!');
});

AppDataSource.initialize().then(() => {
  console.log('Database connected');

  app.use((req: Request, res: Response, next: NextFunction) => {
    next(new AppError('Route not found', 404));
  });

  app.use(
    errorMiddleware as (
      err: Error,
      req: Request,
      res: Response,
      next: NextFunction
    ) => void
  );

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
