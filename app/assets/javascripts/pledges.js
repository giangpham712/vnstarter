(function ($) {

	$('#add-pledge').click(function(event) {
		$('#new_pledge').submit();
	});
	$('#new_pledge').submit(function(e){
		var slug=$('#slug').val();
		$.ajax({
			url: $(this).attr('action'),
			type:'POST',
			data : $(this).serialize(),
			success : function (data){
				$('#thank-modal-body').html('<h3>Cảm ơn bạn đã quyên góp cho chúng tôi với số tiền :'+data.pledge.pledge_amount+' đồng</h3>');
				$('#back-to-project').attr('href', window.location.host);
			}
		});
		e.preventDefault();
	});

})(jQuery);
