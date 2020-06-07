const user = document.querySelector('.user');
const si_user = document.querySelector('.sign-in');
const nav_user = document.querySelector('.navbar');
const cont_user = document.querySelector('.main_container');

user.addEventListener('click', () =>{
        if(localStorage.getItem("logged") === "false" || !("logged" in localStorage)){
                document.querySelector('.wishlist').style.display="none";
                si_user.style.opacity="1";
                si_user.style.zIndex="11";
                si_user.style.top="50%";
                nav_user.style.filter="blur(15px)";
                cont_user.style.filter="blur(15px)";
        }
        else{
                if(localStorage.getItem('email') === "admin_cristina@mail.ro" || localStorage.getItem('email') === "admin_madaline@mail.ro"){
                    window.location.href = "/user/admin.html";
                }
                else{
                    window.location.href = "/user/user.html";
                }  
        }
});
