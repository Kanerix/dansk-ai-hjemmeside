const faders = document.querySelectorAll('.snake-text');

const appearOptions = {
	threshold: 0.5,
	rootMargin: "0px 0px 0px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('appear');
		} else {
			entry.target.classList.remove('appear');
		}
	})
}, appearOptions);

faders.forEach(fader => {
	appearOnScroll.observe(fader);
})