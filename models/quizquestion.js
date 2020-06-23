

const  mongoose = require("mongoose");
       // passportLocalMongoose = require("passport-local-mongoose");

        let quizquestion = new mongoose.Schema({
            question:{
				type :String,
				require :true
			},
			op1:{
				type :String,
				require: true
			},
			op2:{
				type:String,
				require:true
			},
			op3:{
				type:String,
				require:true
			},
			op4:{
				type :String,
				require:true
			},
			ans:{
				type:String,
				require :true
			},
			quizquestions :[
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"quizquestion"
                }
                
            ]
			
		});

        
        //eduSchema.plugin(passportLocalMongoose);
        
        module.exports = mongoose.model("quizquestion",quizquestion);