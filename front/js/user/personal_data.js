var user_firstName = document.querySelector('#user_firstName');
var user_lastName = document.querySelector('#user_lastName');
var user_accountType = document.querySelector('#user_accountType');
var user_birthday = document.querySelector('#user_birthday');
var user_email = document.querySelector('.email_view');
var user_password = document.querySelector('.pass_view');
var userData;
data_main.addEventListener('onload', setUpUserData());

function setUpUserData(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = ()=>{
        if(xhttp.readyState == 4){
        if(xhttp.status == 200){// SUCCES
          setUserData(JSON.parse(xhttp.responseText));
        } 
        else{
            console.log("somenthing went wrong");
        }            
      }
    } 
    xhttp.open("GET",`getUserData/${localStorage.getItem('email')}`,true);
    xhttp.resposnseType='application/json';
    xhttp.send();
}

function setUserData(user){
    userData = user;
    user_firstName.innerHTML=user.first_name;
    user_lastName.innerHTML=user.last_name;
    user_accountType.innerHTML="User/Individual";
    user_email.innerHTML=user.email;
    user_password.innerHTML=user.password;
}