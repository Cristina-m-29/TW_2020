var data_side = document.querySelector('.data');
var data_main = document.querySelector('.main_data');
var orders_side = document.querySelector('.orders');
var orders_main = document.querySelector('.main_orders');
var address_side = document.querySelector('.address');
var address_main = document.querySelector('.main_address');

data_side.addEventListener('click',()=>{
    console.log("Personal data");
    //reset others    
    orders_side.style.fontWeight="normal";    
    orders_main.style.display = "none";
    orders_side.style.color = "#8c8c8c";
    orders_side.style.backgroundImage="url('../../images/user/box.svg')";

    address_side.style.fontWeight="normal";
    address_main.style.display = "none";
    address_side.style.color = "#8c8c8c";
    address_side.style.backgroundImage="url(../../images/user/address.svg)";

    //set current
    data_side.style.fontWeight="bold";
    data_main.style.display = "block";
    data_side.style.color = "#000000";
    data_side.style.backgroundImage = "url(../../images/user/avatar-dark.svg)";
});



orders_side.addEventListener('click',()=>{
    console.log("Orders");
    //reset others
    data_side.style.fontWeight="normal";
    data_main.style.display = "none";
    data_side.style.color = "#8c8c8c";
    data_side.style.backgroundImage = "url(../../images/user/avatar.svg)";

    address_side.style.fontWeight="normal";
    address_main.style.display = "none";
    address_side.style.color = "#8c8c8c";
    address_side.style.backgroundImage="url(../../images/user/address.svg)";

    //set current
    orders_side.style.fontWeight="bold";
    orders_main.style.display = "block";
    orders_side.style.color = "#000000";
    orders_side.style.backgroundImage="url('../../images/user/box-dark.svg')";
});

address_side.addEventListener('click',()=>{
    console.log("Addresses");
    //reset others
    data_side.style.fontWeight="normal";
    data_main.style.display = "none";
    data_side.style.color = "#8c8c8c";
    data_side.style.backgroundImage = "url(../../images/user/avatar.svg)";

    orders_side.style.fontWeight="normal";    
    orders_main.style.display = "none";
    orders_side.style.color = "#8c8c8c";
    orders_side.style.backgroundImage="url('../../images/user/box.svg')";

    //set current
    address_side.style.fontWeight="bold";
    address_main.style.display = "block";
    address_side.style.color = "#000000";
    address_side.style.backgroundImage="url(../../images/user/address-dark.svg)";
});
