const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
	username: {
		type: String,
		min: [4, 'Too Short, Min is 4 characters'],
		max: [15, 'Too Long, Max is 20 characters'],
		unique: 'This username is taken.',
	},
	email: {
		type: String,
		min: [4, 'Too short, min is 4 characters'],
		max: [32, 'Too long, max is 32 characters'],
		unique: 'This email is taken.',
		lowercase: true,
		required: 'Email is required',
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
	},
	images: {
		type: Schema.Types.ObjectId, ref: 'Images'
	},
	password: {
		type: String,
		min: [5, 'Too short, min is 4 characters'],
		max: [32, 'Too long, max is 32 characters'],
		required: 'Password is required'
	},
	verifiedAccount: {
		type: Boolean,
		default: false
	},
	emailNotifications: {
		type: Boolean,
		default: true
	},
	verificationToken: {
		type: String,
	},
	passwordVerificationToken: {
		type: String,
	}
});

const imageSchema = new Schema({
	profileId: { type: Schema.Types.ObjectId, ref: 'User' },
	email: String,
	images: {
		imageInformation: [{
			timePosted: { type: Date, default: Date.now },
			image: String,
			comments: [String],
			likes: [String],
			imageStructId: {type: Schema.Types.ObjectId, ref: 'Images'},
		}]
	}
});

userSchema.methods.hasSamePassword = function (requestedPassword) {
	return bcrypt.compareSync(requestedPassword, this.password);
}

userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema);
const Image = mongoose.model('imageSchema', imageSchema);

module.exports = {
	User, Image
}