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
        dataRef.ref().child("Key1").set({player: player,
        })
    })
    $(document).on('click', '#rock1', function() {
        choice1 = "rock";
        $('#paper1').hide()
        $('#scissors1').hide()
        dataRef.ref().child("Key1").set({player: player, choice: choice1
        })
    })
    $(document).on('click', '#paper1', function() {
        choice1 = "paper";
        $('#rock1').hide()
        $('#scissors1').hide()
        dataRef.ref().child("Key1").set({player: player, choice: choice1
        })
    })
    $(document).on('click', '#scissors1', function() {
        choice1 = "scissors";
        $('#rock1').hide()
        $('#paper1').hide()
        dataRef.ref().child("Key1").set({player: player, choice: choice1
        })
    })
    dataRef.ref().on("child_added", function(childSnapshot) {
        
    })

    
    $(document).on('click', '#seat2', function() {
        player = '2'
        $('#seat1').hide()
        $('#seat2').hide()
        $('.icons-1').html(i1).hide()
        $('.icons-2').html(i2)
        dataRef.ref().child("Key2").set({player: player,
        })
    })
    $(document).on('click', '#rock2', function() {
        choice1 = "rock";
        $('#paper2').hide()
        $('#scissors2').hide()
        dataRef.ref().child("Key2").set({player: player, choice: choice1
        })
    })
    $(document).on('click', '#paper2', function() {
        choice1 = "paper";
        $('#rock2').hide()
        $('#scissors2').hide()
        dataRef.ref().child("Key2").set({player: player, choice: choice1
        })
    })
    $(document).on('click', '#scissors2', function() {
        choice1 = "scissors";
        $('#rock2').hide()
        $('#paper2').hide()
        dataRef.ref().child("Key2").set({player: player, choice: choice1
        })
    })
    
})

function startGame() {
    score1 = 0;
    score2 = 0;
}