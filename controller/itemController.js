import query from '../db.js';

export const newitem = async (req, res) => {
	let data = {
	  user_id: req.body.user,
	  paid: req.body.paid,
	  total: req.body.price,
	  description: req.body.desc
	};
	console.log(req.body)
	try {
	  let {count} = await query `insert into tab ${query(data)}`;
  	if (count) res.redirect('/user/info/' + data.user_id);
    else res.send('Server error!');
	} catch (e) {
	  res.send('Server error!' + e.message);
	}
};

export const updateitem = async (req, res) => {
  let data = {
    user_id: req.body.user,
    paid: req.body.paid
  }
   
	try {
	  let {count} = await query `insert into tab ${query(data)}`
  	if (count) res.redirect('/user/info/' + data.user_id);
  	else res.send({code: 0, msg: 'Unknown error!'});
	} catch (e) {
	  res.send('Server error!' + e.message);
	}
};