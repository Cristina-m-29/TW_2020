const nav_r = document.querySelector('.navbar');
const cont_r = document.querySelector('.main_container');
const r = document.querySelector('.reset-pass');
const si_r = document.querySelector('.sign-in');
const close_r  = document.querySelector('#close-reset-pass');
const sign_r = document.querySelector('.sign-in-r');
const show_pass_r = document.querySelector('.reset-view-pass');

/* RESET PASS______________________________________________________*/

close_r.addEventListener('click', () => {
    console.log('Close reset');
    r.style.opacity="0";
    r.style.zIndex="9";
    r.style.top="47%";
    nav_r.style.filter="blur(0px)";
    cont_r.style.filter="blur(0px)";
    popUp = 0;
    document.querySelector('.wishlist').style.display="block";
});

show_pass_r.addEventListener('click', () => {
    var pass = document.querySelector('#pass-r');
    var inner = document.querySelector('#p_r');
    if(pass.type == "password"){
        pass.type = "text";
        inner.innerHTML = "Hide";
    }        
    else{        
        pass.type = "password";
        inner.innerHTML = "Show";
    }
});

sign_r.addEventListener('click', () => {
    console.log('Reset pass -> sign in');
    r.style.opacity="0";
    r.style.zIndex="9";
    r.style.top="47%";
    sleep(500).then(()=> {
        si_r.style.opacity="1";
        si_r.style.zIndex="11";
        si_r.style.top="50%";
    });
});

/*SLEEP____________________________________________________________ */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}