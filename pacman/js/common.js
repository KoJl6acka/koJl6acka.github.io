window.onload = function() {

/* 1 - box
   2 - coin
   3 - ground
 */
    var score = 0;
    var offset;
    var map = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1],
        [1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1],
        [1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1],
        [1,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,1],
        [1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1],
        [1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1],
        [1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1],
        [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];

    function createWorld() {
        document.getElementById('world').innerHTML = '';
        var elementClass;
        for(var y = 0; y < map.length; y++)
        {
            for(var x = 0; x < map[y].length; x++)
            {
                if(map[y][x] === 1){
                    elementClass = 'box';
                }
                if(map[y][x] === 2){
                    elementClass = 'coin';
                }
                if(map[y][x] === 3){
                    elementClass = 'ground';
                }
                var div = document.createElement('div');
                div.id = 'cell' + x + y;
                div.classList.add(elementClass);
                document.getElementById('world').appendChild(div);
            }
        }
        document.getElementById('world').innerHTML += '<div class="pacman"></div>';
    }

    var pacman = {
        X : 11,
        Y : 5,
        step : 30,
        stepX : 0,
        stepY : 0,
        PACMAN : null,
        move : function(x,y) {
            pacman.stepX = x;
            pacman.stepY = y;
            pacman.PACMAN = document.getElementsByClassName('pacman')[0];
            pacman.PACMAN.classList.remove('pacman_bottom', 'pacman_top', 'pacman_left');

            if(pacman.stepX !== 0){
                if(map[pacman.Y][pacman.X + pacman.stepX] !== 1){
                    offset = pacman.PACMAN.offsetLeft + pacman.step * pacman.stepX;
                    pacman.X = offset / pacman.step;
                    offset = offset + 'px';
                    pacman.PACMAN.style.left = offset;
                    if(pacman.stepX === -1)
                        pacman.PACMAN.classList.add('pacman_left');
                }

            }else if(pacman.stepY !== 0){
                if(map[pacman.Y + pacman.stepY][pacman.X] !== 1){
                    offset = pacman.PACMAN.offsetTop + pacman.step * pacman.stepY;
                    pacman.Y = offset / pacman.step;
                    offset = offset + 'px';
                    pacman.PACMAN.style.top = offset;
                    if(pacman.stepY === -1)
                        pacman.PACMAN.classList.add('pacman_top');
                    else    pacman.PACMAN.classList.add('pacman_bottom');

                }
            }

            if(document.getElementById('cell' + pacman.X + pacman.Y).classList.contains('coin')){
                score += 10;
                document.getElementById('cell' + pacman.X + pacman.Y).classList.remove('coin');
                document.getElementById('cell' + pacman.X + pacman.Y).classList.add('ground');
            }
        }
    };


    document.onkeydown = function(e) {
        if (e.keyCode === 37){
            pacman.move(-1,0);
        }
        if (e.keyCode === 38){
            pacman.move(0,-1);
        }
        if (e.keyCode === 39){
            pacman.move(1,0);
        }
        if (e.keyCode === 40){
            pacman.move(0,1);
        }
        document.querySelector('h4 span').innerHTML = score;
    };

    createWorld();

};