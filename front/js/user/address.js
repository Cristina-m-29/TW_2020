var numberofAddresses = 1;

address_side.addEventListener('onload', showAddresses());

function showAddresses(){
    if(numberofAddresses == 0){
        address_main.insertAdjacentHTML("beforeEnd",'<p id="no_orders_msg"> No addresses found</p>');
    }
    else{
        for(addr_number = 1; addr_number <= numberofAddresses; addr_number++){
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
                        <p> Cristina Mititelu</p>
                        <p> Romania</p>
                        <p> Aleea Pacurari nr.6</p> 
                        <p> </p>  
                        <p> </p>
                        <p> </p>
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
                  <input id="addr_country" type="text" name="country" placeholder="Romania">
              </div>
              <div id="addr_name">
                  <div id="addr_first_field">
                    <label for="addr_first">Set first name</label>
                    <input id="addr_first" type="text" name="addr_first" placeholder="First name">
                  </div>
                  <div id="addr_last_field">
                    <label for="addr_last">Set last name</label>
                    <input id="addr_last" type="text" name="addr_last" placeholder="Last name">
                  </div> 
              </div> 
              <div id="addr_other1">
                <div id="addr_street_field">
                  <label for="addr_street">Set street</label>
                  <input id="addr_street" type="text" name="addr_street" placeholder="Street">
                </div>
                <div id="addr_city_field">
                  <label for="addr_city">Set city</label>
                  <input id="addr_city" type="text" name="addr_city" placeholder="City">
                </div>
              </div>
              <div id="addr_other2">
                <div id="addr_code_field">
                  <label for="addr_code">Set postal code</label>
                  <input id="addr_code" type="text" name="addr_code" placeholder="Postal code">
                </div>
                <div id="addr_number_field">
                  <label for="addr_number">Set phone number</label>
                  <input id="addr_number" type="text" name="addr_number" placeholder="Phone number">
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
    var addr = document.querySelector(`.address_main_${addr_number}`);
    var addr_edit =  document.querySelector(`.address_main_edit_${addr_number}`);

    document.querySelector(`.edit_address_data_${addr_number}`).addEventListener('click',()=>{
        addr.style.display = "none";
        addr_edit.style.display="block";
    });

    document.querySelector(`.address_cancel_${addr_number}`).addEventListener('click',()=>{
        addr.style.display = "block";
        addr_edit.style.display="none";
        addr_resetFields();
    });

    document.querySelector(`.address_save_${addr_number}`).addEventListener('click',()=>{
        //change data in db
        addr.style.display = "block";
        addr_edit.style.display="none";
        addr_resetFields();
    });

};

function addr_resetFields(){
    document.querySelector('#addr_country').value="";
    document.querySelector('#addr_first').value="";
    document.querySelector('#addr_last').value="";
    document.querySelector('#addr_street').value="";
    document.querySelector('#addr_city').value="";
    document.querySelector('#addr_code').value="";
    document.querySelector('#addr_number').value="";
}