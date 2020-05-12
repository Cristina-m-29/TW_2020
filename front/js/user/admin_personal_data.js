var admin_firstName = document.querySelector('#admin_firstName');
var admin_lastName = document.querySelector('#admin_lastName');
var admin_accountType = document.querySelector('#admin_accountType');
var admin_birthday = document.querySelector('#admin_birthday');
var admin_email = document.querySelector('.admin_email_view');
var admin_password = document.querySelector('.admin_pass_view');

admin_data_main.addEventListener('onload', setAdminData());

function setAdminData(){
    admin_firstName.innerHTML="Cristina";
    admin_lastName.innerHTML="Mititelu";
    admin_accountType.innerHTML="Individual";
    admin_birthday.innerHTML="29-Ian-2000";
    admin_email.innerHTML="admin_cristina@mail.ro";
    admin_password.innerHTML="admin";
}