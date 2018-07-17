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

    function scrollFunction() {
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
    });

    $('.main_nav').on('click','a', function (e) {
        e.preventDefault();

        var selector = $(this).attr('href');
        var h = $(selector);

        $('html, body').animate({
            scrollTop: h.offset().top
        }, 1000, $.bez([.88,.01,0,.69]));
    });

    $('.main_body').on('click','a',function(){
        $('html, body').animate({
            scrollTop: $('#about').offset().top
        }, 700, $.bez([.29,.78,.38,.97]));
    });

    $(window).on('scroll', function(){
        var imagePos = $('#about').offset().top;
        var topOfWindow = $(window).scrollTop();
        if(imagePos < topOfWindow+50) {
            $('.about_animation_1').addClass('about_bounce_1');
            $('.about_animation_2').addClass('about_bounce_2');
            $('.about_animation_3').addClass('about_bounce_3');
            $('.about_animation_4').addClass('about_bounce_4');
        }
    });




});