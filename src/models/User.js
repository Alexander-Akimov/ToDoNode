import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new Schema({
    email: String,
    password: String,
    role: { type: Number, default: 1, required: true }
});

UserSchema.plugin(passportLocalMongoose);

let User = mongoose.model('User', UserSchema);

export default User;