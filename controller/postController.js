import query from '../db.js';
import money from '../conf/function.js';

let index = async (req, res) => {
  res.setHeader('content-type', 'application/json');
  res.send(query);
  try {
    if (req.session.passport)
      var user = req.session.passport.user;
    else res.redirect('login/google');
    
    let rows = await query `select name, id from users where account = ${user.id} order by name`;
    let tab = [],
    total = 0;
    
    if (!rows.count) {
      res.render('index', {msg: 'List is empty', user: user._json, total: money(total)});
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
          res.render('index', {tab: tab, total: money(total)});
      });
    }
  } catch (e) {
    res.end('Server error!' + e.message);
  }
};

export default index;