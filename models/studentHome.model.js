const mongoose = require('mongoose');

var studentHomeSchema = new mongoose.Schema({
    search:{
        type: String    
    }
});

mongoose.model('StudentHome',studentHomeSchema);