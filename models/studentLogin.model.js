const mongoose = require('mongoose');

var studentLoginSchema = new mongoose.Schema({
    uname:{
        type: String
    },
    passsword:{
        type: String
    }
});

mongoose.model('StudentLogin',studentLoginSchema);