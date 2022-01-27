import db from '../../db.js';
import money from '../../conf/function.js';
import moment from 'moment';

export const newuser = async (req, res) => {
	// set the header
	res.setHeader('Content-Type', 'application/json');

	let name = req.body.name;
	let account = req.body.account;
	let user = await db.findOne({name: name, user: account})
	.then()
	.catch(e => e.message());

	// check if the user check is !empty
	if (user) 
		res.json({code: 0, msg: 'This customer exist'});
	else
		// create new user
		db.insert({
			user: account,
			name: name,
			tab: [],
			paid: [],
			timeAdded: moment(new Date()).format("dddd, MMMM Do YYYY, h:mm a")
		})
		.then(doc => 
			res.json({
				code: 1,
				msg: 'User created!'
			})
		)
		.catch(e => console.log(e))
}

export const userinfo = async (req, res) => {
	// set the header
	res.setHeader('Content-Type', 'application/json');

	let user = await db.findOne({'_id': req.params.id})
	let total = 0;
	let tab = 0;

	// calculate the total debt still being owe!
	if (user.paid && user.tab) {
		user.paid.forEach(p => {
			total += Number(p.amount);
		});
		
		user.tab.forEach(t => {
			tab += Number(t.total);
		});
		
		total = tab - total;
	}
	total = money(total);
	
	res.json({name: user.name, tab: user.tab, paid: user.paid, debt: total});
}

export const userreset = async (req, res) => {
	// set the header
	res.setHeader('Content-Type', 'application/json');
	await db.update({'_id': req.params.id}, {$unset: {
		tab: true,
		paid: true
	}});
	res.json({
	  code: 1,
	  msg: 'Reset successfully!'
	});
}