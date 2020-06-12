const   mongoose = require("mongoose");
       // passportLocalMongoose = require("passport-local-mongoose");

        let commentSchema = new mongoose.Schema({
            text : String,
            user: String
        });

        
        //eduSchema.plugin(passportLocalMongoose);
        
        module.exports = mongoose.model("comment",commentSchema);