import db from '../../db.js';
import moment from 'moment';

export const newitem = async (req, res) => {
	// collect info 
	let user = req.body.user;
	let paid = req.body.paid;
	
	// fork data
	let up = req.body;
	up.timeAdded = moment(new Date()).format("dddd, MMMM Do YYYY, h:mm a");
	delete up.paid;
	delete up.user;
	
	// turn the amount to obj
	let p = {amount: paid, timeAdded: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm a")};
	
	await db.update({'_id': user}, {$push: {tab: up, paid: p}}, {})
	.then()
	.catch(e => console.log(e));
	res.json({code: 1, msg: 'Added to tab successfully!'});
}

export const updateitem = async (req, res) => {
	let {paid, user} = req.body;
	
	await db.update({'_id': user}, {$push: {
		paid: {amount: paid, timeAdded: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm a")}
	}}, {})
	
	res.json({code: 1, msg: 'Tab has been updated successfully!'});
}