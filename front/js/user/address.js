var addrs = [];
address_side.addEventListener('click', setUpAddresses());

function setUpAddresses(){
  address_side.addEventListener('click', ()=>{
    document.querySelector('.main_address').innerHTML = `<p>My addresses</p> `;
      document.querySelector('.main_orders').innerHTML = `<p>My orders</p>`;
      var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = ()=>{
              if(xhttp.readyState == 4){
                  if(xhttp.status == 200){// SUCCES
                      var adr = JSON.parse(xhttp.responseText);
                      showAddresses(adr)
              } 
              else{
                  console.log("somenthing went wrong");
              }            
          }
      } 
      var email = document.querySelector(".email_view").innerHTML;
      xhttp.open("GET",`getAddresses/${email}`,true);
      xhttp.resposnseType='application/json';
      xhttp.send();
  });
}

function showAddresses(addresses){
    if(addresses.length == 0){
        address_main.insertAdjacentHTML("beforeEnd",'<p id="no_orders_msg"> No addresses found</p>');
    }
    else{
        for(addr_number = 0; addr_number < addresses.length; addr_number++){
          item = addresses[addr_number];
          addrs[addr_number] = item;
          address_main.insertAdjacentHTML("beforeEnd",
            `<div class="address_main address_main_${addr_number}">
                <div class="address_main_header">
                <p>Address</p>
                <div class="edit_address_data edit_address_data_${addr_number}">
                <p>Edit</p>
                </div>
                </div>
                <div class="address_main_body"> 
                    <div class="address_main_prop"> 
                        <p> Name </p>
                        <p> Country </p>
                        <p> Street </p>
                        <p> Postal code</p>
                        <p> City </p>
                        <p> Phone number </p>
                    </div>
                    <div class="address_main_data"> 
                        <p id="addr_user_name_${addr_number}">${item.user_name}</p>
                        <p id="addr_country_${addr_number}"> ${item.country}</p>
                        <p id="addr_street_${addr_number}"> ${item.street}</p> 
                        <p id="addr_pc_${addr_number}"> ${item.postal_code}</p>  
                        <p id="addr_city_${addr_number}"> ${item.city}</p>
                        <p id="addr_pn_${addr_number}"> ${item.phone_number}</p>
                    </div>           
                </div>
            </div>`);
            address_main.insertAdjacentHTML("beforeEnd",
            `<div class="address_main_edit address_main_edit_${addr_number}">    
            <div class="address_main_header">
              <p> Edit </p>
            </div>
            <form class="address_edit_form">
              <div id="addr_country_field">
                  <label for="country"> Set country </label>
                  <input id="addr_country" class="addr_country_${addr_number}" type="text" name="country" placeholder="Romania">
              </div>
              <div id="addr_name">
                  <div id="addr_first_field">
                    <label for="addr_first">Set first name</label>
                    <input id="addr_first" class="addr_first_${addr_number}" type="text" name="addr_first" placeholder="First name">
                  </div>
                  <div id="addr_last_field">
                    <label for="addr_last">Set last name</label>
                    <input id="addr_last" class="addr_last_${addr_number}" type="text" name="addr_last" placeholder="Last name">
                  </div> 
              </div> 
              <div id="addr_other1">
                <div id="addr_street_field">
                  <label for="addr_street">Set street</label>
                  <input id="addr_street" class="addr_street_${addr_number}" type="text" name="addr_street" placeholder="Street">
                </div>
                <div id="addr_city_field">
                  <label for="addr_city">Set city</label>
                  <input id="addr_city" class="addr_city_${addr_number}" type="text" name="addr_city" placeholder="City">
                </div>
              </div>
              <div id="addr_other2">
                <div id="addr_code_field">
                  <label for="addr_code">Set postal code</label>
                  <input id="addr_code" class="addr_code_${addr_number}" type="text" name="addr_code" placeholder="Postal code">
                </div>
                <div id="addr_number_field">
                  <label for="addr_number">Set phone number</label>
                  <input id="addr_number" class="addr_number_${addr_number}" type="text" name="addr_number" placeholder="Phone number">
                  </div>
              </div>
            </form>
            <div class="edit_address_footer">
              <div class="edit_footer_cancel address_cancel_${addr_number}">
                  <p>Cancel</p>
              </div>
              <div class="edit_footer_save address_save_${addr_number}">
                  <p>Save</p>
              </div>
            </div>`);     
            document.querySelector(`.edit_address_data_${addr_number}`).addEventListener('click',addEv(addr_number));  
        }
    }
};

function addEv(addr_number){   
  document.querySelector(`.edit_address_data_${addr_number}`).addEventListener('click',()=>{
    var addr = document.querySelector(`.address_main_${addr_number}`);
    var addr_edit =  document.querySelector(`.address_main_edit_${addr_number}`);
    addr.style.display = "none";
    addr_edit.style.display="block";

    document.querySelector(`.address_cancel_${addr_number}`).addEventListener('click',cancelEditAddress(addr_number));
    document.querySelector(`.address_save_${addr_number}`).addEventListener('click',saveEditAddress(addr_number)); 
  });
};

function cancelEditAddress(addr_number){
  document.querySelector(`.address_cancel_${addr_number}`).addEventListener('click',()=>{
    var addr = document.querySelector(`.address_main_${addr_number}`);
    var addr_edit =  document.querySelector(`.address_main_edit_${addr_number}`);
    addr.style.display = "block";
    addr_edit.style.display="none";
    addr_resetFields();
  });
}

function saveEditAddress(addr_number){
  document.querySelector(`.address_save_${addr_number}`).addEventListener('click',()=>{
    var addr = document.querySelector(`.address_main_${addr_number}`);
    var addr_edit =  document.querySelector(`.address_main_edit_${addr_number}`);
    var adr = addrs[addr_number];
    adr.name_before = document.querySelector(`#addr_user_name_${addr_number}`).innerHTML;
    var country = document.querySelector(`.addr_country_${addr_number}`).value;
    var fn = document.querySelector(`.addr_first_${addr_number}`).value;
    var ln = document.querySelector(`.addr_last_${addr_number}`).value;
    var street = document.querySelector(`.addr_street_${addr_number}`).value;
    var city = document.querySelector(`.addr_city_${addr_number}`).value;
    var pc = document.querySelector(`.addr_code_${addr_number}`).value;
    var pn = document.querySelector(`.addr_number_${addr_number}`).value;

    if(country != ""){
      adr.country = country;
      document.querySelector(`#addr_country_${addr_number}`).innerHTML = country;
    }
    if(fn != ""){
      var name = adr.user_name.split(" ");
      adr.user_name = fn + ' ' + name[1];
      document.querySelector(`#addr_user_name_${addr_number}`).innerHTML = fn + ' ' + name[1];
    }
    if(ln != ""){
      var name = adr.user_name.split(" ");
      adr.user_name = name[0] + ' ' + ln;
      document.querySelector(`#addr_user_name_${addr_number}`).innerHTML = name[0] + ' ' + ln;
    }
    if(street != ""){
      adr.street = street;
      document.querySelector(`#addr_street_${addr_number}`).innerHTML = street;
    }
    if(city != ""){
      adr.city = city;
      document.querySelector(`#addr_city_${addr_number}`).innerHTML = city;
    }
    if(pc != ""){
      adr.postal_code = pc;
      document.querySelector(`#addr_pc_${addr_number}`).innerHTML = pc;
    }
    if(pn != ""){
      adr.phone_number = pn;
      document.querySelector(`#addr_pn_${addr_number}`).innerHTML = pn;
    }
    
    var email = document.querySelector(".email_view").innerHTML;
    adr.email = email;
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
    xhttp.open("POST",`updateAddress`,true);
    xhttp.resposnseType='application/json';
    xhttp.send(JSON.stringify(adr));

    addr.style.display = "block";
    addr_edit.style.display="none";
    addr_resetFields();
  });
}

function addr_resetFields(){
    document.querySelector('#addr_country').value="";
    document.querySelector('#addr_first').value="";
    document.querySelector('#addr_last').value="";
    document.querySelector('#addr_street').value="";
    document.querySelector('#addr_city').value="";
    document.querySelector('#addr_code').value="";
    document.querySelector('#addr_number').value="";
}