const nav_su = document.querySelector('.navbar');
const cont_su = document.querySelector('.main_container');
const su = document.querySelector('.sign-up');
const si_su = document.querySelector('.sign-in');
const close_su = document.querySelector('#close-sign-up');
const sign_su = document.querySelector('.sign-in-su');
const show_pass_su = document.querySelector('.sign-up-view-pass');

const fname = document.querySelector('#fname');
const lname = document.querySelector('#lname');
const email_su = document.querySelector('#email-su');
const pass_su = document.querySelector('#pass-su');

/* SIGN UP ______________________________________________________*/

close_su.addEventListener('click', () => {
    console.log('Close sign up');
    su.style.opacity="0";
    su.style.zIndex="9";
    su.style.top="47%";
    nav_su.style.filter="blur(0px)";
    cont_su.style.filter="blur(0px)";

    fname.value = "";
    lname.value = "";
    email_su.value = "";
    pass_su.value = "";
});

show_pass_su.addEventListener('click', () => {
    var pass = document.querySelector('#pass-su');
    var inner = document.querySelector('#p_su');
    if(pass.type == "password"){
        pass.type = "text";
        inner.innerHTML = "Hide";
    }        
    else{        
        pass.type = "password";
        inner.innerHTML = "Show";
    }
});

sign_su.addEventListener('click',() => {
    console.log('Sign up -> sign in');
    su.style.opacity="0";
    su.style.zIndex="9";
    su.style.top="47%";
    fname.value = "";
    lname.value = "";
    email_su.value = "";
    pass_su.value = "";
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