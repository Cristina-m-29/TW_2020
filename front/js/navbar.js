const navBar = document.querySelector('.navbar');
const sideMenuOpen = document.querySelector('#open');
const sideMenuClose = document.querySelector('#close');
const sideMenu = document.querySelector('.sidemenu_container');
const sideMenuOpt = document.querySelector('.options');
const women = document.querySelector('.opt_women');
const men = document.querySelector('.opt_men');
const boy = document.querySelector('.opt_boy');
const girl = document.querySelector('.opt_girl');
const sideMenuImg = document.querySelector('.sidemenu_img');

const userBtn = document.querySelector('.user');

let contorSideMenu = 0;
var popUp = 0;
var windowWidth;

sideMenuOpen.addEventListener('click',navBarReduceWidth);
sideMenuOpen.addEventListener('click',sideMenuChangeHeight);
sideMenuClose.addEventListener('click',sideMenuUndoHeight);
sideMenuClose.addEventListener('click',navBarUndoWidth);

function navBarReduceWidth(){
  windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  console.log(windowWidth);
  if(popUp == 0){
    if((contorSideMenu < 2 )){      
      if(windowWidth > 1000){
        console.log('Open nav bar');      
        userBtn.style.display="none"; 
        document.querySelector('.logged_user').style.display="none";
        sideMenuOpen.style.display ="none";
        sideMenuClose.style.display="block";
        sleep(500).then(()=>{
            sideMenuOpt.style.display="block";
            navBar.style.width = "50%";
            contorSideMenu++;
        });
      }
      else{
        userBtn.style.display="none";   
        document.querySelector('.logged_user').style.display="none"; 
        sideMenuOpen.style.display ="none";
        sideMenuClose.style.display="block";
        contorSideMenu++;
      }
    }    
  }
}

function sideMenuChangeHeight(){
  windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if(popUp == 0){
    if(contorSideMenu < 2){
      if(windowWidth > 1000){
        sideMenu.classList.add('side_height');  
        sideMenuImg.classList.add('side_height'); 
        sideMenu.style.zIndex="13";
        sideMenuImg.style.height = "100%";
        sideMenu.style.height = "100%";
        sideMenuReduceWidth();  
      }
      else{
        // if(windowWidth > 830 && windowWidth <= 1000){
          sideMenu.classList.remove('side_width')
          sideMenu.style.zIndex="13";
          sideMenu.style.height = "100%";
          sideMenu.style.width = "0";
          sideMenuReduceWidth(); 
          sleep(600).then(()=>{
            sideMenuOpt.style.display="block";
          });
        // }
        // else{
        //   if(windowWidth > 700 && windowWidth <=830){
            
        //   }
        // }
      }
    }
  }
}

function sideMenuReduceWidth(){
  windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if(windowWidth >1000){
    sleep(500).then(()=>{
      sideMenuImg.style.zIndex="12";
      sideMenu.classList.remove('side_height');
      sideMenu.classList.add('side_width');
      sideMenu.style.width="50%";
      contorSideMenu++;    
    });  
  }
  else{
    if(windowWidth >830 && windowWidth <= 1000){      
      sleep(500).then(()=>{        
        sideMenu.classList.add('side_width');
        sideMenu.style.width="60%";
        contorSideMenu++; 
      });
    }
    else{
      if(windowWidth > 700 && windowWidth <=830){
        sleep(500).then(()=>{        
          sideMenu.classList.add('side_width');
          sideMenu.style.width="75%";
          contorSideMenu++; 
        });
      }
      else{
        sleep(500).then(()=>{        
          sideMenu.classList.add('side_width');
          sideMenu.style.width="100%";
          contorSideMenu++; 
        });
      }
    }
  }
}

function sideMenuUndoHeight(){
  windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if(windowWidth >1000){
    sideMenu.classList.remove('side_width');
    sideMenu.classList.add('side_height');
    sideMenu.style.height = "0";
    sideMenuImg.style.height="0";      
    sideMenuOpt.style.display="none";
    sideMenuReset();
  }
  else{
    // if(windowWidth > 830 && windowWidth <= 1000){
      sideMenuImg.classList.remove('side_height');
      sideMenuImg.style.zIndex="12";
      sideMenuImg.style.height="0"; 
      sideMenu.style.width = "0";
      sideMenuOpt.style.display="none";
      sideMenuReset();
    // }
    // else{
    //     if(windowWidth > 700 && windowWidth <=830){

    //     }
    // }
  }
}

function sideMenuReset(){
    sleep(1000).then(()=>{
      sideMenu.classList.remove('side_height');
      sideMenuImg.classList.remove('side_height');
      sideMenu.style.zIndex = "9";
      sideMenuImg.style.zIndex="9";
      sideMenu.style.width="100%";
      contorSideMenu = 0;
    });  
}

function navBarUndoWidth(){
    sideMenuClose.style.display="none";
    sideMenuOpen.style.display = "block";
    console.log('Close nav bar');
    navBar.style.width="100%";
    if(user_state == "not logged")
      userBtn.style.display ="block";    
    else
      if(user_state == "logged"){
        document.querySelector('.logged_user').style.display="block";
      }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}