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

    function raf(fn){
        window.requestAnimationFrame(function(){
            window.requestAnimationFrame(function(){
                fn();
            })
        })
    }

});