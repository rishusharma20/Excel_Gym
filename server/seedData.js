const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connect = require('./databasegym');
const Trainers = require('./model/trainers.model');
const Members = require('./model/members.model');
const Class = require('./model/class.model');
const Booking = require('./model/booking.model');

const seedDB = async () => {
    try {
        await connect();
        console.log('Seed: Clearing collections...');
        await Trainers.deleteMany({});
        await Class.deleteMany({});
        await Booking.deleteMany({});
        // Only delete non-admin members
        await Members.deleteMany({ isAdmin: false });

        console.log('Seed: Creating Trainers with Indian names...');
        const trainers = await Trainers.insertMany([
            { trainersName: 'Rajesh Sharma', specialties: 'Powerlifting & Strength', contactInfo: 'rajesh@example.com' },
            { trainersName: 'Priya Verma', specialties: 'Yoga & Meditation', contactInfo: 'priya@example.com' },
            { trainersName: 'Amit Kumar', specialties: 'HIIT & Cardio', contactInfo: 'amit@example.com' },
            { trainersName: 'Deepa Singh', specialties: 'Crossfit & Mobility', contactInfo: 'deepa@example.com' }
        ]);

        console.log('Seed: Creating Classes...');
        const classes = await Class.insertMany([
            { className: 'Elite Bodybuilding', trainersId: trainers[0]._id, trainersName: trainers[0].trainersName, schedule: 'Mon-Wed-Fri 7 AM', price: 150 },
            { className: 'Zen Yoga', trainersId: trainers[1]._id, trainersName: trainers[1].trainersName, schedule: 'Tue-Thu-Sat 8 AM', price: 120 },
            { className: 'Hypertrophy HIIT', trainersId: trainers[2]._id, trainersName: trainers[2].trainersName, schedule: 'Everyday 6 PM', price: 200 },
            { className: 'Crossfit Core', trainersId: trainers[3]._id, trainersName: trainers[3].trainersName, schedule: 'Mon-Wed-Fri 5 PM', price: 180 }
        ]);

        console.log('Seed: Creating Members with Indian names...');
        const hashedPassword = await bcrypt.hash('password123', 10);
        const members = await Members.insertMany([
            { firstname: 'Arun', lastname: 'Gupta', gender: 'male', email: 'arun@example.com', password: hashedPassword, phone: '9876543210' },
            { firstname: 'Sneha', lastname: 'Patel', gender: 'female', email: 'sneha@example.com', password: hashedPassword, phone: '9812345678' },
            { firstname: 'Vikram', lastname: 'Mehta', gender: 'male', email: 'vikram@example.com', password: hashedPassword, phone: '9001234567' },
            { firstname: 'Kavita', lastname: 'Rao', gender: 'female', email: 'kavita@example.com', password: hashedPassword, phone: '9112345678' },
            { firstname: 'Rahul', lastname: 'Nair', gender: 'male', email: 'rahul@example.com', password: hashedPassword, phone: '9222345678' }
        ]);

        console.log('Seed: Creating Bookings (Assignments)...');
        await Booking.insertMany([
            { memberId: members[0]._id, classId: classes[0]._id }, // Arun - Bodybuilding
            { memberId: members[1]._id, classId: classes[1]._id }, // Sneha - Yoga
            { memberId: members[2]._id, classId: classes[2]._id }, // Vikram - HIIT
            { memberId: members[3]._id, classId: classes[1]._id }, // Kavita - Yoga
            { memberId: members[4]._id, classId: classes[3]._id }  // Rahul - Crossfit
        ]);

        console.log('Seed: Data successfully seeded with Indian names');
        process.exit(0);
    } catch (err) {
        console.error('Seed: Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();
