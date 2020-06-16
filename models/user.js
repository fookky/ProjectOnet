const   mongoose = require("mongoose"),
        passportLocalMongoose = require("passport-local-mongoose");

let UserSchema = new mongoose.Schema({
    username:String,
    password :String,
    firstname : String,
    Surname : String,
    mail : String,
    School : String,
    Level : String,
    isAdmin : {type:Boolean, default:false}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);

