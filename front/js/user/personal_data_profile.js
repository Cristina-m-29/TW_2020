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
    //change data in the db
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