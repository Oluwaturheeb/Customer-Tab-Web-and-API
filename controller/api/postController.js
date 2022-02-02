import query from '../../db.js';
import money from '../../conf/function.js';

let index = async (req, res) => {
  // set the header
  res.setHeader('content-type', 'application/json');
  
  try {
    let {user} = req.params;
    let rows = await query `select name, id from users where account = ${user}`;
    let tab = [],
    total = 0;
    if (!rows.count) {
      res.send({code: 1, msg: 'List is empty'});
    } else {
      rows.forEach(async (row, index) => {
        let obj = {_id: row.id, name: row.name};
        let debts = await query `select total, paid from tab where user_id = ${row.id}`;
        if (debts.count !== 0) {
          let d = 0;
          debts.forEach((data, i) =>{
            d += data.total - data.paid;
            if (i == debts.count - 1)
              obj.debt = money(d);
          });
          
          total += d;
        } else obj.debt = money(0);
        tab.push(obj);
        if (index === rows.count - 1)
          res.json({code: 1, tab: tab, total: money(total)});
      });
    }
  } catch (e) {
    res.send({code: 0, msg: 'Unknown error!'});
  }
};

export default index;