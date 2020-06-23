const   mongoose = require("mongoose"),
        passportLocalMongoose = require("passport-local-mongoose");

        let quiztopic = new mongoose.Schema({
            nametopic : String,
            desctopic : String,
            quizquestions :[
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"quizquestion"
                }
                
            ],
        });

        
        quiztopic.plugin(passportLocalMongoose);
        
        module.exports = mongoose.model("quiztopic",quiztopic);