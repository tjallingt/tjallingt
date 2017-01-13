const canvas = document.getElementById('banner');
const numWaves = 10;
const numSteps = () => Math.max(Math.ceil(canvas.width/75), 9);
const ctx = canvas.getContext('2d');

window.addEventListener('resize', () => {
	if (canvas.width != document.documentElement.clientWidth) {
		window.requestAnimationFrame(draw);
	}
});

window.requestAnimationFrame(draw);

function draw() {
	canvas.width = document.documentElement.clientWidth;
	const waves = generateWaves(numWaves, numSteps());
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (i = 0; i < waves.length; i++) {
		drawWave(waves[i].y, waves[i].steps, i);
	}
}

function generateWaves(n, s) {
	let waves = [];
	for (y = 0; y <= canvas.height-100; y += (canvas.height-100)/n) {
		waves.push({ y: y, steps: generateSteps(s) });
	}
	return waves;
}

function generateSteps(n) {
	let steps = [];
	// generate random floats for number of steps
	for (let i = 0; i < n; i++) {
		steps.push(Math.max(Math.random(), 0.02));
	}
	// figure out sum of random steps
	const sum = steps.reduce((a, b) => a + b);
	// step = percentage of sum times total width
	return steps.map((n) => (n/sum)*(canvas.width+200));
}

function drawWave(y, steps, n) {
	let x = -100; // outside of visible area
	let valley = true; // start with a 'valley'
	
	ctx.beginPath();
	// for every step draw an arc and flip between clockwise and counter-clockwise
	for (let i = 0; i < steps.length; i++) {
		let radius = steps[i]/2;
		ctx.arc(x+radius, y, radius, Math.PI, 0, valley);
		x += steps[i];
		valley = !valley;
	}
	// finish shape by drawing two lines outside visible area
	ctx.lineTo(canvas.width+100, canvas.height);
	ctx.lineTo(-100,canvas.height)

	// fill with shade of grey
	ctx.fillStyle = `hsl(0, 0%, ${(95/numWaves)*n}%)`;
	ctx.fill();
}