import money from '../../conf/function.js';
import moment from 'moment';
import {myTab, otherTab, field} from '../../db.js';

export const newuser = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  try {
    const data = {
      account: req.body.account,
      name: req.body.name
    };
    if (req.body.type == 1) var db = myTab; else db = otherTab;
    let check = await db.where('account', '==', data.account).where('name', '==', data.name).get();
    
    if (check.empty) {
      await db.add(data);
      res.send({
        code: 1, msg: data.name + ' has been added to customers list'
      });
    } else 
      res.send({
        code: 0, msg: 'Customer with the same name exist'
      });
  } catch (e) {
    res.send({code: 0, msg: e.message});
  }
};

export const userreset = async (req, res) => {
  // set the header
  res.setHeader('Content-Type', 'application/json');
  try {
    if (req.body.type == 1) var db = myTab;
    else db = otherTab;
    
    let up = await db.doc(req.body.id).update({
      tab: field.delete(),
      payment: field.delete(),
    });
    
    if (req.body.delete) {
      up = db.doc(req.body.id).delete();
    
      if (up) 
        res.json({
          code: 1,
          msg: 'Reset successfully!'
        });
    }
    
    if (up && !req.body.delete)
      res.json({
        code: 1,
        msg: 'Reset successfully!'
      });
  } catch (e) {
    res.send({code: 0, msg: 'Unknown error!' + e.message});
  }
};