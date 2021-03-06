var score1;
var score2;
var choice1;
var choice2;
var chosenNumber;
var otherNumber;
var seat1;
var seat2;
var gameActive;
var playerName1 = 'Player 1';
var playerName2 = 'Player 2';
$(document).ready(function() {
    setInterval(updateScroll,1000);
    gameActive = 0;
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
    var gt = $('#gameTemplate').html();
    var got =$('#gameOverTemplate').html();
    var mt = $('#menuTemplate').html();
    var i1 = $('#rps-1').html();
    var i2 = $('#rps-2').html();

    $('.gameWindow').html(mt);

    $(document).on('click', '.startGame', function() {
        $('#welcome').html('');
        gameActive = 1;
        checkSeats();
        dataRef.ref().child("Key1").update({score: 0, playerLeft: 0, playerName:'unknown'
        });
        dataRef.ref().child("Key2").update({score: 0, playerLeft: 0, playerName:'unknown'
        });
        game.html(gt);
        startGame();
        $('.score-2').html('Score: ' + score2);
        $('.score-1').html('Score: ' + score1);
    })
    $(document).on('click', '#seat1', function() {
        playerName = 'Player 1';
        chosenNumber = 1;
        otherNumber = 2;
        seat1 = 1;
        setTimeout(function() {
            $('.icons-1').html(i1);
            $('.icons-2').html(i2);
            $('#rock2,#paper2,#scissors2').hide()
        },500);
        $('#seat2').animate({opacity: '0', height: '1px'},1000).hide({},900);
        $('.name1').html($('#name-1').html());
        dataRef.ref().child("Key1").set({player: chosenNumber, choice: 0, seat: 1, playerName: 'Player 1'
        });
    })
    $(document).on('click', '#rock1', function() {
        choice1 = "rock";
        $('#paper1').hide();
        $('#scissors1').hide();
        dataRef.ref().child("Key1").update({choice: choice1, seat: 1
        });
    })
    $(document).on('click', '#paper1', function() {
        choice1 = "paper";
        $('#rock1').hide();
        $('#scissors1').hide();
            dataRef.ref().child("Key1").update({choice: choice1, seat: 1
            });
    })
    $(document).on('click', '#scissors1', function() {
        choice1 = "scissors";
        $('#rock1').hide();
        $('#paper1').hide();
            dataRef.ref().child("Key1").update({choice: choice1, seat: 1
            });
    })
    
    $(document).on('click', '#seat2', function() {
        playerName = 'Player 2';
        chosenNumber = 2;
        otherNumber = 1;
        seat2 = 1;
        setTimeout(function() {
            $('.icons-1').html(i1);
            $('.icons-2').html(i2);
            $('#rock1,#paper1,#scissors1').hide();
        },500)
        $('#seat1').animate({opacity: '0', height: '1px'},1000).hide({},900);
        $('.name2').html($('#name-2').html());
        dataRef.ref().child("Key2").set({player: chosenNumber, choice: 0, seat: 1, playerName: 'Player 2'
        });
    })
    $(document).on('click', '#rock2', function() {
        choice2 = "rock";
        $('#paper2').hide();
        $('#scissors2').hide();
        dataRef.ref().child("Key2").update({choice: choice2, seat: 1
        });
    })
    $(document).on('click', '#paper2', function() {
        choice2 = "paper";
        $('#rock2').hide();
        $('#scissors2').hide();
        dataRef.ref().child("Key2").update({choice: choice2, seat: 1
        });
    })
    $(document).on('click', '#scissors2', function() {
        choice2 = "scissors";
        $('#rock2').hide();
        $('#paper2').hide();
        dataRef.ref().child("Key2").update({choice: choice2, seat: 1
        });
    })

    $(document).on('click', '#add-name-1', function() {
        playerName1 = $('#name-1-input').val().trim();
        playerName = playerName1;
        dataRef.ref().child("Key1").update({playerName: playerName1
        });
        $('.name1').html('<div class="nam1"><h4>'+playerName1+'</h4></div>');
        $('.name2').html('<div class="nam2"></div>');
    })

    $(document).on('click', '#add-name-2', function() {
        playerName2 = $('#name-2-input').val().trim();
        playerName = playerName2;
        dataRef.ref().child("Key2").update({playerName: playerName2
        });
        $('.name2').html('<div class="nam2"><h4>'+playerName2+'</h4></div>');
        $('.name1').html('<div class="nam1"></div>');
    })
    $(document).on('click', '#add-message', function() {
        dataRef.ref().child("chat").push({name: playerName, message: $('.chat-input').val().trim(), time: firebase.database.ServerValue.TIMESTAMP});
        $('.chat-input').val('');
    })

dataRef.ref().on("value", function(childSnapshot) {
    var ch1 = childSnapshot.val().Key1.choice;
    var ch2 = childSnapshot.val().Key2.choice;
    seat1 = childSnapshot.val().Key1.seat;
    seat2 = childSnapshot.val().Key2.seat;
    var pl1 = childSnapshot.val().Key1.player;
    var pl2 = childSnapshot.val().Key2.player;
    var sc1 = childSnapshot.val().Key1.score;
    var sc2 = childSnapshot.val().Key2.score;
    var nm1 = childSnapshot.val().Key1.playerName;
    var nm2 = childSnapshot.val().Key2.playerName;
    $('.nam2').html('<h4>'+nm2+'</h4>');
    $('.nam1').html('<h4>'+nm1+'</h4>');
    if ((childSnapshot.val().Key1.playerLeft===1)&&(childSnapshot.val().Key2.playerLeft===1)){
        $('.gameWindow').empty().html(mt);
        $('#welcome').html('<div>One of the players has left the game</div>');
        score=0;
    }
    if (seat1===1) {$('#seat1').hide()}
    if (seat2===1) {$('#seat2').hide()}
    if (((seat1===1)&&(seat2===1))&&(((pl1===1)&&(pl2===2))||((pl2===1)&&(pl1===2)))) {
        if(gameActive===0){
        dataRef.ref().child("Key1").set({player: 0, choice: 0, seat: 0, playerLeft: 1
        })
        dataRef.ref().child("Key2").set({player: 0, choice: 0, seat: 0, playerLeft: 1
        })
        }
    }
    if(((ch1==='rock')||(ch1==='paper')||(ch1==='scissors'))&&((ch2==='rock')||(ch2==='paper')||(ch2==='scissors'))) {
        if (ch1===ch2) {
            if (chosenNumber===1){
                $('#'+ch1+otherNumber).show()
            }
            else if (chosenNumber===2){
                $('#'+ch2+otherNumber).show()
            }
            setTimeout(function() {
                $('#'+ch1+otherNumber).hide();
                $('#'+ch2+otherNumber).hide();
                $('.icons-'+chosenNumber).html($('#rps-'+chosenNumber).html());
            },2000)
                dataRef.ref().child("Key"+chosenNumber).update({choice: 0,
                });
        }
        else if (((ch1==='rock')&&(ch2==='scissors'))||((ch1==='paper')&&(ch2==='rock'))||((ch1==='scissors')&&(ch2==='paper'))){
                if (chosenNumber===2){
                    $('#'+ch1+otherNumber).show()
                }
                else if (chosenNumber===1){
                    $('#'+ch2+otherNumber).show()
                }
                setTimeout(function() {
                    $('#'+ch1+otherNumber).hide();
                    $('#'+ch2+otherNumber).hide();
                    score1++;
                    $('.score-1').html('Score: ' + score1);
                    $('.icons-'+chosenNumber).html($('#rps-'+chosenNumber).html());
                    dataRef.ref().child("Key"+chosenNumber).update({ score: score1
                    });
                },2000)
                    dataRef.ref().child("Key"+chosenNumber).update({choice: 0,
                    });
            }
        else if (((ch2==='rock')&&(ch1==='scissors'))||((ch2==='paper')&&(ch1==='rock'))||((ch2==='scissors')&&(ch1==='paper'))) {
                if (chosenNumber===2){
                    $('#'+ch1+otherNumber).show()
                }
                else if (chosenNumber===1){
                    $('#'+ch2+otherNumber).show()
                }
                setTimeout(function() {
                    $('#'+ch1+otherNumber).hide();
                    $('#'+ch2+otherNumber).hide();
                    score2++;
                    $('.score-2').html('Score: ' + score2);
                    $('.icons-'+chosenNumber).html($('#rps-'+chosenNumber).html());
                    dataRef.ref().child("Key"+chosenNumber).update({score: score2
                    });
                },2000);
                    dataRef.ref().child("Key"+chosenNumber).update({choice: 0
                    });
            }
    }
    if ((sc1===3)||(sc2===3)) {
        dataRef.ref().child("Key"+chosenNumber).update({player: 0, choice: 0, seat: 0
        });
        game.html(got);
        $('.score').html('<div>'+nm1+' scored: '+ score1+'</div><div>'+nm2+' scored: '+ score2+'</div>');
    }
})
dataRef.ref('/chat').limitToLast(5).on('child_added', function(snapshot) {
    var chatDiv = $('<div>');
    var chatName = $('<strong>');
    var chatMsg = $('<span>');
    chatName.append(snapshot.val().name);
    chatMsg.append(snapshot.val().message);
    chatDiv.append(chatName).append(': ').append(chatMsg);
    $('.chat-display').append(chatDiv);
    $(".chat-display").animate({ scrollTop: 20000000 }, "slow");
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

function updateScroll(){
    $('.chat-display').scrollTop = $('.chat-display').scrollHeight;
}