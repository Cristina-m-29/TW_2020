orders_side.addEventListener('click',setUpOrders());

function setUpOrders(){
    orders_side.addEventListener('click',()=>{
        document.querySelector('.main_orders').innerHTML = `<p>My orders</p>`;
        var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = ()=>{
                if(xhttp.readyState == 4){
                    if(xhttp.status == 200){// SUCCES
                        var ord = JSON.parse(xhttp.responseText);
                        showOrders(ord);
                } 
                else{
                    console.log("somenthing went wrong");
                }            
            }
        } 
        var email = document.querySelector(".email_view").innerHTML;
        xhttp.open("GET",`getOrders/${email}`,true);
        xhttp.resposnseType='application/json';
        xhttp.send();
    });

}

function showOrders(orders){    
    if(orders.length == 0)
    {
        orders_main.insertAdjacentHTML("beforeEnd",'<p id="no_orders_msg"> No orders found</p>'
        );
    }
    else{
        //parcurcere in bd
        for(order_number=0; order_number<orders.length;order_number++){
            item = orders[order_number];
            orders_main.insertAdjacentHTML("beforeEnd",
            `<div class="order_main">
                <div class="order_main_header">
                <p>Order</p>
                </div>
                <div class="order_main_body"> 
                    <div class="order_main_details">
                        <div class="order_main_prop"> 
                            <p> Order number </p>
                            <p> Submission date</p>
                            <p> Total price</p>
                            <p> Order summary</p>
                        </div>
                        <div class="order_main_data"> 
                            <p> ${order_number}</p>
                            <p> ${item.submision_date}</p>
                            <p> ${item.price}</p>
                            <div class="order_main_summary_prop">
                                <p> Product name </p>
                                <p> Size</p>
                                <p> Color</p>
                                <p> Number of pieces</p>
                            </div>                   
                            <div class="order_main_summary">
                                <div class="order_item order_item_${order_number}">                                
                                </div> 
                            </div>      
                        </div>
                    </div>            
                </div>
            </div>`);
            showItems(order_number, item.product_list);
        }
    }
}

function showItems(order_number, products){
    for(item_nr=0; item_nr < products.length; item_nr++){  
        var item = products[item_nr];  
        document.querySelector(`.order_item_${order_number}`).insertAdjacentHTML("beforeEnd",
        `<p>${item.product_name}</p>
        <p>${item.size}</p>
        <p>${item.color}</p>
        <p>${item.pieces}</p>`
        );
    }
}