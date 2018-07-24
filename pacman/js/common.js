'use strict';
window.onload = function () {

	/* 1 - wall
		2 - apple
		3 - ground
	 */
	let map = [
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
		[1, 2, 1, 1, 1, 2, 1, 3, 1, 3, 3, 3, 1, 3, 1, 2, 1, 1, 1, 2, 1],
		[1, 2, 2, 2, 2, 2, 2, 3, 1, 3, 3, 3, 1, 3, 2, 2, 2, 2, 2, 2, 1],
		[1, 2, 1, 1, 1, 2, 1, 3, 1, 1, 1, 1, 1, 3, 1, 2, 1, 1, 1, 2, 1],
		[1, 2, 1, 1, 1, 2, 1, 3, 3, 3, 3, 3, 3, 3, 1, 2, 1, 1, 1, 2, 1],
		[1, 2, 2, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 1],
		[1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
		[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	];

	function createWorld() {
		let elementClass;
		for (let y = 0; y < map.length; y++) {
			for (let x = 0; x < map[y].length; x++) {
				if (map[y][x] === 1) {
					elementClass = 'wall';
				}
				if (map[y][x] === 2) {
					elementClass = 'apple';
				}
				if (map[y][x] === 3) {
					elementClass = 'ground';
				}
				let div = document.createElement('div');
				div.id = 'cell-' + x + '-' + y;
				div.classList.add(elementClass);
				document.getElementById('world').appendChild(div);
			}
		}
	}

	let pacman = new Pacman(10, 18, map, 'pacman');
	/* очень похоже что нужно вызвать метод createGost, вызывать его из createWorld (не обязательно) и он будет их содавать. Но если у них уникальные памаметры конструктора то ладно */
	let ghost_1 = new Ghost(9,13, map ,'ghost_1');
	let ghost_2 = new Ghost(9,12, map ,'ghost_2');
	let ghost_3 = new Ghost(11,13, map ,'ghost_3');
	let ghost_4 = new Ghost(11,12, map ,'ghost_4');


	document.onkeydown = function (e) {
		if (e.keyCode === 37 || e.keyCode === 65 || e.keyCode === 97) {
			pacman.makeStep(-1, 0);
		}else if (e.keyCode === 38 || e.keyCode === 119 || e.keyCode === 87) {
			pacman.makeStep(0, -1);
		}else if (e.keyCode === 39 || e.keyCode === 68 || e.keyCode === 100) {
			pacman.makeStep(1, 0);
		}else if (e.keyCode === 40 || e.keyCode === 83 || e.keyCode === 115) {
			pacman.makeStep(0, 1);
		}
	};

	createWorld();

};

class Unit {

	constructor(X, Y, map, objectId) {
		this.X = X;
		this.Y = Y;
		this.object = document.getElementById(objectId);
		this.cell = 30;
		this.fps = 3;
		this.stepX = null;
		this.stepY = null;
		this.tryStepX = null;
		this.tryStepY = null;
		this.run = true;
		this.offset = null;
		this.steps = null;
		this.timer = null;
		this.map = map;
		return this;
	}
	
	
	
	startMove(x, y) {
		if (this.run) {
			this.run = false;
			this.stepX = x;
			this.stepY = y;
			if (this.stepX !== 0)
				this.offset = this.object.offsetLeft;
			else
				this.offset = this.object.offsetTop;

			this.steps = this.cell / this.fps;
			this.onMove();
		}
	}
	
	onMove() {
		let that = this;
		that.timer = setInterval(function () {

			if (that.stepX !== 0) {
				that.offset += that.fps * that.stepX;
				that.object.style.left = that.offset + 'px';
			} else {
				that.offset += that.fps * that.stepY;
				that.object.style.top = that.offset + 'px';
			}

			that.steps--;
			if (that.steps === 0) {
				clearInterval(that.timer);

				if (that.stepX !== 0)
					that.X = that.offset / that.cell;
				else
					that.Y = that.offset / that.cell;

				that.run = true;
				that.doNextStep();
			}
		}, 30);
	};

	makeStep(x, y) {
		if (this.run && this.nextStepPossible(x, y)) {
			this.startMove(x, y);
		} else {
			this.tryStepX = x;
			this.tryStepY = y;
		}
	};

	nextStepPossible(x, y) {
		return this.map[this.Y + y][this.X + x] !== 1
	};

	doNextStep() {
		if (this.nextStepPossible(this.tryStepX, this.tryStepY)
			/* слишком много проверок в ифе. !!!!!!!!!!!!!!!!!!!!!*/
			&& (this.tryStepY !== null || this.tryStepX !== null)) {
			this.startMove(this.tryStepX, this.tryStepY);
			this.tryStepY = null;
			this.tryStepX = null;
		} else if (this.nextStepPossible(this.stepX, this.stepY)) {
			this.startMove(this.stepX, this.stepY);
		} else if (this.stepY !== 0) {
			if (this.nextStepPossible(1, 0)) {
				this.startMove(1, 0);
			} else if (this.nextStepPossible(-1, 0)) {
				this.startMove(-1, 0);
			}
		} else {
			if (this.nextStepPossible(0, 1)) {
				this.startMove(0, 1);
			} else if (this.nextStepPossible(0, -1)) {
				this.startMove(0, -1);
			}
		}
	};
}

class Pacman extends Unit {
	constructor(X, Y, map, objectId) {
		super(X, Y, map, objectId);
		this.currentCell = null;
		this.score = 0;
	}

	makeStep(x, y) {
		if (this.run && this.nextStepPossible(x, y)) {
			this.startMove(x, y);
			this.changeVisualDirection();
		} else {
			this.tryStepX = x;
			this.tryStepY = y;
		}
	}
	onMove() {
		let that = this;
		that.timer = setInterval(function () {
			that.eat();

			if (that.stepX !== 0) {
				that.offset += that.fps * that.stepX;
				that.object.style.left = that.offset + 'px';
			} else {
				that.offset += that.fps * that.stepY;
				that.object.style.top = that.offset + 'px';
			}

			that.steps--;
			if (that.steps === 0) {
				clearInterval(that.timer);

				if (that.stepX !== 0)
					that.X = that.offset / that.cell;
				else
					that.Y = that.offset / that.cell;

				that.run = true;
				that.doNextStep();
				that.changeVisualDirection();
			}
		}, 30);
	}

	eat() {
		this.currentCell = document.getElementById('cell-' + this.X + '-' + this.Y);
		if (this.currentCell.classList.contains('apple')) {
			this.score += 10;
			this.currentCell.classList.remove('apple');
			this.currentCell.classList.add('ground');
			document.querySelector('h4 span').innerHTML = this.score;
		}
	}

	changeVisualDirection(){
		this.object.classList.remove('pacman_bottom', 'pacman_top', 'pacman_left');
		if (this.stepX === -1)
			this.object.classList.add('pacman_left');
		else if (this.stepY === -1)
			this.object.classList.add('pacman_top');
		else if (this.stepY === 1)
			this.object.classList.add('pacman_bottom');
	}
}

class Ghost extends Unit {
	constructor(X, Y, map, objectId) {
		super(X, Y, map, objectId);
		this.random = null;
		this.timerForTryStep = null;

		this.randomMove();

	}

	randomMove() {
		let that = this;
		that.timerForTryStep = setInterval(function(){
			that.random = Math.random();
			/* погугли более изящный вариант такой выборки. это не критично, мб так и нужно) */
			if(0 < that.random && that.random > 0.25)
				that.makeStep(-1,0);
			else if(0.25 < that.random && that.random > 0.5)
				that.makeStep(1,0);
			else if(0.5 < that.random && that.random > 0.75)
				that.makeStep(0,1);
			else
				that.makeStep(0,-1);
		}, 10000);
	}


}