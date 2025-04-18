import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('AlzCheck says hello!');
});

AppDataSource.initialize().then(() => {
  console.log('Database connected');

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
