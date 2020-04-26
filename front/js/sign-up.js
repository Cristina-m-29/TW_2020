const nav_su = document.querySelector('.navbar');
const cont_su = document.querySelector('.main_container');
const su = document.querySelector('.sign-up');
const si_su = document.querySelector('.sign-in');
const close_su = document.querySelector('#close-sign-up');
const sign_su = document.querySelector('.sign-in-su');

/* SIGN UP ______________________________________________________*/

close_su.addEventListener('click', () => {
    console.log('Close sign up');
    su.style.opacity="0";
    su.style.zIndex="9";
    su.style.top="47%";
    nav_su.style.filter="blur(0px)";
    cont_su.style.filter="blur(0px)";
});

sign_su.addEventListener('click',() => {
    console.log('Sign up -> sign in');
    su.style.opacity="0";
    su.style.zIndex="9";
    su.style.top="47%";
    sleep(500).then(()=> {
        si_su.style.opacity="1";
        si_su.style.zIndex="11";
        si_su.style.top="50%";
    });
});

/*SLEEP____________________________________________________________ */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}