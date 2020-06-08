
var colors; //used
var colors_hex; //used
var color_selected;
var sizes; // used
var size_selected = null;
var product = document.querySelector('.product');
const favoritesBtn = document.querySelector('.add_to_favorites'); 
const cartBtn = document.querySelector('.add_to_cart'); 
var toSend = {};

product.addEventListener('onload',getProductData());

function getProductData(){
    var product = window.location.href.split("/");
    product = product[product.length - 1]; 
    product = product.split(".");
    product = product[0];
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = ()=>{
        if(xhttp.readyState == 4){
            if(xhttp.status == 200){// SUCCES
               var data = JSON.parse(xhttp.responseText);
               addProductData(data);
            } 
            else{
                console.log("somenthing went wrong");
            }
        }
    } 
    xhttp.open("GET",`getProductData/${product}`,true);
    xhttp.resposnseType='application/json';
    xhttp.send();
}

function addProductData(data){
    // document.querySelector('#prod_img').src = data.img;
    document.querySelector('#prod_img').src = "../../images/women/categorii/jac.jpg";
    document.querySelector('#people_cat').innerHTML = data.for.toUpperCase();
    document.querySelector('#category_name').innerHTML = data.category.toUpperCase();
    document.querySelector('#header_product_name').innerHTML = data.name.toUpperCase();
    document.querySelector('#product_name').innerHTML = data.name.toUpperCase();
    document.querySelector('#id_product').innerHTML = data._id;
    document.querySelector('#price_product').innerHTML = data.price;

    colors = data.string_colors;
    colors_hex = data.hex_colors;
    sizes = data.sizes;
    document.querySelector('#color_product').innerHTML = colors[0].charAt(0).toUpperCase() + colors[0].slice(1);
    color_selected = colors[0].charAt(0).toUpperCase() + colors[0].slice(1);

    for(i=0;i<colors_hex.length;i++){
        document.querySelector('.product_color_list').insertAdjacentHTML("beforeend",
        `<div class="color_list_${i}"></div>`);
        document.querySelector(`.color_list_${i}`).style.backgroundColor = colors_hex[i];
        document.querySelector(`.color_list_${i}`).addEventListener('click',addEventColor(i));
    }

    for(i=0;i<sizes.length;i++){
        document.querySelector('.product_sizes').insertAdjacentHTML("beforeend",`<p id="size_${i}">${sizes[i]}</p>`);        
        document.querySelector(`#size_${i}`).addEventListener('click',addEventSize(i));
    }
}

function addEventColor(i){
    document.querySelector(`.color_list_${i}`).addEventListener('click',()=>{
        color_selected = colors[i];
        document.querySelector('#color_product').innerHTML = colors[i].charAt(0).toUpperCase() + colors[i].slice(1);
    });
}

function addEventSize(i){
    document.querySelector(`#size_${i}`).addEventListener('click',()=>{
        for(j=0;j<sizes.length;j++){
            if(j!=i)    
            document.querySelector(`#size_${j}`).style.fontWeight = "normal";
        }
        document.querySelector(`#size_${i}`).style.fontWeight = "bold";
        size_selected = sizes[i];
    });
}

favoritesBtn.addEventListener('click',()=>{
    if(localStorage.getItem('logged')==="false"){
        document.querySelector(".prod_login_req").style.display = "block";
    }
    else{
        document.querySelector(".prod_login_req").style.display = "none";
        if(color_selected!=null && size_selected!=null){
            document.querySelector('.select_size').style.display="none";
            document.querySelector('.select_size_for_cart').style.display="none";
            
            toSend.email = localStorage.getItem('email');
            toSend.productName = document.querySelector(`#product_name`).innerHTML.toLocaleLowerCase();
            toSend.color = color_selected;
            toSend.size = size_selected;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = ()=>{
                if(xhttp.readyState == 4){
                    if(xhttp.status != 200){
                        console.log("somenthing went wrong");
                    }
                }
            } 
            xhttp.open("POST",`addProductToFavorites`,true);
            xhttp.resposnseType='application/json';
            xhttp.send(JSON.stringify(toSend));

            document.querySelector('.added_to_favorites').style.display="block";
            sleep(1000).then(()=>{
                document.querySelector('.added_to_favorites').style.display="none";
            });
        }
        else{
            document.querySelector('.select_size_for_cart').style.display="none";
            document.querySelector('.select_size').style.display="block";
        } 
    }
});

cartBtn.addEventListener('click',()=>{
    if(localStorage.getItem('logged') === "false"){
        document.querySelector(".prod_login_req").style.display = "block";
    }
    else{
        document.querySelector(".prod_login_req").style.display = "none";
        if(color_selected!=null && size_selected!=null){
            console.log(`Adaugam in cos: ${document.querySelector(`#product_name`).innerHTML} | ${color_selected} | ${size_selected}`);
            document.querySelector('.select_size').style.display="none";
            document.querySelector('.select_size_for_cart').style.display="none";

            //add product to cart to db
            toSend.email = localStorage.getItem('email');
            toSend.name = document.querySelector(`#product_name`).innerHTML.toLocaleLowerCase();
            toSend.color = color_selected;
            toSend.size = size_selected;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = ()=>{
                if(xhttp.readyState == 4){
                    if(xhttp.status != 200){
                        console.log("somenthing went wrong");
                    }
                }
            } 
            xhttp.open("POST",`addProductToCart`,true);
            xhttp.resposnseType='application/json';
            xhttp.send(JSON.stringify(toSend));

            document.querySelector('.added_to_cart').style.display="block";
            sleep(1000).then(()=>{
                document.querySelector('.added_to_cart').style.display="none";
            });
        }
        else{
            document.querySelector('.select_size').style.display="none";
            document.querySelector('.select_size_for_cart').style.display="block";
        } 
    }
    
});