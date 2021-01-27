
stopButton = document.getElementById('stopBtn')
moveDown = document.getElementById('down');
moveUp = document.getElementById('up');
moveRight = document.getElementById('right');
moveLeft = document.getElementById('left');
scoreArea = document.getElementById('score');
let stop = () => {
    clearInterval(loop)
}


let move_left = () => {
    if (snake.direction !== 'right')
        snake.direction = 'left';
}

let move_right = () => {
    if (snake.direction !== 'left')
        snake.direction = 'right';
}

let move_up = () => {
    if (snake.direction !== 'down')
        snake.direction = 'up';
}

let move_down = () => {
    if (snake.direction !== 'up')
        snake.direction = 'down';
}

function keyPressHandler(e) {
    switch (e.key) {
        case "ArrowLeft":
            // Left pressed
            move_left();
            break;
        case "ArrowRight":
            // Right pressed
            move_right();
            break;
        case "ArrowUp":
            // Up pressed
            move_up();
            break;
        case "ArrowDown":
            // Down pressed
            move_down();
            break;
    }
}



document.onkeydown = keyPressHandler;
moveDown.addEventListener('click', move_down)
moveUp.addEventListener('click', move_up)
moveRight.addEventListener('click', move_right)
moveLeft.addEventListener('click', move_left)
stopButton.addEventListener('click', stop)
function init() {
    canvas = document.getElementsByTagName('canvas')[0];
    pen = canvas.getContext('2d');
    score = 0;


    board = {
        height: canvas.height,
        width: canvas.width,
        cellHeight: canvas.height / 20,
        cellWidth: canvas.width / 20
    }


    food = {
        color: 'red',
        x: Math.round(Math.random() * (board.width - board.cellWidth) / board.cellWidth),
        y: Math.round(Math.random() * (board.height - board.cellHeight) / board.cellHeight),
        draw: () => {
            pen.fillStyle = food.color;
            pen.fillRect(food.x * board.cellWidth, food.y * board.cellHeight, board.cellWidth, board.cellHeight);
        }
    }
    snake = {
        cells: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }],
        initLen: 5,
        color: 'blue',
        head: this.initLen - 1,
        direction: 'right',
        draw: () => {
            pen.clearRect(0, 0, board.width, board.height);
            pen.fillStyle = snake.color;
            for (let i = 0; i < snake.cells.length; i++) {
                pen.fillRect(snake.cells[i].x * board.cellWidth, snake.cells[i].y * board.cellHeight, board.cellWidth - 0.5, board.cellHeight - 0.5);
            }
        }
    }
}

init();
function draw() {
    snake.draw();
    food.draw();
}

function update() {
    scoreArea.innerHTML = score;
    //if snake cordinate collide with food than increase snake height and call food.draw one more time
    popLast = true;
    len = snake.cells.length - 1;
    if (snake.cells[len].x === food.x && snake.cells[len].y === food.y) {
        score++;
        food.x = Math.round(Math.random() * (board.width - board.cellWidth) / board.cellWidth);
        food.y = Math.round(Math.random() * (board.height - board.cellHeight) / board.cellHeight);
        food.draw();
        popLast = false;
    }


    let prev_cell_x;
    let prev_cell_y;
    if (snake.direction === 'right') {
        if (popLast)
            snake.cells.shift();
        prev_cell_x = snake.cells[snake.cells.length - 1].x;
        prev_cell_y = snake.cells[snake.cells.length - 1].y;
        prev_cell_x += 1;
        snake.cells.push({ x: prev_cell_x, y: prev_cell_y });
    }
    else if (snake.direction === 'down') {
        if (popLast)
            snake.cells.shift();
        prev_cell_x = snake.cells[snake.cells.length - 1].x;
        prev_cell_y = snake.cells[snake.cells.length - 1].y;
        prev_cell_y += 1;
        snake.cells.push({ x: prev_cell_x, y: prev_cell_y });
    }
    else if (snake.direction === 'left') {
        if (popLast)
            snake.cells.shift();
        prev_cell_x = snake.cells[snake.cells.length - 1].x;
        prev_cell_y = snake.cells[snake.cells.length - 1].y;
        prev_cell_x -= 1;
        snake.cells.push({ x: prev_cell_x, y: prev_cell_y });
    }
    else if (snake.direction === 'up') {
        if (popLast)
            snake.cells.shift();
        prev_cell_x = snake.cells[snake.cells.length - 1].x;
        prev_cell_y = snake.cells[snake.cells.length - 1].y;
        prev_cell_y -= 1;
        snake.cells.push({ x: prev_cell_x, y: prev_cell_y });
    }
}

function touchedItself(cell) {
    for (let i = 0; i < cell.length; i++) {
        for (let j = 0; j < cell.length; j++) {
            if (i != j && (cell[i].x === cell[j].x && cell[i].y === cell[j].y)) {
                return true;
            }
        }
    }
    return false;
}


function gameLoop() {
    len = snake.cells.length - 1;
    if (snake.cells[len].x * board.cellWidth >= board.width || snake.cells[len].x * board.cellWidth < 0 || snake.cells[len].y * board.cellHeight >= board.height || snake.cells[len].y < 0 || touchedItself(snake.cells)) {
        clearInterval(loop)
        alert('your score is : ' + score)
    }
    draw();
    update();
}

loop = setInterval(gameLoop, 100)