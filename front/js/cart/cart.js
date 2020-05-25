var cartBody = document.querySelector('.cart_body');
var totalCart = 3;

window.addEventListener('onlaod',setUpCart());

function setUpCart(){
    if(totalCart == 0){
        cartBody.insertAdjacentHTML('beforeend',"<p> No products in cart");
        document.querySelector('.cart_body_head').style.display="none";
    }
    else{    
        for(cart=1;cart<=totalCart;cart++){
            cartBody.insertAdjacentHTML("beforeend",
            `<div class="cart_product cart_prod_${cart}">
                <div class="cart_product_side">
                    <img src="../../images/women/afisare_produse/high-waist-1.jpg">
                   
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

document.querySelector('.orderBtn').addEventListener('click',()=>{
    cartBody.style.display="none";
    document.querySelector('.cart_header').style.display = "none";
});