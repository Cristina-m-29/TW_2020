var cartBody = document.querySelector('.cart_body');
var totalCart;
var totalPrice = 0;
var checkPayment=null;
var productDetails=[];
var productAdress = -1;
var products_list = [];
var nrOfAddresses;
var days = ["Monday", "Thursday","Wednesday","Thursday","Friday","Saturday","Sunday"];

window.addEventListener('onload',setUpForCart());

function setUpForCart(){
    if(localStorage.getItem("logged") == "false" || !('logged' in localStorage)){
        cartBody.insertAdjacentHTML('beforeend',"<p> No products in cart");
        document.querySelector('.cart_body_head').style.display="none";
        document.querySelector('.cart_product').style.border = "none";
    }
    else{
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ()=>{
            if(xhttp.readyState == 4){
                if(xhttp.status == 200){// SUCCES
                    const cart = JSON.parse(xhttp.responseText);
                    //paseaza cart + afisare in fct de prod
                    productDetails = cart;
                    setUpCart(cart);
                } 
                else{
                    console.log("somenthing went wrong");
                }            
            }
        } 
        xhttp.open("GET",`getCartProducts/${localStorage.getItem('email')}`,true);
        xhttp.resposnseType='application/json';
        xhttp.send();
    }
}

function setUpCart(cart){
    totalCart = cart.length;
    if(cart.length == 0){
        cartBody.insertAdjacentHTML('beforeend',"<p> No products in cart");
        document.querySelector('.cart_body_head').style.display="none";
    }
    else{                   
        for(i=0;i<cart.length;i++){
            item = cart[i];
            var colors=item.selected_color;
            var sizes=item.selected_size;
            document.querySelector('.cart_product').insertAdjacentHTML("beforeend",
            `   <div class="cart_product_side cart_product_img_${i}">
                   <img src="/getImage/${item.product_id}">
                </div>
                <div class="cart_product_main cart_product_main_${i}">                        
                    <div class="cart_product_details">
                        <p id="product_name" class="product_name_${i}">${item.product_name}</p>
                        <p id="product_color" class="cart_prod_color product_color_${i}" >${colors}</p>
                        <p id="product_size" class="cart_prod_size product_size_${i}" >${sizes}</p>
                            
                        <p id="product_price" class="cart_prod_price product_price_${i}">${item.price}</p>
                    </div>
                    <div class="cart_product_footer">
                        <div class="cart_delete_btn cart_delete_btn_${i}">
                            <p>Delete</p>
                        </div>
                    </div>
                </div>`
            );
            document.querySelector(`.cart_delete_btn_${i}`).addEventListener('click',addCartDeleteEvent(i));
        } 
        cartBody.insertAdjacentHTML("beforeend",`<div class="orderBtn"> Finish order </div>`);  

        document.querySelector('.orderBtn').addEventListener('click', finishOrder);
    } 
}
var add_adr_final=document.querySelector('.add_address_btn_final');

function finishOrder(){
    document.querySelector('.cart_product').style.display="none";
    document.querySelector('.orderBtn').style.display = "none";
    document.querySelector('.cart_body_head').style.display = "none";
    document.querySelector('.finish_order').style.display="block"; 
    document.querySelector('.cart').style.width = "80%";
    document.querySelector('.cart_body').style.margin = "1em 0 0 0";

    //get request products from cart => setUpOrderProducts()  
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = ()=>{
        if(xhttp.readyState == 4){
            if(xhttp.status == 200){// SUCCES
                const car = JSON.parse(xhttp.responseText);
                //!!!
                productDetails = car;
                setUpOrderProducts(car); 
            } 
            else{
                console.log("somenthing went wrong");
            }            
        }
    } 
    xhttp.open("GET",`getCartProducts/${localStorage.getItem('email')}`,true);
    xhttp.resposnseType='application/json';
    xhttp.send();
}

function setUpOrderProducts(cart){
    for(i=0;i<cart.length;i++){
        var item=cart[i];
        totalPrice += item.price * item.pieces;
        var colors=item.selected_color;
        var sizes=item.selected_size;
        document.querySelector('.order_all_products').insertAdjacentHTML('afterbegin',`
            <div class="order_product">
                <div class="order_product_img order_img_${i}">
                    <img src="/getImage/${item.product_id}">
                </div>
                <div class="order_product_details">
                    <div class="order_product_details_side">
                        <p class="prod_name_${i}">Name</p>
                        <p class="prod_color_${i}">Color</p>
                        <p class="prod_size_${i}">Size </p>
                        <p class="prod_peaces_${i}">Peaces</p>
                        <p class="prod_price_${i}">Price</p>
                    </div>
                    <div class="order_product_details_main">
                    <p class="product_name_${i}">${item.product_name}</p>
                    <p class="product_color_${i}">${colors}</p>
                    <p class="product_size_${i}">${sizes} </p>
                    <p class="product_peaces_${i}">${item.pieces}</p>
                    <p class="product_price_${i}">${item.price}</p>
                    </div>
                </div>
            </div>
        `);
    }
    document.querySelector(`.products_price`).innerHTML = totalPrice + ' RON';
    totalPrice += 12;
    document.querySelector(`.order_price`).innerHTML = totalPrice + ' RON';

    document.querySelector('.cart_order').style.display = "block"; 

    //request adrese
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = ()=>{
        if(xhttp.readyState == 4){
            if(xhttp.status == 200){// SUCCES
                const adr = JSON.parse(xhttp.responseText);
                nrOfAddresses = adr.length;
                if(adr.length == 0){
                    document.querySelector(`#order_no_addresses`).style.display = "block";
                }
                else{
                    setUpOrderAddresses(adr);
                }
                
            } 
            else{
                console.log("somenthing went wrong"); 
            }                       
        }
    } 
    xhttp.open("GET",`getAddresses/${localStorage.getItem('email')}`,true);
    xhttp.resposnseType='application/json';
    xhttp.send();
}

function setUpOrderAddresses(adr){
    for(i=0;i<adr.length;i++){
        item = adr[i];
        document.querySelector(`.user_all_addresses`).insertAdjacentHTML("beforeend",`
        <div class="user_address">
            <div class="address_check">
                <input type="checkbox" class="check-adr check-adr-${i}" name="address" id="check-adress">
            </div>
            <div class="address_check_details">
                <div class="address_user_name address_user_name_${i}">${item.user_name}</div>
                <div class="address_user"> ${item.street} ${item.postal_code} ${item.city} ${item.country}</div>
            </div> 
        </div>`);
        document.querySelector(`.check-adr-${i}`).addEventListener('click', checkAdrrBox(i));
    }
    document.querySelector(`.user_all_addresses`).insertAdjacentHTML("beforeend",`<div class="add_address_btn add-new-adress">Add new address</div> `);
    document.querySelector(`.user_all_addresses`).style.display = "block";
    document.querySelector('.add-new-adress').addEventListener('click', addNewAdress());
}

document.querySelector(`.no_adress_btn`).addEventListener('click',()=>{
    document.querySelector('#order_no_addresses').style.display="none";
    document.querySelector(`.add_address_form`).style.display = "block";
});


var checkValidAdr=-1;
function checkAdrrBox(i){
    document.querySelector(`.check-adr-${i}`).addEventListener('click',()=>{
        if(document.querySelector(`.check-adr-${i}`).checked){  
            productAdress = i;    
            for(j=0;j<nrOfAddresses;j++){
                if(i!=j){
                    document.querySelector(`.check-adr-${j}`).checked = false;
                }
                else{
                    document.querySelector(`.check-adr-${j}`).checked = true;
                    checkValidAdr=j;
                    document.querySelector('.order_other').style.display="block";
                } 
            }
        }
        else {
            productAdress = -1;
        }
    });
}

var checkBoxCard=document.getElementById('check-card');
var checkBoxCash=document.getElementById('check-cash');

checkBoxCard.addEventListener('click', checkCard);
checkBoxCash.addEventListener('click', checkCash);

function checkCard(){
    if(checkBoxCard.checked){
        checkBoxCash.checked=false;
        checkPayment="Card";
    }
    else if(checkBoxCash.checked){
        checkBoxCard.checked=false;
        checkBoxCash.checked=true;
        checkPayment="Cash";
    }
}

function checkCash(){
    if(checkBoxCash.checked){
        checkPayment="Cash";
        checkBoxCard.checked=false;
    }
    else if(checkBoxCard.checked){
        checkPayment="Card";
        checkBoxCash.checked=false;
    }
}

function addNewAdress(){
    document.querySelector('.add-new-adress').addEventListener('click',()=>{
        adr_first_name.value="";
        adr_last_name.value="";
        adr_street.value="";
        adr_number.value="";
        adr_postal.value="";
        adr_city.value="";
        adr_country.value="";
        adr_phone.value="";

        document.querySelector('.your_order_adress').style.display="none";
        document.querySelector('.user_all_addresses').style.display="none";
        document.querySelector(`.add_address_form`).style.display = "block";
        document.querySelector(`.add_address_btn_final`).style.display = "block";
    });
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
    if((x >= 48 && x <= 57 || x==13 || x==8 ||x==32 )){}
    else {
        alert("Introduceti doar numere");
        return false;
    }
    return true;

}
adr_first_name.addEventListener("keydown",insertFirstName, false);
function insertFirstName(e){
    var x = e.keyCode;
    if(x >= 48 && x <= 57){
        alert("Introduceti doar litere");
         return false;
    }
    else {
    }
    return true;
}
adr_last_name.addEventListener("keydown",insertLastName, false);
function insertLastName(e){
    var x = e.keyCode;
    if((x >= 48 && x <= 57)){
        alert("Introduceti doar litere");
         return false;
    }
    else {
    }
    return true;
}
adr_country.addEventListener("keydown",insertCountry, false);
function insertCountry(e){
    var x = e.keyCode;
    if((x >= 48 && x <= 57)){
        alert("Introduceti doar litere");
         return false;
    }
    else {
    }
    return true;
}
adr_city.addEventListener("keydown",insertCity, false);
function insertCity(e){
    var x = e.keyCode;
    if((x >= 48 && x <= 57)){
        alert("Introduceti doar litere");
    }
    else {
    }
    return true;
}
adr_postal.addEventListener("keydown",insertPostal, false);
function insertPostal(e){
    var x = e.keyCode;
    if(x >= 48 && x <= 57 || x==13 || x==8 || x==32){
    }
    else{
        alert("Introduceti doar numere");
        return false;
    }
    return true;
}

adr_phone.addEventListener("keydown",insertPhone, false);
function insertPhone(e){
    var x = e.keyCode;
    if((x >= 48 && x <= 57 || x==13 || x==8 ||x==32)){}
    else {
        alert("Introduceti doar numere");
        return false;
    }
    return true;

}

function addFinalAdress(){
    if((adr_first_name.value!="") && (adr_last_name.value!="" ) && (adr_street.value!="") && (adr_number.value!="") && (adr_country.value!="") && (adr_city.value!="") && (adr_postal.value!="") && (adr_phone.value!="")){
        
        const toSend = {
            email: localStorage.getItem('email'),
            user_name: adr_first_name.value + ' ' + adr_last_name.value,
            street: adr_street.value,
            country: adr_country.value,
            city: adr_city.value,
            postal_code: adr_postal.value,
            phone_number: adr_phone.value
        }
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ()=>{
            if(xhttp.readyState == 4){
                if(xhttp.status == 200){
                    // console.log(xhttp.responseText);
                }
                else{
                    console.log("somenthing went wrong");
                }
            }
        } 
        xhttp.open("POST",`addNewAddress`,true);
        xhttp.resposnseType='application/json';
        xhttp.send(JSON.stringify(toSend));

            document.querySelector('.user_all_addresses').insertAdjacentHTML('afterbegin', `
            <div class="user_address">
            <div class="address_check address_check_${i}">
              <input type="checkbox" class="check-adr check-adr-${i}" name="address" id="check-adress">
            </div>
            <div class="address_check_details-new">
             <div class="address_user_name_new address_user_name_new_${i}"> ${adr_first_name.value} ${adr_last_name.value}</div>
             <div class="address_user_adress_new address_user_address_new_${i}"> ${adr_street.value} nr. ${adr_number.value} ${adr_postal.value} ${adr_city.value} ${adr_country.value}</div>
            </div> 
            </div>`);
            
            document.querySelector(`.check-adr-${i}`).addEventListener('click', checkAdrrBox(i));
        
        nrOfAddresses += 1;
        document.querySelector(`.add_address_form`).style.display = "none";
        document.querySelector(`.add_address_btn_final`).style.display = "none";
        document.querySelector(`.user_all_addresses`).style.display = "block";
        document.querySelector('.add-new-adress').style.display = "block";
    }
    else alert("Introduceti toate datele");
 }

function addCartDeleteEvent(i){
    document.querySelector(`.cart_delete_btn_${i}`).addEventListener('click',()=>{
        var toDelete = {
            email: localStorage.getItem('email'),
            name: document.querySelector(`.product_name_${i}`).innerHTML
        }
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ()=>{
            if(xhttp.readyState == 4){
                if(xhttp.status != 200){
                    console.log("somenthing went wrong");
                }
            }
        } 
        xhttp.open("DELETE",`deleteProductFromCart`,true);
        xhttp.resposnseType='application/json';
        xhttp.send(JSON.stringify(toDelete));


        document.querySelector(`.cart_product_main_${i}`).style.display="none";
        document.querySelector(`.cart_product_img_${i}`).style.display="none";
        if(totalCart > 0) totalCart--;
        if(totalCart == 0){
            document.querySelector('.cart_body_head').style.display="none";
            document.querySelector('.orderBtn').style.display="none";
            document.querySelector('.cart_product').style.borderStyle="none";

            cartBody.insertAdjacentHTML('beforeend','<p id="noCartProdMsg"> No products in cart');
        }
    });
}

document.querySelector('.submit_order').addEventListener('click',submitOrder);

function submitOrder(){
   var date = new Date();
   if(checkPayment!=null && productDetails!=null && productAdress!=-1 && checkValidAdr!=-1)
   {
        //send with post
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ()=>{
            if(xhttp.readyState == 4){
                if(xhttp.status == 200){// SUCCES
                    document.querySelector('.order_placed').style.display="block";
                    setTimeout(()=>{
                        document.querySelector('.order_placed').style.display="none";
                        window.location.href = "http://localhost:2902/cart/cart.html";
                    },3000);
                } 
                else{
                    console.log("somenthing went wrong");
                    }
                }
        } 
        xhttp.open("POST", "addNewOrder", true);
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var pr = totalPrice;
        var dataToPost={
            email: localStorage.getItem('email'),
            address_name: document.querySelector(`.address_user_name_${productAdress}`).innerHTML,
            submision_date: `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`,
            products_list : productDetails,
            payment_method:checkPayment,
            price:pr
        }
        xhttp.send(JSON.stringify(dataToPost));
    }
}
