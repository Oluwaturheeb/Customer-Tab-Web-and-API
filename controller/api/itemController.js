import {myTab, otherTab, field} from '../../db.js';

export const newitem = async (req, res) => {
	let data = {
	  paid: req.body.paid,
	  total: req.body.total,
	  description: req.body.desc,
	  timeAdded: new Date(),
	};
	try {
	  if (req.body.type == 1) var tab = myTab; else tab = otherTab;
	  
	  let update = await tab.doc(req.body.user).update({tab: field.arrayUnion(data)});
	  console.log(update);
	  
	  if (update) res.send({code: 1, msg: 'Added to tab successfully!'});
	  else res.send({code: 0, msg: 'Unknown error!'});
	} catch (e) {
	  res.send({code: 0, msg: 'Unknown error!' + e.message});
	}
};

export const updateitem = async (req, res) => {
  let data = {
    paid: req.body.paid,
    timeAdded: new Date()
  };
   
	try {
	  if (req.body.type == 1) var tab = myTab; else tab = otherTab;
	  
	  let update = await tab.doc(req.body.user).update({payment: field.arrayUnion(data)});
	  console.log(update);
	  
	  if (update) res.send({code: 1, msg: 'Tab updated successfully!'});
	  else res.send({code: 0, msg: 'Unknown error!'});
	} catch (e) {
	  res.send({code: 0, msg: 'Unknown error!'});
	}
};