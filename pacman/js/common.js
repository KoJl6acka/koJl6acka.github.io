window.onload = function() {

/* 1 - box
   2 - coin
   3 - ground
 */

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

    var pacman = {
        x: 11,
        y: 5
    };


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
                /*if(map[y][x] === 5){
                    document.getElementById('world').innerHTML += '<div class="pacman"></div>';
                }
                if(map[y][x] === 6){
                    document.getElementById('world').innerHTML += '<div class="pacman pacman_left"></div>';
                }
                if(map[y][x] === 7){
                    document.getElementById('world').innerHTML += '<div class="pacman pacman_top"></div>';
                }
                if(map[y][x] === 8){
                    document.getElementById('world').innerHTML += '<div class="pacman pacman_bottom"></div>';
                }*/
                var div = document.createElement('div');
                div.id = 'cell' + x + y;
                div.classList.add(elementClass);
                document.getElementById('world').appendChild(div);
            }
        }
        document.getElementById('world').innerHTML += '<div class="pacman"></div>';
    }



    var height = 40;

    document.onkeydown = function(e) {
        if (e.keyCode === 37){
            var x = pacman.x;
            if(map[pacman.y][x=x-1] !== 1){
                document.getElementsByClassName('pacman')[0].classList.remove('pacman_bottom', 'pacman_top');
                document.getElementsByClassName('pacman')[0].classList.add('pacman_left');
                var offset = document.getElementsByClassName('pacman')[0].offsetLeft;
                offset -= height;
                offset = offset +'px';
                document.getElementsByClassName('pacman')[0].style.left = offset;
                document.getElementById('cell'+pacman.x+pacman.y).classList.remove('coin');
                document.getElementById('cell'+pacman.x+pacman.y).classList.add('ground');
                pacman.x--;
                setTimeout(300);
            }
        }
        if (e.keyCode === 38){
            var y = pacman.y;
            if(map[y=y-1][pacman.x] !== 1) {
                document.getElementsByClassName('pacman')[0].classList.remove('pacman_bottom', 'pacman_left');
                document.getElementsByClassName('pacman')[0].classList.add('pacman_top');
                var offset = document.getElementsByClassName('pacman')[0].offsetTop;
                offset -= height;
                offset = offset +'px';
                document.getElementsByClassName('pacman')[0].style.top = offset;
                document.getElementById('cell'+pacman.x+pacman.y).classList.remove('coin');
                document.getElementById('cell'+pacman.x+pacman.y).classList.add('ground');
                pacman.y--;
                setTimeout(300);
            }
        }
        if (e.keyCode === 39){
            var x = pacman.x;
            if(map[pacman.y][x=x+1] !== 1) {
                document.getElementsByClassName('pacman')[0].classList.remove('pacman_bottom', 'pacman_top', 'pacman_left');
                var offset = document.getElementsByClassName('pacman')[0].offsetLeft;
                offset += height;
                offset = offset +'px';
                document.getElementsByClassName('pacman')[0].style.left = offset;
                document.getElementById('cell'+pacman.x+pacman.y).classList.remove('coin');
                document.getElementById('cell'+pacman.x+pacman.y).classList.add('ground');
                pacman.x++;
                setTimeout(300);
            }
        }
        if (e.keyCode === 40){
            var y = pacman.y;
            if(map[y=y+1][pacman.x] !== 1) {
                document.getElementsByClassName('pacman')[0].classList.remove('pacman_left', 'pacman_top');
                document.getElementsByClassName('pacman')[0].classList.add('pacman_bottom');
                var offset = document.getElementsByClassName('pacman')[0].offsetTop;
                offset += height;
                offset = offset +'px';
                document.getElementsByClassName('pacman')[0].style.top = offset;
                document.getElementById('cell'+pacman.x+pacman.y).classList.remove('coin');
                document.getElementById('cell'+pacman.x+pacman.y).classList.add('ground');
                pacman.y++;
                console.log(1);
                setTimeout(function(){console.log(2);}, 300);
            }
        }
    };
    createWorld();

};