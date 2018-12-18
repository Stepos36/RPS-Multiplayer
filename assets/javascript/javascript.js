var score1;
var score2;
var player = "";
var choice1 = "";
var choice2 = "";
var choice3 = "";

$(document).ready(function() {
    
    var config = {
        apiKey: "AIzaSyATd6LDnCdUOO-36JL7fJP72ai2QVXCWeM",
        authDomain: "rps-homework-f05f0.firebaseapp.com",
        databaseURL: "https://rps-homework-f05f0.firebaseio.com",
        projectId: "rps-homework-f05f0",
        storageBucket: "rps-homework-f05f0.appspot.com",
        messagingSenderId: "506267492578"
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

    })

    $(document).on('click', '#seat1', function() {
        player = '1'
        $('#seat1').hide();
        $('#seat2').hide();
        $('.icons-1').html(i1);
        $('.icons-2').html(i2).hide();
        dataRef.ref().child("Key1").set({player: player, choice1: 0
        })
    })
    $(document).on('click', '#rock1', function() {
        choice1 = "rock";
        $('#paper1').hide()
        $('#scissors1').hide()
        dataRef.ref().child("Key1").set({player: player, choice1: choice1
        })
    })
    $(document).on('click', '#paper1', function() {
        choice1 = "paper";
        $('#rock1').hide()
        $('#scissors1').hide()
        dataRef.ref().child("Key1").set({player: player, choice1: choice1
        })
    })
    $(document).on('click', '#scissors1', function() {
        choice1 = "scissors";
        $('#rock1').hide()
        $('#paper1').hide()
        dataRef.ref().child("Key1").set({player: player, choice1: choice1
        })
    })
    dataRef.ref().on("value", function(childSnapshot) {
        var ch1 = childSnapshot.val().Key1.choice1
        var ch2 = childSnapshot.val().Key2.choice2
        console.log(ch1)
        console.log(ch2)
        if(((ch1==='rock')||(ch1==='paper')||(ch1==='scissors'))&&((ch2==='rock')||(ch2==='paper')||(ch2==='scissors'))) {
            if (ch1===ch2) {console.log('tie')}
            else if (((ch1==='rock')&&(ch2==='scissors'))||((ch1==='paper')&&(ch2==='rock'))||((ch1==='scissors')&&(ch2==='paper'))){
                    console.log('player 1 wins')
                    dataRef.ref().child("Key1").set({player: player, choice1: 0
                    })
                    dataRef.ref().child("Key2").set({player: player, choice2: 0
                    })
                    score1++
                    $('.score-1').html('Score: ' + score1)
                }
            else {
                    console.log('player 2 wins')
                    dataRef.ref().child("Key1").set({
                        player: player, choice1: 0
                    })
                    dataRef.ref().child("Key2").set({
                        player: player, choice2: 0
                    })
                    score2++
                    $('.score-2').html('Score: ' + score2)
                }
        }
        if ((score1===3)||(score2)===3) {
            game.html(got)
        }
    })

    
    $(document).on('click', '#seat2', function() {
        player = '2'
        $('#seat1').hide()
        $('#seat2').hide()
        $('.icons-1').html(i1).hide()
        $('.icons-2').html(i2)
        dataRef.ref().child("Key2").set({player: player, choice2: 0
        })
    })
    $(document).on('click', '#rock2', function() {
        choice2 = "rock";
        $('#paper2').hide()
        $('#scissors2').hide()
        dataRef.ref().child("Key2").set({player: player, choice2: choice2
        })
    })
    $(document).on('click', '#paper2', function() {
        choice2 = "paper";
        $('#rock2').hide()
        $('#scissors2').hide()
        dataRef.ref().child("Key2").set({player: player, choice2: choice2
        })
    })
    $(document).on('click', '#scissors2', function() {
        choice2 = "scissors";
        $('#rock2').hide()
        $('#paper2').hide()
        dataRef.ref().child("Key2").set({player: player, choice2: choice2
        })
    })
})

  

function startGame() {
    score1 = 0;
    score2 = 0;
}