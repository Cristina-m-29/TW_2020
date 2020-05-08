var people_cat="women";
var category="jackets"
var product_name = "jacket one";
var product_id = 4990;
var product_price = 28.99;
var colors = ['red','light pink','light brown'];
var colors_hex = ['#e74343','#ffdfff','#d38653'];
var color_selected;
var sizes = ['XS','S','M'];
var size_selected = null;
var product = document.querySelector('.product');
const favoritesBtn = document.querySelector('.add_to_favorites'); 
const cartBtn = document.querySelector('.add_to_cart'); 


product.addEventListener('onload',addProductData());

function addProductData(){
    //+ initializare variabile din baza de date
    //+ set image
    document.querySelector('#people_cat').innerHTML = people_cat.toUpperCase();
    document.querySelector('#category_name').innerHTML = category.toUpperCase();
    document.querySelector('#header_product_name').innerHTML = product_name.toUpperCase();
    document.querySelector('#product_name').innerHTML = product_name.toUpperCase();
    document.querySelector('#id_product').innerHTML = product_id;
    document.querySelector('#price_product').innerHTML = product_price;
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
    if(color_selected!=null && size_selected!=null){
        console.log(`Adaugam la favorite: ${product_name} | ${color_selected} | ${size_selected}`);
        document.querySelector('.select_size').style.display="none";
        document.querySelector('.select_size_for_cart').style.display="none";
        //+ add favorites to db
        document.querySelector('.added_to_favorites').style.display="block";
        sleep(1000).then(()=>{
            document.querySelector('.added_to_favorites').style.display="none";
        });
    }
    else{
        document.querySelector('.select_size_for_cart').style.display="none";
        document.querySelector('.select_size').style.display="block";
    } 
});

cartBtn.addEventListener('click',()=>{
    if(color_selected!=null && size_selected!=null){
        console.log(`Adaugam in cos: ${product_name} | ${color_selected} | ${size_selected}`);
        document.querySelector('.select_size').style.display="none";
        document.querySelector('.select_size_for_cart').style.display="none";
        //add product to cart to db
        document.querySelector('.added_to_cart').style.display="block";
        sleep(1000).then(()=>{
            document.querySelector('.added_to_cart').style.display="none";
        });
    }
    else{
        document.querySelector('.select_size').style.display="none";
        document.querySelector('.select_size_for_cart').style.display="block";
    } 
});