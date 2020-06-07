  document.querySelector('.women-categories').addEventListener('onload',getCategories());

    function getCategories(){
      console.log("get categories");
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = ()=>{
          if(xhttp.readyState == 4){
              if(xhttp.status == 200){// SUCCES
                  console.log(xhttp.responseText);
                  setUpWCat();
              } 
              else{
                  console.log("somenthing went wrong");
              }            
          }
    } 
    xhttp.open("GET","getAllCategories",true);
    xhttp.resposnseType='application/json';
    xhttp.send();
    }

function setUpWCat(){
    
    var product_image="categories";
    var product_name="JEANS";
    var wcategories=document.querySelector('.women-categories');
    for(i=1;i<=4;i++){
        wcategories.insertAdjacentHTML("beforeEnd",
        `<div class="wc-product">
        <div>
          <a  href="../../html/afisare_produse/women/women_jeans.html">
           <img class="wc-img" src="../../images/women/categorii/${product_image}${i}.jpg">
          </a>
        </div> 
        <div>
          <p ><a href="../../html/afisare_produse/women/women_jeans.html" class="wc-name">${product_name}</a></p>
        </div>
       </div>`);
    }
};
