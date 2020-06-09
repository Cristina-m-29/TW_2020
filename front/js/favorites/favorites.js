var favoritesBody = document.querySelector('.favorites_body');
var totalFavorites;

window.addEventListener('onload',getFavoritesProductsRequest());

function getFavoritesProductsRequest(){
    if(localStorage.getItem('email') === "" || !('email' in localStorage)){
        favoritesBody.insertAdjacentHTML('beforeend',"<p> No products in wishlist");
        document.querySelector('.favorites_body_head').style.display="none";
    }
    else{
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ()=>{
            if(xhttp.readyState == 4){
                if(xhttp.status == 200){// SUCCES
                    const fav = JSON.parse(xhttp.responseText);
                    setUpFavorites(fav);
                } 
                else{
                    console.log("somenthing went wrong");
                }
            }
        } 
        xhttp.open("GET",`getFavorites/${localStorage.getItem('email')}`,true);
        xhttp.resposnseType='application/json';
        xhttp.send();
    }
}

function setUpFavorites(fav){
    totalFavorites = fav.length;
    if(fav.length == 0){
        favoritesBody.insertAdjacentHTML('beforeend',"<p> No products in wishlist");
        document.querySelector('.favorites_body_head').style.display="none";
    }
    else{    
        for(favorite=0;favorite<fav.length;favorite++){
            item = fav[favorite];
            favoritesBody.insertAdjacentHTML("beforeend",
            `<div class="favorites_product fav_prod_${favorite}">
                <div class="favorites_product_side">
                    <img src="/getImage/${item._id}">
                </div>
                <div class="favorites_product_main">                        
                    <div class="favorites_product_details">
                        <p id="product_name" class="product_name_${favorite}">${item.product_name}</p>
                        <p id="product_color" class="txt_center product_color_${favorite}">${item.selected_color}</p>
                        <p id="product_size" class="txt_center product_size_${favorite}">${item.selected_size}</p>
                        <p id="product_price" class="txt_center">${item.price}</p>
                    </div>
                    <div class="login_req_txt login_req_txt_${favorite}"> You need to log in to add products to cart! </div> 
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

function addFavCartEvent(favorite){
    document.querySelector(`.fav_cart_btn_${favorite}`).addEventListener('click',()=>{
        if(localStorage.getItem('logged' === "false") || !('logged' in localStorage)){
            document.querySelector(`.login_req_txt_${favorite}`).style.display = "block";
        }
        else{
            const toSend = {
                email : localStorage.getItem('email'),
                name: document.querySelector(`.product_name_${favorite}`).innerHTML,
                color: document.querySelector(`.product_color_${favorite}`).innerHTML,
                size: document.querySelector(`.product_size_${favorite}`).innerHTML
            }
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
        }        
    });
}

function addFavDeleteEvent(favorite){
    document.querySelector(`.fav_delete_btn_${favorite}`).addEventListener('click',()=>{
        var toDelete = {
            email: localStorage.getItem('email'),
            name:document.querySelector(`.product_name_${favorite}`).innerHTML
        }
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ()=>{
            if(xhttp.readyState == 4){
                if(xhttp.status != 200){
                    console.log("somenthing went wrong");
                }
            }
        } 
        xhttp.open("DELETE",`deleteProductFromFavorites`,true);
        xhttp.resposnseType='application/json';
        xhttp.send(JSON.stringify(toDelete));
        document.querySelector(`.fav_prod_${favorite}`).style.display="none";
        if(totalFavorites > 0) totalFavorites--;
        if(totalFavorites == 0){
            document.querySelector('.favorites_body_head').style.display="none";
            favoritesBody.insertAdjacentHTML('beforeend','<p id="noFavProdMsg"> No products in wishlist');
        }
    });
}


