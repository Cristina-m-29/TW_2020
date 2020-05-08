var totalUsers = 2;
var usersFirstNames=['Cristina', 'Madalina'];
var usersLastNames=['Mititelu','Plugariu'];
var usersEmails = ['mititelucristina29@yahoo.com','plugariumadalina@yahoo.com'];
var usersPass = ['parolaCristina','parolaMadalina'];
var usersOrders = [2,4];
var usersFav = [6,8];

admin_users_main.addEventListener('onload',showAdminUsers());

function showAdminUsers(){
    if(totalUsers == 0){
        console.log("No users");
        admin_users_main.insertAdjacentHTML("beforeend",`<p id="adminNoUsersTxt">No users found</p>`);
    }
    else{
        //parcurgere in bd
        for(user = 0;user < totalUsers;user++){
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
                            <p id="admin_users_name_${user}"> ${usersLastNames[user]} ${usersFirstNames[user]}</p>
                            <p id="admin_users_email_${user}"> ${usersEmails[user]}</p>
                            <div class="admin_hide_pass admin_users_pass_hidden_${user}">
                            <img src="../../images/user/dots.png">
                            <img src="../../images/user/dots.png">
                            <img src="../../images/user/dots.png">
                            </div>
                            <p class="admin_pass" id="admin_users_pass_${user}"> ${usersPass[user]}</p>
                            <p id="admin_users_ord_${user}"> ${usersOrders[user]}</p>                        
                            <p id="admin_users_fav_${user}"> ${usersFav[user]}</p>                                          
                        </div>
                    </div> 
                    <div class="admin_users_order_list auol_${user}">
                        <div class="orders_list_header">
                            <div class="orders_list_txt">
                                <p>Total orders<p>
                                <p>Orders list</p>
                            </div>                        
                            <div class="orders_list_main">
                                <p>${usersOrders[user]}</p>
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
                                <p>${usersFav[user]}</p>
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

            if(usersOrders[user] == 0){
                document.querySelector(`.adm_no_ord_txt_${user}`).style.display="block";
                document.querySelector(`orders_list_${user}`).style.display="none";
            }
            else{
                for(order=0;order<usersOrders[user];order++){
                    var item = 0;
                    document.querySelector(`.old_${user}`).insertAdjacentHTML("beforeend",`
                    <div class="old">
                        <div> <p>450</p> </div>
                        <div> <p>22-FEB-20</p> </div> 
                        <div class="old_products_${order}">
                            <div class="old_products_list">
                                <p>Dress one</p>
                                <p class="old_right">XS</p>
                                <p class="old_right">Red</p>
                                <p class="old_right">1</p>
                            </div>
                        </div> 
                        <div> <p>299.79</p> </div>
                    </div>`);
                }
            }

            if(usersFav[user] == 0){
                document.querySelector(`.adm_no_fav_txt_${user}`).style.display="block";
                document.querySelector(`.fav_list_${user}`).style.display="none";
            }
            else{
                for(fav=0;fav<usersFav[user];fav++){
                    var item = 0;
                    document.querySelector(`.fld_${user}`).insertAdjacentHTML("beforeend",`
                    <div class="fld">
                        <div> <p>Jacket one</p> </div>
                        <div> <p>Green</p> </div> 
                        <div> <p>S </p> </div> 
                        <div> <p>30.99</p> </div>
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
        document.querySelector(`.user_main_${user}`).style.display="none";
        totalUsers--;
        if(totalUsers == 0)
            admin_users_main.insertAdjacentHTML("beforeend",`<p id="adminNoUsersTxt">No users found</p>`);
    });
}