const user = document.querySelector('.user');
const si_user = document.querySelector('.sign-in');
const nav_user = document.querySelector('.navbar');
const cont_user = document.querySelector('.main_container');
var popUp = 0;

user.addEventListener('click', () =>{
        if(localStorage.getItem("logged") === "false" || !("logged" in localStorage)){
                popUp = 1;
                document.querySelector('.wishlist').style.display="none";
                si_user.style.opacity="1";
                si_user.style.zIndex="11";
                si_user.style.top="50%";
                nav_user.style.filter="blur(15px)";
                cont_user.style.filter="blur(15px)";
        }
        else{
                popUp = 0;
                if(localStorage.getItem('email') === "admin_cristina@mail.ro" || localStorage.getItem('email') === "admin_madaline@mail.ro"){
                    window.location.href = "/user/admin.html";
                }
                else{
                    window.location.href = "/user/user.html";
                }  
        }
});
