import mongoose from 'mongoose';

const schema = mongoose.Schema({
	user: Number,
	name: String,
	tab: Array,
	paid: Array,
	timeAdded: String
});

const db = mongoose.model('customer-tab', schema);
export default db;