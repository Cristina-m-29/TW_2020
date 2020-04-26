const nav_si = document.querySelector('.navbar');
const cont_si = document.querySelector('.main_container');
const si = document.querySelector('.sign-in');
const su_si = document.querySelector('.sign-up');
const r_si = document.querySelector('.reset-pass');
const close_si = document.querySelector('#close-sign-in');
const reset_si = document.querySelector('.res-si');
const sign_si  = document.querySelector('.sign-up-si');

/* SIGN IN ______________________________________________________*/

close_si.addEventListener('click', () => {
    console.log('Close sign in');
    si.style.opacity="0";
    si.style.zIndex="9";
    si.style.top="47%";
    nav_si.style.filter="blur(0px)";
    cont_si.style.filter="blur(0px)";
});

reset_si.addEventListener('click', () =>{
    console.log("Sign in -> reset pass");
    si.style.opacity="0";
    si.style.zIndex="9";
    si.style.top="47%";
    sleep(500).then(()=> {
        r_si.style.opacity="1";
        r_si.style.zIndex="11";
        r_si.style.top="50%";
    });
});

sign_si.addEventListener('click',() =>{
    console.log("Sign in -> sign up");
    si.style.opacity="0";
    sleep(500).then(()=> {
        su_si.style.opacity="1";
        su_si.style.zIndex="11";
        su_si.style.top="50%";
    });
});

/*SLEEP____________________________________________________________ */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}