import mongoose from 'mongoose';

const schema = mongoose.Schema({
	title: String,
	content: String,
	tags: [String],
	user: Number,
	timeAdded: {'default': new Date(), type: Date},
	img: String,
});

const post = mongoose.model('post', schema);

export default post;