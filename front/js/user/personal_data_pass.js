var pass_view_btn = document.querySelector('.view_user_data_pass');
var pass_dots = document.querySelector('.pass_dots');
var pass_view = document.querySelector('.pass_view');
var pass_hide_btn = document.querySelector('.hide_user_data_pass');
var pass_edit_btn = document.querySelector('.edit_user_data_pass');
var pass_cancel = document.querySelector('.pass_cancel');
var pass_save = document.querySelector('.pass_save');
var pass_view_oldpass = document.querySelector('#pass_edit_view_oldpass');
var pass_view_newpass = document.querySelector('#pass_edit_view_newpass');
var pass = document.querySelector('.main_data_pass');
var pass_edit = document.querySelector('.main_data_pass_edit');

pass_view_btn.addEventListener('click',()=>{
    pass_dots.style.display="none";
    pass_view.style.display="block";
    pass_view_btn.style.display="none";
    pass_hide_btn.style.display="block";
});

pass_hide_btn.addEventListener('click',()=>{
    pass_dots.style.display="block";
    pass_view.style.display="none";
    pass_view_btn.style.display="block";
    pass_hide_btn.style.display="none";
});

pass_edit_btn.addEventListener('click',()=>{
    pass.style.display="none";
    pass_edit.style.display="block";
});

pass_cancel.addEventListener('click',()=>{
    pass_edit.style.display="none";
    pass.style.display="block";
    pass_resetfields();
});

pass_save.addEventListener('click',()=>{
    var oldPass = document.querySelector("#pass_edit_form_oldpass").value;
    var newPass = document.querySelector("#pass_edit_form_newpass").value;
    userData.email_before = userData.email;
    if(oldPass != userData.password){
        alert("Wrong password! Try again!");
    }
    else{
        if(newPass === ""){
        alert("Please enter a new password!");
        }
        else{
        document.querySelector(`.pass_view`).innerHTML = newPass;
        userData.password = newPass;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ()=>{
            if(xhttp.readyState == 4){
            if(xhttp.status == 200){// SUCCES
                console.log(xhttp.responseText);
            } 
            else{
                console.log("somenthing went wrong");
            }            
            }
        } 
        xhttp.open("POST",`updateUser`,true);
        xhttp.resposnseType='application/json';
        xhttp.send(JSON.stringify(userData));
        }
    }
    pass_edit.style.display="none";
    pass.style.display="block";
    pass_resetfields();
});

function pass_resetfields(){
    document.querySelector('#pass_edit_form_oldpass').value="";
    document.querySelector('#pass_edit_form_newpass').value="";    
}

pass_view_oldpass.addEventListener('click',()=>{
    var oldpass = document.querySelector('#pass_edit_form_oldpass');
    var old_inner = document.querySelector('#pass_edit_view_oldpass p');
    if(oldpass.type == "password"){
        oldpass.type = "text";
        oldpass.style.borderRadius="0";
        old_inner.innerHTML = "Hide"; 
    }
    else{
        oldpass.type = "password";
        old_inner.innerHTML = "Show"; 
    }
});

pass_view_newpass.addEventListener('click',()=>{
    var newpass = document.querySelector('#pass_edit_form_newpass');
    var new_inner = document.querySelector('#pass_edit_view_newpass p');
    if(newpass.type == "password"){
        newpass.type = "text";
        newpass.style.borderRadius="0";
        new_inner.innerHTML = "Hide";
    }
    else{
        newpass.type = "password";
        new_inner.innerHTML = "Show";
    }
});