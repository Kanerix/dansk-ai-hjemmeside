/*

const snake = document.getElementsByClassName('snake');
const snakeText = document.getElementsByClassName('snake-text');

const snakeOptions = {
  threshold: 0.5 // Change threshold value to 0.5
};

const snakeObserver = new IntersectionObserver(
  function(entries, snakeObserver) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        snakeText.classList.add('appear'); // Add 'appear' class to snakeText
      } else {
        snakeText.classList.remove('appear'); // Remove 'appear' class from snakeText
      }
    })
  },
  snakeOptions
);

snakeObserver.observe(snake);
*/
const faders = document.querySelectorAll('.snake-text');

const appearOptions = {
  threshold: 0.5,
  rootMargin: "200px 0px 0px 200px"
};

const appearOnScroll = new IntersectionObserver 
(function(
  entries, 
  appearOnScroll
  ) {
  entries.forEach(entry =>{

    if(entry.isIntersecting){
      entry.target.classList.add('appear');
      console.log("duck");
    }else{
      console.log("disappear");
      entry.target.classList.remove('appear');
    }
  })
}, 
appearOptions);

faders.forEach(fader =>{
  appearOnScroll.observe(fader);
})