var email_view_btn = document.querySelector('.view_user_data_email');
var email_hide_btn = document.querySelector('.hide_user_data_email');
var email_edit_btn = document.querySelector('.edit_user_data_email');
var email_dots = document.querySelector('.email_dots');
var email_view = document.querySelector('.admin_email_view');
var email_cancel = document.querySelector('.email_cancel');
var email_save = document.querySelector('.email_save');
var email_pass_view = document.querySelector('#email_edit_view_pass');
var email = document.querySelector('.main_data_email');
var email_edit = document.querySelector('.main_data_email_edit');


email_view_btn.addEventListener('click',()=>{
    email_dots.style.display="none";
    email_view.style.display="block";
    email_view_btn.style.display="none";
    email_hide_btn.style.display="block";
});

email_hide_btn.addEventListener('click',()=>{
    email_dots.style.display="block";
    email_view.style.display="none";
    email_view_btn.style.display="block";
    email_hide_btn.style.display="none";
});

email_edit_btn.addEventListener('click',()=>{
    email.style.display="none";
    email_edit.style.display="block";
});

email_cancel.addEventListener('click',()=>{
    email_edit.style.display="none";
    email.style.display="block";
    email_resetfields();
});

email_save.addEventListener('click',()=>{
    //change data in db
    email_edit.style.display="none";
    email.style.display="block";
    email_resetfields();
});

function email_resetfields(){
    document.querySelector('#email_edit_form_email').value="";
    document.querySelector('#email_edit_form_pass').value="";    
}

email_pass_view.addEventListener('click',()=>{
    var email_pass = document.querySelector('#email_edit_form_pass');
    var email_inner = document.querySelector('#email_edit_view_pass p');
    if(email_pass.type=="password"){
        email_pass.type="text";
        email_inner.innerHTML="Hide";
        email_pass.style.borderRadius="0";
    }
    else{
        email_pass.type="password";
        email_pass.style.borderRadius="0";
        email_inner.innerHTML="Show";
    }
});