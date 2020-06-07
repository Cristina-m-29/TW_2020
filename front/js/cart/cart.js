var cartBody = document.querySelector('.cart_body');
var totalCart = 3;

window.addEventListener('onload',setUpCart());


function setUpCart(){
    if(setat == 0){
        setat = 1;
        if(totalCart == 0){
            cartBody.insertAdjacentHTML('beforeend',"<p> No products in cart");
            document.querySelector('.cart_body_head').style.display="none";
        }
        else{                    
                for(cart=0;cart<totalCart;cart++){
                    cartBody.insertAdjacentHTML("beforeend",
                    `<div class="cart_product cart_prod_${cart}">
                        <div class="cart_product_side">
                            <img src="../../images/women/afisare_produse/wj-img-${cart}.jpg">
                        
                        </div>
                        <div class="cart_product_main">                        
                            <div class="cart_product_details">
                                <p id="product_name">Slouchy Jeans</p>
                                <p id="product_color" class="txt_center">White</p>
                                <p id="product_size" class="txt_center">M</p>
                                <p id="product_price" class="txt_center">129.99</p>
                            </div>
                            <div class="cart_product_footer">
                                <div class="cart_delete_btn cart_delete_btn_${cart}" id="">
                                    <p>Delete</p>
                                </div>
                            </div>
                        </div>
                    </div>`);
                    document.querySelector(`.cart_delete_btn_${cart}`).addEventListener('click',addCartDeleteEvent(cart));
                } 
                cartBody.insertAdjacentHTML("beforeend",`<div class="orderBtn"> Finish order </div>`);  
            } 
    }
}
var add_adr_final=document.querySelector('.add_address_btn_final');

var finish_order=document.querySelector('.orderBtn');
finish_order.addEventListener('click', finishOrder);


function finishOrder(){
    cartBody.style.display="none";
    document.querySelector('.cart_header').style.display = "none";
    document.querySelector('.cart_order').style.display="block";    
}
var no_adress=document.querySelector('.no_adress_btn');
no_adress.addEventListener('click', noAdressAddNew);

var add_new_adress=document.querySelector('.add-new-adress');
add_new_adress.addEventListener('click', addNewAdress);

function noAdressAddNew(){
    document.querySelector('#order_no_addresses').style.display="none";
    document.querySelector('.your_order_adress').style.display="block";
    document.querySelector('.user_all_addresses').style.display="block";
    add_adr_final.style.display="none";
}

var checkAdrr=document.getElementById('check-adress');
checkAdrr.addEventListener('click', checkAdrrBox);
function checkAdrrBox(){
    if(checkAdrr.checked){
        document.querySelector('.order_other').style.display="block";
        document.querySelector('#order_no_addresses').style.display="none";
        document.querySelector('.your_order_adress').style.display="block";
        document.querySelector('.user_all_addresses').style.display="block";
    }
    else console.log("nu");
}

function addNewAdress(){
    document.querySelector('.order_other').style.display="none";
    document.querySelector('#order_no_addresses').style.display="none";
    document.querySelector('.your_order_adress').style.display="block";
    document.querySelector('.user_all_addresses').style.display="none";
    document.querySelector('.name-grid').style.display="grid";
    document.querySelector('.street-nr-grid').style.display="grid";
    document.querySelector('.country-city-grid').style.display="grid";
    document.querySelector('.postal-phone-grid').style.display="grid";
    add_adr_final.style.display="block";
}

add_adr_final.addEventListener('click', addFinalAdress);

var adr_first_name=document.getElementById("add_address_first_name");
var adr_last_name=document.getElementById("add_address_last_name");
var adr_street=document.getElementById("add_address_street");
var adr_number=document.getElementById("add_address_number");
var adr_country=document.getElementById("add_address_country");
var adr_city=document.getElementById("add_address_city");
var adr_postal=document.getElementById("add_address_code");
var adr_phone=document.getElementById("add_address_phone");

// Verificarea datelor din campuri

adr_number.addEventListener("keydown",insertNumber, false);
function insertNumber(e){
    var x = e.keyCode;
    if((x >= 48 && x <= 57))
           console.log(x); 
    else {
        alert("Introduceti doar numere");
        console.log(x);
        return false;
    }
    return true;

}
adr_first_name.addEventListener("keydown",insertFirstName, false);
function insertFirstName(e){
    var x = e.keyCode;
    if((x >= 48 && x <= 57)){
        alert("Introduceti doar litere");
        console.log(x); 
         return false;
    }
    else {
        console.log(x);
    }
    return true;
}
adr_last_name.addEventListener("keydown",insertLastName, false);
function insertLastName(e){
    var x = e.keyCode;
    if((x >= 48 && x <= 57)){
        alert("Introduceti doar litere");
        console.log(x); 
         return false;
    }
    else {
        console.log(x);
    }
    return true;
}
adr_country.addEventListener("keydown",insertCountry, false);
function insertCountry(e){
    var x = e.keyCode;
    if((x >= 48 && x <= 57)){
        alert("Introduceti doar litere");
        console.log(x); 
         return false;
    }
    else {
        console.log(x);
    }
    return true;
}
adr_city.addEventListener("keydown",insertCity, false);
function insertCity(e){
    var x = e.keyCode;
    if((x >= 48 && x <= 57)){
        alert("Introduceti doar litere");
        console.log(x); 
         return false;
    }
    else {
        console.log(x);
    }
    return true;
}
adr_postal.addEventListener("keydown",insertPostal, false);
function insertPostal(e){
    var x = e.keyCode;
    if((x >= 48 && x <= 57))
           console.log(x); 
    else {
        alert("Introduceti doar numere");
        console.log(x);
        return false;
    }
    return true;
}

adr_phone.addEventListener("keydown",insertPhone, false);
function insertPhone(e){
    var x = e.keyCode;
    if((x >= 48 && x <= 57))
           console.log(x); 
    else {
        alert("Introduceti doar numere");
        console.log(x);
        return false;
    }
    return true;

}
function addFinalAdress(){
    if((adr_first_name.value!="") && (adr_last_name.value!="" ) && (adr_street.value!="") && (adr_number.value!="") && (adr_country.value!="") && (adr_city.value!="") && (adr_postal.value!="") && (adr_phone.value!="")){
        console.log("buna");
        document.querySelector('.order_other').style.display="block";
    }
    else alert("Introduceti toate datele");
}

//delete btn
function addCartDeleteEvent(cart){
    document.querySelector(`.cart_delete_btn_${cart}`).addEventListener('click',()=>{
        console.log(`stergem produsul ${cart} din cart`);
        document.querySelector(`.cart_prod_${cart}`).style.display="none";
        if(totalCart > 0) totalCart--;
        if(totalCart == 0){
            document.querySelector('.cart_body_head').style.display="none";
            cartBody.insertAdjacentHTML('beforeend','<p id="noCartProdMsg"> No products in cart');
        }
    });
}

// document.querySelector('#check-cash-class').addEventListener('click', checkBoxCash());
// document.querySelector('#check-card-class').addEventListener('click', checkBoxCard());

// function checkBoxCash(){
//      document.getElementById("check-cash")="true";
//      document.getElementById("check-card")="false";
// }
// function checkBoxCard(){
//     document.getElementById("check-card")="true";  
//     document.getElementById("check-cash")="false";
// }



// var submit_btn=document.querySelector('.submit_order');
// submit_btn.addEventListener('click',submitOrder);

// function submitOrder(){
//     if(isNaN(adr_number.value || adr_phone.value || adr_postal.value))
//       alert("Please insert only numbers at Number, Postal Code and Phone number!");
//     if(!isNaN(adr_first_name.value || adr_last_name.value || adr_street.value || adr_city.value || adr_country.value))
//       alert("Please insert only letters at First name, Last name, Street, Country and City!");
// }
