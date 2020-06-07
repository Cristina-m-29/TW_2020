var totalProducts;
var hexColors = [];
var nrOfHexColors;
var stringColors = [];
var sizesProduct = [];
var nrOfSizes;
var base64 = null;
var current_prod;
// window.addEventListener("onload", setUpProducts());
document.querySelector(`.products`).addEventListener("click",setUpProducts());

function setUpProducts(){
    document.querySelector(`.products`).addEventListener("click",()=>{
        document.querySelector('.main_products').innerHTML = `
        <p>Products in store</p>
        <div id="admin_nr_products">
          <p>Number of products </p>
        </div>
        <div class="admin_products">          
        </div> `;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ()=>{
            if(xhttp.readyState == 4){
                if(xhttp.status == 200){// SUCCES
                    if(xhttp.responseText == "no products"){
                        admin_products_main.insertAdjacentHTML("beforeend",'<p id="no_adm_prod_txt">No products found </p>');
                        document.querySelector('#admin_nr_products').style.display="none";
                    }
                    else{
                        showAdminProducts(JSON.parse(xhttp.responseText));
                    }
                } 
                else{
                    console.log("somenthing went wrong");
                }            
            }
        } 
        xhttp.open("GET","getAllProducts",true);
        xhttp.resposnseType='application/json';
        xhttp.send();
    });
}

function showAdminProducts(products){
    document.querySelector('#admin_nr_products').insertAdjacentHTML("beforeend",`<p id="adm_number_prod">${products.length}</p>`);
    totalProducts = products.length;
    if(products.length == 0) {
        admin_products_main.insertAdjacentHTML("beforeend",'<p id="no_adm_prod_txt">No products found </p>');
        document.querySelector('#admin_nr_products').style.display="none";
    }
    else{
        for(prod=0;prod<products.length;prod++){
            var product = products[prod];
            document.querySelector('.admin_products').insertAdjacentHTML("beforeend",
            `<div class="adm_prod adm_prod_${prod}">
                <!--<div class="adm_prod_header adm_prod_header_${prod}">
                    <p> Product </p> 
                </div>-->
                <div class="adm_prod_main adm_prod_main_${prod}">
                    <div class="adm_prod_img">
                        <img id="adm_prod_img_${prod}" src="">
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
                        <div class="adm_prod_data_id">${product._id}</div>
                        <div class="adm_prod_for_${prod}">${product.for}</div>
                        <div class="adm_prod_cat_${prod}">${product.category}</div>
                        <div class="adm_prod_name_${prod}">${product.name}</div>
                        <div class="adm_prod_price_${prod}">${product.price}</div>
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
                        <img src="../../images/women/extra/geaca.jpg" class="adm_prod_new_img new_img_${prod}">
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
            var colors = product.hex_colors;
            stringColors[prod] = product.string_colors;
            hexColors[prod] = product.hex_colors;
            for(i=0;i<colors.length;i++){
                document.querySelector(`.adm_prod_colors_${prod}`).insertAdjacentHTML("beforeend",`<div class="prod_color pc_${prod}${i}" style="background-color:${colors[i]}"></div>`);
                document.querySelector(`.apcc_${prod}`).insertAdjacentHTML("beforeend",`<div class="prod_color delete_color_${prod}${i}" style="background-color:${colors[i]}"></div>`);
                document.querySelector(`.delete_color_${prod}${i}`).addEventListener('click',addColorDeleteEvent(prod,i));
            }

            //parcurgere marimi produs in bd
            var sizes = product.sizes;
            sizesProduct[prod] = sizes;
            for(i=0;i<sizes.length;i++){
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
        //sterge produs din bd
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ()=>{
            if(xhttp.readyState == 4){
                if(xhttp.status != 200){ 
                    console.log("somenthing went wrong");
                }            
            }
        } 
        xhttp.open("DELETE",`deleteProduct`,true);
        var name = document.querySelector(`.adm_prod_name_${prod}`).innerHTML;
        xhttp.send(name);
        totalProducts--;
        document.querySelector(`.adm_prod_${prod}`).style.display="none";
        document.querySelector("#adm_number_prod").innerHTML = totalProducts;
        if(totalProducts == 0){
            admin_products_main.insertAdjacentHTML("beforeend",'<p id="no_adm_prod_txt">No products found </p>');
            document.querySelector('#admin_nr_products').style.display="none";
        }
    });    
}

function hexCode(i) { 
    return ("0" + parseInt(i).toString(16)).slice(-2); 
} 

function RGBToHex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);     
    return "#" + hexCode(rgb[1]) + hexCode(rgb[2]) + hexCode(rgb[3]); 
}

function addAdmProdEditEvent(prod){
    document.querySelector(`.adm_prod_edit_${prod}`).addEventListener('click',()=>{
        nrOfHexColors = hexColors[prod].length;
        nrOfSizes = sizesProduct[prod].length;
        document.querySelector(`.adm_prod_main_${prod}`).style.display="none";
        document.querySelector(`.adm_prod_edit_body_${prod}`).style.display="block";
        document.querySelector(`.adm_prod_edit_${prod}`).style.display="none";
        document.querySelector(`.adm_prod_done_${prod}`).style.display="block";
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
            document.querySelector(`.hex_string_${prod}`).style.display="block";            
        }
        else{
            var dataToUpdate = {};
            dataToUpdate.img = document.querySelector(`#adm_prod_img_${prod}`).src;
            dataToUpdate.for = document.querySelector(`.adm_prod_for_${prod}`).innerHTML;
            dataToUpdate.category = document.querySelector(`.adm_prod_cat_${prod}`).innerHTML;
            dataToUpdate.name_before = document.querySelector(`.adm_prod_name_${prod}`).innerHTML;
            dataToUpdate.name = document.querySelector(`.adm_prod_name_${prod}`).innerHTML;
            dataToUpdate.price = document.querySelector(`.adm_prod_price_${prod}`).innerHTML;
            dataToUpdate.hex_colors = hexColors[prod];
            dataToUpdate.string_colors = stringColors[prod];
            dataToUpdate.size = sizesProduct[prod];

            //adaugare culoare si in bd
            if(p_hex!="" && p_string !=""){
                var updateHex = p_hex.split(",");
                var updateString = p_string.split(",");
                if(updateHex.length != updateString.length){
                    document.querySelector(`.hex_string_${prod}`).style.display="block";
                }   
                else{
                    for(k=0;k<updateHex.length;k++){
                        if(updateHex[k].search("#")<0){
                            document.querySelector(`.hex_string_${prod}`).style.display="block";
                        }
                        else{
                            hexColors[prod].push(updateHex[k]);
                            stringColors[prod].push(updateString[k]);
                            var i = hexColors[prod].length;
                            document.querySelector(`.adm_prod_colors_${prod}`).insertAdjacentHTML("beforeend",`<div class="prod_color pc_${prod}${i}" style="background-color:${updateHex[k]}"></div>`);            
                            document.querySelector(`.apcc_${prod}`).insertAdjacentHTML("beforeend",`<div class="prod_color delete_color_${prod}${i}" style="background-color:${updateHex[k]}"></div>`);
                            document.querySelector(`.delete_color_${prod}${i}`).addEventListener('click',addColorDeleteEvent(prod,i));
                        }                        
                    } 
                    dataToUpdate.hex_colors = hexColors[prod];
                    dataToUpdate.string_colors = stringColors[prod];                 
                }                           
            }
            document.querySelector(`.hex_string_${prod}`).style.display="none";

            //schimbare img
            if(document.querySelector(`#adm_prod_img_${prod}`).src != document.querySelector(`.new_img_${prod}`).src){
                document.querySelector(`#adm_prod_img_${prod}`).src = document.querySelector(`.new_img_${prod}`).src;
                dataToUpdate.img = document.querySelector(`.new_img_${prod}`).src;
            }
            
            if(p_name != ""){
                //Schimbare nume in bd
                dataToUpdate.name = p_name;
                document.querySelector(`.adm_prod_name_${prod}`).innerHTML = p_name;
            }
            if(p_price != ""){
                //Schimbare pret in
                dataToUpdate.price = p_price;
                document.querySelector(`.adm_prod_price_${prod}`).innerHTML = p_price;
            }        
            if(p_size != ""){
                //adaugare marime si in bd
                var updateSize = p_size.split(",");
                for(k=0;k<updateSize.length;k++){
                    sizesProduct[prod].push(updateSize[k]);
                    var i = sizesProduct[prod].length;
                    document.querySelector(`.adm_prod_sizes_${prod}`).insertAdjacentHTML("beforeend",`<p class="ps_${prod}${i}">${updateSize[k]}</p>`);
                    document.querySelector(`.apcs_${prod}`).insertAdjacentHTML("beforeend",`<p  class="pcs_${prod}${i}">${updateSize[k]}</p>`);
                    document.querySelector(`.pcs_${prod}${i}`).addEventListener('click',addSizeDeleteEvent(prod,i));
                } 
                dataToUpdate.size = sizesProduct[prod];         
            }

            // if(Object.entries(dataToUpdate).length > 8){ 
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = ()=>{
                    if(xhttp.readyState == 4){
                        if(xhttp.status != 200){
                            console.log("somenthing went wrong");
                        }            
                    }
                } 
                xhttp.open("POST",`updateProduct`,true);
                xhttp.send(JSON.stringify(dataToUpdate));
            // }            

            document.querySelector(`.adm_prod_main_${prod}`).style.display="grid";
            document.querySelector(`.adm_prod_edit_body_${prod}`).style.display="none";
            document.querySelector(`.adm_prod_edit_${prod}`).style.display="block";
            document.querySelector(`.adm_prod_done_${prod}`).style.display="none";

            document.querySelector(`#p_name_${prod}`).value="";    
            document.querySelector(`#p_price_${prod}`).value="";
            document.querySelector(`#p_hex_${prod}`).value="";
            document.querySelector(`#p_string_${prod}`).value="";
            document.querySelector(`#p_size_${prod}`).value="";
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
        stringColors[prod].splice(i,1);
        hexColors[prod].splice(i,1);
        color_to_delete.style.display="none";
        document.querySelector(`.pc_${prod}${i}`).style.display="none";
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
        sizesProduct[prod].splice(i,1);
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

function convertDataURIToBinary(dataURI) {
	var BASE64_MARKER = ';base64,';
	var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
	var base64 = dataURI.substring(base64Index);
	var raw = window.atob(base64);
	var rawLength = raw.length;
	var array = new Uint8Array(new ArrayBuffer(rawLength));

	for(i = 0; i < rawLength; i++) {
		array[i] = raw.charCodeAt(i);
	}
	return array;
}

function readImage(evt){
    var file = evt.target.files[0];
    if(file){
        if( /(jpe?g|png|gf)$/i.test(file.type)){
            var r = new FileReader();
            r.readAsDataURL(file);
            r.onload = function(e){
                base64 = e.target.result;
                document.querySelector(`.new_img_${current_prod}`).src=base64;
                var binaryImg = convertDataURIToBinary(base64);
                var blob = new Blob([binaryImg], {type: file.type});
                blobURL = window.URL.createObjectURL(blob); 
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
