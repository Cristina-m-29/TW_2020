const body = document.querySelector('body');
const navBar = document.querySelector('.navbar');
const sideMenuOpen = document.querySelector('#open');
const sideMenuClose = document.querySelector('#close');
const sideMenu = document.querySelector('.sidemenu_container');
const sideMenuOpt = document.querySelector('.options');
const sideMenuImg = document.querySelector('.sidemenu_img');

const userBtn = document.querySelector('.user');

let contorSideMenu = 0;

sideMenuOpen.addEventListener('click',navBarReduceWidth);
sideMenuOpen.addEventListener('click',sideMenuChangeHeight);
sideMenuClose.addEventListener('click',sideMenuUndoHeight);
sideMenuClose.addEventListener('click',navBarUndoWidth);


function navBarReduceWidth(){
    if((contorSideMenu < 2 )){      
      console.log('Open nav bar');
      body.style.overflow = "hidden";
      userBtn.style.display="none";    
      sideMenuOpen.style.display ="none";
      sideMenuClose.style.display="block";
      sleep(1000).then(()=>{
          sideMenuOpt.style.display="block";
          navBar.style.width = "50%";
          contorSideMenu++;
      });
    }    
}

function sideMenuChangeHeight(){
  if(contorSideMenu < 2){
      sideMenu.classList.add('side_height');  
      sideMenuImg.classList.add('side_height'); 
      sideMenu.style.zIndex="13";
      sideMenuImg.style.height = "100%";
      sideMenu.style.height = "100%";
      sideMenuReduceWidth();  
  }
}

function sideMenuReduceWidth(){
  sleep(1000).then(()=>{
    sideMenuImg.style.zIndex="12";
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
    sideMenuOpt.style.display="none";
    sideMenuReset();
}

function sideMenuReset(){
  
  sleep(1000).then(()=>{
    sideMenu.classList.remove('side_height');
    sideMenuImg.classList.remove('side_height');
    sideMenu.style.zIndex = "9";
    sideMenuImg.style.zIndex="9";
    sideMenu.style.width="100%";
    // sideMenuOpt.style.display="block";
    contorSideMenu = 0;
  });  
}

function navBarUndoWidth(){
    sideMenuClose.style.display="none";
    sideMenuOpen.style.display = "block";
    console.log('Close nav bar');
    navBar.style.width="100%";
    userBtn.style.display ="block";
    body.style.overflow = "visible";
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}