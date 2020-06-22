const   mongoose = require("mongoose"),
        passportLocalMongoose = require("passport-local-mongoose");

        let deparmentSchema = new mongoose.Schema({
            name : String,
            image: String,
            desc : String,
            subject : String,
            createdAt: { type: Date, default: Date.now },
            author: {
                id: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'User'
                },
                username: String
              },
        });

        
        deparmentSchema.plugin(passportLocalMongoose);
        
        module.exports = mongoose.model("department",deparmentSchema);

      