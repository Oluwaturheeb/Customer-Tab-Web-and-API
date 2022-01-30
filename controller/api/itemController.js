import db from '../../models/model.js';
import moment from 'moment';

export const newitem = async (req, res) => {
	// fork data
	let r = req.body,
	  user = req.body.user;
	  
	// set d time
	let time = moment(new Date()).format("dddd, MMMM Do YYYY, h:mm a");
	
	// push for paid
	let paid = {
	  paid: r.paid,
	  timeAdded: time
	};
	
	delete r.paid;
	delete r.user;
	r.timeAdded = time;
	let tab = r
	
	try {
	  let update = await db.update(
	    {'_id': user},
	    {$push: {
	      tab: tab,
	      paid: paid
	    }},
	  );
	  console.log(update)
	  res.json({code: 1, msg: 'Added to tab successfully!'});
	} catch (e) {
	  res.send({code: 0, msg: 'Unknown error!'});
	}
};

export const updateitem = async (req, res) => {
	let {paid, user} = req.body;
	let time = moment(new Date()).format("dddd, MMMM Do YYYY, h:mm a");
	
	try {
	  let update = await db.updateOne(
	    {'_id': user},
	    {$push: {
		    paid: {paid: paid, timeAdded: time}
  	}});
  	res.json({code: 1, msg: 'Tab has been updated successfully!'});
	} catch (e) {
	  res.send({code: 0, msg: 'Unknown error!'});
	}
};