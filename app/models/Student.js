var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
    name:{
    	type:String,
    },
    id:String,
    email:String,
    major:String,

    username:{
        type:String,
        required:true
    },
    password:{
    	type:String,
    	required:true
	},
	portfolio:{
		type:String,
		default:'no'
	}

});


var Student = mongoose.model("student", studentSchema);

module.exports = Student;
