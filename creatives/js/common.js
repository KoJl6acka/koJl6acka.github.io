$(function(){

    var $alertItem = $();
    var $button = $();

    $button.on('click', function(){
       var handler = function(){
           $alertItem.css('display', 'none');
           $alertItem.removeClass('main_nav_open');
           $alertItem.off('transitionend', handler);
       };


        $alertItem.addClass('main_nav_open');
        $alertItem.on('transitionend', handler);



    });

function raf(fn){
    window.requestAnimationFrame(function(){
        window.requestAnimationFrame(function(){
            fn();
        })
    })
}

});