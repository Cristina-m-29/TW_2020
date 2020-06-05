var admin_firstName = document.querySelector('#admin_firstName');
var admin_lastName = document.querySelector('#admin_lastName');
var admin_accountType = document.querySelector('#admin_accountType');
var admin_email = document.querySelector('.admin_email_view');
var admin_password = document.querySelector('.admin_pass_view');

admin_data_main.addEventListener('onload', setUpAdminData());

function setUpAdminData(){
    console.log("get user data");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = ()=>{
        if(xhttp.readyState == 4){
        if(xhttp.status == 200){// SUCCES
          if(xhttp.responseText == "no orders"){
            document.querySelector('.admin_orders_header').style.display="none";
            admin_orders_main.insertAdjacentHTML("beforeend",
            `<p class="admin_no_orders_txt">No orders found</p>`);
          }
          else{
            console.log(xhttp.responseText);
          }
        } 
        else{
            console.log("somenthing went wrong");
        }            
      }
    } 
    xhttp.open("GET",`getUserData/admin_cristina@mail.ro`,true);
    xhttp.resposnseType='application/json';
    xhttp.send();
}

function setAdminData(){
    admin_firstName.innerHTML="Cristina";
    admin_lastName.innerHTML="Mititelu";
    admin_accountType.innerHTML="Individual";
    admin_email.innerHTML="admin_cristina@mail.ro";
    admin_password.innerHTML="admin";
}