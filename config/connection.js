// import mongoose
const mongoose = require('mongoose');

// connect to socialnetworkDB database on mongodb
mongoose.connect('mongodb://127.0.0.1:27017/socialnetworkDB', {
    // options added to avoid deprecation warnings
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose.connection;