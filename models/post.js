const   mongoose = require("mongoose"),
        passportLocalMongoose = require("passport-local-mongoose");

        let eduSchema = new mongoose.Schema({
            name : String,
            image: String,
            desc : String,
            comments : [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"comment"
                }
            ]
        });

        
        eduSchema.plugin(passportLocalMongoose);
        
        module.exports = mongoose.model("edu",eduSchema);