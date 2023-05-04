var slideIndex = 1;
showSlide(slideIndex);

function prevSlide() {
	showSlide(slideIndex -= 1);
}

function nextSlide() {
	showSlide(slideIndex += 1);
}

function showSlide(next) {
	var slides = document.querySelectorAll(".slider img");

	if (next < 1) {
		slideIndex = slides.length;
	} else if (next > slides.length) {
		slideIndex = 1;
	}

	slides.forEach((slide) => {
		slide.style.opacity = "0";
	});

	slides[slideIndex - 1].style.opacity = "1";
}