const canvas = document.getElementById('banner');
const ctx = canvas.getContext('2d');
let numWaves, numSteps;
let waves = [];

function setup() {
	// calculate size of canvas (double scale for mobile devices)
	const width = canvas.offsetWidth * 2;
	const height = canvas.offsetHeight * 2;
	if (canvas.width !== width || canvas.height !== height) {
		canvas.width = width;
		canvas.height = height;
		// calculate number of waves and number of steps per wave based on canvas size
		numWaves = Math.max(Math.ceil(canvas.height / 100), 4);
		numSteps = Math.max(Math.ceil(canvas.width / 150), 9);
		// generate data for the waves
		waves = generateWaves(numWaves, numSteps);
		window.requestAnimationFrame(draw);
	}
};
setup();

window.addEventListener('resize', debounce(setup, 100));

function draw() {
	// clear canvas
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < waves.length; i++) {
		drawWave(waves[i].y, waves[i].steps, i);
	}
}

function generateWaves(n, s) {
	const waves = [];
	for (let i = 0; i < n; i++) {
		waves.push({ y: (canvas.height - 100) / n * i, steps: generateSteps(s) });
	}
	return waves;
}

function generateSteps(n) {
	const steps = [];
	// generate random number for every step
	for (let i = 0; i < n; i++) {
		steps.push(Math.max(Math.random(), 0.02));
	}
	// figure out sum of random steps
	const sum = steps.reduce((a, b) => a + b);
	// step = percentage of sum times total width
	return steps.map((n) => (n / sum) * (canvas.width + 200));
}

function drawWave(y, steps, index) {
	let x = -100; // outside of visible area
	let valley = true; // start with a 'valley'
	
	ctx.beginPath();
	// for every step draw an arc and flip between clockwise and counter-clockwise
	for (let i = 0; i < steps.length; i++) {
		let radius = steps[i] / 2;
		ctx.arc(x + radius, y, radius, Math.PI, 0, valley);
		x += steps[i];
		valley = !valley;
	}
	// finish shape by drawing two lines outside visible area
	ctx.lineTo(canvas.width + 100, canvas.height);
	ctx.lineTo(-100, canvas.height)

	// fill shape with a color
	ctx.fillStyle = `hsl(0, 0%, ${(97 / numWaves) * (index + 1)}%)`;
	ctx.fill();
}