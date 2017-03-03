var mongoose = require('mongoose');
var projectSchema = mongoose.Schema({
    title:{
    	type:String,
    },
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
    file: String

});
var Project= mongoose.model("project", projectSchema);
module.exports = Project;

