var mydivs=new Array('.review','.gallery', '.spec');

function opcl(arr, e){
    if ($(e).css('display') == 'none'){
        for(var i in arr){   
           $(arr[i]).hide();
        }
        $(e).show();       
    }
}

$(document).ready(function () {
	$('.tabs-list li').click(function() {
    $('.tabs-list li').removeClass('active');
    $(this).addClass('active');
  });
})