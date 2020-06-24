const mongoose = require("mongoose")

var uploadSchema = new mongoose.Schema({
	id : {
		type : String,
		required: "Required"
	},
	filepath : {
		type : String,
		required : "Required"
	},
	reading : {
		type : Number,
		required : "Required"
	}
});

mongoose.model('upload', uploadSchema);
