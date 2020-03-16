 $(document).ready(function(){
  $('#add_keychain').click(function(e) {
    //console.log("add_offer")
    //let addpropara = globalProduct
    let keychain_name = document.getElementById("k_name").value
   let keychain_type = document.getElementById("k_type").value
    let price = document.getElementById("k_price").value
    let description = document.getElementById("k_description").value
    let pick_image_size_ref = document.getElementById("k_pick_image_size").value
    var pick_image_size = pick_image_size_ref.replace("*", "x")
    var authtokend = localStorage.getItem('authorization')

    let validatekform = validateaddkeychainform()
    if(!validatekform){
      document.getElementById("keychain_success_id").innerHTML = "All the fields are mandatory"
      return false
    }


    //let categories = ["phonecase", "keychain"]
  
    let keychaindata = {
      keychain_name, keychain_type ,price,description , pick_image_size
    }
    console.log(keychaindata)
   // console.log(keydata)
    fetch(`http://${hosturl}:5600/api/keychain/addkeychain`,
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': authtokend
    },
    method: "POST",
    body: JSON.stringify(keychaindata)
})
.then(function(res){ 
  return res.json()
  })
.then(function(result){
  console.log(result)
  let keychainid = result._id

  console.log("result status", result.status)

  if(result.status == 0){
    document.getElementById("keychain_exists_err").innerHTML = "Keychain with this name already exists !!!"
    console.log("keychain name already exists !!!")
    return false
  }

  else {
    $('#imageModalUploading').modal('show')
    console.log("keychain name already exists !!!  ---  else")

  // document.getElementById("keychain_success_id").innerHTML = "keychain Added Successfully !!!"
    
   uploadFile(keychainid)
  }

  
})
.catch(function(res){ console.log(res) })
        });
})
  $('input[Type="Number"]').keypress(function (e) {
    if ('0123456789'.indexOf(e.key) == -1) {
        e.preventDefault();
    }
});

 function validateaddkeychainform(){
      let keychain_name = document.getElementById("k_name").value
   let keychain_type = document.getElementById("k_type").value
    let price = document.getElementById("k_price").value
    let description = document.getElementById("k_description").value
    let banner_image = $("#bannerImage").val();
    let inner_image = $("#innerImage").val();
    let pick_image_size = document.getElementById("k_pick_image_size").value
    if(keychain_name == "" || keychain_type == "" || price == "" || description == "" || pick_image_size == "" ){
       if (keychain_name == "") {
       // document.getElementById("mval_name_err").innerHTML = "Name is required"
        document.getElementById("k_name").style.border = "1px solid red"
      }
      //  if (mug_volume == "") {
      //   //document.getElementById("mval_volume_err").innerHTML = "Volume is required"
      //   document.getElementById("m_volume").style.border = "1px solid red"
      // }
       if (price == "") {
       // document.getElementById("mval_price_err").innerHTML = "Price is required"
        document.getElementById("k_price").style.border = "1px solid red"
      }
       if (description == "") {
       // document.getElementById("mval_description_err").innerHTML = "Description is required"
        document.getElementById("k_description").style.border = "1px solid red"
      }
       if (pick_image_size == "") {
       // document.getElementById("mval_pis_err").innerHTML = "Pick Image Size is required"
        document.getElementById("k_pick_image_size").style.border = "1px solid red"
      }
       if (banner_image == "") {
        document.getElementById("kval_bannerimage_err").innerHTML = "Banner image is required"
        document.getElementById("bannerImage").style.border = "1px solid red"
      }
      else{
        document.getElementById("kval_bannerimage_err").innerHTML = ""
      }
         if (inner_image == "") {
        document.getElementById("kval_innerimage_err").innerHTML = "Inner image is required"
        document.getElementById("innerImage").style.border = "1px solid red"
      }
      else{
        document.getElementById("kval_innerimage_err").innerHTML = ""
      }
      return false
    }
    else{
      
      return true
    }
 }

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

//   $("#incdisdiv").click(function (evt) {
//     $(this).hide()
//     document.getElementById("k_categories_inc").disabled = false
// });
  function removeFromArray(original, remove) {
  return original.filter(value => !remove.includes(value));
}

function changekeychaininputs(){
  let keychain_type = document.getElementById("k_type").value
  //let inc_cat = $('#k_categories_inc').val();
 // let ex_cat = $('#k_categories_ex').val();
  //console.log(inc_cat)
  //console.log(ex_cat)
  if(keychain_type === "CustomKeychain"){
    document.getElementById("type_d_overlay").style.display = "block"
     document.getElementById("type_d_mask").style.display = "block"
  }
  else{
    document.getElementById("type_d_overlay").style.display = "none"
     document.getElementById("type_d_mask").style.display = "none"
  }
}


  function logOutUser(){
    localStorage.clear();
    window.location  =  "login.html";
  }


  function uploadFile(keychainid){
    console.log("uploads file")
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("keychainImages");
    var formData = new FormData(form);

fetch(`http://${hosturl}:5600/api/keychain/addimage/${keychainid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  console.log(res)
  console.log("uploadfile call finished")
  //document.getElementById("keychainsuccessAdded").innerHTML = "Offer successfully added !!!"
 // getoffers()
 window.location  =  "keychainlist.html"
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