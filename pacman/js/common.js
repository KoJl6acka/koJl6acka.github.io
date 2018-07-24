'use strict';
window.onload = function () {

	/* 1 - box
		 2 - apple
		 3 - apple
		 4 - ghost
	 */
	let score = 0;
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
					elementClass = 'box';
				}
				if (map[y][x] === 2) {
					elementClass = 'apple';
				}
				if (map[y][x] === 3) {
					elementClass = 'ground';
				}
				let div = document.createElement('div');
				div.id = 'cell' + 'x' + x + 'y' + y;
				div.classList.add(elementClass);
				document.getElementById('world').appendChild(div);
			}
		}
	}

	class Unit {

		constructor(X, Y, objectId) {
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
			return this;
		}

		main(x, y) {
			if (this.run) {
				this.run = false;
				this.stepX = x;
				this.stepY = y;
				if (this.stepX !== 0)
					this.offset = this.object.offsetLeft;
				else
					this.offset = this.object.offsetTop;

				this.steps = this.cell / this.fps;
				this.unitMoving(this);
			}
		}

		unitMoving(unit) {
			unit.timer = setInterval(function () {

				if (unit.stepX !== 0) {
					unit.offset += unit.fps * unit.stepX;
					unit.object.style.left = unit.offset + 'px';
				} else {
					unit.offset += unit.fps * unit.stepY;
					unit.object.style.top = unit.offset + 'px';
				}

				unit.steps--;
				if (unit.steps === 0) {
					clearInterval(unit.timer);

					if (unit.stepX !== 0)
						unit.X = unit.offset / unit.cell;
					else
						unit.Y = unit.offset / unit.cell;

					unit.run = true;
					unit.callNextStep();
				}
			}, 30);
		};

		tryMakeStep(x, y) {
			if (this.run && this.nextStepPossible(x, y)) {
				this.main(x, y);
			} else {
				this.tryStepX = x;
				this.tryStepY = y;
			}
		}

		nextStepPossible(x, y) {
			return map[this.Y + y][this.X + x] !== 1 ? true : false;
		};

		callNextStep() {
			if (this.nextStepPossible(this.tryStepX, this.tryStepY)
				&& (this.tryStepY !== null || this.tryStepX !== null)) {
				this.main(this.tryStepX, this.tryStepY);
				this.tryStepY = null;
				this.tryStepX = null;
			} else if (this.nextStepPossible(this.stepX, this.stepY)) {
				this.main(this.stepX, this.stepY);
			} else if (this.stepY !== 0) {
				if (this.nextStepPossible(1, 0)) {
					this.main(1, 0);
				} else if (this.nextStepPossible(-1, 0)) {
					this.main(-1, 0);
				}
			} else {
				if (this.nextStepPossible(0, 1)) {
					this.main(0, 1);
				} else if (this.nextStepPossible(0, -1)) {
					this.main(0, -1);
				}
			}
		};
	}

	class Pacman extends Unit{
		constructor(X, Y, objectId) {
			super(X, Y, objectId);
		}

		tryMakeStep(x, y) {
			if (this.run && this.nextStepPossible(x, y)) {
				this.main(x, y);
				this.changeVisualDirection();
			} else {
				this.tryStepX = x;
				this.tryStepY = y;
			}
		}

		unitMoving(unit) {
			unit.timer = setInterval(function () {
				unit.eat();

				if (unit.stepX !== 0) {
					unit.offset += unit.fps * unit.stepX;
					unit.object.style.left = unit.offset + 'px';
				} else {
					unit.offset += unit.fps * unit.stepY;
					unit.object.style.top = unit.offset + 'px';
				}

				unit.steps--;
				if (unit.steps === 0) {
					clearInterval(unit.timer);

					if (unit.stepX !== 0)
						unit.X = unit.offset / unit.cell;
					else
						unit.Y = unit.offset / unit.cell;


					unit.run = true;
					unit.callNextStep();
					unit.changeVisualDirection();
				}
			}, 30);
		}

		eat() {
			if (document.getElementById('cell' + 'x' + this.X + 'y' + this.Y).classList.contains('apple')) {
				score += 10;
				document.getElementById('cell' + 'x' + this.X + 'y' + this.Y).classList.remove('apple');
				document.getElementById('cell' + 'x' + this.X + 'y' + this.Y).classList.add('ground');
				document.querySelector('h4 span').innerHTML = score;
			}
		}

		changeVisualDirection(){
			this.object.classList.remove('pacman_bottom', 'pacman_top', 'pacman_left');
			if (pacman.stepX === -1)
				this.object.classList.add('pacman_left');
			else if (pacman.stepY === -1)
				this.object.classList.add('pacman_top');
			else if (pacman.stepY === 1)
				this.object.classList.add('pacman_bottom');
		}
	}

	class Ghost extends Unit{
		constructor(X, Y, objectId) {
			super(X, Y, objectId);
			this.random = null;
			this.timerForTryStep = null;
		}

		generateTryStep(unit){
			unit.timerForTryStep = setInterval(function(){
				unit.random = Math.random();
				if(0 < unit.random && unit.random > 0.25)
					unit.tryMakeStep(-1,0);
				else if(0.25 < unit.random && unit.random > 0.5)
					unit.tryMakeStep(1,0);
				else if(0.5 < unit.random && unit.random > 0.75)
					unit.tryMakeStep(0,1);
				else
					unit.tryMakeStep(0,-1);
			}, 10000);
		}

	}

	let pacman = new Pacman(10, 18, 'pacman');
	let ghost_1 = new Ghost(9,13, 'ghost_1');
	let ghost_2 = new Ghost(9,12, 'ghost_2');
	let ghost_3 = new Ghost(11,13, 'ghost_3');
	let ghost_4 = new Ghost(11,12, 'ghost_4');
	ghost_1.generateTryStep(ghost_1);
	ghost_2.generateTryStep(ghost_2);
	ghost_3.generateTryStep(ghost_3);
	ghost_4.generateTryStep(ghost_4);

	/*let pacman = {
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
				let offset, steps, timer;
				pacman.run = false;
				pacman.stepX = x;
				pacman.stepY = y;
				pacman.PACMAN = document.getElementsByClassName('pacman')[0];
				pacman.PACMAN.classList.remain('pacman_bottom', 'pacman_top', 'pacman_left');
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
									pacman.main(pacman.tryStepX, pacman.tryStepY);
									pacman.tryStepY = null;
									pacman.tryStepX = null;
								} else if (map[pacman.Y + pacman.stepY][pacman.X + pacman.stepX] !== 1) {
									pacman.main(pacman.stepX, pacman.stepY);
								} else if (map[pacman.Y + 1][pacman.X] !== 1) {
									pacman.main(0, 1);
								} else if (map[pacman.Y - 1][pacman.X] !== 1) {
									pacman.main(0, -1);
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
									pacman.main(pacman.tryStepX, pacman.tryStepY);
									pacman.tryStepY = null;
									pacman.tryStepX = null;
								} else if (map[pacman.Y + pacman.stepY][pacman.X + pacman.stepX] !== 1) {
									pacman.main(pacman.stepX, pacman.stepY);
								} else if (map[pacman.Y][pacman.X + 1] !== 1) {
									pacman.main(1, 0);
								} else if (map[pacman.Y][pacman.X - 1] !== 1) {
									pacman.main(-1, 0);
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
			if (document.getElementById('cell' + 'x' + pacman.X + 'y' + pacman.Y).classList.contains('apple')) {
				score += 10;
				document.getElementById('cell' + 'x' + pacman.X + 'y' + pacman.Y).classList.remain('apple');
				document.getElementById('cell' + 'x' + pacman.X + 'y' + pacman.Y).classList.add('ground');
				document.querySelector('h4 span').innerHTML = score;
			}
		}
	};*/


	document.onkeydown = function (e) {
		if (e.keyCode === 37 || e.keyCode === 65 || e.keyCode === 97) {
			pacman.tryMakeStep(-1, 0);
		}
		if (e.keyCode === 38 || e.keyCode === 119 || e.keyCode === 87) {
			pacman.tryMakeStep(0, -1);
		}
		if (e.keyCode === 39 || e.keyCode === 68 || e.keyCode === 100) {
			pacman.tryMakeStep(1, 0);
		}
		if (e.keyCode === 40 || e.keyCode === 83 || e.keyCode === 115) {
			pacman.tryMakeStep(0, 1);
		}
	};

	createWorld();

}
;