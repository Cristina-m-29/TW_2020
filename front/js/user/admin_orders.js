var totalOrders = 10;
admin_orders_main.addEventListener('onload',showAdminOrders());

function showAdminOrders(){
    if(totalOrders == 0){
        document.querySelector('.admin_orders_header').style.display="none";
        admin_orders_main.insertAdjacentHTML("beforeend",
        `<p class="admin_no_orders_txt">No orders found</p>`);        
    }
    else{
        for(adm_order=0;adm_order<totalOrders;adm_order++){
            document.querySelector('.admin_orders_body').insertAdjacentHTML("beforeend",
            `<div class="adm_order adm_order_${adm_order}">
            <div><p>334</p></div>
            <div><p>25</p></div>
            <div><p>13-MAY-19</p></div>
            <div class="adm_order_prod adm_ord_prod_${adm_order}">            
            </div>
            <div><p>13.59</p></div>
          </div>`);
          
          for(ord_prod=0;ord_prod<3;ord_prod++){
            document.querySelector(`.adm_ord_prod_${adm_order}`).insertAdjacentHTML("beforeend",`
            <p>Shirt two</p>
            <p class="ord_right">M</p>
            <p class="ord_right">Blue</p>
            <p class="ord_right">1</p>
            <p class="ord_right">13.59</p>`);
          }
        }        
    }
}