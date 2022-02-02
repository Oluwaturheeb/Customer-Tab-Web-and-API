import query from '../../db.js';

export const newitem = async (req, res) => {
	let data = {
	  user_id: req.body.user,
	  paid: req.body.paid,
	  total: req.body.total,
	  description: req.body.desc
	};
	try {
	  let {count} = await query `insert into tab ${query(data)}`;
  	if (count) res.send({code: 1, msg: 'Added to tab successfully!'});
    else res.send({code: 0, msg: 'Unknown error!'});
	} catch (e) {
	  res.send({code: 0, msg: 'Unknown error!' + e.message});
	}
};



export const updateitem = async (req, res) => {
  let data = {
    user_id: req.body.user,
    paid: req.body.paid
  }
   
	try {
	  let {count} = await query `insert into tab ${query(data)}`
  	if (count) res.json({code: 1, msg: 'Tab has been updated successfully!'});
  	else res.send({code: 0, msg: 'Unknown error!'});
	} catch (e) {
	  res.send({code: 0, msg: 'Unknown error!'});
	}
};