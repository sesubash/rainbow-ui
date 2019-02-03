var $body = $('body');
$(document).ready(function(){
    
    $('.hamburger').on('click', function() {
        $body.toggleClass('menu-open');
        $(this).toggleClass('is-active');
    });

    $('[data-component]').each(function(i){
        if($(this).data('component') == 'carousel') {
            carousel.init($(this));
        }
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-top').fadeIn();
        } else {
            $('.scroll-top').fadeOut();
        }
    });

    $('.scroll-top').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 100);
        return false;
    });

   // Store map
   if($("#mainView").length){
    //var panZoomTiger = svgPanZoom('#demo-tiger');
    thumbnailViewer({mainViewId: 'mainView',thumbViewId: 'thumbView'});
    $("#mainView").on("click", "text", function(){
        console.log($(this).text())
    });
   }
   
});



//======================
// Carousel component
//======================
var carousel = {
    init: function($el){
        var options = JSON.parse(JSON.stringify($el.data('options')));
        $el.slick(options);
    }
}