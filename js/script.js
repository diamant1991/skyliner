$('input,textarea').focus(function(){
  $(this).data('placeholder',$(this).attr('placeholder'))
  $(this).attr('placeholder','');
});
$('input,textarea').blur(function(){
  $(this).attr('placeholder',$(this).data('placeholder'));
});

$( document ).ready(function() {

	$('.fav-link').click(function(){
		$(this).parent('.favorites').toggleClass('favorites_open');
		
	})


	$('.leave-app').click(function(){
    	$('.form-mask').fadeIn(400);
    	$('.leave-modal').fadeIn(400);
    })

    $('.form-mask,.closed').click(function(){
  	 $('.modal,.form-mask').fadeOut(400);
  })
	$(document).keyup(function(d) {
	    if (d.keyCode == 27) {
	        $('.form-mask').fadeOut(400);
	        $('.modal').fadeOut(400);
	    }
	});


});