const mongoose = require("mongoose");

var userSchema =  new mongoose.Schema({
	id : {
		type : String,
		required : "Required",
	},
	password : {
		type : String,
		required : "Required",
	},
	name : {
		type : String,
		required : "Required",
	},
	address : {
		type : String,
		required : "Required",
	},
	phone : {
		type : String,
		required : "Required",
	},
	doj : {
		type : Date,
	},
});

mongoose.model('user', userSchema);
