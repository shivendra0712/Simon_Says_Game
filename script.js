// The DOMContentLoaded event fires when the HTML document has been completely parsed

document.addEventListener("DOMContentLoaded", function () {
    const virtualSpacebar = document.getElementById("virtual-spacebar");
   
    // Initialize game variables
    let gameSeq = [];
    let userSeq = [];
    let btns = ["yellow", "red", "purple", "green"];
    let started = false;
    let level = 0;
    let highScore = 0;
  
    // DOM elements
    let h2 = document.querySelector("h2");
    let allBtns = document.querySelectorAll(".btn");
  
    // Event listener to start the game on spacebar press then call the startGame function
    virtualSpacebar.addEventListener("click", startGame);
    document.addEventListener("keydown", function (event) {
      if (!started && (event.key === " " || event.key === "Spacebar")) {
        startGame();
      }
    });
  

    //check startGame or not when game is started then call the levelUp function.
    function startGame() {
      if (!started) {
        console.log("Game is started");
        started = true;
        virtualSpacebar.style.boxShadow = "none";
        virtualSpacebar.style.transition = "transform 500ms ease-in-out";
        virtualSpacebar.style.transform = "translate(5px, 5px)";
        levelUp();   // call the levelUp function.
      }
    }
  
    // Event listener for button click then callback btnPress function 
    for (let btn of allBtns) {
      btn.addEventListener("click", btnPress); // callback btnPress function 
    }
  
    // Flash effect for game buttons then add flash style class then button color white changes. 
    // and setTimeout remove flash style class and button color change for few seconds.
    function gameFlash(btn) {
      btn.classList.add("flash");
      setTimeout(function () {
        btn.classList.remove("flash");
      }, 250);
    }
  
    // Flash effect for user-selected buttons then add flash style class then button color green changes. 
    // and setTimeout remove flash style class and button color change for few seconds.
    function userFlash(btn) {
      btn.classList.add("userFlash");
      setTimeout(function () {
        btn.classList.remove("userFlash");
      }, 250);
    }
  
    // Level up and generate new sequence
    // userSeq start from empty array and level increase , change heading 2 content and there show level .
    // generate a random number between 0-3 that help find out color 
    // when level up then gameSeq push color and call gameFlash function

    function levelUp() {
      userSeq = [];
      level++;
      h2.innerText = `Level ${level}`;
      let randomIndex = Math.floor(Math.random() * 4);
      let randomColor = btns[randomIndex];
      let randomBtn = document.querySelector(`.${randomColor}`);
      gameSeq.push(randomColor);
      gameFlash(randomBtn);
    }
  
    // Check user's button press and sequence
    // check userSeq and gameSeq is equal then again check  userSeq and gameSeq  length is equal then call the levelup function  
    // wrong sequence press then else contion execute.
    function btnPress() {
      let btn = this;
      userFlash(btn);
  
      function checkAns(index) {
        if (userSeq[index] === gameSeq[index]) {
          if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 600);
          }
        } else {
          // when user press wrong sequence then Play game over sound and upon the screen show Game Over!
          // Your score was high score and press space to restart the game

          const gameOverSound = document.getElementById("gameOverSound");
          gameOverSound.play();
          highScore = checkHighScore(level);
          h2.innerHTML = `Game Over! Your score was <b>${level}</b><br><b>High Score: ${highScore}</b><br>Press space to restart`;
          document.querySelector("body").style.backgroundColor = "red";
          setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "pink";
          }, 150);
          reset();
        }
      }
  
      userColor = btn.getAttribute("id"); //find out the color 
      userSeq.push(userColor); // push userSeq to add color.
  
      checkAns(userSeq.length - 1); // call checkAns function 
    }
  
    // Check and update high score

    function checkHighScore(score) {
      if (score > highScore) {
        highScore = score;
      }
      return highScore;
    }
  
    // Reset game state
    // started value false ,gameSeq and userSeq is empty 
    // again level start from 0.
    function reset() {
      started = false;
      gameSeq = [];
      userSeq = [];
      level = 0;
      virtualSpacebar.style.boxShadow = "5px 5px 4px rgb(255, 255, 255)";
      virtualSpacebar.style.transition = "none";
      virtualSpacebar.style.transform = "none";
    }
  });