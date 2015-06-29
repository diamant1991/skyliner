var sblockAttrName = 'data-style';
	$(function(){
    $('A['+sblockAttrName+']').each(function(){
        $(this).attr('href',$(this).attr(sblockAttrName));
    });
});


var ssInterval;
var ssItems = [
		{
		"title": "Заголовок 1",
		"image": "images/slide.jpg",
		"description": "Компания Nordmarine является официальным представителем английской верфи Princess Yachts International plc на территории России, Казахстана и Киргизии, а также оказывает полный спектр услуг, связанных с яхтенным консалтингом, куплей-продажей и эксплуатацией яхт любых размеров и производителей.",
		"url": "http://www.nordmarine.ru/about/",
		"urlCaption": "Подробнее",
		
	},
		{
		"title": "Заголовок 2",
		"image": "images/slide-2.jpg",
		"description": "Princess 40М Solaris, принадлежащая флагманскому М-классу яхт Princess, номинирована на престижную награду World Superyacht Awards. Яхта включена в список финалистов в категории трехпалубная моторная яхта свыше 40 метров.",
		"url": "http://www.nordmarine.ru/about/",
		"urlCaption": "Подробнее",
		
	},
		{
		"title": "Заголовок 3",
		"image": "images/slide-3.jpg",
		"url": "http://www.nordmarine.ru/about/",
		"urlCaption": "Подробнее",
		
	},
		
	];

setSSBlockTop();
			
$(function() {
	$(document).bgStretcher({
		albums: {
			'album': [
				'images/slide.jpg','images/slide-2.jpg','images/slide-3.jpg']
		},
		album: 'album',
		imageWidth: 1024,
		imageHeight: 768,
		slideShowSpeed: 1000,
		slideShow: false
	});
	
	normalizeContentBlockHeight();
	
	$(window).resize(function(){
		snapWidthToColumn.execute();
		fancyHeaderVerticalAlign();
		normalizeMenuItems();
		positionSsButtons();
		centerBgStretcherImages();
	}).trigger("resize");

	$(window).scroll(function(){
		ieCorrection();
	});
	
	$(".more a").click(function(e){
		e.preventDefault();
		e.stopPropagation();

		$("body").addClass("view-full-description");
		normalizeContentBlockHeight();
		$(window).trigger("resize");
	});
	
	$('#ssButtonPrev').click(function(){
		ssMovePrev();
		clearInterval(ssInterval);
	});

	$('#ssButtonNext').click(function(){
		ssMoveNext();
		clearInterval(ssInterval);
	});

	ssInterval = window.setInterval(ssMoveNext, 10000);
})