import mongoose from 'mongoose';

const schema = mongoose.Schema({
	userId: String,
	itemsBought: String,
	amountPaid: {'default': {value: 0, timeAdded: new Date()}, type: Object},
	total: {'default': 0, type: Number},
	timeAdded: {'default': new Date(), type: Date}
});

const itemsModel = mongoose.model('tab', schema);
export default itemsModel;