$(function(){


    $('.main_hamburger').on('click', function(){
        if($('.main_hamburger').css('width') == '60px'){
            $('.main_hamburger').css('width', '120');
            $('.main_hamburger-inner').addClass('main_hamburger-inner-animate');
            $('nav').addClass('main_nav_open');
        }
        else{
            $('.main_hamburger').css('width', '60');
            $('.main_hamburger-inner').removeClass('main_hamburger-inner-animate');
            $('nav').removeClass('main_nav_open');
        }

    });

    /*function scrollFunction() {
        var scroll = $('.pointer').offset().top;
        var clientHeight = document.documentElement.clientHeight;
        if(scroll < clientHeight)
            $('.pointer').css('opacity', 0);
        else
            $('.pointer').css('opacity', scroll / (clientHeight * 3));
    }

    scrollFunction();

    $(window).on('scroll', scrollFunction);

    $('.pointer').on('click', function(){
        $('html, body').animate({
            scrollTop: 0
        }, 1000, $.bez([.88,.01,0,.69]));
    });*/

    $('.main_nav').on('click','a', function (e) {
        e.preventDefault();

        var selector = $(this).attr('href');
        var h = $(selector);

        $('html, body').animate({
            scrollTop: h.offset().top
        }, 1000, $.bez([.88,.01,0,.69]));
    });

});