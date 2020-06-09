var profile_edit_btn = document.querySelector('.edit_user_data');
var profile_cancel = document.querySelector('.profile_cancel');
var profile_save = document.querySelector('.profile_save');
var profile = document.querySelector('.main_data_profile');
var profile_edit = document.querySelector('.main_data_profile_edit');

profile_edit_btn.addEventListener('click', ()=>{
    profile.style.display="none";
    profile_edit.style.display="block";
});

profile_cancel.addEventListener('click', ()=>{    
    profile_edit.style.display="none";
    profile.style.display="block";
    profile_resetfields();
});

profile_save.addEventListener('click', ()=>{
    var fn = document.querySelector('#profile_first').value;
    var ln = document.querySelector('#profile_last').value;
    userData.email_before = userData.email;
    if(fn != "") {
        document.querySelector(`#user_firstName`).innerHTML = fn;
        userData.first_name = fn;
    }
    if(ln != ""){
        document.querySelector(`#user_lastName`).innerHTML = ln;
        userData.last_name = ln;
    }
    if(fn != "" || ln !=""){
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
    profile_edit.style.display="none";
    profile.style.display="block";
    profile_resetfields();
});

function profile_resetfields(){
    document.querySelector('#profile_first').value="";
    document.querySelector('#profile_last').value="";
    document.querySelector('#profile_day').value="";
    document.querySelector('#profile_month').value="";
    document.querySelector('#profile_year').value="";
}