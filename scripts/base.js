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


   $(document).on("change", "#by-category", function(e) {
        
        if($("#by-category option:selected").html().trim().toLowerCase() == "all") {
            $(".directory").removeClass("category-sort");
        }else {
            $(".directory").removeClass("z-a").addClass("category-sort");
            $(".directory .category-name h4").html($("#by-category option:selected").html());
            $(".directory .directory__item [data-category]").hide();
            $(".directory .directory__item [data-category="+$("#by-category").val()+"]").show()
        }
   });

   $(document).on("change", "#by-store", function(e) {
        if($(this).val().toLowerCase() == "z-a") {
            $('.directory').addClass('sort-z-a').removeClass("category-sort");
        }else {
            $('.directory').removeClass('sort-z-a').removeClass("category-sort");
        }
   });

   $(document).on("click", ".navigation__item.has-submenu", function(e) {
       $('.navigation__item.has-submenu').removeClass('menu-open');
       $(this).toggleClass('menu-open');

   });

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