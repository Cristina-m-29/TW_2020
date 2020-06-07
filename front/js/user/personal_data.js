var user_firstName = document.querySelector('#user_firstName');
var user_lastName = document.querySelector('#user_lastName');
var user_accountType = document.querySelector('#user_accountType');
var user_birthday = document.querySelector('#user_birthday');
var user_email = document.querySelector('.email_view');
var user_password = document.querySelector('.pass_view');

data_main.addEventListener('onload', setUserData());

function setUserData(){
    //datele trebuie luate din bd
    user_firstName.innerHTML="Cristina";
    user_lastName.innerHTML="Mititelu";
    user_accountType.innerHTML="Individual";
    user_birthday.innerHTML="29-Ian-2000";
    user_email.innerHTML="mititelucristina29@gmail.com";
    user_password.innerHTML="parolamea";
}