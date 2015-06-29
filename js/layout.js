var myWind = $(window);

function centerBgStretcherImages(){
	var myWindWidth = $(document).width();
	var myWindHeight = myWind.height();

	$('#bgstretcher LI').each(function(){
		var myImg = $('IMG',this);
		var top = Math.round((myWindHeight - myImg.height())/2);
		var left = Math.round((myWindWidth - myImg.width())/2);
		$(this).css({
			top: top+'px',
			left: left+'px'
		});
	});
}

var myInterval = setInterval(centerBgStretcherImages,10);
var snapWidthToColumn = {
	selector_inner:'.AtomText, .listing-description, .item-closeup',
	columnWidth:56,
	gutterWidth:33,
	execute:function(){
		var me = this;
		$(this.selector_inner).each(function(){
			$($(this).parent().get(0)).css('overflow-x','hidden');
			//document.title = $($(this).parent().get(0)).width();
			var realWidth = $($(this).parent().get(0)).width()-parseInt($(this).css('margin-left'));
			var resultWidth = Math.floor((realWidth+me.gutterWidth)/(me.columnWidth+me.gutterWidth))*(me.columnWidth+me.gutterWidth)-me.gutterWidth;
			//document.title = $($(this).parent().get(0)).width()+' '+realWidth+' '+parseInt($(this).css('margin-left'))+' '+parseInt($(this).css('margin-right'));
			//$($(this).parent().get(0)).width()-parseInt($(this).css('margin-left'))-parseInt($(this).css('margin-right'));
			$(this).width(resultWidth);
		});
	}
};

function fancyHeaderVerticalAlign(){
	$('.fancy-header').css('margin-top',($('.fancy-header').height()>36)?(36):(54));
}

function normalizeContentBlockHeight(isPrincess){
	$('.default-container-inner-inner').height('auto');

	var cHeight = $('.default-container-inner-inner').height(),
		mTop = 0,
		$dC;

	if (cHeight > 190 && cHeight < 352) {
		cHeight = 352;
		$('.default-container-inner-inner').eq(0).height(cHeight);
	}
}

function normalizeMenuItems(){
	var maxHeight=0;
	$('#default-container .top-menu a').each(function(){
		var height = $(this).height();
		if (maxHeight<height)maxHeight=height;
	});

	$('#default-container .top-menu a').each(function(){
		var height = $(this).height();
		if (maxHeight>height){
			$(this).css('margin-top', (maxHeight - height)+'px');
		}
	});
}

function ieCorrection(){
	if(!$.browser.msie) return;
	if($.browser.version>7) return;

	$('#footer').css({
		position: 'absolute',
		top: (document.body.scrollTop + document.body.clientHeight - 45)+'px'
	});
}

function positionSsButtons(){
	var winHeight = $(window).height()-162;

	$('.ssButton').each(function() {
		$(this).css('top', winHeight);
	});
}

function ssLoadDataByIndex(index) {
	$('#ssBlock').fadeOut(function(){
		$('#ssHeader').html(ssItems[index].title+'<span id=\'ssQout1\'></span> <span class="decor"></span>');
		$('#ssDescription span.descr').html(ssItems[index].description);
		$('#ssLink').html(ssItems[index].urlCaption);
		$('#ssLink').attr('href', ssItems[index].url);//РїРµСЂРµРЅРµСЃР»Р° РёР· С†РёРєР»Р°, С‚.Рє. РѕС‚РІР°Р»РёР»РёСЃСЊ СЃСЃС‹Р»РєРё РЅР° РіР»Р°РІРЅРѕР№
		if(ssItems[index].sh=='0') {
			$('#ssLink').attr('href', ssItems[index].url);
		} else {
			$('#ssLink').attr('data-style', ssItems[index].url);
		}
		
		if(ssItems[index].url==''){
			$('#ssUrlWrap').css('display','none');
		} else {
			$('#ssUrlWrap').css('display','block');
		}
		
		$('#ssBlock').fadeIn();
	});

}

function ssMoveNext(){
	$(document).bgStretcher.next();
	var index = $(document).bgStretcher.getCurrentIndex();
	ssLoadDataByIndex(index);
}

function ssMovePrev(){
	$(document).bgStretcher.next();
	var index = $(document).bgStretcher.getCurrentIndex();
	ssLoadDataByIndex(index);
}

function setSSBlockTop() {
	var pTop = 280 + $('#block-lt').outerHeight();
	$('#ssBlock').css('top', pTop);
}

function top_bar_close() {
	$('.top_bar').animate({'margin-top':'-42px'}, 300, function() {
		$('.top_bar').remove();
	});
}