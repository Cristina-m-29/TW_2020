const nav_su = document.querySelector('.navbar');
const cont_su = document.querySelector('.main_container');
const su = document.querySelector('.sign-up');
const si_su = document.querySelector('.sign-in');
const close_su = document.querySelector('#close-sign-up');
const sign_su = document.querySelector('.sign-in-su');
const show_pass_su = document.querySelector('.sign-up-view-pass');
const logged_user_su = document.querySelector('.logged_user');
const user_su = document.querySelector('.user');

//change ids and classes
const fname = document.querySelector('.fname_su');
const lname = document.querySelector('.lname_su');
const email_su = document.querySelector('#email-su');
const pass_su = document.querySelector('#pass-su');

/* SIGN UP ______________________________________________________*/

close_su.addEventListener('click', () => {
    su.style.opacity="0";
    su.style.zIndex="9";
    su.style.top="47%";
    nav_su.style.filter="blur(0px)";
    cont_su.style.filter="blur(0px)";
    popUp = 0;

    fname.value = "";
    lname.value = "";
    email_su.value = "";
    pass_su.value = "";

    document.querySelector('.wishlist').style.display="block";
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

function submitSignUp(event){
    const fn = fname.value;
    const ln = lname.value;
    const em = email_su.value;
    const ps = pass_su.value;
    if(fn == "" || ln == "" || em == "" || ps == "") alert("All fields must be completed!");
    else{
        var newUser = {
            first_name: fn,
            last_name: ln,
            email: em,
            password: ps
        }
        console.log(newUser);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ()=>{
            if(xhttp.readyState == 4){
                if(xhttp.status == 200){
                    const res = xhttp.responseText;
                    if(res === "exists") alert("An account for this address already exists!");
                    else{
                        if(res === "added user"){
                            //close pop up
                            su.style.opacity = "0";
                            su.style.zIndex = "0";
                            su.style.top = "47%";
                            nav_si.style.filter="blur(0px)";
                            cont_si.style.filter="blur(0px)";
                            popUp = 0;
                            localStorage.setItem('email',`${em}`);
                            localStorage.setItem('logged','true');

                            //change user icon 
                            if(localStorage.getItem("logged")==="true"){
                                user_su.style.display="none";
                                logged_user_su.style.display="block";   
                            }

                            document.querySelector('.wishlist').style.display="block";
                        }
                    }
                }
                else{
                    console.log("somenthing went wrong");
                }
            }
        } 
        xhttp.open("POST",`addUser`,true);
        xhttp.resposnseType='application/json';
        xhttp.send(JSON.stringify(newUser));
    }
}

/*SLEEP____________________________________________________________ */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}