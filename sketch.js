const height = 600;
const width = 1200;
const GM = 0.1;
const g = 0.001;
let screen = 1;
let p1, p2;

class Pendulum{
	constructor(origin, armLength, mass, angle) {
		this.origin = origin;
		this.length = armLength;
		this.theta = radians(angle);
		this.pos = createVector(0, 0);
		this.normal = createVector(0, 0);
		this.mass = mass;
		this.omega = 0.0;
		this.alpha = 0.0;
		this.radius = this.mass / 10;
		this.dcol = true;
	}

	update() {
		this.omega += this.alpha;
		this.theta += this.omega;

		// Converting From Polar To Cartesian Coordinates
		this.pos.x = this.origin.x + this.length * sin(this.theta);
		this.pos.y = this.origin.y + this.length * cos(this.theta);
	};

	draw() {
		stroke(255, 0, 0);
		strokeWeight(2);
		line(this.origin.x, this.origin.y, this.pos.x, this.pos.y);
		if (this.dcol) {
			fill(100);
		}
		else {
			fill(38, 31, 31);
		}
		ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
	};

	setOrigin(o) {
		this.origin = o;
	};

	setAlpha(alpha) {
		this.alpha = alpha;
	}

	drawOrigin() {
		fill(255, 0, 0);
		rect(this.origin.x, this.origin.y, 8, 8);
	};
}

function startSim(m1, m2, a1, a2, l1, l2) {
	// Constant-ifying Initial Values
	// m1 = round(map(m1, 100, 620, 100, 1000));
	// m2 = round(map(m2, 100, 620, 100, 1000));
	// a1 = round(map(a1, 0, 520, 0, 360));
	// a2 = round(map(a2, 0, 520, 0, 360));
	// l1 = round(map(l1, 0, 520, 50, 200));
	// l2 = round(map(l2, 0, 520, 50, 200));

	p1 = new Pendulum(createVector(width / 2, 100), l1, m1, a1);
	p2 = new Pendulum(createVector(p1.pos.x, p1.pos.y), l2, m2, a2);
	screen = 2;
}

function calcAcc() {
	const mu = 1 + p1.mass / p2.mass;
	const l1 = p1.length;
	const l2 = p2.length;
	const ct12 = cos(p1.theta - p2.theta);
	const st1 = sin(p1.theta);
	const st2 = sin(p2.theta);
	const st12 = sin(p1.theta - p2.theta);
	const dt1sq = p1.omega;
	const dt2sq = p2.omega;

	// const g = GM / ((height - p1.pos.y) * (height - p1.pos.y));

	// Impossible To Understand Equation - Adapted From Wolfram
	p1.setAlpha(
		((g * ((st2 * ct12) - (mu * st1)))
			- (st12 * ((l2 * dt2sq) + (l1 * dt1sq * ct12))))
		/ (l1 * (mu - sq(ct12)))
	);
	p2.setAlpha(
		(g * mu * (st1 * ct12 - st2)
			+ (mu * l1 * dt1sq + l2 * dt2sq * ct12) * st12)
		/ (l2 * (mu - sq(ct12))));
}


function energy() {
	// Calculating Potential Energy (mgh)
	const potEnergy = g * ((p1.mass * (height - p1.pos.y)) + (p2.mass * (height - p2.pos.y)));

	// Calculating Kinetic Energy ((1/2)mv^2)
	const kinEnergy = ((p1.mass * sq(p1.length * p1.omega)) + (p2.mass * sq(p2.length * p2.omega)));
	// Calculating Mechanical Energy (PE + KE)
	let mechEnergy = potEnergy + kinEnergy;

	// Displaying Values
	fill(100, 160, 255);
	textFont('Georgia',20);
	strokeWeight(0);
	text("Kinetic Energy: " + round(kinEnergy), 9, 540);
	text("Potential Energy: " + round(potEnergy), 9, 565);
	text("Mechanical Energy: " + round(mechEnergy), 9, 590);
}

function screen1() {
	stroke(9, 240, 17);
	strokeWeight(5);
	line(40,50,width-40,50);
	line(40,100,width-40,100);
	line(40,150,width-40,150);
	line(40,200,width-40,200);
	line(40,250,width-40,250);
	line(40,300,width-40,300);

	noStroke();
	textFont(createFont("Ravie"),16);
	fill(250, 161, 45);
	rect(ang1+40,50,8,14);
	rect(ang2+40,100,8,14);
	rect(ma1-60,150,8,14);
	rect(ma2-60,200,8,14);
	rect(len1+40,250,8,14);
	rect(len2+40,300,8,14);

	fill(255, 0, 0);
	text("0°",35,76);
	text("360°",width-50,76);
	text("0°",35,126);
	text("360°",width-50,126);
	text("100Px",17,176);
	text("1000Px",width-70,176);
	text("100Px",17,226);
	text("1000Px",width-70,226);
	text("50Px",17,276);
	text("200Px",width-70,276);
	text("50Px",17,326);
	text("200Px",width-70,326);

	//Drawing 'Start Simulation" Button
	fill(0, 255, 204);
	rect(300,500,200,40,90);
	fill(234, 0, 255);
	textSize(16);
	text("Start Simulation",205,505);

	//Logic For Slider Movement And Button Press
	{
		if (mouseX > ang1 + 32 && mouseX < ang1 + 48 && mouseY < 57 && mouseY > 43){
			cursor(HAND);
			if (mouseIsPressed) {
				ang1 = mouseX - 40;
				ang1 = constrain(ang1,0,520);
			}
		}

		else if (mouseX > ang2 + 32 && mouseX < ang2 + 48 && mouseY < 107 && mouseY > 93){
			cursor(HAND);
			if (mouseIsPressed) {
				ang2 = mouseX - 40;
				ang2 = constrain(ang2,0,520);
			}
		}

		else if (mouseX > ma1 - 68 && mouseX < ma1 - 52 && mouseY < 157 && mouseY > 143){
			cursor(HAND);
			if (mouseIsPressed) {
				ma1 = mouseX + 60;
				ma1 = constrain(ma1,100,620);
			}
		}

		else if (mouseX > ma2 - 68 && mouseX < ma2 - 52 && mouseY < 207 && mouseY > 193){
			cursor(HAND);
			if (mouseIsPressed) {
				ma2 = mouseX + 60;
				ma2 = constrain(ma2,100,620);
			}
		}

		else if (mouseX > len1 + 32 && mouseX < len1 + 48 && mouseY < 257 && mouseY > 243){
			cursor(HAND);
			if (mouseIsPressed) {
				len1 = mouseX - 40;
				len1 = constrain(len1,0,520);
			}
		}

		else if (mouseX > len2 + 32 && mouseX < len2 + 48 && mouseY < 307 && mouseY > 293){
			cursor(HAND);
			if (mouseIsPressed) {
				len2 = mouseX - 40;
				len2 = constrain(len2,0,520);
			}
		}

		else if (mouseX > 205 && mouseX < 395 && mouseY > 480 && mouseY < 520) {
			cursor(HAND);
			mouseReleased = function() {
				if ((mouseX > 205 && mouseX < 395 && mouseY > 480 && mouseY < 520) && Screen === 1) {
					startSim(ma1,ma2,ang1,ang2,len1,len2);
				}
			};
		}

		else {
			cursor();
		}
	}
}


function screen2() {
	calcAcc();
	p1.update();
	p2.setOrigin(p1.pos);
	p2.update();
	p2.draw();
	p1.draw();
	p1.drawOrigin();
	energy();
}


function setup() {
	createCanvas(width, height);
	angleMode(RADIANS);
	rectMode(CENTER);
	frameRate(60);

	startSim(500, 500, 90, 90, 200, 200)
}


function draw() {
	background(0);
	screen2();
	// textFont("old english text mt", 30);
	// fill(0, 255, 80);
	// strokeWeight(0);
	// text("Rippr Inc.", 1060, 590);
}
