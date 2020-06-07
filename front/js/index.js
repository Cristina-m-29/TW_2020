const container = document.querySelector('.main_container');
const slider = document.querySelector('.slider_container_sliders');
const sliderImages = document.querySelectorAll('.slide');
const width = sliderImages[1].clientWidth;
let counter = 1;
let contor = 0;

/*SLIDESHOW______________________________________________________________________________________*/

slider.style.transform = 'translateX(' + (-width * counter)+ 'px)';

container.addEventListener("mouseenter", startSlide);

function startSlide(){
    if(contor === 0){
        console.log('Start slideshow');
        setInterval(slideshowRight,4000);
        contor++;
    }
}

function slideshowRight(){
    if(counter >= sliderImages.length -1) return;
    slider.style.transition = 'transform 1s ease-in-out';
    counter++;
    slider.style.transform = 'translateX(' + (-width * counter) + 'px)';
}

slider.addEventListener('transitionend', ()=>{
  
  if(sliderImages[counter].id === 'lastClone'){
    slider.style.transition = 'none';
    counter = 1;
    slider.style.transform = 'translateX(' + (`${-width * counter}`) + 'px)';
  }
  if(sliderImages[counter].id === 'firstClone'){
    slider.style.transition = 'none';
    counter = 4;
    slider.style.transform = 'translateX(' + (`${-width * counter}`) + 'px)';  
  }
});

