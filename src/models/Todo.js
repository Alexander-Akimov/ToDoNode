var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require("./user");
const ObjectId = mongoose.Schema.Types.ObjectId;

const todoSchema = new Schema({
    title: { type: String, default: "", required: true },
    description: { type: String, default: "", required: true },
    timeStamp: { type: Date, default: Date.now, required: true },
    userId: { type: ObjectId, ref: 'User', required: true },
    status: { type: Number, default: 0, required: true },
    priority: { type: Number, default: 0, required: true }
});

module.exports = mongoose.model('Todo', todoSchema);