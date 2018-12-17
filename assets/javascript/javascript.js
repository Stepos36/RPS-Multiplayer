//DOM variables:
var game = $('.gameWindow')



$(document).ready(function() {
    var gt = $('#gameTemplate').html()
    var got =$('#gameOverTemplate').html()
    var mt = $('#menuTemplate').html()
    
    $('.gameWindow').html(mt)

    $(document).on('click', '.startGame', function() {

        $('.gameWindow').html(gt)
    })



    
})