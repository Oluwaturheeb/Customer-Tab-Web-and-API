import {myTab, otherTab} from '../db.js';
import money from '../conf/function.js';

let index = async (req, res) => {
  try {
    if (req.cookies.user)
      var user = req.cookies.user;
    else if (req.session.passport) {
      user = req.session.passport.user;
      res.cookie('user', req.session.passport.user, {
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
      });
    }
    else res.redirect('login/google');
    
    const tabTotal = (tab, main) => {
      let total = 0;
      if (tab.tab != undefined || tab.payment != undefined)
        tab.tab.forEach(tEach => {
          total += tEach.total - tEach.paid;
        });
      if (tab.payment != undefined)
        tab.payment.forEach(tEach => {
          total = total - tEach.paid
        });
      
      return {
        total: total,
        allTotal: main + total
      };
    };
    
    let customers = await myTab.where('account', '==', user.id).get();
    let others = await otherTab.where('account', '==', user.id).get();
    
    if (customers.empty && others.empty)
      var resp = {
        code: 1, 
        msg: 'List is empty',
        othersTabTotal: money(0),
        myTabTotal: money(0),
        user: user.displayName,
        email: user.emails[0].value,
        account: user.id,
      };
    else {
      const extract = db => {
        let data = [], iniT = 0;
        
        if (db.size > 0)
          db.docs.forEach(doc => {
            let {total, allTotal} = tabTotal(doc.data(), iniT);
            
            data.push({
              id: doc.id,
              name: doc.data().name,
              total: money(total),
              details: {
                info: doc.data().tab,
                payment: doc.data().payment
              }
            });
            iniT = allTotal;
          });
        
        return {tab: data, total: iniT};
      };
      let myTab = extract(customers),
      othersTab = extract(others);
      
      resp = {
        code: 1,
        myTabTotal: money(myTab.total),
        myTab: myTab.tab,
        othersTabTotal: money(othersTab.total),
        othersTab: othersTab.tab,
        user: user.displayName,
        email: user.emails[0].value,
        account: user.id,
      };
      req.session.mytab = resp.myTab;
      req.session.othertab = resp.othersTab;
    }
    
    res.render('index', resp);
  } catch (e) {
    res.render('error', {code: 0, msg: e.message});
  }
};

export default index;