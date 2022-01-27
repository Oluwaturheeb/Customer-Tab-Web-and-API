(function ($) {
	$('.exit-home').click(() => {
		$('.tabs').slideDown(1000);
		$('#home').hide();
	});
	
	$('.dot-menu').click(function () {
		$(this).parent('.list').siblings('.list').find('.link').slideUp();
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).next('.link').slideUp(100);
		} else {
			$(this).addClass('active');
			$(this).next('.link').show(100);
		}
	});
 // tabs

	$('.link a, .add-btn').click(function (e) {
	// Reset is a direct link
		if ($(this).html() == 'Reset tab') {
			let c = confirm('Are you sure to reset this customer tab!');
			if (!c) e.preventDefault();
		} else e.preventDefault();
		
		if ($(this).hasClass('add-btn')) {
			var id = 'new';
		} else {
			id = $(this).attr('href');
			$('input[name=user]').val($(this).attr('data-id'));
		}
		
		$('.tabs #'+ id).slideDown(1000).siblings().slideUp();
	});
	
	$('.back').click(() => {
		$('.tabs #customers').slideDown(100).siblings().slideUp();
	});
	
	// customers tab
	$('.customers-tab span').click(function () {
		let id = $(this).attr('data-id');
		$('.tab-content #'+ id).show().siblings().hide();
		$(this).addClass('active').siblings().removeClass('active');
	});
	
	 // calling validate on the form
	 $('form').submit(function(e) {
	 	v.autoForm(this);
	 	if (v.err()) {
	 		e.preventDefault();
	 		alert(v.err());
	 	}
	 })
})(jQuery);