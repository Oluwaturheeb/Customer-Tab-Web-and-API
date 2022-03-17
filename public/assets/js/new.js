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

	$('.link a, .add-btn, .dp-link a').click(function (e) {
	  if ($(this).attr('href') != '/download') e.preventDefault();
		if ($(this).hasClass('reset')) {
		  let del = $(this).attr('data-delete');
		  if (!del) var c = confirm('Are you sure to reset this customer tab!');
			else c = confirm('Are you sure to remove this customer tab!');
			
			if (c)
			  $.ajax({
			    url: 'api/user/reset',
			    type: 'post',
			    data: {
			      type: $('input[name=type]').val(),
			      delete: del,
			      id: $(this).attr('data-id'),
			    },
			    success: e => {
			      alert(e.msg);
			      setTimeout(() => location.reload(), 2000);
			    },
			    error: e => {
			      alert(e.msg);
			    },
			  })
		} else if ($(this).hasClass('add-btn')) {
			var id = 'new';
		} else {
			id = $(this).attr('href');
			$('input[name=user]').val($(this).attr('data-id'));
		}
		
		if (id == 'mytab')
		  $('input[name=type]').val(1);
		else if (id == 'otherstab')
		  $('input[name=type]').val(2);
		  
		
		$('.tabs #'+ id).slideDown(1000).siblings().slideUp();
	});
	
	$('.back').click(() => $('.tabs #mytab').slideDown(100).siblings().slideUp());
	
	// customers tab
	$('.customers-tab span').click(function () {
		let id = $(this).attr('data-id');
		$('.tab-content #'+ id).show().siblings().hide();
		$(this).addClass('active').siblings().removeClass('active');
	});
	
	 // calling validate on the form
	 $('form').submit(function(e) {
	   e.preventDefault();
	 	v.autoForm(this);
	 	if (v.err()) {
	 		e.preventDefault();
	 		$(this).find('.info').html(v.err()).css({color: 'red'});
	 		setTimeout(() => $(this).find('.info').html(''), 3000);
	 	} else {
	 	  alert(v.auto)
	 	  $.ajax({
	 	    url: $(this).attr('action'),
	 	    type: 'post',
	 	    data: v.auto,
	 	    beforeSend: () => $(this).find('.info').html('Connecting to the server...').css({color: '#333'}),
	 	    success: e => {
	 		    $(this).find('.info').html(e.msg).css({color: 'green'});
	 		    if (e.code == 1)
	 		      setTimeout(() => location.reload(), 3000);
	 	    },
	 	    error: e => {alert(JSON.stringify(e))
	 	      $(this).find('.info').html(e.msg).css({color: 'red'});
	 	    }
	 	  });
	 	}
	 });
})(jQuery);