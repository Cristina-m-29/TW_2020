var totalUsers = 2;
var usersFirstNames=['Cristina', 'Madalina'];
var usersLastNames=['Mititelu','Plugariu'];
var usersEmails = ['mititelucristina29@yahoo.com','plugariumadalina@yahoo.com'];
var usersPass = ['parolaCristina','parolaMadalina'];
var usersOrders = [2,4];
var usersFav = [6,8];

document.querySelector('.users').addEventListener('click',setUpUsers());

function setUpUsers(){
    document.querySelector('.users').addEventListener('click',()=>{
        admin_users_main.innerHTML = "<p>Store users</p>";
        console.log("get users and their info");
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ()=>{
            if(xhttp.readyState == 4){
                if(xhttp.status == 200){// SUCCES
                    if(xhttp.responseText == "no users"){
                        admin_users_main.insertAdjacentHTML("beforeend",`<p id="adminNoUsersTxt">No users found</p>`);
                    }
                    else{
                        const u = JSON.parse(xhttp.responseText);
                        console.log(JSON.parse(xhttp.responseText));
                        showAdminUsers(u);
                    }
                } 
                else{
                    console.log("somenthing went wrong");
                }            
            }
        } 
        xhttp.open("GET","getAllUsersAndTheirInfo",true);
        xhttp.resposnseType='application/json';
        xhttp.send();
    });
}

function showAdminUsers(users){
    if(users.length == 0){
        console.log("No users");
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
                    <div class="hide_users_pass hp_${user}">
                    <p>Hide data</p> 
                    </div>
                    <div class="show_users_pass sp_${user}">
                    <p>Show all data</p> 
                    </div>
                    <div class="edit_admin_users edu_${user}">
                    <p>Edit user</p> 
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
                            <p class="adm_total_orders_${user}"> Total orders</p>
                            <p class="adm_total_fav_${user}"> Total favorites</p>
                        </div>
                        <div class="users_main_data"> 
                            <p id="admin_users_name_${user}"> ${users[user].name}</p>
                            <p id="admin_users_email_${user}"> ${users[user].email}</p>
                            <div class="admin_hide_pass admin_users_pass_hidden_${user}">
                            <img src="../../images/user/dots.png">
                            <img src="../../images/user/dots.png">
                            <img src="../../images/user/dots.png">
                            </div>
                            <p class="admin_pass" id="admin_users_pass_${user}"> ${users[user].password}</p>
                            <p id="admin_users_ord_${user}"> ${users[user].nr_orders}</p>                        
                            <p id="admin_users_fav_${user}"> ${users[user].nr_favorites}</p>                                          
                        </div>
                    </div> 
                    <div class="admin_users_order_list auol_${user}">
                        <div class="orders_list_header">
                            <div class="orders_list_txt">
                                <p>Total orders<p>
                                <p>Orders list</p>
                            </div>                        
                            <div class="orders_list_main">
                                <p>${users[user].nr_orders}</p>
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
                                <p>${users[user].nr_favorites}</p>
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

            if(users[user].nr_orders == 0){
                document.querySelector(`.adm_no_ord_txt_${user}`).style.display="block";
                document.querySelector(`.orders_list_${user}`).style.display="none";
            }
            else{
                const ords = users[user].orders;
                for(order=0;order<users[user].nr_orders;order++){
                    var item = ords[order];
                    var d = item.submision_date.split(" ");
                    date = d[1] + ' '+ d[2] + ' ' + d[3]; 
                    document.querySelector(`.old_${user}`).insertAdjacentHTML("beforeend",`
                    <div class="old">
                        <div> <p>${item._id}</p> </div>
                        <div> <p>${date}</p> </div> 
                        <div class="old_products_${order}">
                        </div> 
                        <div> <p>${item.price}</p> </div>
                    </div>`);

                    var prods = item.products_list;
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

            if(users[user].nr_favorites == 0){
                document.querySelector(`.adm_no_fav_txt_${user}`).style.display="block";
                document.querySelector(`.fav_list_${user}`).style.display="none";
            }
            else{
                const favs = users[user].favorites;
                for(fav=0;fav<favs.length;fav++){
                    var item = 0;
                    document.querySelector(`.fld_${user}`).insertAdjacentHTML("beforeend",`
                    <div class="fld">
                        <div> <p>${favs[fav].product_name}</p> </div>
                        <div> <p>${favs[fav].selected_color}</p> </div> 
                        <div> <p>${favs[fav].selected_size} </p> </div> 
                        <div> <p>${favs[fav].price}</p> </div>
                    </div>`);
                }
            }

            document.querySelector(`.hp_${user}`).addEventListener('click',addHideDataEvent(user));
            document.querySelector(`.sp_${user}`).addEventListener('click',addShowDataEvent(user));
            document.querySelector(`.dau_${user}`).addEventListener('click',addDeleteUserEvent(user));
        }
    }
}

function addHideDataEvent(user){
    document.querySelector(`.hp_${user}`).addEventListener('click',()=>{
        document.querySelector(`.sp_${user}`).style.display="block";
        document.querySelector(`.hp_${user}`).style.display="none";
        document.querySelector(`.admin_users_pass_hidden_${user}`).style.display="block";
        document.querySelector(`#admin_users_pass_${user}`).style.display="none";

        document.querySelector(`.adm_total_orders_${user}`).style.display="block";
        document.querySelector(`#admin_users_ord_${user}`).style.display="block";        
        document.querySelector(`.adm_total_fav_${user}`).style.display="block";
        document.querySelector(`#admin_users_fav_${user}`).style.display="block"; 

        document.querySelector(`.auol_${user}`).style.display="none"; 
        document.querySelector(`.aufl_${user}`).style.display="none"; 
    });
}

function addShowDataEvent(user){
    document.querySelector(`.sp_${user}`).addEventListener('click',()=>{
        document.querySelector(`.sp_${user}`).style.display="none";
        document.querySelector(`.hp_${user}`).style.display="block";
        document.querySelector(`.admin_users_pass_hidden_${user}`).style.display="none";
        document.querySelector(`#admin_users_pass_${user}`).style.display="block";

        document.querySelector(`.adm_total_orders_${user}`).style.display="none";
        document.querySelector(`#admin_users_ord_${user}`).style.display="none";        
        document.querySelector(`.adm_total_fav_${user}`).style.display="none";
        document.querySelector(`#admin_users_fav_${user}`).style.display="none"; 

        document.querySelector(`.auol_${user}`).style.display="block"; 
        document.querySelector(`.aufl_${user}`).style.display="block"; 
    });
}

function addDeleteUserEvent(user){
    document.querySelector(`.dau_${user}`).addEventListener('click',()=>{
        //delete user from db
        const email = document.querySelector(`#admin_users_email_${user}`).innerHTML;
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
        xhttp.open("DELETE","deleteUser",true);
        xhttp.resposnseType='application/json';
        xhttp.send(email);
        document.querySelector(`.user_main_${user}`).style.display="none";
        totalUsers--;
        if(totalUsers == 0)
            admin_users_main.insertAdjacentHTML("beforeend",`<p id="adminNoUsersTxt">No users found</p>`);
    });
}