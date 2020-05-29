const mongoose = require("mongoose");

var userSchema =  new mongoose.Schema({
	id : {
		type : String,
		required : "Required",
	},
	name : {
		type : String,
		required : "Required",
	},
	adddress : {
		type : String,
		required : "Required",
	},
	phone : {
		type : String,
		required : "Required",
	},
	doj : {
		type : Date,
	}
});

var user = mongoose.model('user', userSchema);
