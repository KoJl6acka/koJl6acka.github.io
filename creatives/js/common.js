$(document).ready(function () {


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

    $('#navbar-main li a').on('click', function (e) {
        e.preventDefault();

        var selector = $(this).attr('href');
        var h = $(selector);

        $('html, body').animate({
            scrollTop: h.offset().top
        }, 1000, $.bez([.88,.01,0,.69]));
    });

    $('.heads').on('click', '.heads_item img', function () {
        $(this).toggleClass('active').siblings().toggleClass('active');
    });

    $('.heads').on('click', '.heads_btn', function(){
        if($('#hide').css('display') == 'none'){
            $(this).find('> button').text('less head');
        }else{
            $(this).find('> button').text('more head');
        }
       $('#hide').slideToggle();
    });


    $('.faq').on('click', 'h4', function(){
        if($(this).next().css('display') == 'none'){
            $('.faq p').slideUp(500);
            $(this).next().slideToggle(500);
        }
    });

    $(".testimonials").slick({
        //adaptiveHeight: true,
        arrows: true,
        centerMode: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        touchThreshold: 2,
        fade: true,
        swipeToSlide: true
    });

    $('#home').on('click', '.popup_open_button', function(){
       $('.popup').fadeIn().addClass('disabled');
    });

    $('.popup').on('click','.popup_close', function(){
        $('.popup').fadeOut();
    });

    $('.popup').on('click', function(e){
        var $popup = $('.popup_form_wrap');
        if (e.target != $popup[0] && $popup.has(e.target).length === 0) //не окно или его доч эл
            $('.popup').fadeOut();
    });

    setTimeout(function(){
        if($('.popup').hasClass('disabled'))
            return;
        $('.popup').fadeIn();
    },5000);


});