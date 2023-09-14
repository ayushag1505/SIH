var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose')

var UserSchema = new Schema({
	username: {
        type: String,
        required: true,
		unique:true,		
    },
    mobileno: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true 
    },
    email :{
        type: String,
        required: true,
		unique:true,
    },
	password: {
        type: String,
        trim:true
    }
});
UserSchema.plugin(passportLocalMongoose);

let UserDB = mongoose.model('UserDB' , UserSchema);

module.exports = UserDB;