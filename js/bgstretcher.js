/**
   Background Stretcher 2 jQuery Plugin
   пїЅ 2010 cyberward.net
   This is a heavily modified version of the 1.2v Background Stretcher
   jQuery Plugin found at ajaxBlender.

   Version: 2.1
   See readme.txt for more info.
*/
(function($){

   var container = null;
   var allImgs = '', allLIs = '', containerStr = '';
   var _bgStretcherTimer = null;
   var _paused = true;

   $.fn.bgStretcher = function(settings){

      // merge the default settings with the user ones
      settings = $.extend({}, $.fn.bgStretcher.defaults, settings);
      $.fn.bgStretcher.settings = settings;

      /**
       * Sets up the script, hides the images, calls to generate the
       * html, and resize the images. This is the core setup function.
       */
      function _build() {
         _genHtml();

         containerStr = '#' + settings.imageContainer;
         container = $(containerStr);
         allImgs = '#' + settings.imageContainer + ' IMG';
         allLIs = '#' + settings.imageContainer + ' LI';

         $(allLIs).css({opacity:0});
         $(allLIs + ':first').css({opacity:1}).addClass('bgs-current');

         if(!container.length) {
            return;
         }
         $(window).resize(_resize);

         if(settings.slideShow && $(allImgs).length > 1) {
            startTimer();
            _paused = false;
         }
         _resize();
      };

      /**
       * This resizes the images all at once to the correct screen size. It is also called
       * whenever the browser screen size changes.
       */
      function _resize() {
         var winW = $(window).width();
         var winH = $(window).height();
         var imgW = 0, imgH = 0;

         container.width(winW);
         container.height(winH);

         if(!settings.resizeProportionally) {
            imgW = winW;
            imgH = winH;
         } else {
            var initW = settings.imageWidth, initH = settings.imageHeight;
            var ratio = initH / initW;

            imgW = winW;
            imgH = winW * ratio;

            if(imgH < winH) {
               imgH = winH;
               imgW = imgH / ratio;
            }
         }
         if(!settings.resizeAnimate) {
            $(allImgs).width(imgW).height(imgH);
         } else {
            $(allImgs).animate({width: imgW, height: imgH}, 'normal');
         }
      };

      /**
       * Generate the html required from the input settings
       */
      function _genHtml() {
         var code = '<div id="' + settings.imageContainer + '" class="bgstretcher"><ul>';
         jQuery.each(settings.albums, function(album, imageArray) {
            for(i = 0; i < imageArray.length; i++){
               code += '<li class="' + album + '"><img src="' + imageArray[i] + '" alt="" /></li>';
            }
         });
         code += '</ul></div>';
         $(code).appendTo('body');
      };


      /**
       * Attaches the events to the albums, the next/previous/start/pause buttons
       */
      function _attachMenuActions() {
         $('#toggleAnimation').click(function(){
            if($(this).text() == "Pause"){
               $(this).html("Start");
               $(document).bgStretcher.pause();
               $('#previousImage').removeClass('disabled');
               $('#nextImage').removeClass('disabled');
            } else {
               $(this).html("Pause");
               $(document).bgStretcher.play();
               $('#previousImage').addClass('disabled');
               $('#nextImage').addClass('disabled');
            }
      	 });

        $('#previousImage').click(function(){
           if ($(this).hasClass('disabled')) return;
              $(document).bgStretcher.previous();
        });

        $('#nextImage').click(function(){
           if ($(this).hasClass('disabled')) return;
              $(document).bgStretcher.next();
        });

        $('.album').click(function() {
           $(document).bgStretcher.changeAlbum($(this).text());
        });
      }


      _build();
   };

   /**
    * Public method to start the slideshow
    */
   $.fn.bgStretcher.play = function() {
      $.fn.bgStretcher.next();
      startTimer();
      _paused = false;
   };

   /**
    * Public method to stop the slideshow
    */
   $.fn.bgStretcher.pause = function() {
      clearTimer();
      _paused = true;
   };

   /**
    * Public method to move to next image in album
    */
   $.fn.bgStretcher.next = function() {
      var current = getCurrent();
      var next = current.next('.'+$.fn.bgStretcher.settings.album);
      if(!next.length){
         next = $(containerStr + ' LI.'+$.fn.bgStretcher.settings.album+':first');
      }
      switchImage(next, current);
   };

   /**
    * Public method to move to previous image in album
    */
   $.fn.bgStretcher.previous = function() {
      var current = getCurrent();
      var previous = current.prev('.'+$.fn.bgStretcher.settings.album);
      if(!previous.length){
         previous = $(containerStr + ' LI.'+$.fn.bgStretcher.settings.album+':last');
      }
      switchImage(previous, current);
   };

   /**
    * Public method to switch albums
    */
   $.fn.bgStretcher.changeAlbum = function(album) {
      clearTimer();
      var current = getCurrent();
      $.fn.bgStretcher.settings.album = album;

      $(containerStr + ' LI').stop(true, true);
      $(containerStr + ' LI').removeClass('bgs-current');

      var next = $(containerStr + ' LI.'+$.fn.bgStretcher.settings.album+":first");
      switchImage(next,current);
      if(_paused == false) {
         startTimer();
      }
   };

   /**
    * Common method to start a timer. It is set to repeat a function call every nextSlideDelay
    */
   function startTimer() {
      _bgStretcherTimer = setInterval('$.fn.bgStretcher.next()', $.fn.bgStretcher.settings.nextSlideDelay);
   }

   /**
    * Clear out the timer.
    */
   function clearTimer() {
      if(_bgStretcherTimer != null){
         clearInterval(_bgStretcherTimer);
      }
   }

   /**
    * Way to find out the current image. Keep track with a class .bgs-current
    */
   function getCurrent() {
      return $(containerStr + ' LI.'+$.fn.bgStretcher.settings.album).filter('.bgs-current');
   }


   $.fn.bgStretcher.getCurrentIndex =  function() {
      return $(containerStr + ' LI.'+$.fn.bgStretcher.settings.album).index($('.bgs-current')[0]);
   };

   function getByIndex(index) {
      return $(containerStr + ' LI.'+$.fn.bgStretcher.settings.album+':eq('+index+')');
   }


   /**
    * Whether forward or back, use this method to change from old to new image
    */
   function switchImage(newImage, oldImage) {
      oldImage.removeClass('bgs-current');
      newImage.addClass('bgs-current');
 
      oldImage.stop(true,true).css({opacity:1}).animate( {opacity:0},$.fn.bgStretcher.settings.slideShowSpeed );
      newImage.stop(true,true).css({opacity:0}).animate( {opacity:1},$.fn.bgStretcher.settings.slideShowSpeed );

      //console.log(newImage===oldImage);


}

   $.fn.bgStretcher.switchTo =  function(index){
   		var current = getCurrent();
   		var next = getByIndex(index);
   		switchImage(next, current);
   }


   /**
    * Default Settings. These can be over ridden in the class constructor
    */
   $.fn.bgStretcher.defaults = {
      imageContainer:       'bgstretcher',
      resizeProportionally: true,
      resizeAnimate:        false,
      albums:               [],
      album:                '',
      imageWidth:           1024,
      imageHeight:          768,
      nextSlideDelay:       5000,
      slideShowSpeed:       'normal',
      slideShow:            true
   };
   $.fn.bgStretcher.settings = {};

})(jQuery);