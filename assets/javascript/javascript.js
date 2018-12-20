var score1;
var score2;
var choice1 = "";
var chosenNumber;
var otherNumber;
var seat1;
var seat2;
var gameActive;
$(document).ready(function() {
    gameActive = 0
    var config = {
    apiKey: "AIzaSyD59YIx73X9qHrStectDXOorxsKx4xZDe8",
    authDomain: "sndec122018.firebaseapp.com",
    databaseURL: "https://sndec122018.firebaseio.com",
    projectId: "sndec122018",
    storageBucket: "sndec122018.appspot.com",
    messagingSenderId: "722188890040"
  };
  firebase.initializeApp(config);

      var dataRef = firebase.database();
      
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
        $('#welcome').html('')
        gameActive = 1
        checkSeats()
    })

    $(document).on('click', '#seat1', function() {
        chosenNumber = 1
        otherNumber = 2
        seat1 = 1
        setTimeout(function() {
            $('.icons-1').html(i1);
            $('.icons-2').html(i2);
            $('#rock2,#paper2,#scissors2').hide()
        },500)
        $('#seat2').animate({opacity: '0', height: '1px'},1000).hide({},900);
        dataRef.ref().child("Key1").set({player: chosenNumber, choice1: 0, seat: 1
        })
    })
    $(document).on('click', '#rock1', function() {
        choice1 = "rock";
        $('#paper1').hide()
        $('#scissors1').hide()
        dataRef.ref().child("Key1").update({choice1: choice1, seat: 1
        })
    })
    $(document).on('click', '#paper1', function() {
        choice1 = "paper";
        $('#rock1').hide()
        $('#scissors1').hide()
            dataRef.ref().child("Key1").update({choice1: choice1, seat: 1
            })
    })
    $(document).on('click', '#scissors1', function() {
        choice1 = "scissors";
        $('#rock1').hide()
        $('#paper1').hide()
            dataRef.ref().child("Key1").update({choice1: choice1, seat: 1
            })
    })
    
    $(document).on('click', '#seat2', function() {
        chosenNumber = 2
        otherNumber = 1
        seat2 = 1
        setTimeout(function() {
            $('.icons-1').html(i1);
            $('.icons-2').html(i2);
            $('#rock1,#paper1,#scissors1').hide()
        },500)
        $('#seat1').animate({opacity: '0', height: '1px'},1000).hide({},900);
        dataRef.ref().child("Key2").set({player: chosenNumber, choice2: 0, seat: 1
        })
    })
    $(document).on('click', '#rock2', function() {
        choice2 = "rock";
        $('#paper2').hide()
        $('#scissors2').hide()
        dataRef.ref().child("Key2").update({choice2: choice2, seat: 1
        })
    })
    $(document).on('click', '#paper2', function() {
        choice2 = "paper";
        $('#rock2').hide()
        $('#scissors2').hide()
        dataRef.ref().child("Key2").update({choice2: choice2, seat: 1
        })
    })
    $(document).on('click', '#scissors2', function() {
        choice2 = "scissors";
        $('#rock2').hide()
        $('#paper2').hide()
        dataRef.ref().child("Key2").update({choice2: choice2, seat: 1
        })
    })

dataRef.ref().on("value", function(childSnapshot) {
    var ch1 = childSnapshot.val().Key1.choice1
    var ch2 = childSnapshot.val().Key2.choice2
    seat1 = childSnapshot.val().Key1.seat
    seat2 = childSnapshot.val().Key2.seat
    var pl1 = childSnapshot.val().Key1.player
    var pl2 = childSnapshot.val().Key2.player
    if ((childSnapshot.val().Key1.playerLeft===1)&&(childSnapshot.val().Key2.playerLeft===1)){
        $('.gameWindow').empty().html(mt)
        $('#welcome').html('<div>One of the players has left the game</div>')
        score=0
    }

    if (seat1===1) {$('#seat1').hide()}
    if (seat2===1) {$('#seat2').hide()}
    if (((seat1===1)&&(seat2===1))&&(((pl1===1)&&(pl2===2))||((pl2===1)&&(pl1===2)))) {
        if(gameActive===0){
        console.log('player left')
        dataRef.ref().child("Key1").set({player: 0, choice1: 0, seat: 0, playerLeft: 1
        })
        dataRef.ref().child("Key2").set({player: 0, choice2: 0, seat: 0, playerLeft: 1
        })
        }
    }
    console.log('Choice1: ' +ch1)
    console.log('Choice2: ' +ch2)
    console.log('Is seat 1 taken: ' +seat1)
    console.log('Is seat 2 taken: ' + seat2)
    console.log('Player #1 seat: ' + pl1)
    console.log('Player #2 seat: ' + pl2)
    if(((ch1==='rock')||(ch1==='paper')||(ch1==='scissors'))&&((ch2==='rock')||(ch2==='paper')||(ch2==='scissors'))) {
        if (ch1===ch2) {
            console.log('tie')
            if (chosenNumber===1){
                $('#'+ch1+otherNumber).show()
            }
            else if (chosenNumber===2){
                $('#'+ch2+otherNumber).show()
            }
            setTimeout(function() {
                $('#'+ch1+otherNumber).hide()
                $('#'+ch2+otherNumber).hide()
                $('.icons-'+chosenNumber).html($('#rps-'+chosenNumber).html())
                dataRef.ref().child("Key1").update({choice1: 0, seat: 1
                })
                dataRef.ref().child("Key2").update({choice2: 0, seat: 1
                })
            },2000)
        }
        else if (((ch1==='rock')&&(ch2==='scissors'))||((ch1==='paper')&&(ch2==='rock'))||((ch1==='scissors')&&(ch2==='paper'))){
                console.log('player 1 wins')
                if (chosenNumber===2){
                    $('#'+ch1+otherNumber).show()
                }
                else if (chosenNumber===1){
                    $('#'+ch2+otherNumber).show()
                }
                setTimeout(function() {
                    $('#'+ch1+otherNumber).hide()
                    $('#'+ch2+otherNumber).hide()
                    dataRef.ref().child("Key1").update({choice1: 0,
                    })
                    dataRef.ref().child("Key2").update({choice2: 0, 
                    })
                    score1++
                    $('.score-1').html('Score: ' + score1)
                    $('.icons-'+chosenNumber).html($('#rps-'+chosenNumber).html())
                },2000)
            }
        else if (((ch2==='rock')&&(ch1==='scissors'))||((ch2==='paper')&&(ch1==='rock'))||((ch2==='scissors')&&(ch1==='paper'))) {
                console.log('player 2 wins')
                if (chosenNumber===2){
                    $('#'+ch1+otherNumber).show()
                }
                else if (chosenNumber===1){
                    $('#'+ch2+otherNumber).show()
                }
                setTimeout(function() {
                    $('#'+ch1+otherNumber).hide()
                    $('#'+ch2+otherNumber).hide()
                    dataRef.ref().child("Key1").update({choice1: 0,
                    })
                    dataRef.ref().child("Key2").update({choice2: 0, 
                    })
                    score2++
                    $('.score-2').html('Score: ' + score2)
                    $('.icons-'+chosenNumber).html($('#rps-'+chosenNumber).html())
                },2000)
            }
    }
    if ((score1===3)||(score2)===3) {
        game.html(got)
        $('.score').html('<div>Player1 scored: '+ score1+'</div><div>Player2 scored: '+ score2+'</div>')
        dataRef.ref().child("Key1").update({player: 0, choice1: 0, seat: 0
        })
        dataRef.ref().child("Key2").update({player: 0, choice2: 0, seat: 0
        })
        score1 = 0
        score2 = 0
    }
})
})
function checkSeats() {
    if (seat1===1) {$('#seat1').hide()};
    if (seat2===1) {$('#seat2').hide()};
}
  

function startGame() {
    score1 = 0;
    score2 = 0;
    chosenNumber = 0;
}