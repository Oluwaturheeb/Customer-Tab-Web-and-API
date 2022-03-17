import {myTab, otherTab} from '../../db.js';
import money from '../../conf/function.js';

let index = async (req, res) => {
  // set the header
  res.setHeader('content-type', 'application/json');
  
  try {
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
    
    let customers = await myTab.where('account', '==', req.params.user).get();
    let others = await otherTab.where('account', '==', req.params.user).get();
    
    if (customers.empty && others.empty) {
      res.send({
        code: 1, 
        msg: 'List is empty',
        total: money(0)
      });
    }
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
      
      res.send({
        code: 1,
        myTabTotal: money(myTab.total),
        myTab: myTab.tab,
        othersTabTotal: money(othersTab.total),
        othersTab: othersTab.tab
      });
    }
  } catch (e) {
    res.send({code: 0, msg: e.message});
  }
};

export default index;