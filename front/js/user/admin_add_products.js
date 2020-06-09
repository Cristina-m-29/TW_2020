
var add_p_img_btn = document.querySelector('.adm_add_img_btn');
var add_p_img = document.querySelector('#adm_add_prod_img');
var add_p_btn = document.querySelector('#adm_add_prod_btn');
var add_p_hex_string = document.querySelector('#adm_add_prod_hs_txt');
var add_p_all_fields = document.querySelector('#adm_add_prod_all_fields');
var add_p_done = document.querySelector('#adm_add_prod_done');
var photoChanged = 0;
const data = new FormData();
add_p_img_btn.addEventListener('change',readAddPropImg);

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

function readAddPropImg(evt){
    var file = evt.target.files[0];
    data.append('image',file);

    if(file){
        if( /(jpe?g|png|gf)$/i.test(file.type)){
            var r = new FileReader();
            r.readAsDataURL(file);
            r.onload = function(e){
                var base64 = e.target.result;               
                add_p_img.src = base64;  
                photoChanged = 1;
            }
        }
        else 
            console.log("WTF is this??");
    }
    else
        console.log("No file found");
}

add_p_btn.addEventListener('click',()=>{
    add_p_all_fields.style.display = "none";
    add_p_hex_string.style.display="none";
    var add_p_people = document.querySelector('#adm_add_prod_people').value;
    var add_p_cat = document.querySelector('#adm_add_prod_cat').value;
    var add_p_name = document.querySelector('#adm_add_prod_name').value;
    var add_p_price= document.querySelector('#adm_add_prod_price').value;
    var add_p_hex= document.querySelector('#adm_add_prod_hex').value;
    var add_p_string = document.querySelector('#adm_add_prod_string').value;
    var add_p_size = document.querySelector('#adm_add_prod_size').value;

    if(photoChanged == 0){
        document.querySelector('#adm_add_prod_change_photo').style.display="block";
    }
    else{
        document.querySelector('#adm_add_prod_change_photo').style.display="none";
        //got img src

        if( add_p_people == "" || add_p_cat == "" || add_p_name == "" || add_p_price == "" || add_p_hex == "" || add_p_string == "" || add_p_size == "" ){
            add_p_all_fields.style.display = "block";
        }
        else{        
            var split_hex = add_p_hex.split(",");
            var split_string = add_p_string.split(",");
            if(split_hex.length != split_string.length){
                add_p_hex_string.style.display="block";
            }
            else{
                var ok_hex = 1;
                var ok_string = 1;
                for(i=0;i<split_hex.length;i++){
                    if(split_hex[i].length != 7 || split_hex[i].slice(0,1) != "#") 
                        ok_hex=0;
                }
                for(i=0;i<split_string.length;i++){
                    for(j=0;j<split_string[i].length;j++){
                    }
                }
                if( ok_hex == 0 || ok_string == 0){
                    if(ok_hex == 0)
                        document.querySelector('#adm_prod_not_hex').style.display="block";
                }
                else{
                    add_p_done.style.display="block";
                    document.querySelector('#adm_prod_not_hex').style.display="none";
                    data.append("for",add_p_people);
                    data.append("category",add_p_cat);
                    data.append("name",add_p_name);
                    data.append("price",add_p_price);
                    data.append("hex_colors",add_p_hex);
                    data.append("string_colors",add_p_string);
                    data.append("size",add_p_size);

                    fetch('/addProduct',{
                            method: "POST",
                            body: data
                    }).then((res)=>{
                        return res.text();
                    }).then((res)=>{
                        console.log("FETCH - DATA ");
                        console.log(res);
                    });

                    sleep(2000).then(()=>{
                        add_p_done.style.display="none";
                        document.querySelector('#adm_add_prod_img').src = "../../images/user/add_products.jpg";
                        document.querySelector('#adm_add_prod_people').value = "";
                        document.querySelector('#adm_add_prod_cat').value = "";
                        document.querySelector('#adm_add_prod_name').value = "";
                        document.querySelector('#adm_add_prod_price').value = "";
                        document.querySelector('#adm_add_prod_hex').value = "";
                        document.querySelector('#adm_add_prod_string').value = "";
                        document.querySelector('#adm_add_prod_size').value = "";
                    });
                }            
            }
        }
    }    
});