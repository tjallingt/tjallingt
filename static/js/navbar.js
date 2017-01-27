const navbar = document.getElementById('navbar');

// show navbar after scrolling 350px
window.addEventListener('scroll', () => {
	navbar.classList.toggle('background', window.scrollY > 350);
});
