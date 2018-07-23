window.onload = function () {

    /* 1 - box
       2 - apple
       3 - apple
       4 - ghost

     */
    var score = 0;
    var map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 1, 3, 3, 3, 3, 3, 3, 3, 1, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 3, 1, 3, 3, 3, 1, 3, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 3, 1, 4, 3, 4, 1, 3, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 3, 1, 4, 3, 4, 1, 3, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 3, 1, 1, 1, 1, 1, 3, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 3, 3, 3, 3, 3, 3, 3, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 1],
        [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    function createWorld() {
        document.getElementById('world').innerHTML = '';
        var elementClass;
        for (var y = 0; y < map.length; y++) {
            for (var x = 0; x < map[y].length; x++) {
                if (map[y][x] === 1) {
                    elementClass = 'box';
                }
                if (map[y][x] === 2) {
                    elementClass = 'apple';
                }
                if (map[y][x] === 3) {
                    elementClass = 'ground';
                }
                if (map[y][x] === 4) {
                    elementClass = 'ghost';
                }
                var div = document.createElement('div');
                div.id = 'cell' + 'x' + x + 'y' + y;
                div.classList.add(elementClass);
                document.getElementById('world').appendChild(div);
            }
        }
        document.getElementById('world').innerHTML += '<div class="pacman"></div>';
    }

    var pacman = {
        X: 10,
        Y: 18,
        cell: 30,
        fps: 3,
        stepX: null,
        stepY: null,
        tryStepX: null,
        tryStepY: null,
        run: true,
        PACMAN: null,
        life: 3,
        move: function (x, y) {
            if (pacman.run) {
                var offset, steps, timer;
                pacman.run = false;
                pacman.stepX = x;
                pacman.stepY = y;
                pacman.PACMAN = document.getElementsByClassName('pacman')[0];
                pacman.PACMAN.classList.remove('pacman_bottom', 'pacman_top', 'pacman_left');
                if (pacman.stepX !== 0) {
                    if (map[pacman.Y][pacman.X + pacman.stepX] !== 1) {
                        if (pacman.stepX === -1)
                            pacman.PACMAN.classList.add('pacman_left');

                        offset = pacman.PACMAN.offsetLeft;
                        steps = pacman.cell / pacman.fps;
                        timer = setInterval(function () {
                            offset += pacman.fps * pacman.stepX;
                            pacman.PACMAN.style.left = offset + 'px';
                            steps--;
                            if (steps === 0) {
                                clearInterval(timer);
                                pacman.X = offset / pacman.cell;
                                pacman.run = true;
                                if (map[pacman.Y + pacman.tryStepY][pacman.X + pacman.tryStepX] !== 1 && pacman.tryStepY !== null && pacman.tryStepX !== null) {
                                    pacman.move(pacman.tryStepX, pacman.tryStepY);
                                    pacman.tryStepY = null;
                                    pacman.tryStepX = null;
                                }else if (map[pacman.Y + pacman.stepY][pacman.X + pacman.stepX] !== 1) {
                                    pacman.move(pacman.stepX, pacman.stepY);
                                }else if(map[pacman.Y + 1][pacman.X] !== 1){
                                    pacman.move(0, 1);
                                }else if(map[pacman.Y - 1][pacman.X] !== 1){
                                    pacman.move(0, -1);
                                }
                            }
                        }, 30);
                    } else {
                        pacman.run = true;
                    }
                } else if (pacman.stepY !== 0) {
                    if (map[pacman.Y + pacman.stepY][pacman.X] !== 1) {
                        if (pacman.stepY === -1)
                            pacman.PACMAN.classList.add('pacman_top');
                        else pacman.PACMAN.classList.add('pacman_bottom');

                        offset = pacman.PACMAN.offsetTop;
                        steps = pacman.cell / pacman.fps;
                        timer = setInterval(function () {
                            offset += pacman.fps * pacman.stepY;
                            pacman.PACMAN.style.top = offset + 'px';
                            steps--;
                            if (steps === 0) {
                                clearInterval(timer);
                                pacman.Y = offset / pacman.cell;
                                pacman.run = true;
                                if (map[pacman.Y + pacman.tryStepY][pacman.X + pacman.tryStepX] !== 1 && pacman.tryStepY !== null && pacman.tryStepX !== null) {
                                    pacman.move(pacman.tryStepX, pacman.tryStepY);
                                    pacman.tryStepY = null;
                                    pacman.tryStepX = null;
                                }else if (map[pacman.Y + pacman.stepY][pacman.X + pacman.stepX] !== 1) {
                                    pacman.move(pacman.stepX, pacman.stepY);
                                }else if(map[pacman.Y][pacman.X + 1] !== 1){
                                    pacman.move(1, 0);
                                }else if(map[pacman.Y][pacman.X - 1] !== 1){
                                    pacman.move(-1, 0);
                                }
                            }
                        }, 30);

                    } else {
                        pacman.run = true;
                    }
                }
                pacman.eat();
            }
        },
        eat: function () {
            if ( document.getElementById('cell' + 'x' + pacman.X + 'y' + pacman.Y).classList.contains('apple')) {
                score += 10;
                document.getElementById('cell' + 'x' + pacman.X + 'y' + pacman.Y).classList.remove('apple');
                document.getElementById('cell' + 'x' + pacman.X + 'y' + pacman.Y).classList.add('ground');
                document.querySelector('h4 span').innerHTML = score;
            }
        },
    };


    document.onkeydown = function (e) {
        if (e.keyCode === 37 || e.keyCode === 65|| e.keyCode === 97) {
            if (pacman.run)
                pacman.move(-1, 0);
            else {
                pacman.tryStepX = -1;
                pacman.tryStepY = 0;
            }
        }
        if (e.keyCode === 38 || e.keyCode === 119 || e.keyCode === 87) {
            if (pacman.run)
                pacman.move(0, -1);
            else {
                pacman.tryStepX = 0;
                pacman.tryStepY = -1;
            }
        }
        if (e.keyCode === 39 || e.keyCode === 68 || e.keyCode === 100) {
            if (pacman.run)
                pacman.move(1, 0);
            else {
                pacman.tryStepX = 1;
                pacman.tryStepY = 0;
            }
        }
        if (e.keyCode === 40 || e.keyCode === 83 || e.keyCode === 115) {
            if (pacman.run)
                pacman.move(0, 1);
            else {
                pacman.tryStepX = 0;
                pacman.tryStepY = 1;
            }
        }
    };

    createWorld();

};