import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models.js';
dotenv.config();
const app = express();
const port = Number(process.env.PORT ?? 8000);
const mongoUri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use(cors());
app.use(express.json());
const sendCollectionResponse = (resource, data, res) => {
    res.json({ resource, count: data.length, data, apiUrl: baseUrl });
};
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', apiUrl: baseUrl });
});
app.get(['/api/users', '/api/users/'], async (_req, res) => {
    const users = await User.find({}).lean();
    sendCollectionResponse('users', users, res);
});
app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    const teams = await Team.find({}).populate('members').lean();
    sendCollectionResponse('teams', teams, res);
});
app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    const activities = await Activity.find({}).populate('user').lean();
    sendCollectionResponse('activities', activities, res);
});
app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    const leaderboard = await LeaderboardEntry.find({}).populate('user').lean();
    sendCollectionResponse('leaderboard', leaderboard, res);
});
app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    const workouts = await Workout.find({}).lean();
    sendCollectionResponse('workouts', workouts, res);
});
mongoose
    .connect(mongoUri)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection error:', error));
app.listen(port, '0.0.0.0', () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API base URL: ${baseUrl}`);
});
