const mongoose = require("mongoose")

var uploadSchema = new mongoose.Schema({
	id : {
		type : String,
		required: "Required"
	},
	filepath : {
		type : String,
		required : "Required"
	}
});

mongoose.model('upload', uploadSchema);
