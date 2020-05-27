var favoritesBody = document.querySelector('.favorites_body');
var totalFavorites = 3;

window.addEventListener('onload',getCartProductsRequest());

function getCartProductsRequest(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = ()=>{
        if(xhttp.readyState == 4){
            if(xhttp.status == 200){// SUCCES
                console.log(xhttp.responseText);
                setUpFavorites();
            } 
            else{
                console.log("somenthing went wrong");
            }
        }
    } 
    xhttp.open("GET","getCartProducts",true);
    xhttp.resposnseType='application/json';
    xhttp.send();
}

// window.addEventListener('onlaod',setUpFavorites());

function setUpFavorites(){
    if(totalFavorites == 0){
        favoritesBody.insertAdjacentHTML('beforeend',"<p> No products in wishlist");
        document.querySelector('.favorites_body_head').style.display="none";
    }
    else{    
        for(favorite=0;favorite<totalFavorites;favorite++){
            favoritesBody.insertAdjacentHTML("beforeend",
            `<div class="favorites_product fav_prod_${favorite}">
                <div class="favorites_product_side">
                    <img src="../../images/men/men_jeans.jpeg">
                </div>
                <div class="favorites_product_main">                        
                    <div class="favorites_product_details">
                        <p id="product_name" class="product_name_${favorite}">jeans one</p>
                        <p id="product_color" class="txt_center">White</p>
                        <p id="product_size" class="txt_center">M</p>
                        <p id="product_price" class="txt_center">23.99</p>
                    </div>
                    <div class="favorites_product_footer">
                        <div class="fav_cart_btn fav_cart_btn_${favorite}" id=""><p>Add to cart</p></div>
                        <div></div>
                        <div></div>
                        <div class="fav_delete_btn fav_delete_btn_${favorite}" id="">
                            <p>Delete</p>
                        </div>
                    </div>
                </div>
            </div>`);
            document.querySelector(`.fav_cart_btn_${favorite}`).addEventListener('click',addFavCartEvent(favorite));
            document.querySelector(`.fav_delete_btn_${favorite}`).addEventListener('click',addFavDeleteEvent(favorite));
        }    
    }
}
// var itertorFav = [];
function addFavCartEvent(favorite){
    document.querySelector(`.fav_cart_btn_${favorite}`).addEventListener('click',()=>{
        console.log(favorite);
        console.log(`adaugam produsul ${favorite} in cos`);
        const productName = document.querySelector(`.product_name_${favorite}`).innerHTML;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ()=>{
            if(xhttp.readyState == 4){
                if(xhttp.status == 200){// SUCCES
                    console.log(xhttp.responseText);
                } 
                else{
                    console.log("somenthing went wrong");
                }
            }
        } 
        xhttp.open("POST",`/addProductToCart/mititelucristina@yahoo.com/${productName}`,true);
        xhttp.resposnseType='application/json';
        xhttp.send();

    });
}

function addFavDeleteEvent(favorite){
    document.querySelector(`.fav_delete_btn_${favorite}`).addEventListener('click',()=>{
        console.log(`stergem produsul ${favorite} de la favorite`);
        //stergere in bd la favororite client
        document.querySelector(`.fav_prod_${favorite}`).style.display="none";
        if(totalFavorites > 0) totalFavorites--;
        if(totalFavorites == 0){
            document.querySelector('.favorites_body_head').style.display="none";
            favoritesBody.insertAdjacentHTML('beforeend','<p id="noFavProdMsg"> No products in wishlist');
        }
    });
}