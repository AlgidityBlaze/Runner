// ---------------------Змінні---------------------
startBtn = document.querySelector("#startBtn ");
startW = document.querySelector(".app ");
gameW = document.querySelector(".game");
gamer = document.querySelector("#gamer img");
soundButton = document.querySelector("#sound img");
audioPlayer = document.querySelector("audio");
center = document.querySelector(".center");
end = document.querySelector(".end");
// ------------------------------------------------

// -----Початок гри, створення початкових елементів----
startBtn.onclick = function () {
  startGame();
};

function startGame() {
  gameW.style.display = "block";
  startW.style.display = "none";
  createBomb();
  createLifes();
  createRing();
  createCoin();
}
var lifesCount = 5;
var score = 0;
// функция создания жизней
function createLifes() {
  //выбираем блок
  let lifesBlock = document.querySelector("#lifes");
  // не понял , что делает
  lifesBlock.innerHTML = "";
  let count = 0;
  // создаем spanы с помощью цикла
  while (count < lifesCount) {
    let span = document.createElement("span");
    lifesBlock.appendChild(span);
    count = count + 1;
  }
}

// -------------------------------------------------

// -------------Вмикання\Вимикання музики-----------
sound = "off"; //"on"
soundButton.onclick = function () {
  if (sound == "off") {
    soundButton.src = "images/sound_on.png";
    audioPlayer.play();
    sound = "on";
  } else {
    soundButton.src = "images/mute_sound.png";
    audioPlayer.pause();
    sound = "off";
  }
  audioPlayer.volume = "0.05";
};
// -------------------------------------------------

// -------------Пересування вверх/вниз--------------
document.onkeydown = function (event) {
  if (
    (event.keyCode == 87 && gamer.offsetTop > 130) ||
    (event.keyCode == 38 && gamer.offsetTop > 130)
  ) {
    gamer.style.top = gamer.offsetTop - 25 + "px";
  }

  if (
    (event.keyCode == 83 && gamer.offsetTop < 600) ||
    (event.keyCode == 40 && gamer.offsetTop < 600)
  ) {
    gamer.style.top = gamer.offsetTop + 25 + "px";
  }
}
// -------------------------------------------------

// функция создания бомбы
function createBomb(bomb) {
  //создаем
  var bomb = document.createElement("div");
  bomb.className = "bomb";
  bomb.style.top =
    random(200, document.querySelector(".container").clientHeight - 200) + "px";
  gameW.appendChild(bomb);

  moveBomb(bomb);
  
}

// функция движения бомбы
function moveBomb(bomb) {
  // console.dir(bomb);
  // таймер перемещения врага по полю
  let timerId = setInterval(function () {
    bomb.style.left = bomb.offsetLeft - 300 + "px";
    colision(gamer);
    if (bomb.offsetLeft < -100) {
      // удаляем врага после выхода за пределы поля
      bomb.remove();
       die();
      // создаем нового врага
      createBomb(bomb);
      // очищаем таймер
      clearInterval(timerId);
      
    }
  }, 100);
}
// функция создания кольца
function createRing(ring) {
  //создаем
  var ring = document.createElement("div");
  ring.className = "ring";
  ring.style.top =
    random(200, document.querySelector(".container").clientHeight - 200) + "px";
  gameW.appendChild(ring);

  moveRing(ring);
}

// функция движения кольца
function moveRing(ring) {
  // таймер перемещения кольца по полю
  let timerId = setInterval(function () {
    ring.style.left = ring.offsetLeft - 100 + "px";
    if (ring.offsetLeft < -100) {
      // удаляем кольцо после выхода за пределы поля
      ring.remove();
      addLifes()
      // создаем новое кольцо
      createRing(ring);
      // очищаем таймер
      clearInterval(timerId);
    }
  }, 100);
}
// функция создания монеты
function createCoin(coin) {
  //создаем
  var coin = document.createElement("div");
  coin.className = "coin";
  coin.style.top =
    random(200, document.querySelector(".container").clientHeight - 200) + "px";
  gameW.appendChild(coin);

  moveCoin(coin);
}

// функция движения монеты
function moveCoin(coin) {
  // таймер перемещения монеты по полю
  let timerId = setInterval(function () {
    coin.style.left = coin.offsetLeft - 450 + "px";
    if (coin.offsetLeft < -100) {
      // удаляем кольцо после выхода за пределы поля
      coin.remove();
      addScore()
      // создаем новою монету
      createCoin(coin);
      // очищаем таймер
      clearInterval(timerId);
    }
  }, 100);
}

// функция сталкновения бомбы с игроком (не работает)
function colision(gamer) {
  // выбираем врага 
   let bomb = document.querySelector(".bomb ");
  console.dir(lifesCount)
  
// пишем условия сoлкновения бомбы с игроком
  if ( 
    gamer.offsetTop > bomb.offsetTop
     && gamer.offsetTop < bomb.offsetTop + bomb.clientHeight
     && gamer.offsetRight < bomb.offsetRight
  )
  {
    createBoom(top);
    // звук взрыва
    exp();
    
    // удаляем бомбу
    bomb.remove();
    //минус жизнь
    die();
    //создаем бомбу
    createBomb();
  }
}
// создаем взрыв
function createBoom(top, left) {
  let boom = document.createElement("div");
  boom.className = "boom";
  boom.style.top = top + "px";
  boom.style.left = left + "px";
  gameW.appendChild(boom);
  setTimeout(function () {
    boom.remove();
  }, 1000);
}

function random(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}


function die() {
  lifesCount = lifesCount - 1;
  if (lifesCount <= 0) {
      // выводим окно конец игры
      //alert("Конец игры")
    end.style.display = "block";
    gameW.style.display = "none";
    }
    // настраиваем рестарт
    let restartButton = document.querySelector("#resetBtn");
    restartButton.onclick = restart;

    createLifes();
}

function addLifes() {
  lifesCount = lifesCount + 1;
  createLifes();
}
function addScore() {
  score = score + 1;
  span = document.getElementById("#myScore");
  txt = document.createTextNode("score");
  span.appendChild(txt);
  
}

function exp() {
  var exp = new Audio("../images/bomb.mp3");
  exp.play();
}
// функция перезагрузки игры
function restart() {
  location.reload();
}

