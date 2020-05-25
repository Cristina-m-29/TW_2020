
var colors = ['red','light pink','light brown'];
var colors_hex = ['#e74343','#ffdfff','#d38653'];
var color_selected;
var sizes = ['XS','S','M'];
var size_selected = null;
var women_jeans=document.querySelector('.women-jeans');

women_jeans.addEventListener('onload', addProductInfo());
document.querySelector('#wj-cart-id').addEventListener('click', hideTextShowColor);
document.querySelector('#previous-info-colors').addEventListener('click', showPreviousCategoriesColors);
document.querySelector('#next-info-colors').addEventListener('click', showNextCategoriesColors);

document.querySelector('#previous-info-size').addEventListener('click', showPreviousCategoriesSize);
document.querySelector('#next-info-size').addEventListener('click', showNextCategoriesSize);

document.querySelector('#previous-info-cart').addEventListener('click', showPreviousCategoriesCart);

document.querySelector('#check').addEventListener('click', AddedToCartAndStartOver);
document.querySelector('#wj-img-id').addEventListener('mouseenter', MakeTextAppear);
document.querySelector('#wj-img-id').addEventListener('mouseleave', MakeTextDisappear);

document.querySelector('.text').addEventListener('mouseenter', MakeAppear);
document.querySelector('.text').addEventListener('mouseleave', MakeDisappear);

function MakeTextAppear(){
    document.querySelector('.text').style.display = "block";

}
function MakeTextDisappear(){
    document.querySelector('.text').style.display = "none";

}
function MakeAppear(){
    document.querySelector('.text').style.display = "block";

}
function MakeDisappear(){
    document.querySelector('.text').style.display = "none";

}
function addProductInfo(){

    color_selected = colors[0].charAt(0).toUpperCase() + colors[0].slice(1);

    for(i=0;i<colors_hex.length;i++){
        document.querySelector('.wj-product-color-list').insertAdjacentHTML("beforeend",
        `<div class="color_list_${i}"></div>`);
        document.querySelector(`.color_list_${i}`).style.backgroundColor = colors_hex[i];
        document.querySelector(`.color_list_${i}`).addEventListener('click',addEventColor(i));
    }
    for(i=0;i<sizes.length;i++){
        document.querySelector('.wj-size-list').insertAdjacentHTML("beforeend",`<p id="size_${i}">${sizes[i]}</p>`);        
        document.querySelector(`#size_${i}`).addEventListener('click',addEventSize(i));
    }
}

function addEventColor(i){
    document.querySelector(`.color_list_${i}`).addEventListener('click',()=>{
        for(j=0;j<colors_hex.length;j++)
          if(j!=i){
            document.querySelector(`.color_list_${j}`).style.borderColor = "black";
          }
         document.querySelector(`.color_list_${i}`).style.borderColor = "red";
         color_selected = colors[i];
         
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

function hideTextShowColor(){

    document.querySelector('.wj-cart').style.display = "none";
    document.querySelector('#wj-more-info').style.display = "none";
    document.querySelector('.wj-product-color').style.display = "flex";
    for(i=0;i<colors_hex.length;i++)
      document.querySelector(`.color_list_${i}`).style.display = "block";
    document.querySelector('#previous-info-colors').style.display = "block";
    document.querySelector('#next-info-colors').style.display = "block";

}
function hideTextShowSize(){
    coverColors();
    document.querySelector('.wj-size').style.display = "block";
    for(i=0;i<sizes.length;i++)
      document.querySelector(`#size_${i}`).style.display = "block";
    document.querySelector('#previous-info-size').style.display = "block";
    document.querySelector('#next-info-size').style.display = "block";
}
function hideTextAddToCart(){
         //  imediat dupa size
    coverSize();
    document.querySelector('.add-now').style.display = "block";
    document.querySelector('#check').style.display = "block";
    document.querySelector('#previous-info-cart').style.display = "block";
}
function AddedToCartAndStartOver(){
    // adaugat in cart after press check
    AddedToCart();
    setTimeout(showInitialDelete, 5000);
}
function showInitialDelete(){
    document.querySelector('.wj-cart').style.display = "block";
    document.querySelector('#wj-more-info').style.display = "block";
    document.querySelector('.added-to-cart').style.display = "none";

}
function AddedToCart(){
    document.querySelector('#previous-info-cart').style.display = "none";
    document.querySelector('.added-to-cart').style.display = "block";
    document.querySelector('.add-now').style.display = "none";
    document.querySelector('#check').style.display = "none";
}
function showNextCategoriesColors(){
    if(color_selected!=null){
        hideTextShowSize();
    }
}
function showNextCategoriesSize(){
    if(size_selected!=null){
        hideTextAddToCart();
    }
}

function showPreviousCategoriesColors(){
    color_selected=null;
    document.querySelector('.wj-cart').style.display = "block";
    document.querySelector('#wj-more-info').style.display = "block";
    coverColors();
    coverSize();
    
}

function showPreviousCategoriesSize(){
    size_selected=null;
    hideTextShowColor();
    coverSize();
}
function showPreviousCategoriesCart(){
    document.querySelector('.add-now').style.display = "none";
    document.querySelector('#check').style.display = "none";
    document.querySelector('#previous-info-cart').style.display = "none";

    document.querySelector('.wj-size').style.display = "block";
    for(i=0;i<sizes.length;i++)
      document.querySelector(`#size_${i}`).style.display = "block";
    document.querySelector('#previous-info-size').style.display = "block";
    document.querySelector('#next-info-size').style.display = "block";

}

function coverSize(){
    document.querySelector('.wj-size').style.display = "none";
    for(i=0;i<sizes.length;i++)
      document.querySelector(`#size_${i}`).style.display = "none";
    document.querySelector('#previous-info-size').style.display = "none";
    document.querySelector('#next-info-size').style.display = "none"
}
function coverColors(){
    document.querySelector('.wj-product-color').style.display = "none";
    for(i=0;i<colors_hex.length;i++)
      document.querySelector(`.color_list_${i}`).style.display = "none";
    document.querySelector('#previous-info-colors').style.display = "none";
    document.querySelector('#next-info-colors').style.display = "none";
}

var more_info=document.getElementById("wj-more-info");
var wj_cart=document.getElementById("wj-cart-id");
var check=document.getElementById("check");

//Set fontWeight for See more informations
more_info.addEventListener("mouseover", function(event){
    event.target.style.fontWeight='bold';
}, false);
more_info.addEventListener("mouseout", function(event){
    event.target.style.fontWeight='normal';
}, false);

//Set fontWeight for Add to cart
wj_cart.addEventListener("mouseover", function(event){
    event.target.style.fontWeight='bold';
}, false);
wj_cart.addEventListener("mouseout", function(event){
    event.target.style.fontWeight='normal';
}, false);

//set color for check
check.addEventListener("mouseover", function(event){
    event.target.style.color = "#ff0000";
}, false);
check.addEventListener("mouseout", function(event){
    event.target.style.color = "#000000";
}, false);