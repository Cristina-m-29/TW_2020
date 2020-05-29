var admin_data_side = document.querySelector('.data');
var admin_data_main = document.querySelector('.main_data');
var admin_users_side = document.querySelector('.users');
var admin_users_main = document.querySelector('.main_users');
var admin_orders_side = document.querySelector('.orders');
var admin_orders_main = document.querySelector('.main_orders');
var admin_products_side = document.querySelector('.products');
var admin_products_main = document.querySelector('.main_products');
var admin_add_products_side = document.querySelector('.add_products');
var admin_add_products_main = document.querySelector('.main_add_products');

// window.addEventListener("onload",setUpAdmin());

// function setUpAdmin(){
//    
// }

admin_data_side.addEventListener('click',()=>{   
    console.log("Personal data");
    //reset others    
    admin_users_side.style.fontWeight="normal";
    admin_users_main.style.display = "none";
    admin_users_side.style.color = "#8c8c8c";
    admin_users_side.style.backgroundImage="url(../../images/user/avatar.svg)";

    admin_orders_side.style.fontWeight="normal";    
    admin_orders_main.style.display = "none";
    admin_orders_side.style.color = "#8c8c8c";
    admin_orders_side.style.backgroundImage="url('../../images/user/box.svg')";

    admin_products_side.style.fontWeight="normal";    
    admin_products_main.style.display = "none";
    admin_products_side.style.color = "#8c8c8c";
    admin_products_side.style.backgroundImage="url('../../images/user/pay.svg')";

    admin_add_products_side.style.fontWeight="normal";    
    admin_add_products_main.style.display = "none";
    admin_add_products_side.style.color = "#8c8c8c";
    admin_add_products_side.style.backgroundImage="url('../../images/user/pay.svg')";

    //set current
    admin_data_side.style.fontWeight="bold";
    admin_data_main.style.display = "block";
    admin_data_side.style.color = "#000000";
    admin_data_side.style.backgroundImage = "url(../../images/user/avatar-dark.svg)";
});

admin_users_side.addEventListener('click',()=>{
    console.log("Store users");
    //reset others    
    admin_data_side.style.fontWeight="normal";
    admin_data_main.style.display = "none";
    admin_data_side.style.color = "#8c8c8c";
    admin_data_side.style.backgroundImage = "url(../../images/user/avatar.svg)";

    admin_orders_side.style.fontWeight="normal";    
    admin_orders_main.style.display = "none";
    admin_orders_side.style.color = "#8c8c8c";
    admin_orders_side.style.backgroundImage="url('../../images/user/box.svg')";

    admin_products_side.style.fontWeight="normal";    
    admin_products_main.style.display = "none";
    admin_products_side.style.color = "#8c8c8c";
    admin_products_side.style.backgroundImage="url('../../images/user/pay.svg')";

    admin_add_products_side.style.fontWeight="normal";    
    admin_add_products_main.style.display = "none";
    admin_add_products_side.style.color = "#8c8c8c";
    admin_add_products_side.style.backgroundImage="url('../../images/user/pay.svg')";

    //set current    
    admin_users_side.style.fontWeight="bold";
    admin_users_main.style.display = "block";
    admin_users_side.style.color = "#000000";
    admin_users_side.style.backgroundImage="url(../../images/user/avatar-dark.svg)";
});

admin_orders_side.addEventListener('click',()=>{
    console.log("Users orders");
    //reset others
    admin_data_side.style.fontWeight="normal";
    admin_data_main.style.display = "none";
    admin_data_side.style.color = "#8c8c8c";
    admin_data_side.style.backgroundImage = "url(../../images/user/avatar.svg)";

    admin_users_side.style.fontWeight="normal";
    admin_users_main.style.display = "none";
    admin_users_side.style.color = "#8c8c8c";
    admin_users_side.style.backgroundImage="url(../../images/user/avatar.svg)";

    admin_products_side.style.fontWeight="normal";    
    admin_products_main.style.display = "none";
    admin_products_side.style.color = "#8c8c8c";
    admin_products_side.style.backgroundImage="url('../../images/user/pay.svg')";

    admin_add_products_side.style.fontWeight="normal";    
    admin_add_products_main.style.display = "none";
    admin_add_products_side.style.color = "#8c8c8c";
    admin_add_products_side.style.backgroundImage="url('../../images/user/pay.svg')";

    //set current
    admin_orders_side.style.fontWeight="bold";
    admin_orders_main.style.display = "block";
    admin_orders_side.style.color = "#000000";
    admin_orders_side.style.backgroundImage="url('../../images/user/box-dark.svg')";
});

admin_products_side.addEventListener('click',()=>{
   console.log("Products");
    //reset others
    admin_data_side.style.fontWeight="normal";
    admin_data_main.style.display = "none";
    admin_data_side.style.color = "#8c8c8c";
    admin_data_side.style.backgroundImage = "url(../../images/user/avatar.svg)";

    admin_users_side.style.fontWeight="normal";
    admin_users_main.style.display = "none";
    admin_users_side.style.color = "#8c8c8c";
    admin_users_side.style.backgroundImage="url(../../images/user/avatar.svg)";

    admin_orders_side.style.fontWeight="normal";    
    admin_orders_main.style.display = "none";
    admin_orders_side.style.color = "#8c8c8c";
    admin_orders_side.style.backgroundImage="url('../../images/user/box.svg')";

    admin_add_products_side.style.fontWeight="normal";    
    admin_add_products_main.style.display = "none";
    admin_add_products_side.style.color = "#8c8c8c";
    admin_add_products_side.style.backgroundImage="url('../../images/user/pay.svg')";

    //set current
    admin_products_side.style.fontWeight="bold";    
    admin_products_main.style.display = "block";
    admin_products_side.style.color = "#000000";
    admin_products_side.style.backgroundImage="url('../../images/user/pay-dark.svg')"; 
});

admin_add_products_side.addEventListener('click',()=>{
    console.log("Add products");
    //reset others
    admin_data_side.style.fontWeight="normal";
    admin_data_main.style.display = "none";
    admin_data_side.style.color = "#8c8c8c";
    admin_data_side.style.backgroundImage = "url(../../images/user/avatar.svg)";

    admin_users_side.style.fontWeight="normal";
    admin_users_main.style.display = "none";
    admin_users_side.style.color = "#8c8c8c";
    admin_users_side.style.backgroundImage="url(../../images/user/avatar.svg)";

    admin_orders_side.style.fontWeight="normal";    
    admin_orders_main.style.display = "none";
    admin_orders_side.style.color = "#8c8c8c";
    admin_orders_side.style.backgroundImage="url('../../images/user/box.svg')";

    admin_products_side.style.fontWeight="normal";    
    admin_products_main.style.display = "none";
    admin_products_side.style.color = "#8c8c8c";
    admin_products_side.style.backgroundImage="url('../../images/user/pay.svg')";

    //set current
    admin_add_products_side.style.fontWeight="bold";    
    admin_add_products_main.style.display = "block";
    admin_add_products_side.style.color = "#000000";
    admin_add_products_side.style.backgroundImage="url('../../images/user/pay-dark.svg')";
});