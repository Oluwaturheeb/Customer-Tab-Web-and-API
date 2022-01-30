import db from '../../models/model.js';
import money from '../../conf/function.js';

let index = async (req, res) => {
  try {
    
    let list = await db.find({
      user: req.params.user
    });
    
    let total = 0;
    let totalPaid = 0;
    let allUserWithTotal = [];
    list.forEach(t => {
    	// set var 
    	let it = 0;
    	let ip = 0;
    	let debt = 0;
    
    	if (t.tab && t.paid) {
    		// loop for total
    		t.tab.forEach(prices => {
    			total += Number(prices.total);
    			it += Number(prices.total);
    		});
    		
    		// loop for amountPaid
    		t.paid.forEach(p => {
    			totalPaid += Number(p.price);
    			ip += Number(p.price);
    		});
    		debt = it - ip;
    	}
    
    					
    	let name = t.name;
    	let obj = {};
    	
    	obj.name = name;
    	obj.debt = money(debt);
    	obj._id = t._id;
    	allUserWithTotal.push(obj);
    });
    
    total = money(total - totalPaid);
    
    res.setHeader('content-type', 'application/json');
    res.json({tab: allUserWithTotal, total: total});
  } catch (e) {
    res.send({code: 0, msg: 'Unknown error!'});
  }
};

export default index;