var score1;
var score2;

$(document).ready(function() {
    var game = $('.gameWindow');
    var gt = $('#gameTemplate').html()
    var got =$('#gameOverTemplate').html()
    var mt = $('#menuTemplate').html()
    var i1 = $('#rps-1').html()
    var i2 = $('#rps-2').html()

    $('.gameWindow').html(mt)

    $(document).on('click', '.startGame', function() {
        game.html(gt)
        startGame()
        $('.score-1').html('Score: ' + score1)
        $('.score-2').html('Score: ' + score2)

    })

    $(document).on('click', '#seat1', function() {
        $('#seat2').hide()
        $('.icons-1').html(i1)
        $('.icons-2').html(i2).hide()
    })
    $(document).on('click', '#seat2', function() {
        $('#seat1').hide()
        $('.icons-1').html(i1).hide()
        $('.icons-2').html(i2)
    })
    
})

function startGame() {
    score1 = 0;
    score2 = 0;
}