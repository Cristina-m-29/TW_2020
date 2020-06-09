var admin_firstName = document.querySelector('#admin_firstName');
var admin_lastName = document.querySelector('#admin_lastName');
var admin_accountType = document.querySelector('#admin_accountType');
var admin_email = document.querySelector('.admin_email_view');
var admin_password = document.querySelector('.admin_pass_view');
var userData;
admin_data_main.addEventListener('onload', setUpAdminData());

function setUpAdminData(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = ()=>{
        if(xhttp.readyState == 4){
        if(xhttp.status == 200){// SUCCES
          setAdminData(JSON.parse(xhttp.responseText));
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

function setAdminData(user){
    userData = user;
    admin_firstName.innerHTML=user.first_name;
    admin_lastName.innerHTML=user.last_name;
    admin_accountType.innerHTML="Admin/Individual";
    admin_email.innerHTML=user.email;
    admin_password.innerHTML=user.password;
}

document.querySelector('.edit_user_data').addEventListener('click', ()=>{
  document.querySelector(`.main_data_profile`).style.display="none";
  document.querySelector(`.main_data_profile_edit`).style.display="block";
});

document.querySelector(".profile_save").addEventListener("click",()=>{
  var fn = document.querySelector('#profile_first').value;
  var ln = document.querySelector('#profile_last').value;
  var ac = document.querySelector('#select_user_type').value;
  userData.email_before = userData.email;
  if(fn != "") {
    document.querySelector(`#admin_firstName`).innerHTML = fn;
    userData.first_name = fn;
  }
  if(ln != ""){
    document.querySelector(`#admin_lastName`).innerHTML = ln;
    userData.last_name = ln;
  }
  if(fn != "" || ln !=""){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = ()=>{
      if(xhttp.readyState == 4){
        if(xhttp.status != 200){
          console.log("somenthing went wrong");
        }            
      }
    } 
    xhttp.open("POST",`updateUser`,true);
    xhttp.resposnseType='application/json';
    xhttp.send(JSON.stringify(userData));
  }
  document.querySelector(`.main_data_profile`).style.display="block";
  document.querySelector(`.main_data_profile_edit`).style.display="none";
});

document.querySelector(".email_save").addEventListener("click",()=>{
  var email = document.querySelector("#email_edit_form_email").value;
  var pass = document.querySelector("#email_edit_form_pass").value;
  userData.email_before = userData.email;
  if(pass != userData.password){
    alert("Wrong password! Try again!");
  }
  else{
    if(email != ""){
      if(email.search("@")>=0){
        document.querySelector(`.admin_email_view`).innerHTML = email;
        userData.email = email;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ()=>{
          if(xhttp.readyState == 4){
            if(xhttp.status != 200){
              console.log("somenthing went wrong");
            }            
          }
        } 
        xhttp.open("POST",`updateUser`,true);
        xhttp.resposnseType='application/json';
        xhttp.send(JSON.stringify(userData));
      }
      else{
        alert("Please enter a valid email!");
      }
    }
  }
});

document.querySelector(".pass_save").addEventListener("click",()=>{
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
      document.querySelector(`.admin_pass_view`).innerHTML = newPass;
      userData.password = newPass;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = ()=>{
        if(xhttp.readyState == 4){
          if(xhttp.status != 200){
            console.log("somenthing went wrong");
          }            
        }
      } 
      xhttp.open("POST",`updateUser`,true);
      xhttp.resposnseType='application/json';
      xhttp.send(JSON.stringify(userData));
    }
  }
});
