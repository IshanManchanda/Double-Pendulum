const height = 600;
const width = 1200;
const g = 0.1;
let screen = 2;
let p1, p2;

class Pendulum{
	constructor(origin, length, mass, start_angle) {
		this.origin = origin;
		this.length = length;
		this.mass = mass;
		this.theta = radians(start_angle);

		this.pos = createVector(0, 0);
		this.omega = 0.0;
		this.alpha = 0.0;

		this.sin_theta = 0.0;
		this.cos_theta = 0.0;

		this.radius = 20 + this.mass / 12;
		this.dcol = true;
	}

	update() {
		this.omega += this.alpha;
		this.theta += this.omega;

		// Store sin and cos values to be used in various places later
		this.sin_theta = sin(this.theta);
		this.cos_theta = cos(this.theta);

		// Converting From Polar To Cartesian Coordinates
		this.pos.x = this.origin.x + this.length * this.sin_theta;
		this.pos.y = this.origin.y + this.length * this.cos_theta;
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
	// Variables to prettify equations (as much as can)
	const mu = 1 + p1.mass / p2.mass;
	const l1 = p1.length;
	const l2 = p2.length;
	const omega1_sq = sq(p1.omega);
	const omega2_sq = sq(p2.omega);

	const sin_theta1 = p1.sin_theta;
	const sin_theta2 = p2.sin_theta;
	const sin_theta1_2 = sin(p1.theta - p2.theta);
	const cos_theta1_2 = cos(p1.theta - p2.theta);

	const mu_reduced_reciprocal = 1 / (mu - sq(cos_theta1_2))

	// Equations for alphas, adapted from scienceworld.wolfram.com
	p1.setAlpha(
		mu_reduced_reciprocal / l1 * (
			(g * ((sin_theta2 * cos_theta1_2) - (mu * sin_theta1)))
			- (sin_theta1_2 * ((l2 * omega2_sq) + (l1 * omega1_sq * cos_theta1_2)))
		)
	);
	p2.setAlpha(
		mu_reduced_reciprocal / l2 * (
			g * mu * (sin_theta1 * cos_theta1_2 - sin_theta2)
			+ (mu * l1 * omega1_sq + l2 * omega2_sq * cos_theta1_2) * sin_theta1_2
		)
	);
}


function energy() {
	// Variables to prettify equations (as much as can)
	const m1 = p1.mass;
	const m2 = p2.mass;
	const h1 = p1.length * (1 - p1.cos_theta);
	const h2 = p2.length * (1 - p2.cos_theta);
	const v1 = p1.length * p1.omega;
	const v2 = p2.length * p2.omega;

	const cos_theta1_2 = cos(p1.theta - p2.theta);

	// Calculating Potential Energy (mgh)
	const V1 = m1 * g * h1;
	const V2 = m2 * g * (h1 + h2);
	const V = V1 + V2;

	// Calculating Kinetic Energy (1/2 mv^2)
	// Vector sum of velocities for T2
	const T1 = m1 * sq(v1) / 2;
	const T2 = m2 * (sq(v1) + sq(v2) + 2 * v1 * v2 * cos_theta1_2) / 2;
	const T =  T1 + T2;

	// Calculating Mechanical Energy (PE + KE)
	let M = V + T;

	// TODO: Switch to bar showing PE and KE %s as stacked columns
	// Displaying Values
	fill(100, 160, 255);
	textFont('Georgia',20);
	strokeWeight(0);
	text("Kinetic Energy: " + round(T), 9, 540);
	text("Potential Energy: " + round(V), 9, 565);
	text("Mechanical Energy: " + round(M), 9, 590);
}


function screen2() {
	// Calculations
	calcAcc();
	p1.update();
	p2.setOrigin(p1.pos);
	p2.update();

	// Drawing
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
	if (screen === 2) {
		screen2();
	}
}
