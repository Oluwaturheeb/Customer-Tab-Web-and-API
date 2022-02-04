import money from '../../conf/function.js';
import moment from 'moment';
import query from '../../db.js';

export const newuser = async (req, res) => {
  const data = {
    name: req.body.name,
    account: req.body.account
  };

  res.setHeader('Content-Type', 'application/json');
  let {count} = await query `select id from users where name = ${data.name} and account=${data.account}`;
  
  if (count === 1) res.send({
      code: 0, msg: 'Customer with the same name exist'
    });
  else {
    var q = await query `insert into users ${query(data, 'name', 'account')}`
    res.json({
      code: 1, msg: data.name + ' has been added to customers list'
    });
  }
};

export const userinfo = async (req, res) => {
  // set the header
  res.setHeader('Content-Type', 'application/json');
  
  try {
    const rows = await query `select name, total, paid, timeadded, description as desc from users left join tab on users.id = user_id where users.id = ${req.params.id} order by timeadded desc`;
    
    if (!rows.count) res.json({
      code: 1,
      msg: 'No debt to report!'
    });
    else {
      let total = 0,
      paid = 0;
      let tab = [],
      payment = [];
      
      rows.forEach ((row) => {
        total += row.total;
        paid += row.paid;
        
        let time = moment(row.timeadded).format("dddd, MMMM Do YYYY, h:mm a");
        if (row.desc !== null)
          tab.push({desc: row.desc, total: money(row.total), timeAdded: time});
        if (row.paid !== 0)
          payment.push({paid: money(row.paid), timeAdded: time});
      });
      
      // send response
      res.json({
        code: 1,
        name: rows[0].name,
        debt: money(total - paid),
        tab: tab,
        paid: payment
      });
    }
  } catch (e) {
    res.send({code: 0, msg: 'Unknown error!' + e.message});
  }
};

export const userreset = async (req, res) => {
  // set the header
  res.setHeader('Content-Type', 'application/json');
  try {
    let up = await query `delete from tab where user_id = ${req.params.id}`;
    res.json({
      code: 1,
      msg: 'Reset successfully!'
    });
  } catch (e) {
    res.send({code: 0, msg: 'Unknown error!'});
  }
};