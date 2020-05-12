// var orders = document.querySelector('.main_orders');
var product_name;
var size;
var color;
var number_pieces;

var numberOfOrders = 2;

orders_main.addEventListener('onload',showOrders());

function showOrders(){    
    if(numberOfOrders == 0)
    {
        orders_main.insertAdjacentHTML("beforeEnd",'<p id="no_orders_msg"> No orders found</p>'
        );
    }
    else{
        //parcurcere in bd
        for(order_number=1; order_number<=numberOfOrders;order_number++){
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
                            <p> 1-May-2020</p>
                            <p> 286 lei</p>
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
            showItems(order_number);
        }
    }
}

function showItems(order_number){
    //get data prom db
    numberOfItems=3;
    for(item_nr=1; item_nr <= numberOfItems; item_nr++){     
        document.querySelector(`.order_item_${order_number}`).insertAdjacentHTML("beforeEnd",
        `<p>Dress</p>
        <p>XS</p>
        <p>Blue</p>
        <p>1</p>`
        );
    }
}