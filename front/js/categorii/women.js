  document.querySelector('.women-categories').addEventListener('onload',getCategories());

function getCategories(){
      var forWho = window.location.href.split("/");
      forWho = forWho[4];

        var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = ()=>{
        if(xhttp.readyState == 4){
                if(xhttp.status == 200){// SUCCES
                    const cat = JSON.parse(xhttp.responseText);
                    setUpWCat(cat);
                } 
                else{
                    console.log("somenthing went wrong");
                }            
          }
      } 
      xhttp.open("GET",`getAllCategories/${forWho}`,true);
      xhttp.resposnseType='application/json';
      xhttp.send();
    }

function setUpWCat(cat){
    var forWho = window.location.href.split("/");
    forWho = forWho[4];
    var wcategories=document.querySelector('.women-categories');
    for(i=0;i<cat.length;i++){
      var item = cat[i];
        wcategories.insertAdjacentHTML("beforeEnd",
        `<div class="wc-product">
        <div>
          <a  href="/atara/${forWho}/products/${item.name}.html">
           <img class="wc-img" src="/getImage/${item.cat_id}">
          </a>
        </div> 
        <div>
          <p ><a href="/atara/${forWho}/products/${item.name}.html" class="wc-name">${item.name}</a></p>
        </div>
       </div>`);
    }
};



