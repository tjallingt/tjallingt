const lerp = (a, b, t) => a + t * (b - a);
const random = (a, b) => lerp(a, b, Math.random());
const debounce = (func, wait) => {
	let timeout;
	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
};