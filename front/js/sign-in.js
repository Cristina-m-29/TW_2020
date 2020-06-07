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

//change ids and classes
const email_si = document.querySelector('#email-si');
const pass_si = document.querySelector('#pass-si');
var user_state = "not logged";

/* SIGN IN ______________________________________________________*/

close_si.addEventListener('click', () => {
    si.style.opacity="0";
    si.style.zIndex="9";
    si.style.top="47%";
    nav_si.style.filter="blur(0px)";
    cont_si.style.filter="blur(0px)";    
    email_si.value= "";
    pass_si.value="";
    document.querySelector('.wishlist').style.display="block";
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
    const em = email_si.value;
    const ps = pass_si.value;

    if(em == "" || ps == "") alert("All fields must be completed!");
    else{
        var checkUser = {
            email: em,
            password: ps
        }
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ()=>{
            if(xhttp.readyState == 4){
                if(xhttp.status == 200){
                    const res = xhttp.responseText;
                    if(res === "no user found"){
                        alert("No user found!");
                    }
                    else{
                        if(res === "wrong password"){
                            alert("Wrong password!");
                        } 
                        else{
                            if(res === "user found"){
                                //close pop up
                                si.style.opacity = "0";
                                si.style.zIndex = "0";
                                si.style.top = "47%";
                                nav_si.style.filter="blur(0px)";
                                cont_si.style.filter="blur(0px)";

                                localStorage.setItem('email',`${em}`);
                                localStorage.setItem('logged','true');

                                //change user icon 
                                if(localStorage.getItem('logged') === "true"){
                                    user_si.style.display="none";
                                    if(em === "admin_cristina@mail.ro" || em === "admin_madaline@mail.ro"){
                                        admin_si.style.display = "block";
                                    }
                                    else{
                                        logged_user_si.style.display="block"; 
                                    }
                                }

                                document.querySelector('.wishlist').style.display="block";
                            }
                        }
                    }
                }
                else{
                    console.log("somenthing went wrong");
                }
            }
        } 
        xhttp.open("POST",`checkUser`,true);
        xhttp.resposnseType='application/json';
        xhttp.send(JSON.stringify(checkUser));
    }
};

reset_si.addEventListener('click', () =>{
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