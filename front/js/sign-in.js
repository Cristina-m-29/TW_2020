const nav_si = document.querySelector('.navbar');
const cont_si = document.querySelector('.main_container');
const si = document.querySelector('.sign-in');
const su_si = document.querySelector('.sign-up');
const r_si = document.querySelector('.reset-pass');
const close_si = document.querySelector('#close-sign-in');
const reset_si = document.querySelector('.res-si');
const sign_si  = document.querySelector('.sign-up-si');
const show_pass_si = document.querySelector('.sign-in-view-pass');
const btn = document.querySelector('#sign-in-btn');
const user_si = document.querySelector('.user');
const admin_si = document.querySelector('.admin');
const logged_user_si = document.querySelector('.logged_user');

const email_si = document.querySelector('#email-si');
const pass_si = document.querySelector('#pass-si');

/* SIGN IN ______________________________________________________*/

close_si.addEventListener('click', () => {
    console.log('Close sign in');
    si.style.opacity="0";
    si.style.zIndex="9";
    si.style.top="47%";
    nav_si.style.filter="blur(0px)";
    cont_si.style.filter="blur(0px)";    
    email_si.value= "";
    pass_si.value="";
});

show_pass_si.addEventListener('click', () => {
    var pass = document.querySelector('#pass-si');
    var inner = document.querySelector('#p_si');
    if(pass.type == "password"){
        pass.type = "text";
        inner.innerHTML = "Hide";
    }        
    else{        
        pass.type = "password";
        inner.innerHTML = "Show";
    }
});


function submitSignIn(event){
    
    //close pop up
    si.style.opacity="0";
    si.style.zIndex="9";
    si.style.top="47%";
    nav_si.style.filter="blur(0px)";
    cont_si.style.filter="blur(0px)";

    //change user icon 
    user_si.style.display="none";
    console.log(email_si.value); 
    //verificare in baza de date - evident
    if(email_si.value == "admin_cristina@mail.ro"){
        admin_si.style.display="block";
    }
    else{
        logged_user_si.style.display="block";
    }    
};

reset_si.addEventListener('click', () =>{
    console.log("Sign in -> reset pass");
    si.style.opacity="0";
    si.style.zIndex="9";
    si.style.top="47%";
    email_si.value= "";
    pass_si.value="";
    sleep(500).then(()=> {
        r_si.style.opacity="1";
        r_si.style.zIndex="11";
        r_si.style.top="50%";
    });
});

sign_si.addEventListener('click',() =>{
    console.log("Sign in -> sign up");
    si.style.opacity="0";
    email_si.value= "";
    pass_si.value="";
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