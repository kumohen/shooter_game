let obj = {
    speed:5,
    ready:true,
    killed: 0,
    time:2200
}
let keys ={
      space:false
  }
let root = document.querySelector(".root");
let play = document.querySelector("#play");
let start = document.querySelector("#start");
start.addEventListener("click",startGame)
document.addEventListener('keydown',pressOn);
//  play.addEventListener('click',playAgain);  
  document.addEventListener('keyup',pressoff);
  const rule = document.querySelector("#rule")

 function startGame(){

 
 obj.plane = document.createElement("div")
  obj.plane.setAttribute("class","plane")
  start.classList.add('show');
  rule.classList.add('show');
   root.appendChild(obj.plane)
  obj.x = obj.plane.offsetLeft ;

  obj.y = obj.plane.offsetTop;
  obj.score = 2000;
  obj.inplay = true
  makeEnemy();


  window.requestAnimationFrame(playGame);
 }
  // function playAgain(){
  //     obj.ready = true;
  //     obj.score = 2000;
  //     obj.x = 0
  //     playGame()
  // }

function playGame(){

  if(obj.inplay){

  
       moveBomb();
      if(keys.space){
              makeBomb();
            
      }
  obj.score--;
  let p = document.querySelector(".score");


 p.textContent = "  SCORE " + obj.score  + "  Correct Shot " + obj.killed;
 p.style.left = 10;
 let time = document.querySelector(".time");
 time.textContent = "Time Left " +  obj.time ;
 obj.time--;
 root.appendChild(p);
      if(keys.ArrowUp && obj.y > 80){
              obj.y -= obj.speed;
          }
          if(keys.ArrowDown && obj.y < 200){
              obj.y += obj.speed;
          }
          if(keys.ArrowLeft && obj.x > 150){
              obj.x -= obj.speed;
          }
          if(keys.ArrowRight ){
              obj.x += obj.speed ;
          }
      
          obj.plane.style.left = obj.x + "px";
          obj.plane.style.top = obj.y + "px";
          window.requestAnimationFrame(playGame);
          obj.x += 1;
          if( obj.x > root.offsetWidth){
          obj.x = 160
         
      }
  }
  if(obj.time === 0){
      gameOver();
      const results = document.querySelector("#result");
  
      results.querySelector('p').textContent = "Your score :"  + obj.score ;
      results.querySelector('#kill').textContent = "You correct shot :"  + obj.killed ;
      results.classList.remove("show");

  }

  }
  console.log("root",root)
  function gameOver(){
      obj.inplay = false;
      let p = document.querySelector(".score");
      let time = document.querySelector(".time");
      p.classList.add('show');
      time.classList.add('show');
      let plane = root.querySelector(".plane");
     
    }

  function makeEnemy(){
      obj.base = document.createElement("div")
      obj.base.setAttribute("class","base")
      obj.base.style.width =  70 + "px";
      obj.base.style.height =  70 + "px";
      obj.base.style.left = Math.floor(Math.random() * (root.offsetWidth -200)) + 200 + "px";
      root.appendChild(obj.base);
  }
  function moveBomb(){
      let bombs = document.querySelectorAll(".bomb")
      bombs.forEach(function(bomb){
          bomb.y += 5 ;
          bomb.style.top = bomb.y + "px";
          if(bomb.y > 730){
            
              bomb.parentElement.removeChild(bomb);
          }  
          if(isCollide(bomb,obj.base)){
              
             obj.base.parentElement.removeChild(obj.base);
             bomb.parentElement.removeChild(bomb);
             obj.score += 1000;
             obj.killed += 1 ;
             makeEnemy();
         }
       
      })

  }
  function isCollide(a,b){
      let aRect = a.getBoundingClientRect();
      let bRact = b.getBoundingClientRect();
      return !(
          (aRect.bottom < bRact.top) ||
          (aRect.top  >  bRact.bottom) ||
          (aRect.right  <  bRact.left) ||
          (aRect.left  >  bRact.right)
      )
  }
  function makeBomb(){
      if(obj.ready){
        
        let bomb = document.createElement("div")
         bomb.classList.add("bomb");
    
         bomb.y = obj.y ;
         bomb.x = obj.x ;
         bomb.style.left = bomb.x + 80 +  "px"
         bomb.style.top = bomb.y + 500 +  "px"
         root.appendChild(bomb);
         obj.ready = false;
         setTimeout(function() {
             obj.ready = true
         }, 500);
     }
  }
  function pressOn(e){
      e.preventDefault();
      let tempKey = (e.key == " ") ? "space" : e.key ;
      keys[tempKey] = true;

  }
  function pressoff(e){
      e.preventDefault();
      let tempKey = (e.key == " ") ? "space" : e.key ;
      keys[tempKey] = false;
 
  }