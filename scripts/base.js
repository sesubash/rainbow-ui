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
        //    if($("#mainView").length){
        //     //var panZoomTiger = svgPanZoom('#demo-tiger');
        //     thumbnailViewer({mainViewId: 'mainView',thumbViewId: 'thumbView'});
        //     $("#mainView").on("click", "text", function(){
        //         console.log($(this).text())
        //     });
        //    }

    if($("#floorView").length){
        var images = [];

        $($('#floor-images').prop('content')).find('.image').each(function() {
            images.push({
                    small : $(this).data('small'),
                    big : $(this).data('big')
                });
        });
    
        var curImageIdx = 1,
            total = images.length;
        var wrapper = $('#floorView'),
            curSpan = wrapper.find('.current');
        var viewer = ImageViewer(wrapper.find('.image-container'));
    
        //display total count
        wrapper.find('.total').html(total);
    
        function showImage(){
            var imgObj = images[curImageIdx - 1];
            viewer.load(imgObj.small, imgObj.big);
            curSpan.html(curImageIdx);
            wrapper.removeClass('first').removeClass('last');
            if(curImageIdx == 1) {
                wrapper.addClass('first');
            }else if(curImageIdx == total) {
                wrapper.addClass('last');
            }
        }
    
        wrapper.find('.next').click(function(){
            curImageIdx++;
            if(curImageIdx > total) curImageIdx = 1;
            showImage();
        });
    
        wrapper.find('.prev').click(function(){
            curImageIdx--;
            if(curImageIdx < 0) curImageIdx = total;
            showImage();
        });
    
        //initially show image
        showImage();


        $("#floorView .tab .first").on("click", function(){
            wrapper.find('.prev').trigger("click");
        });
        $("#floorView .tab .last").on("click", function(){
            wrapper.find('.next').trigger("click");
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


    $(document).on("change", "#promotion-by-store, #promotion-by-category", function(e) {
        
        if($("#promotion-by-store").val().toLowerCase() == "all" && $("#promotion-by-category").val().toLowerCase() == "all") {
            $("dt[data-category], dd[data-store]").show();
            return;
        }
        $("#accordionGroup").show().parent().find('.no-item').remove();
        $("dt[data-category], dd[data-store]").hide();
        if($("#promotion-by-store").val().toLowerCase() == "all") {
            $("dt[data-category="+$("#promotion-by-category").val()+"], dd[data-category="+$("#promotion-by-category").val()+"]").show()
        }else if($("#promotion-by-category").val().toLowerCase() == "all") {
            $("dt[data-store="+$("#promotion-by-store").val()+"], dd[data-store="+$("#promotion-by-store").val()+"]").show()
        }else if($("dt[data-store="+$("#promotion-by-store").val()+"][data-category="+$("#promotion-by-category").val()+"], dd[data-store="+$("#promotion-by-store").val()+"][data-category="+$("#promotion-by-category").val()+"]").length){
            $("dt[data-store="+$("#promotion-by-store").val()+"][data-category="+$("#promotion-by-category").val()+"], dd[data-store="+$("#promotion-by-store").val()+"][data-category="+$("#promotion-by-category").val()+"]").show()
        }else {
            $("#accordionGroup").hide().parent().append("<span class='no-item'>No promotions Found</span>");
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