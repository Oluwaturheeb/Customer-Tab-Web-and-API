import db from '../models/model.js';
import moment from 'moment';
export const userinfo = async (req, res) => {
	
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
	  res.render('user', {name: user.name, tab: user.tab, paid: user.paid, debt: total});
	} catch (e) {
	  res.send('Unknown error');
	}
}

export const newuser = async (req, res) => {
	// get data from req
  const data = {
    name: req.body.name,
    user: req.session.passport.id
  };

  // insert d data
  try {
    // instantiate the
    data.timeAdded = moment(new Date()).format("dddd, MMMM Do YYYY, h:mm a");
    let newUser = new db(data);

    // check if Customer exist
    let user = await db.findOne(data);
    if (user) res.send('Customer with the same name exist');
    // save the new Customer
    await newUser.save();
    res.redirect('/');
  } catch (e) {
    res.send('Unknown error!' + e.message);
  }
}

export const userreset = async (req, res) => {
	try {
    await db.updateOne({
      '_id': req.params.id
    },
    {$unset: 
      {
        tab: true,
        paid: true
     }
    });
    res.json({
      code: 1,
      msg: 'Reset successfully!'
    });
  } catch (e) {
    res.send('Unknown error ' + e.message);
  }
	res.redirect('/user/info/' + req.params.id)
}