const money = m => {
	let format = new Intl.NumberFormat('en-NG', {
		style: 'currency',
		currency: 'NGN'
	});
	
	return format.format(m);
}

export default money;