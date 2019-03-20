/*eslint-env browser*/

/***** VARIABLES ****/

var scores, roundScore, activePlayer, gameActive;

init();


//Roll button logic
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gameActive) {
        //Hides One Notification
        document.querySelector('.one-notification').style.display = 'none';
        
        // Get roll
        var dice = Math.floor((Math.random() * 6) + 1);
        
        // Display result
        var diceDOM = document.querySelector('.dice');
        
        //Overrides the none style set above
        diceDOM.style.display = 'block'; 
        
        //Builds dice png path
        diceDOM.src = 'dice-' + dice + '.png'; 
        
           
        if (dice !== 1){
            // Add to round
            roundScore += dice 
            
            // Set webtext to roundscore
            document.querySelector('#current-' + activePlayer).textContent = roundScore; 
            
        } else {
            
            document.querySelector('.one-notification').style.display = 'block';
            nextPlayer();
            
        }
    }     
});

//Hold button logic
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gameActive){
        //Add round score to global score var    
        scores[activePlayer] += roundScore;
        //Update UI
        document.getElementById('score-'+ activePlayer).textContent = scores[activePlayer];
        
        //TODO Did player win?
        if (scores[activePlayer] >= 20){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); gameActive = false; 
        } else {
            nextPlayer();
        } 
    }
});

//New Game Button
document.querySelector('.btn-new').addEventListener('click', init);


/**** FUNCTIONS ****/

function nextPlayer(){
    
    document.getElementById('current-' + activePlayer).textContent = 0;

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;    

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    //Hides dice ready for next player
    document.querySelector('.dice').style.display = 'none';   
    
}

function init(){
    
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gameActive = true;
        
    document.querySelector('.dice').style.display = 'none';
    
    document.querySelector('.one-notification').style.display = 'none';
    
    document.getElementById('score-1').textContent = '0';
    document.getElementById('score-0').textContent = '0';
    
    document.getElementById('current-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

