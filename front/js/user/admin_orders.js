var totalOrders = 10;
const ordSide = document.querySelector('.orders');

ordSide.addEventListener('click',setUpOrders());

function setUpOrders(){
  ordSide.addEventListener('click',()=>{
    document.querySelector('.admin_orders_body').innerHTML ="";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = ()=>{
        if(xhttp.readyState == 4){
        if(xhttp.status == 200){// SUCCES
          if(xhttp.responseText == "no orders"){
            document.querySelector('.admin_orders_header').style.display="none";
            admin_orders_main.insertAdjacentHTML("beforeend",
            `<p class="admin_no_orders_txt">No orders found</p>`);
          }
          else{
            const orders = JSON.parse(xhttp.responseText);
            showAdminOrders(orders);
          }
        } 
        else{
            console.log("somenthing went wrong");
        }            
      }
    } 
    xhttp.open("GET","getAllOrders",true);
    xhttp.resposnseType='application/json';
    xhttp.send();
  });
}

function showAdminOrders(orders){
    if(totalOrders == 0){
        document.querySelector('.admin_orders_header').style.display="none";
        admin_orders_main.insertAdjacentHTML("beforeend",
        `<p class="admin_no_orders_txt">No orders found</p>`);        
    }
    else{
        for(adm_order=0;adm_order<orders.length;adm_order++){
          var d = orders[adm_order].submision_date;
          document.querySelector('.admin_orders_body').insertAdjacentHTML("beforeend",
            `<div class="adm_order adm_order_${adm_order}">
            <div><p style="overflow:hidden;">${orders[adm_order]._id}</p></div>
            <div><p>${orders[adm_order].user_id}</p></div>
            <div><p>${d}</p></div>
            <div class="adm_order_prod adm_ord_prod_${adm_order}">            
            </div>
            <div><p>${orders[adm_order].price} RON</p></div>
          </div>`);
          
          var products_list = orders[adm_order].product_list;
          for(ord_prod=0;ord_prod<products_list.length;ord_prod++){
            document.querySelector(`.adm_ord_prod_${adm_order}`).insertAdjacentHTML("beforeend",`
            <p>${products_list[ord_prod].product_name}</p>
            <p class="ord_right">${products_list[ord_prod].selected_size}</p>
            <p class="ord_right">${products_list[ord_prod].selected_color}</p>
            <p class="ord_right">${products_list[ord_prod].pieces}</p>
            <p class="ord_right">${products_list[ord_prod].price} RON</p>`);
          }
        }        
    }
}
