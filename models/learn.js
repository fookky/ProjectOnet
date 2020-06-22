const   mongoose = require("mongoose"),
        passportLocalMongoose = require("passport-local-mongoose");

        let learnSchema = new mongoose.Schema({
            name : String,
            image: String,
            desc : String,
            subject : String,
            createdAt: { type: Date, default: Date.now },
            type: String,
            author: {
                id: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'User'
                },
                username: String
              },
        });

        
        learnSchema.plugin(passportLocalMongoose);
        
        module.exports = mongoose.model("learn",learnSchema);