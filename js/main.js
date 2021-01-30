let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');

let box = 32;
let snake = [];
let direction = 'right';

snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

function criarBG() {
  context.fillStyle = 'lightgreen';
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarSnake() {
  for (var i = 0; i < snake.length; i++) {
    context.fillStyle = 'violet';
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

document.addEventListener('keydown', update);

function update(e) {
  if (e.keyCode == 37 && direction != 'right') {
    direction = 'left';
  }
  if (e.keyCode == 38 && direction != 'down') {
    direction = 'up';
  }
  if (e.keyCode == 39 && direction != 'left') {
    direction = 'right';
  }
  if (e.keyCode == 40 && direction != 'up') {
    direction = 'down';
  }
}

let food = {
  x: Math.floor(Math.random() * 15) * box,
  y: Math.floor(Math.random() * 15) * box,
};
function drawFood() {
  context.fillStyle = 'blue';
  context.fillRect(food.x, food.y, box, box);
}

function iniciarJogo() {
  if (snake[0].x > 15 * box && direction == 'right') {
    snake[0].x = 0;
  }
  if (direction == 'left' && snake[0].x < 0) {
    snake[0].x = 16 * box;
  }

  if (snake[0].y > 15 * box && direction == 'down') {
    snake[0].y = 0;
  }
  if (direction == 'up' && snake[0].y < 0) {
    snake[0].y = 16 * box;
  }

  for (var i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(jogo);
      alert('Você perdeu, recarregue apágina para joggar novamente');
    }
  }

  criarBG();
  criarSnake();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  switch (direction) {
    case 'right':
      snakeX += box;
      break;
    case 'left':
      snakeX -= box;
      break;
    case 'up':
      snakeY -= box;
      break;
    case 'down':
      snakeY += box;
      break;
  }

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15) * box;
    food.y = Math.floor(Math.random() * 15) * box;
  }
  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 250);
