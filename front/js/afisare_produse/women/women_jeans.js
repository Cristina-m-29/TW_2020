//http://localhost:2902/atara/girl/products/jeans.html


var colors = [];
var colors_hex = [];
var color_selected=null;
var sizes = [];
var size_selected = null;
var women_jeans=document.querySelector('.women-jeans');
women_jeans.addEventListener('onload', setUpProductsView());

function setUpProductsView(){
    var url = window.location.href.split("/");
    var cat = url[url.length -1];
    cat = cat.split(".");
    cat = cat[0];

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = ()=>{
        if(xhttp.readyState == 4){
            if(xhttp.status == 200){// SUCCES
                const prod = JSON.parse(xhttp.responseText);
                //apel afisare date 
                setProductCategories(prod);
            } 
            else{
                console.log("somenthing went wrong");
            }            
        }
    } 
    xhttp.open("GET",`getAllProductsForCategories/${url[4]}/${cat}`,true);
    xhttp.resposnseType='application/json';
    xhttp.send();
}
var wj_categories=document.querySelector('.women-jeans');
//http://localhost:2902/atara/girl/jeans/get/product/Jacket_One.html


function setProductCategories(prod){
    // var url = window.location.href.split("/");
    // var cat = url[url.length -1];
    // cat = cat.split(".");
    // cat = cat[0];
    // console.cat

    var forWho = window.location.href.split("/");
    forWho = forWho[4];
     for(i=0;i<prod.length;i++){
         var item=prod[i];
         console.log(item);
         colors = item.hex_colors;
         colors_hex = item.hex_colors;
         sizes = item.sizes;
         var cat = item.name;
         cat = cat.split(" ");
         var catName = '';
         for(k=0;k<cat.length;k++){
            if(k == cat.length - 1) catName += cat[k];
            else catName += cat[k] + '_';
         }
         console.log(catName);
        //  var curent_size = item.sizes;
        wj_categories.insertAdjacentHTML("beforeEnd",`<div class= "wj-product"> 
        <img class="wj-img wj-img-${i}" id="wj-img-id" src="../../../images/women/afisare_produse/wj-img-0.jpg">
       
        <div class="text text-${i}">
          
          <div class="text-positioning">
            <div>
              <p class= "wj-cart" id="wj-cart-id-${i}">Add to cart</p>
            </div> 
            <div>
              <p id="wj-more-info"><a href="/atara/${forWho}/${cat}/get/product/${catName}.html" class="wj-more-info more-info-${i}">See more informations</a></p>
            </div>
          </div>
          
          <div class="arrows">
            <div>
            <p id="previous-info-initial">&#8592;</p> 
            <p id="next-info-initial">&#8594;</p> 
          </div></div>

        
          <div class="text-positioning">
            <div class="wj-product-color wj-product-color-${i}" >
              <p>Select a color:</p>
            </div>
            <div class="wj-product-color-list wj-product-color-list-${i}" id="wj-product-color-list-id">
          </div> 
          </div>
       
          <div class="arrows">
           <div>
            <p id="previous-info-colors" class="previous-info-colors-${i}">&#8592;</p> 
            <p id="next-info-colors" class="next-info-colors-${i}">&#8594;</p> 
          </div></div>

          <div class="text-positioning">
           <div>
            <p id="wj-size-id" class="wj-size wj-size-${i}">Select size: </p>
           </div>
           <div id="wj-size-list-id" class="wj-size-list wj-size-list-${i}"></div>
          </div>
        
          <div class="arrows">
           <div>
            <p id="previous-info-size" class="previous-size-${i}">&#8592;</p> 
            <p id="next-info-size" class="next-info-size-${i}">&#8594;</p> 
          </div></div>
        
          <div class="text-positioning">
            <div class="add-now add-now-${i}" id="add-now-id">Add now!</div>
            <div>
              <p id="check" class="check-class check-class-${i}">&#10003;</p> 
            </div>
          </div>
          <div>
              <p id="previous-info-cart" class="previous-info-cart-${i}">&#8592;</p> 
          </div>

          <div class="added-to-cart added-to-cart-${i}">Product added to cart!</div>
         
        </div>

       <div>
        <p class="price wj-product-price-${i}">Price</p>
        <p class="name wj-product-name-${i}">Name</p>
       
      </div>
     </div>`);

     /*------Afisare culoare si size------*/
     for(j=0;j<colors.length;j++){
        document.querySelector(`.wj-product-color-list-${i}`).insertAdjacentHTML("beforeend",
        `<div class="color_list_${i}${j}" style="background-color:${colors[j]}"></div>`);
        console.log(colors[j]);
        document.querySelector(`.color_list_${i}${j}`).addEventListener('click',addEventColor(i,j));
    }
    for(j=0;j<sizes.length;j++){
        document.querySelector(`.wj-size-list-${i}`).insertAdjacentHTML("beforeend",`<p id="size_${i}${j}">${sizes[j]}</p>`);        
        document.querySelector(`#size_${i}${j}`).addEventListener('click',addEventSize(i,j));
    }

     document.querySelector(`#wj-cart-id-${i}`).addEventListener('click', hideTextShowColor(i));
     document.querySelector(`.previous-info-colors-${i}`).addEventListener('click', showPreviousCategoriesColors(i));
     document.querySelector(`.next-info-colors-${i}`).addEventListener('click', showNextCategoriesColors(i));
     document.querySelector(`.previous-size-${i}`).addEventListener('click', showPreviousCategoriesSize(i));
     document.querySelector(`.next-info-size-${i}`).addEventListener('click', showNextCategoriesSize(i));
     document.querySelector(`.previous-info-cart-${i}`).addEventListener('click', showPreviousCategoriesCart(i));
     document.querySelector(`.wj-img-${i}`).addEventListener('mouseenter', MakeTextAppear(i));
     document.querySelector(`.wj-img-${i}`).addEventListener('mouseleave', MakeTextDisappear(i));

     document.querySelector(`.text-${i}`).addEventListener('mouseenter', MakeAppear(i));
     document.querySelector(`.text-${i}`).addEventListener('mouseleave', MakeDisappear(i));
     document.querySelector(`.check-class-${i}`).addEventListener('click', sendDataFromCat(i));
     document.querySelector(`#wj-cart-id-${i}`).addEventListener("mouseover", setBoldAddToCart(i));
     document.querySelector(`#wj-cart-id-${i}`).addEventListener("mouseout", setNormalAddToCart(i));
     document.querySelector(`.more-info-${i}`).addEventListener("mouseover", setBoldMoreInfo(i));
     document.querySelector(`.more-info-${i}`).addEventListener("mouseout", setNormalMoreInfo(i));
     document.querySelector(`.check-class-${i}`).addEventListener("mouseover", setColorRedCheck(i));
     document.querySelector(`.check-class-${i}`).addEventListener("mouseout", setColorBlackCheck(i));

    }
}
/* ------Afisarea blocului de text---*/
function MakeTextAppear(i){
    document.querySelector(`.wj-img-${i}`).addEventListener('mouseenter',()=>{
        document.querySelector(`.text-${i}`).style.display = "block";
    });
}
function MakeTextDisappear(i){
    document.querySelector(`.wj-img-${i}`).addEventListener('mouseleave',()=>{
        document.querySelector(`.text-${i}`).style.display = "none";
    });
}
function MakeAppear(i){
    document.querySelector(`.text-${i}`).addEventListener('mouseenter',()=>{
        document.querySelector(`.text-${i}`).style.display = "block";
    });
}
function MakeDisappear(i){
    document.querySelector(`.text-${i}`).addEventListener('mouseleave',()=>{
        document.querySelector(`.text-${i}`).style.display = "none";
    });
}


/*----Setare bold/normal pentru add to cart si see more info*/

function setBoldAddToCart(i){
    document.querySelector(`#wj-cart-id-${i}`).addEventListener("mouseover",()=>{
        document.querySelector(`#wj-cart-id-${i}`).style.fontWeight="bold";
    });
}
function setNormalAddToCart(i){
    document.querySelector(`#wj-cart-id-${i}`).addEventListener("mouseout",()=>{
        document.querySelector(`#wj-cart-id-${i}`).style.fontWeight="normal";
    });
}
function setBoldMoreInfo(i){
    document.querySelector(`.more-info-${i}`).addEventListener("mouseover",()=>{
        document.querySelector(`.more-info-${i}`).style.fontWeight="bold";
    });
}
function setNormalMoreInfo(i){
    document.querySelector(`.more-info-${i}`).addEventListener("mouseout",()=>{
        document.querySelector(`.more-info-${i}`).style.fontWeight="normal";
    });
}

/*----Setare border colors----*/ 
function addEventColor(i,j){
    document.querySelector(`.color_list_${i}${j}`).addEventListener('click',()=>{
        for(k=0;k<colors_hex.length;k++)
          if(k!=j){
            document.querySelector(`.color_list_${i}${k}`).style.borderColor = "black";
          }
         document.querySelector(`.color_list_${i}${j}`).style.borderColor = "red";
         color_selected = colors[j];
    });
}

/*----Setare font sizes----*/ 
function addEventSize(i,j){
    document.querySelector(`#size_${i}${j}`).addEventListener('click',()=>{
        for(k=0;k<sizes.length;k++){
            if(k!=j)    
            document.querySelector(`#size_${i}${k}`).style.fontWeight = "normal";
        }
        document.querySelector(`#size_${i}${j}`).style.fontWeight = "bold";
        size_selected = sizes[j];
    });
 }

/*-----Afisarea sectiunii de culori si stergerea add to cart si more infos----*/ 
function hideTextShowColor(i){
    document.querySelector(`#wj-cart-id-${i}`).addEventListener('click',()=>{
        document.querySelector(`.wj-product-color-list-${i}`).style.display="flex";
        console.log(i);
        document.querySelector(`#wj-cart-id-${i}`).style.display = "none";
        document.querySelector(`.more-info-${i}`).style.display = "none";
        document.querySelector(`.wj-product-color-${i}`).style.display = "flex";
        for(j=0;j<colors_hex.length;j++)
          document.querySelector(`.color_list_${i}${j}`).style.display = "block";
        document.querySelector(`.previous-info-colors-${i}`).style.display = "block";
        document.querySelector(`.next-info-colors-${i}`).style.display = "block";
    });
}

/*-----Stergerea sectiunii pentru size si afisarea sectiunii pentru culori----*/ 
function hideSizeShowColor(i){
    document.querySelector(`.wj-product-color-list-${i}`).style.display="flex";
        console.log(i);
        document.querySelector(`#wj-cart-id-${i}`).style.display = "none";
        document.querySelector(`.more-info-${i}`).style.display = "none";
        document.querySelector(`.wj-product-color-${i}`).style.display = "flex";
        for(j=0;j<colors_hex.length;j++)
          document.querySelector(`.color_list_${i}${j}`).style.display = "block";
        document.querySelector(`.previous-info-colors-${i}`).style.display = "block";
        document.querySelector(`.next-info-colors-${i}`).style.display = "block";
}

/*----Afisarea sectiunii de size si stergerea sectiunii de colors-----*/
function hideTextShowSize(i){
    coverColors(i);
    document.querySelector(`.wj-size-list-${i}`).style.display="flex";
    document.querySelector(`.wj-size-${i}`).style.display = "block";
    for(j=0;j<sizes.length;j++)
      document.querySelector(`#size_${i}${j}`).style.display = "block";
    document.querySelector(`.previous-size-${i}`).style.display = "block";
    document.querySelector(`.next-info-size-${i}`).style.display = "block";
}

/*----Stergerea sectiunii de size si afisarea check-ului pentru add to cart-----*/
function hideTextAddToCart(i){
    coverSize(i);
    document.querySelector(`.add-now-${i}`).style.display = "block";
    document.querySelector(`.check-class-${i}`).style.display = "block";
    document.querySelector(`.previous-info-cart-${i}`).style.display = "block";
}

/*----Adaugarea in cart dupa check si trimiterea datelor----*/
function sendDataFromCat(i){
    document.querySelector(`.check-class-${i}`).addEventListener('click',()=> {

        if(localStorage.getItem('logged') === "false" || !('logged' in localStorage)){  
            alert('Login is requered to add products to cart!');
        }
        else{
            // adaugat in cart after press check
            if(color_selected!=null && size_selected!=null){
                AddedToCart(i);
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
                xhttp.open("POST", "addProductFromCategoriesToCart", true);
                var dataToPost={
                    email:localStorage.getItem('email'),
                    name:document.querySelector(`.wj-product-name-${i}`).innerHTML,
                    color:color_selected,
                    size:size_selected
                }
                xhttp.send(JSON.stringify(dataToPost));
                setTimeout(showInitialChoicesDelete(i), 5000);
            }
        }
    });
}

/*----Se ia de la capat procesul----*/
function showInitialChoicesDelete(i){
    //arata stadiul initial cu cart si more information
    color_selected=null;
    size_selected=null;
    document.querySelector(`#wj-cart-id-${i}`).style.display = "block";
    document.querySelector(`.more-info-${i}`).style.display = "block";
    document.querySelector(`.added-to-cart-${i}`).style.display = "none";
    for(j=0;j<colors_hex.length;j++)
       document.querySelector(`.color_list_${i}${j}`).style.borderColor = "black";
    for(j=0;j<sizes.length;j++)
       document.querySelector(`#size_${i}${j}`).style.fontWeight = "normal";
}

/*----Afisarea adaugarii in cart si stergerea check-ului----*/
function AddedToCart(i){
    document.querySelector(`.previous-info-cart-${i}`).style.display = "none";
    document.querySelector(`.added-to-cart-${i}`).style.display = "block";
    document.querySelector(`.add-now-${i}`).style.display = "none";
    document.querySelector(`.check-class-${i}`).style.display = "none";
}

/*-----Afisaea sectiunii de size dupa apasarea sagetii de next a sectiunii de colors----*/
function showNextCategoriesColors(i){
    document.querySelector(`.next-info-colors-${i}`).addEventListener('click', ()=>{
        if(color_selected!=null){
         hideTextShowSize(i);
    }
    });
}

/*-----Afisaea sectiunii de cart dupa apasarea sagetii de next a sectiunii de size---*/
function showNextCategoriesSize(i){
    document.querySelector(`.next-info-size-${i}`).addEventListener('click',()=>{
        if(size_selected!=null){
        hideTextAddToCart(i);
    }
    });
}

/*---Afisarea primei sectiunii de add to cart si see more infos si stergerea colors + size----*/
function showPreviousCategoriesColors(i){
    document.querySelector(`.previous-info-colors-${i}`).addEventListener('click',()=>{
        color_selected=null;
        document.querySelector(`#wj-cart-id-${i}`).style.display = "block";
        document.querySelector(`.more-info-${i}`).style.display = "block";
        coverColors(i);
        coverSize(i);
    });
}

/*----Afisarea sectiunii de colors dupa apasarea sagetii de back a sectiunii de size---- */
function showPreviousCategoriesSize(i){
    document.querySelector(`.previous-size-${i}`).addEventListener('click', ()=>{
        size_selected=null;
        hideSizeShowColor(i);
        coverSize(i);
    });
}

/*----Afisarea sectiunii de size dupa apasarea sagetii de back a sectiunii de cart---- */

function showPreviousCategoriesCart(i){
     document.querySelector(`.previous-info-cart-${i}`).addEventListener('click',()=>{
        document.querySelector(`.add-now-${i}`).style.display = "none";
        document.querySelector(`.check-class-${i}`).style.display = "none";
        document.querySelector(`.previous-info-cart-${i}`).style.display = "none";
        document.querySelector(`.wj-size-${i}`).style.display = "block";
        for(j=0;j<sizes.length;j++)
            document.querySelector(`#size_${i}${j}`).style.display = "block";
        document.querySelector(`.previous-size-${i}`).style.display = "block";
        document.querySelector(`.next-info-size-${i}`).style.display = "block";
    });
   

}
/*----Functie ajutatoare pt a sterge sectiunea de size---- */
function coverSize(i){
    document.querySelector(`.wj-size-${i}`).style.display = "none";
    for(j=0;j<sizes.length;j++)
      document.querySelector(`#size_${i}${j}`).style.display = "none";
    document.querySelector(`.previous-size-${i}`).style.display = "none";
    document.querySelector(`.next-info-size-${i}`).style.display = "none";
}

/*----Functie ajutatoare pt a sterge sectiunea de colors--- */
function coverColors(i){
    console.log(i);
    document.querySelector(`.wj-product-color-${i}`).style.display = "none";
    document.querySelector(`.wj-product-color-list-${i}`).style.display = "none";
    for(j=0;j<colors_hex.length;j++)
      document.querySelector(`.color_list_${i}${j}`).style.display = "none";
    document.querySelector(`.previous-info-colors-${i}`).style.display = "none";
    document.querySelector(`.next-info-colors-${i}`).style.display = "none";
}
/*----Seteaza culoarea butonului de check in rosu---- */
function setColorRedCheck(i){
    document.querySelector(`.check-class-${i}`).addEventListener("mouseover",()=>{
        document.querySelector(`.check-class-${i}`).style.color="#ff0000";
    });
}

/*----Seteaza culoarea butonului de check in rosu---- */
function setColorBlackCheck(i){
    document.querySelector(`.check-class-${i}`).addEventListener("mouseout",()=>{
        document.querySelector(`.check-class-${i}`).style.color="#000000";
    });
}
