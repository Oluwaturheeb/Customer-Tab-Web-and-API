import db from '../db.js';

export const newitem = async (req, res) => {
	// collect info 
	let user = req.body.user;
	let amount = req.body.amount;
	
	// fork data
	let up = req.body;
	up.timeAdded = new Date();
	delete up.amount;
	delete up.user;
	
	// turn the amount to obj
	let p = {amount: amount, timeAdded: new Date()};
	
	await db.update({'_id': user}, {$push: {tab: up, paid: p}}, {})
	.then(doc => console.log(doc))
	.catch(e => console.log(e));
	res.setHeader('content-type', 'application/json');
	res.json(user);
	//res.redirect('/user/info/' + user)
}

export const updateitem = async (req, res) => {
	let {amount, user} = req.body;
	
	await db.update({'_id': user}, {$push: {
		paid: {amount: amount, timeAdded: new Date()}
	}}, {})
	
	res.setHeader('content-type', 'application/json');
	res.json(user);
// 	res.redirect('/user/info/' + user);
}