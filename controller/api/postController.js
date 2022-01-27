/*import userModel from '../models/userModel.js';
import itemsModel from '../models/itemsModel.js';


const index = async (req, res) => {
	let allUserWithTotal = await userModel.find();
	
	allUserWithTotal.forEach(async (u, i) => {
		let total = await itemsModel.find({'userId': u._id}, {amountPaid: 0, itemsBought: 0, timeAdded: 0})
		console.log(total)
		total.forEach((i, e) => {
			
		})
	});
	
	res.render('index', { title: 'Express' });
}*/


import db from '../../db.js';
import money from '../../conf/function.js';

let index = async (req, res) => {
	let list = await db.find({user: req.params.user}).then().catch(e => console.log(e));
	let total = 0;
	let totalPaid = 0;
	let allUserWithTotal = [];
	list.forEach(t => {
		console.log(JSON.stringify(t))
		// set var 
		let it = 0;
		let ip = 0;
		let debt = 0;

		if (t.tab && t.paid) {
			// loop for total
			t.tab.forEach(prices => {
				total += Number(prices.total);
				it += Number(prices.total);
			});
			
			// loop for amountPaid
			t.paid.forEach(p => {
				totalPaid += Number(p.amount);
				ip += Number(p.amount);
			});
			debt = it - ip;
		}

						
		let name = t.name;
		let obj = {};
		
		obj.name = name;
		obj.debt = money(debt);
		obj._id = t._id;
		allUserWithTotal.push(obj);
	});
	
	total = money(total - totalPaid);
	
	res.setHeader('content-type', 'application/json');
	res.json({tab: allUserWithTotal, total: total});
}

export default index;