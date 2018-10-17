//import User from "./user";
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ObjectId = mongoose.Schema.Types.ObjectId;

const todoSchema = new Schema({
    title: { type: String, default: "", required: true },
    description: { type: String, default: "", required: true },
    timeStamp: { type: Date, default: Date.now, required: true },
    userId: { type: ObjectId, ref: 'User', required: true },
    status: { type: Number, default: 0, required: true },
    priority: { type: Number, default: 0, required: true }
});

let Todo = mongoose.model('Todo', todoSchema);

//export default mongoose.model('Todo', todoSchema);

export default Todo;