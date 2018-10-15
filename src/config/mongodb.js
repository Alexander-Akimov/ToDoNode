var mongoose = require('mongoose');

module.exports = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost:27017/node-auth", { useNewUrlParser: true })
        .then(() => console.log('MongoDB connection succesful'))
        .catch((err) => console.error(err));
    mongoose.set('useCreateIndex', true);
}