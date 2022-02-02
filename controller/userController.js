import query from '../db.js';
import moment from 'moment';
import money from '../conf/function.js';

export const userinfo = async (req, res) => {
	try {
    const rows = await query `select name, total, paid, timeadded, description as desc from tab join users on users.id = user_id where users.id = ${req.params.id} order by timeadded desc`;
    let total = 0,
    paid = 0;
    let tab = [],
    payment = [];
    
    if (rows.count) {
      rows.forEach ((row) => {
        total += row.total;
        paid += row.paid;
        
        let time = moment(row.timeadded).format("dddd, MMMM Do YYYY, h:mm a");
        if (row.desc !== null)
          tab.push({desc: row.desc, total: money(row.total), timeAdded: time});
        if (row.paid !== 0)
          payment.push({paid: money(row.paid), timeAdded: time});
      });
    }
    
    console.log({
      name: rows[0].name,
      debt: money(total - paid),
      tab: tab,
      paid: payment
    })
    // send response
    res.render('user', {
      name: rows[0].name,
      debt: money(total - paid),
      tab: tab,
      paid: payment
    });
  } catch (e) {
    res.send('Server error' + e.message);
  }
};

export const newuser = async (req, res) => {
	// get data from req
  const data = {
    name: req.body.name,
    account: req.user.id
  };
  
  let {count} = await query `select id from users where name = ${data.name} and account=${data.account}`;
  
  if (count === 1) 
    res.send('Customer with the same name exist');
  else {
    var q = await query `insert into users ${query(data, 'name', 'account')}`;
    res.redirect('/');
  }
};

export const userreset = async (req, res) => {
	try {
    let up = await query `delete from tab where user_id = ${req.params.id}`;
	  res.redirect('/user/info/' + req.params.id)
  } catch (e) {
    res.send('Server error!');
  }
}