const container = document.querySelector('.slider_container');
const slider = document.querySelector('.slider_container_sliders');
const sliderImages = document.querySelectorAll('.slide');
const width = sliderImages[1].clientWidth;
let counter = 1;
let contor = 0;

const navBar = document.querySelector('.navbar');
const sideMenuOpen = document.querySelector('#open');
const sideMenuClose = document.querySelector('#close');
const sideMenu = document.querySelector('.sidemenu_container');
const sideMenuImg = document.querySelector('.sidemenu_img');
let contorSideMenu = 0;

sideMenuOpen.addEventListener('click',navBarReduceWidth);
sideMenuOpen.addEventListener('click',sideMenuChangeHeight);
sideMenuClose.addEventListener('click',sideMenuUndoHeight);
sideMenuClose.addEventListener('click',navBarUndoWidth);

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
    // console.log(counter);
    slider.style.transform = 'translateX(' + (-width * counter) + 'px)';
}

slider.addEventListener('transitionend', ()=>{
  
  if(sliderImages[counter].id === 'lastClone'){
    slider.style.transition = 'none';
    counter = 1;
    // console.log('LC'+counter);
    slider.style.transform = 'translateX(' + (`${-width * counter}`) + 'px)';
  }
  if(sliderImages[counter].id === 'firstClone'){
    slider.style.transition = 'none';
    counter = 3;
    // console.log('FC'+counter);
    slider.style.transform = 'translateX(' + (`${-width * counter}`) + 'px)';  
  }
});

function navBarReduceWidth(){
    if((contorSideMenu < 2 )){      
      console.log('Side menu');    
      sideMenuOpen.style.display ="none";
      sideMenuClose.style.display="block";
      sleep(1000).then(()=>{
          navBar.style.width = "50%";
          contorSideMenu++;
      });
    }    
}

function sideMenuChangeHeight(){
  if(contorSideMenu < 2){
      sideMenu.classList.add('side_height');  
      sideMenuImg.classList.add('side_height'); 
      sideMenu.style.zIndex="12";
      sideMenuImg.style.height = "100%";
      sideMenu.style.height = "100%";
      sideMenuReduceWidth();  
  }
}

function sideMenuReduceWidth(){
  sleep(1000).then(()=>{
    sideMenuImg.style.zIndex="11";
    sideMenu.classList.remove('side_height');
    sideMenu.classList.add('side_width');
    sideMenu.style.width="50%";
    contorSideMenu++;    
  });  
}

function sideMenuUndoHeight(){
    sideMenu.classList.remove('side_width');
    sideMenu.classList.add('side_height');
    sideMenu.style.height = "0";
    sideMenuImg.style.height="0";    
    sideMenuReset();
}

function sideMenuReset(){
  
  sleep(1000).then(()=>{
    sideMenu.classList.remove('side_height');
    sideMenuImg.classList.remove('side_height');
    sideMenu.style.zIndex = "9";
    sideMenuImg.style.zIndex="9";
    sideMenu.style.width="100%";
    // sideMenuImg.style.height="100%";
    contorSideMenu = 0;
  });  
}

function navBarUndoWidth(){
    // sleep(1000).then(()=>{
      sideMenuClose.style.display="none";
      sideMenuOpen.style.display = "block";
      console.log('Undo nav bar');
      navBar.style.width="100%";
    // });
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}