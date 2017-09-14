$(document).ready(function() {

    /* sticky nav */
    $('.js-section-features').waypoint(function(direction){
        if(direction === "down"){
            $('nav').addClass('sticky');
        }else {
            $('nav').removeClass('sticky');
        }
    },{
        offset: '85%'
    });
   
});