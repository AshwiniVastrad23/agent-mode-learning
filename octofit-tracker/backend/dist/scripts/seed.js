import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';
dotenv.config();
// Seed the octofit_db database with test data.
async function seedDatabase() {
    const mongoUri = process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
    console.log('Seed the octofit_db database with test data');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');
    await Promise.all([
        User.deleteMany({}),
        Team.deleteMany({}),
        Activity.deleteMany({}),
        LeaderboardEntry.deleteMany({}),
        Workout.deleteMany({}),
    ]);
    const users = await User.insertMany([
        {
            name: 'Ava Johnson',
            email: 'ava@example.com',
            age: 29,
            fitnessGoal: 'Marathon prep',
            city: 'Seattle',
        },
        {
            name: 'Noah Kim',
            email: 'noah@example.com',
            age: 34,
            fitnessGoal: 'Strength building',
            city: 'Denver',
        },
        {
            name: 'Mia Chen',
            email: 'mia@example.com',
            age: 27,
            fitnessGoal: 'Cycling endurance',
            city: 'Austin',
        },
    ]);
    const team = await Team.create({
        name: 'Ocean Striders',
        sport: 'Running',
        city: 'Seattle',
        members: [users[0]._id, users[1]._id],
    });
    await Activity.insertMany([
        {
            user: users[0]._id,
            type: 'run',
            durationMinutes: 35,
            distanceKm: 6.2,
            calories: 340,
        },
        {
            user: users[1]._id,
            type: 'strength',
            durationMinutes: 45,
            calories: 280,
        },
        {
            user: users[2]._id,
            type: 'bike',
            durationMinutes: 60,
            distanceKm: 24,
            calories: 420,
        },
    ]);
    await LeaderboardEntry.insertMany([
        { user: users[0]._id, score: 420, rank: 1 },
        { user: users[1]._id, score: 380, rank: 2 },
        { user: users[2]._id, score: 360, rank: 3 },
    ]);
    await Workout.insertMany([
        {
            title: 'HIIT Cardio',
            focus: 'Cardio',
            durationMinutes: 25,
            difficulty: 'moderate',
            equipment: ['mat'],
        },
        {
            title: 'Upper Body Strength',
            focus: 'Strength',
            durationMinutes: 40,
            difficulty: 'hard',
            equipment: ['dumbbells'],
        },
    ]);
    console.log('Seed data inserted successfully');
    console.log(JSON.stringify({ team: team.name, users: users.length, seeded: true }, null, 2));
    await mongoose.disconnect();
}
seedDatabase().catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
});
