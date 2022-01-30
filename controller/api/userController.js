import money from '../../conf/function.js';
import moment from 'moment';
import db from '../../models/model.js';

export const newuser = async (req, res) => {
  // set the header
  res.setHeader('Content-Type', 'application/json');

  // get data from req
  const data = {
    name: req.body.name,
    user: req.body.account
  };

  // insert d data
  try {
    // instantiate the
    data.timeAdded = moment(new Date()).format("dddd, MMMM Do YYYY, h:mm a");
    let newUser = new db(data);

    // check if Customer exist
    let user = await db.findOne(data);
    if (user) res.send({
      code: 0, msg: 'Customer with the same name exist'
    });
    // save the new Customer
    await newUser.save();
    res.json({
      code: 1, msg: data.name + ' has been added to customers list'
    });
  } catch (e) {
    res.send({code: 0, msg: 'Unknown error!'});
  }
};

export const userinfo = async (req, res) => {
  // set the header
  res.setHeader('Content-Type', 'application/json');

  try {
    let user = await db.findOne({
      '_id': req.params.id
    });

    // ini items
    let total = 0;
    let tab = 0;

    // calculate the total debt still being owed!
    if (user.paid && user.tab) {
      user.paid.forEach(p => {
        total += Number(p.paid);
      });

      user.tab.forEach(t => {
        tab += Number(t.total);
      });

      total = tab - total;
    }
    total = money(total);

    res.json({
      name: user.name, tab: user.tab, paid: user.paid, debt: total
    });
  } catch (e) {
    res.send({code: 0, msg: 'Unknown error!'});
  }
};

export const userreset = async (req, res) => {
  // set the header
  res.setHeader('Content-Type', 'application/json');
  try {
    let up = await db.updateOne({
      '_id': req.params.id
    },
    {$unset: 
      {
        tab: [],
        paid: []
     }
    },
     {
       multi: true
     });
    res.json({
      code: 1,
      msg: 'Reset successfully!'
    });
  } catch (e) {
    res.send({code: 0, msg: 'Unknown error'});
  }
};