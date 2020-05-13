/*var wj_product=document.getElementsByClassName('wj-product')[0];
var text=document.getElementsByClassName('text')[0];
var wj_img=document.getElementsByClassName('wj-img')[0];
var wj_cart=document.getElementsByClassName('wj-cart')[0];
var wj_more_info=document.getElementsByClassName('wj-more-info')[0];

wj_product.onmouseover=wj_product.onmouseout=setOpacityImage;
wj_cart.onmouseover=wj_cart.onmouseout=setStyleCart;
wj_more_info.onmouseover=wj_more_info.onmouseout=setStyleInfo;
text.onmouseover=text.onmouseout=setStyleText;
*/


var colors = ['red','light pink','light brown'];
var colors_hex = ['#e74343','#ffdfff','#d38653'];
var color_selected;
var sizes = ['XS','S','M'];
var size_selected = null;
var women_jeans=document.querySelector('.women-jeans');



women_jeans.addEventListener('onload', addProductInfo());


function addProductInfo(){

    document.querySelector('#wj-color-product').innerHTML = colors[0].charAt(0).toUpperCase() + colors[0].slice(1);
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
        color_selected = colors[i];
        document.querySelector('#wj-color-product').innerHTML = colors[i].charAt(0).toUpperCase() + colors[i].slice(1);
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



var more_info=document.getElementById("wj-more-info");
var wj_cart=document.getElementById("wj-cart");

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


/*
function setOpacityImage(event){
    if(event.type == 'mouseover')
    {
        wj_img.style.opacity='0.5';
        text.style.opacity='1';
        wj_cart.style.opacity='1';
        wj_more_info.style.opacity='1';
    }
    if(event.type == 'mouseout'){
        wj_img.style.opacity='1';
        text.style.opacity='0';
        wj_cart.style.opacity='0';
        wj_more_info.style.opacity='0';
    }
}

*/