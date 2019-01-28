var $body = $('body');
$(document).ready(function(){
    $('.hamburger').on('click', function() {
        $body.toggleClass('menu-open');
        $(this).toggleClass('is-active');
    });

    $('.home-banner__carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        cssEase: 'linear'
      });
});