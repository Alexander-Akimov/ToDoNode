import mongoose from 'mongoose';

export default async () => {
    mongoose.Promise = global.Promise;
    try {
        await mongoose.connect("mongodb://localhost:27017/node-auth",
         { useNewUrlParser: true, useCreateIndex: true });
        console.log('MongoDB connection succesful');
    } catch (err) {
        console.error(err);
    }
}