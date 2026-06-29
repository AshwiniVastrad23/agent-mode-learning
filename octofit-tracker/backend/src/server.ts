import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js';
import { connectToDatabase } from './config/database.js';

dotenv.config();

const getApiBaseUrl = (serverPort: number) => {
  const codespaceName = process.env.CODESPACE_NAME?.trim();
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return `http://localhost:${serverPort}`;
};

const app = express();
const port = Number(process.env.PORT ?? 8000);
const baseUrl = getApiBaseUrl(port);

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiUrl: baseUrl });
});

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  const users = await User.find({}).lean();
  res.json({ resource: 'users', count: users.length, data: users, apiUrl: baseUrl });
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  const activities = await Activity.find({}).populate('user').lean();
  res.json({ resource: 'activities', count: activities.length, data: activities, apiUrl: baseUrl });
});

connectToDatabase()
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend listening on port ${port}`);
  console.log(`API base URL: ${baseUrl}`);
});
