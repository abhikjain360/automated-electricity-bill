const mongoose = require("mongoose");

// import the model
let userSchema = require("./useradd.model");

mongoose.connect("mongodb://127.0.0.1:3001/ebills", { useNewUrlParser: true ,useUnifiedTopology: true } ,(error)=>{
	if (error)
	{
		console.log("Error connecting to db");
	}
	else
	{
		console.log("Connected to database!");
	}
});
