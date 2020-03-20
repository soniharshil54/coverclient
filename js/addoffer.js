 $(document).ready(function(){
  $('#add_offer').click(function(e) {
    console.log("add_offer")
    //let addpropara = globalProduct
    var authtokend = localStorage.getItem('authorization')
    let offer_name = document.getElementById("k_offer").value
    let offer_type = document.getElementById("k_offer_type").value
    let code = document.getElementById("k_code").value
    let expiry_date = document.getElementById("k_expirydate").value
    let flat_discount = document.getElementById("k_flat_discount").value
    let firsttime_dis = document.getElementById("k_first_time").value
    let freeshipping = document.getElementById("k_free_shipping").value
   // let buy_product = document.getElementById("k_buy").value
  //  let get_product = document.getElementById("k_get").value
    let min_spend = document.getElementById("k_min_spend").value
    let max_spend = document.getElementById("k_max_spend").value
    let termsnconditions = document.getElementById("k_terms").value
    let include_products = document.getElementById("k_categories_inc")
    let exclude_products = document.getElementById("k_categories_ex")
   // if (offer_type === "Free Shipping") {}
    let free_shipping_allow_ref = document.getElementById("free_shipping_allow") ? document.getElementById("free_shipping_allow") : 1
    let online_payment_ref = document.getElementById("online_payment").checked
    let usage_limit = document.getElementById("k_offer_usage_limit").value
    let free_shipping_allow = free_shipping_allow_ref ? 1 : 0
    let online_payment = online_payment_ref ? 1 : 0
    only_online = online_payment

        let validatemform = validateaddofferform()
    if(!validatemform){
      //document.getElementById("mug_success_id").innerHTML = ""
      return false
    }

    let categories = []
    if(offer_type === "bogo" || offer_type === "flatdis" || offer_type === "freeshipping" || offer_type === "firsttime"){
          if(!include_products.disabled){
            let products_ref = $('#k_categories_inc').val();
            categories = products_ref
          }
          else {
            let products_ref = ['phonecase', 'keychain', 'tshirt', 'mug', 'popholder', 'slipperbottle', 'photoframe', 'photoframe', 'watch', 'wallclock']
            let products_ref_ex = $('#k_categories_ex').val();
            let products = removeFromArray(products_ref, products_ref_ex)
            categories = products
          }
    }

    else{
      categories = ['phonecase', 'keychain', 'tshirt', 'mug', 'popholder', 'slipperbottle', 'photoframe', 'photoframe', 'watch', 'wallclock']
    }

    //let categories = ["phonecase", "keychain"]
  
    let keydata = {
      offer_name, offer_type, code,categories , expiry_date, flat_discount, firsttime_dis, freeshipping, min_spend, max_spend, usage_limit, termsnconditions, categories, only_online
    }
    console.log(keydata)
    fetch(`http://${hosturl}:5600/api/offer/addoffer`,
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': authtokend
    },
    method: "POST",
    body: JSON.stringify(keydata)
})
.then(function(res){ 
  return res.json()
  })
.then(function(result){
  console.log(result)
  let offerid = result._id
  console.log(result._id)
  //getordersdatatable()
    document.getElementById("k_offer").value = ""
  //  document.getElementById("k_product").value = ""
    document.getElementById("k_code").value = ""
    document.getElementById("k_expirydate").value = ""
    document.getElementById("k_terms").value = ""
    document.getElementById("k_min_spend").value = ""
    document.getElementById("k_max_spend").value = ""
    // document.getElementById("offer_success_id").innerHTML = "Offer Created Successfully"
      
   
   uploadFile(offerid)
  
})
.catch(function(res){ console.log(res) })
        });
})

//   $("#incdisdiv").click(function (evt) {
//     $(this).hide()
//     document.getElementById("k_categories_inc").disabled = false
// });
  function removeFromArray(original, remove) {
  return original.filter(value => !remove.includes(value));
}

function validateaddofferform(){
  let offer_name = document.getElementById("k_offer").value
  let offer_code = document.getElementById("k_code").value
  let offer_expirydate = document.getElementById("k_expirydate").value
  let offer_min_spend = document.getElementById("k_min_spend").value
  let offer_max_spend = document.getElementById("k_max_spend").value
  let banner_image = $("#hImage").val();
  //let inner_image = $("#innerImage").val();
  if(offer_name == "" || offer_code == "" || offer_expirydate == "" || offer_min_spend == "" || offer_max_spend == "" || banner_image == ""){
    if (offer_name == "") {
       // document.getElementById("mval_name_err").innerHTML = "Name is required"
       document.getElementById("k_offer").style.border = "1px solid red"
     }
     if (offer_code == "") {
        //document.getElementById("mval_volume_err").innerHTML = "Volume is required"
        document.getElementById("k_code").style.border = "1px solid red"
      }
      if (offer_expirydate == "") {
       // document.getElementById("mval_price_err").innerHTML = "Price is required"
       document.getElementById("k_expirydate").style.border = "1px solid red"
     }
     if (offer_min_spend == "") {
       // document.getElementById("mval_description_err").innerHTML = "Description is required"
       document.getElementById("k_min_spend").style.border = "1px solid red"
     }
     if (offer_max_spend == "") {
       // document.getElementById("mval_pis_err").innerHTML = "Pick Image Size is required"
       document.getElementById("k_max_spend").style.border = "1px solid red"
     }
     if (banner_image == "") {
      document.getElementById("offer_bannerimage_err").innerHTML = "Banner image is required"
     // document.getElementById("bannerImage").style.border = "1px solid red"
    }
    else{
      document.getElementById("offer_bannerimage_err").innerHTML = ""
    }
    return false
  }
  else{
    $('#imageModalUploading').modal('show')
    return true
  }
}

 $('input[Type="Number"]').keypress(function (e) {
    if ('0123456789'.indexOf(e.key) == -1) {
        e.preventDefault();
    }
});

$('input').focus(function(){
  $(this).css('border-color','#80bdff');
});
$('input').blur(function(){
  if (this.value == "") {
    $(this).css('border','1px solid red');
  }
  else{    
    $(this).css('border-color','#ced4da');
  }
});

$('textarea').focus(function(){
  $(this).css('border-color','#80bdff');
});
$('textarea').blur(function(){
  if (this.value == "") {
    $(this).css('border','1px solid red');
  }
  else{    
    $(this).css('border-color','#ced4da');
  }
});


  function logOutUser(){
    localStorage.clear();
    window.location  =  "login.html";
  }



function changeofferinputs(){
  let offer_type = document.getElementById("k_offer_type").value
  let inc_cat = $('#k_categories_inc').val();
  let ex_cat = $('#k_categories_ex').val();
  console.log(inc_cat)
  console.log(ex_cat)
  switch(offer_type) {
  case 'flatdis':
    document.getElementById("flat_discount_div").style.display = "flex"
    document.getElementById("inexcategories").style.display = "flex"
    document.getElementById('allow_freeshipping_check').style.display = "flex"
    document.getElementById("free_shipping_div").style.display = "none"
    document.getElementById("first_time_div").style.display = "none"
    //document.getElementById("get_buy_div").style.display = "none"
    //document.getElementById("get_div").style.display = "none"
    // code block
    break;
  case 'bogo':
    document.getElementById("flat_discount_div").style.display = "none"
    document.getElementById("inexcategories").style.display = "flex"
    document.getElementById('allow_freeshipping_check').style.display = "flex"
    document.getElementById("free_shipping_div").style.display = "none"
    document.getElementById("first_time_div").style.display = "none"
   // document.getElementById("get_buy_div").style.display = "flex"
    //document.getElementById("get_div").style.display = "block"
    // code block
    break;
  case 'freeshipping':
    document.getElementById("flat_discount_div").style.display = "none"
    document.getElementById("inexcategories").style.display = "flex"
    document.getElementById('allow_freeshipping_check').style.display = "none"
    document.getElementById("free_shipping_div").style.display = "flex"
    document.getElementById("first_time_div").style.display = "none"
   // document.getElementById("get_buy_div").style.display = "none"
    //document.getElementById("get_div").style.display = "none"
    // code block
    break;
  case 'firsttime':
    document.getElementById("flat_discount_div").style.display = "none"
    document.getElementById("inexcategories").style.display = "flex"
    document.getElementById('allow_freeshipping_check').style.display = "flex"
    document.getElementById("free_shipping_div").style.display = "none"
    document.getElementById("first_time_div").style.display = "flex"
   // document.getElementById("get_buy_div").style.display = "none"
    //document.getElementById("get_div").style.display = "none"
    // code block
    break;  
  default:
    // code block
}
}


  function uploadFile(productid){
    console.log("uploads file")
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("ohImages");
    var formData = new FormData(form);

fetch(`http://${hosturl}:5600/api/offer/addimage/${productid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  console.log("file uploaded")
  console.log(res)
 // document.getElementById("successAdded").innerHTML = "Offer successfully added !!!"
  window.location = "offerlist.html"
 // getoffers()
}).catch(err => console.log(err))
  
  }


  function enableit(selectin){
    console.log("chnage")
    selectin.disabled = false
  }

  function disablecat(selectele){
    console.log(selectele.id)
    console.log("clicked")
    let incsel = document.getElementById("k_categories_inc")
    let exsel = document.getElementById("k_categories_ex")
    if(selectele.id === "k_categories_inc"){
      if(selectele.value === "" || selectele.value === null){
        exsel.disabled = false
      }
      else{
        exsel.disabled = true
      }
    }
    else if(selectele.id === "k_categories_ex") {
      if(selectele.value === "" || selectele.value === null){
        incsel.disabled = false
      }
      else{
        incsel.disabled = true
      }
    }
  }

          
    

        function checkLogin(){
    
    if (localStorage.getItem("luser") === null) {
        window.location = "login.html";
    }
    else{
      console.log(localStorage.getItem("luser"))

      var authtokend = localStorage.getItem('authorization')
      console.log(authtokend)  
       }
  }
  checkLogin()