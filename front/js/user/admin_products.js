var totalProducts = 5;
var totalColors = 3;
var color = ['green','red','yellow'];
var colors_to_delete =[];
var totalSizes = 2;
var sizes = ['XS','S'];
var base64 = null;
var current_prod;
admin_products_main.addEventListener('onload',showAdminProducts());

function showAdminProducts(){
    document.querySelector('#admin_nr_products').insertAdjacentHTML("beforeend",`<p id="adm_number_prod">${totalProducts}</p>`);
    if(totalProducts == 0) {
        admin_products_main.insertAdjacentHTML("beforeend",'<p id="no_adm_prod_txt">No products found </p>');
        document.querySelector('#admin_nr_products').style.display="none";
    }
    else{
        for(prod=0;prod<totalProducts;prod++){
            document.querySelector('.admin_products').insertAdjacentHTML("beforeend",
            `<div class="adm_prod adm_prod_${prod}">
                <!--<div class="adm_prod_header adm_prod_header_${prod}">
                    <p> Product </p> 
                </div>-->
                <div class="adm_prod_main adm_prod_main_${prod}">
                    <div class="adm_prod_img">
                        <img id="adm_prod_img_${prod}" src="../../images/women/woman-in-black-full-zip-jacket-1034859.jpg">
                    </div>
                    <div class="adm_prod_txt">
                        <p>Product id</p>
                        <p>Design for</p>
                        <p>Category</p>
                        <p>Name</p>              
                        <p>Price</p>
                        <p>Colors</p>
                        <p>Sizes</p>
                    </div>
                    <div class="adm_prod_data">
                        <div>1594</div>
                        <div>Women</div>
                        <div>Jeans</div>
                        <div class="adm_prod_name_${prod}">Mom jeans one</div>
                        <div class="adm_prod_price_${prod}">99.99</div>
                        <div class="adm_prod_colors adm_prod_colors_${prod}">
                        </div>
                        <div class="adm_prod_sizes adm_prod_sizes_${prod}">
                        </div>
                    </div>                 
                </div> 
                <div class="adm_prod_edit_body adm_prod_edit_body_${prod}">
                <form class="adm_prod_form">
                    <div class="adm_prod_form_header">                  
                    <div>
                        <img src="../../images/women/woman-in-black-full-zip-jacket-1034859.jpg" class="adm_prod_new_img new_img_${prod}">
                    </div>
                    <div class="adm_prod_form_side"> 
                        <div><input type="file" class="image_selector image_selector_${prod}"></div>
                        <div class="adm_set_name">              
                        <input type="text" placeholder="Change product name" id="p_name_${prod}">
                        </div>  
                        <div class="adm_set_price">
                        <input type="number" placeholder="Change price" id="p_price_${prod}">
                        </div>
                    </div>
                    </div>               
                    
                    <div class="adm_prod_set_colors">
                        <div class="adm_prod_current_colors apcc_${prod}">           
                        </div>
                        <div class="adm_prod_add_color">
                            <input type="text" placeholder="Add color in hex" id="p_hex_${prod}">
                        </div>
                    </div>
                    <div class="adm_prod_set_sColor">
                        <div> <p class="hex_string hex_string_${prod}">Hex and string required</p></div>
                        <div class="add_prod_add_string">
                            <input type="text" placeholder="Add color in string" id="p_string_${prod}">
                        </div>
                    </div>
                    <div class="adm_prod_set_sizes">
                    <div class="adm_prod_current_sizes apcs_${prod}">
                    </div>
                    <div class="adm_prod_add_size">
                        <input type="text" placeholder="Add size" id="p_size_${prod}">
                    </div>
                    </div>
                </form>
                </div>  
                <div class="adm_prod_footer">
                <div class="adm_prod_delete adm_prod_delete_${prod}">
                    Delete
                </div>
                <div class="adm_prod_edit adm_prod_edit_${prod}">
                    Edit product data
                </div>
                <div class="adm_prod_done adm_prod_done_${prod}">
                    <input type="submit" value="Apply changes">
                </div>
                </div>         
            </div>
            </div>`);

            //parcurgere culori produs in bd
            for(i=0;i<totalColors;i++){
                document.querySelector(`.adm_prod_colors_${prod}`).insertAdjacentHTML("beforeend",`<div class="prod_color pc_${prod}${i}" style="background-color:${color[i]}"></div>`);
                document.querySelector(`.apcc_${prod}`).insertAdjacentHTML("beforeend",`<div class="prod_color delete_color_${prod}${i}" style="background-color:${color[i]}"></div>`);
                document.querySelector(`.delete_color_${prod}${i}`).addEventListener('click',addColorDeleteEvent(prod,i));
            }

            //parcurgere marimi produs in bd
            for(i=0;i<totalSizes;i++){
                document.querySelector(`.adm_prod_sizes_${prod}`).insertAdjacentHTML("beforeend",`<p class="ps_${prod}${i}">${sizes[i]}</p>`);
                document.querySelector(`.apcs_${prod}`).insertAdjacentHTML("beforeend",`<p  class="pcs_${prod}${i}">${sizes[i]}</p>`);
                document.querySelector(`.pcs_${prod}${i}`).addEventListener('click',addSizeDeleteEvent(prod,i));
            }

            document.querySelector(`.image_selector_${prod}`).addEventListener('change',addImageEvent(prod));

            document.querySelector(`.adm_prod_delete_${prod}`).addEventListener('click',addAdmProdDeleteEvent(prod));
            document.querySelector(`.adm_prod_edit_${prod}`).addEventListener('click',addAdmProdEditEvent(prod));
            document.querySelector(`.adm_prod_done_${prod}`).addEventListener('click',addAdmProdDoneEvent(prod));
        }
    }
}

function addAdmProdDeleteEvent(prod){
    document.querySelector(`.adm_prod_delete_${prod}`).addEventListener('click',()=>{
        console.log('Delete');
        //sterge produs din bd
        document.querySelector(`.adm_prod_${prod}`).style.display="none";
        totalProducts--;
        document.querySelector("#adm_number_prod").innerHTML = totalProducts;
        if(totalProducts == 0){
            admin_products_main.insertAdjacentHTML("beforeend",'<p id="no_adm_prod_txt">No products found </p>');
            document.querySelector('#admin_nr_products').style.display="none";
        }
    });    
}

function addAdmProdEditEvent(prod){
    document.querySelector(`.adm_prod_edit_${prod}`).addEventListener('click',()=>{
        console.log('Edit');
        // current_prod = prod;
        document.querySelector(`.adm_prod_main_${prod}`).style.display="none";
        document.querySelector(`.adm_prod_edit_body_${prod}`).style.display="block";
        document.querySelector(`.adm_prod_edit_${prod}`).style.display="none";
        document.querySelector(`.adm_prod_done_${prod}`).style.display="block";
        // document.querySelector(`.adm_prod_header_${prod}`).style.display="none";
    });    
}

function addAdmProdDoneEvent(prod){
    document.querySelector(`.adm_prod_done_${prod}`).addEventListener('click',()=>{           
        var p_name = document.querySelector(`#p_name_${prod}`).value;         
        var p_price = document.querySelector(`#p_price_${prod}`).value;
        var p_hex = document.querySelector(`#p_hex_${prod}`).value;       
        var p_string = document.querySelector(`#p_string_${prod}`).value;
        var p_size = document.querySelector(`#p_size_${prod}`).value;

        //change data in bd
        if((p_hex != "" && p_string == "") || (p_hex == "" && p_string != "")){
            console.log("HEX+STRING REQUIRED");
            document.querySelector(`.hex_string_${prod}`).style.display="block";            
        }
        else{
            //adaugare culoare si in bd
            if(p_hex!="" && p_string !=""){
                console.log("Adaugam culoare");
                //Si hex si string!
                var i=color.length;
                color.push(p_hex);
                document.querySelector(`.adm_prod_colors_${prod}`).insertAdjacentHTML("beforeend",`<div class="prod_color pc_${prod}${i}" style="background-color:${p_hex}"></div>`);            
                document.querySelector(`.apcc_${prod}`).insertAdjacentHTML("beforeend",`<div class="prod_color delete_color_${prod}${i}" style="background-color:${p_hex}"></div>`);
                document.querySelector(`.delete_color_${prod}${i}`).addEventListener('click',addColorDeleteEvent(prod,i));                
            }

            document.querySelector(`.hex_string_${prod}`).style.display="none";
            document.querySelector(`#adm_prod_img_${prod}`).src = document.querySelector(`.new_img_${prod}`).src;
            if(p_name != ""){
                //Schimbare nume in bd
                console.log("Schimbam nume produs");
                document.querySelector(`.adm_prod_name_${prod}`).innerHTML = p_name;
            }
            if(p_price != ""){
                //Schimbare pret in
                console.log("Schimbam pret produs");
                document.querySelector(`.adm_prod_price_${prod}`).innerHTML = p_price;
            }        
            if(p_size != ""){
                //adaugare marime si in bd
                console.log("Adaugam marime");
                var i=sizes.length;
                sizes.push(p_size);
                document.querySelector(`.adm_prod_sizes_${prod}`).insertAdjacentHTML("beforeend",`<p class="ps_${prod}${i}">${sizes[i]}</p>`);
                document.querySelector(`.apcs_${prod}`).insertAdjacentHTML("beforeend",`<p  class="pcs_${prod}${i}">${sizes[i]}</p>`);
                document.querySelector(`.pcs_${prod}${i}`).addEventListener('click',addSizeDeleteEvent(prod,i));
            }

            document.querySelector(`.adm_prod_main_${prod}`).style.display="grid";
            document.querySelector(`.adm_prod_edit_body_${prod}`).style.display="none";
            document.querySelector(`.adm_prod_edit_${prod}`).style.display="block";
            document.querySelector(`.adm_prod_done_${prod}`).style.display="none";
            // document.querySelector(`.adm_prod_header_${prod}`).style.display="block";

            document.querySelector(`#p_name_${prod}`).value="";    
            document.querySelector(`#p_price_${prod}`).value="";
            document.querySelector(`#p_hex_${prod}`).value="";
            document.querySelector(`#p_string_${prod}`).value="";
            document.querySelector(`#p_size_${prod}`).value="";
            // console.log(`${p_name} | ${p_price} | ${p_hex} | ${p_size}`);
        }
        
    });
}

function addColorDeleteEvent(prod,i){
    var color_to_delete = document.querySelector(`.delete_color_${prod}${i}`);
    color_to_delete.addEventListener('mouseover',()=>{
        color_to_delete.style.backgroundImage = "url('../../images/navbar/close.png')";
    });
    color_to_delete.addEventListener('mouseout',()=>{
        color_to_delete.style.backgroundImage = "none";
    });
    color_to_delete.addEventListener('click',()=>{
        //delete color from bd
        color_to_delete.style.display="none";
        document.querySelector(`.pc_${prod}${i}`).style.display="none";
        colors_to_delete.push(`${prod}${i}`);
    });
}

function addSizeDeleteEvent(prod,i){
    var size_to_delete = document.querySelector(`.pcs_${prod}${i}`);
    size_to_delete.addEventListener('mouseover',()=>{
        size_to_delete.style.color="#b3b3b3";
        size_to_delete.style.backgroundImage = "url('../../images/navbar/close.png')";
    });
    size_to_delete.addEventListener('mouseout',()=>{
        size_to_delete.style.color="#000000";
        size_to_delete.style.backgroundImage = "none";
    });
    size_to_delete.addEventListener('click',()=>{
        // console.log("delete size");
        //delete size from bd
        size_to_delete.style.display="none";
        document.querySelector(`.ps_${prod}${i}`).style.display="none";
    });
}

function addImageEvent(prod){
    document.querySelector(`.image_selector_${prod}`).addEventListener('change',()=>{
        current_prod = prod;
    });
    document.querySelector(`.image_selector_${prod}`).addEventListener('change',readImage);
}

function readImage(evt){
    var file = evt.target.files[0];
    if(file){
        console.log("We got a file");
        if( /(jpe?g|png|gf)$/i.test(file.type)){
            var r = new FileReader();
            r.readAsDataURL(file);
            r.onload = function(e){
                base64 = e.target.result;
                document.querySelector(`.new_img_${current_prod}`).src=base64;
            }
        }
        else 
            console.log("WTF is this??");
    }
    else
        console.log("No file found");
}

function sleepImage(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}