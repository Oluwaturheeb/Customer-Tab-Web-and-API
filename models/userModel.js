import mongoose from 'mongoose';

/*const schema = mongoose.Schema({
	displayName: String,
	fullname: Object,
	photo: [String],
	gId: Number,
	timeAdded: {'default': new Date(), type: Date}
});*/

const schema = mongoose.Schema({
	name: String,
	timeAdded: {'default': new Date(), type: Date}
});

const User = mongoose.model('user', schema);

export default User;