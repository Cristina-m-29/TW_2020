var totalUsers;
document.querySelector('.users').addEventListener('click',setUpUsers());

function setUpUsers(){
    document.querySelector('.users').addEventListener('click',()=>{
        admin_users_main.innerHTML = "<p>Store users</p>";
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ()=>{
            if(xhttp.readyState == 4){
                if(xhttp.status == 200){// SUCCES
                    if(xhttp.responseText == "no users"){
                        admin_users_main.insertAdjacentHTML("beforeend",`<p id="adminNoUsersTxt">No users found</p>`);
                    }
                    else{
                        const u = JSON.parse(xhttp.responseText);
                        totalUsers = u.length;
                        showAdminUsers(u);
                    }
                } 
                else{
                    console.log("somenthing went wrong");
                }            
            }
        } 
        xhttp.open("GET","getAllUsers",true);
        xhttp.resposnseType='application/json';
        xhttp.send();
    });
}



function showAdminUsers(users){
    if(users.length == 0){
        admin_users_main.insertAdjacentHTML("beforeend",`<p id="adminNoUsersTxt">No users found</p>`);
    }
    else{
        //parcurgere in bd
        for(let user = 0;user < users.length;user++){
            admin_users_main.insertAdjacentHTML('beforeend',
            `<div class="users_main user_main_${user}">
                <div class="users_main_header">
                <p id="users_title">User nr. ${user+1}</p>
                <div class="users_edit_btns">
                    <div class="hide_users_pass order_hide_${user}">
                    <p>Hide orders</p> 
                    </div>
                    <div class="show_users_pass order_show_${user}">
                    <p>Show orders</p> 
                    </div>
                    <div class="hide_users_pass fav_hide_${user}">
                    <p>Hide favorites</p> 
                    </div>
                    <div class="show_users_pass fav_show_${user}">
                    <p>Show favorites</p> 
                    </div>
                    <div class="delete_admin_users dau_${user}">
                    <p>Delete user</p>
                    </div>
                </div>            
                </div>
                <div class="users_main_body"> 
                    <div class="users_main_details">
                        <div class="users_main_prop"> 
                            <p> User name </p>
                            <p> User email</p>
                            <p> User password</p>
                        </div>
                        <div class="users_main_data"> 
                            <p id="admin_users_name_${user}"> ${users[user].first_name} ${users[user].last_name}</p>
                            <p id="admin_users_email_${user}"> ${users[user].email}</p>
                            <div class="admin_hide_pass admin_users_pass_hidden_${user}">
                            <img src="../../images/user/dots.png">
                            <img src="../../images/user/dots.png">
                            <img src="../../images/user/dots.png">
                            </div>
                            <p class="admin_pass" id="admin_users_pass_${user}"> ${users[user].password}</p>                                     
                        </div>
                    </div> 
                    <div class="admin_users_order_list auol_${user}">
                        <div class="orders_list_header">
                            <div class="orders_list_txt">
                                <p>Total orders<p>
                                <p>Orders list</p>
                            </div>                        
                            <div class="orders_list_main">
                                <p id="nr_orders_${user}">${users[user].nr_orders}</p>
                                <p class="admin_users_no_orders_txt adm_no_ord_txt_${user}"> No orders </p>
                                <div class="orders_list orders_list_${user}">
                                    <div class="orders_list_data_header">
                                        <p>Order number</p>
                                        <p>Date</p>
                                        <p>Product</p>
                                        <p>Total price</p>
                                    </div>
                                    <div class="orders_list_data old_${user}">
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div class="admin_users_fav_list aufl_${user}">
                        <div class="fav_list_header">
                            <div class="fav_list_txt">
                                <p>Total favorites<p>
                                <p>Favorites list</p> 
                            </div>
                            <div class="fav_list_main">
                                <p id="nr_favorites_${user}">${users[user].nr_favorites}</p>
                                <p class="admin_users_no_fav_txt adm_no_fav_txt_${user}"> No favorites </p>
                                <div class="fav_list fav_list_${user}">
                                    <div class="fav_list_data_header">
                                        <p>Product name</p>
                                        <p>Color</p>
                                        <p>Size</p>
                                        <p>Price</p>
                                    </div>
                                    <div class="fav_list_data fld_${user}">
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>             
                </div>
            </div>`);

            document.querySelector(`.order_hide_${user}`).addEventListener('click',addHideOrdersEvent(user));
            document.querySelector(`.fav_hide_${user}`).addEventListener('click',addHideFavEvent(user));
            document.querySelector(`.order_show_${user}`).addEventListener('click',addShowOrdersEvent(user));
            document.querySelector(`.fav_show_${user}`).addEventListener('click',addShowFavEvent(user));
            document.querySelector(`.dau_${user}`).addEventListener('click',addDeleteUserEvent(user));
        }
    }
}

function addHideOrdersEvent(user){
    document.querySelector(`.order_hide_${user}`).addEventListener('click',()=>{
        document.querySelector(`.order_show_${user}`).style.display="block";
        document.querySelector(`.order_hide_${user}`).style.display="none";
        document.querySelector(`.admin_users_pass_hidden_${user}`).style.display="block";
        document.querySelector(`#admin_users_pass_${user}`).style.display="none";
        document.querySelector(`.auol_${user}`).style.display="none"; 
    });
}

function addHideFavEvent(user){
    document.querySelector(`.fav_hide_${user}`).addEventListener('click',()=>{
        document.querySelector(`.fav_show_${user}`).style.display="block";
        document.querySelector(`.fav_hide_${user}`).style.display="none";
        document.querySelector(`.admin_users_pass_hidden_${user}`).style.display="block";
        document.querySelector(`#admin_users_pass_${user}`).style.display="none"; 
        document.querySelector(`.aufl_${user}`).style.display="none"; 
    });
}

function addShowOrdersEvent(user){
    document.querySelector(`.order_show_${user}`).addEventListener('click',()=>{
        document.querySelector(`.old_${user}`).innerHTML = "";
        document.querySelector(`.order_show_${user}`).style.display="none";
        document.querySelector(`.order_hide_${user}`).style.display="block";
        document.querySelector(`.admin_users_pass_hidden_${user}`).style.display="none";
        document.querySelector(`#admin_users_pass_${user}`).style.display="block";

        const email = document.querySelector(`#admin_users_email_${user}`).innerHTML.trim();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ()=>{
            if(xhttp.readyState == 4){
                if(xhttp.status == 200){// SUCCES
                    if(xhttp.responseText == "no orders"){
                        document.querySelector(`#nr_orders_${user}`).innerHTML = orders.length;
                        document.querySelector(`.orders_list_${user}`).style.display = "none";
                        document.querySelector(`.adm_no_ord_txt_${user}`).style.display = "block";
                    }
                    else{
                        const orders = JSON.parse(xhttp.responseText);
                        if(orders.length === 0){
                            document.querySelector(`#nr_orders_${user}`).innerHTML = orders.length;
                            document.querySelector(`.orders_list_${user}`).style.display = "none";
                            document.querySelector(`.adm_no_ord_txt_${user}`).style.display = "block";
                        }
                        else{
                            document.querySelector(`#nr_orders_${user}`).innerHTML = orders.length; 
                            for(order=0;order<orders.length;order++){
                                var item = orders[order];
                                var d = item.submision_date.split(" ");
                                date = d[1] + ' '+ d[2] + ' ' + d[3]; 
                                document.querySelector(`.old_${user}`).insertAdjacentHTML("beforeend",`
                                    <div class="old">
                                    <div> <p>${item._id}</p> </div>
                                    <div> <p>${date}</p> </div> 
                                    <div class="old_products_${order}">
                                    </div> 
                                    <div> <p>${item.price}</p> </div>
                                    </div>`
                                );
                    
                                var prods = item.product_list;
                                for(i=0;i<prods.length;i++){
                                    document.querySelector(`.old_products_${order}`).insertAdjacentHTML("beforeend",`
                                        <div class="old_products_list">
                                            <p>${prods[i].product_name}</p>
                                            <p class="old_right">${prods[i].size}</p>
                                            <p class="old_right">${prods[i].color}</p>
                                            <p class="old_right">${prods[i].pieces}</p>
                                        </div>
                                    `);
                                }
                            }
                        }
                    }
                } 
                else{
                    console.log("somenthing went wrong");
                }            
            }
        } 
        xhttp.open("GET",`getOrders/${email}`,true);
        xhttp.resposnseType='application/json';
        xhttp.send();

        setTimeout(()=>{
            document.querySelector(`.auol_${user}`).style.display="block"; 
        },200);
    });
}

function addShowFavEvent(user){
    document.querySelector(`.fav_show_${user}`).addEventListener('click',()=>{
        document.querySelector(`.fld_${user}`).innerHTML = "";
        document.querySelector(`.fav_show_${user}`).style.display="none";
        document.querySelector(`.fav_hide_${user}`).style.display="block";
        document.querySelector(`.admin_users_pass_hidden_${user}`).style.display="none";
        document.querySelector(`#admin_users_pass_${user}`).style.display="block";

        const email = document.querySelector(`#admin_users_email_${user}`).innerHTML.trim();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ()=>{
            if(xhttp.readyState == 4){
                if(xhttp.status == 200){// SUCCES
                    if(xhttp.responseText == "no favorites"){
                        document.querySelector(`#nr_favorites_${user}`).innerHTML = "0";
                        document.querySelector(`.fav_list_${user}`).style.display = "none";
                        document.querySelector(`.adm_no__txt_${user}`).style.display = "block";
                    }
                    else{
                        const fav = JSON.parse(xhttp.responseText);
                        if(fav.length === 0){
                            document.querySelector(`#nr_favorites_${user}`).innerHTML = fav.length;
                            document.querySelector(`.fav_list_${user}`).style.display = "none";
                            document.querySelector(`.adm_no_fav_txt_${user}`).style.display = "block";
                        }
                        else{
                            document.querySelector(`#nr_favorites_${user}`).innerHTML = fav.length;
                            for(i=0;i<fav.length;i++){
                                var item = fav[i];
                                document.querySelector(`.fld_${user}`).insertAdjacentHTML("beforeend",`
                                <div class="fld">
                                    <div> <p>${item.product_name}</p> </div>
                                    <div> <p>${item.selected_color}</p> </div> 
                                    <div> <p>${item.selected_size} </p> </div> 
                                    <div> <p>${item.price}</p> </div>
                                </div>`);
                            }
                        }
                    }
                } 
                else{
                    console.log("somenthing went wrong");
                }            
            }
        } 
        xhttp.open("GET",`getFavorites/${email}`,true);
        xhttp.resposnseType='application/json';
        xhttp.send();

        setTimeout(()=>{
            document.querySelector(`.aufl_${user}`).style.display="block"; 
        },200);
    });
}

function addDeleteUserEvent(user){
    document.querySelector(`.dau_${user}`).addEventListener('click',()=>{
        const email = document.querySelector(`#admin_users_email_${user}`).innerHTML;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ()=>{
            if(xhttp.readyState == 4){
                if(xhttp.status != 200){
                    console.log("somenthing went wrong");
                }            
            }
        } 
        xhttp.open("DELETE","deleteUser",true);
        xhttp.resposnseType='application/json';
        xhttp.send(email);
        document.querySelector(`.user_main_${user}`).style.display="none";
        totalUsers--;
        if(totalUsers == 0)
            admin_users_main.insertAdjacentHTML("beforeend",`<p id="adminNoUsersTxt">No users found</p>`);
    });
}