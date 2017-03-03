var mongoose = require('mongoose');
var portfolioSchema = mongoose.Schema({
    name:{
    	type:String,
    },
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
    profilePicture :String,
    description :String,
    work: [{type: mongoose.Schema.Types.ObjectId, ref:'project'}] 

});
var Portfolio = mongoose.model("portfolio", portfolioSchema);
module.exports = Portfolio;

