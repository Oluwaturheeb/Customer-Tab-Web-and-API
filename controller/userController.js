import db from '../db.js';
export const userinfo = async (req, res) => {
	let user = await db.findOne({'_id': req.params.id})
	let total = 0;
	let tab = 0;
	
	if (user.paid && user.tab) {
		user.paid.forEach(p => {
			total += Number(p.amount);
		});
		
		user.tab.forEach(t => {
			tab += Number(t.price);
		});
		
		total = tab - total;
	}
	
	res.render('user', {name: user.name, tab: user.tab, paid: user.paid, debt: total});
}

export const newuser = async (req, res) => {
	let name = req.body.name;
	let user = await db.findOne({'name': name})
	
	if (user) 
		res.json({code: 0, msg: 'User exist'});
	else
		db.insert({
			name: name,
			tab: [],
			paid: [],
			timeAdded: new Date()
		})
		.then(doc => res.redirect('/'))
		.catch(e => console.log(e))
}

export const userreset = async (req, res) => {
	await db.update({'_id': req.params.id}, {$unset: {
		tab: true,
		paid: true
	}});
	
	res.redirect('/user/info/' + req.params.id)
}