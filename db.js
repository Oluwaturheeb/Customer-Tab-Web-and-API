import Datastore from 'nedb-promises';
let db = Datastore.create({
	filename: 'db/customerTab.db',
	autoload: true,
});

export default db;