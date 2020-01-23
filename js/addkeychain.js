 $(document).ready(function(){
  $('#add_keychain').click(function(e) {
    //console.log("add_offer")
    //let addpropara = globalProduct
    let keychain_name = document.getElementById("k_name").value
    let keychain_volume = document.getElementById("k_volume").value
    let price = document.getElementById("k_price").value
    let description = document.getElementById("k_description").value
    let pick_image_size = document.getElementById("k_pick_image_size").value


    //let categories = ["phonecase", "keychain"]
  
    let keychaindata = {
      keychain_name, keychain_volume, price,description , pick_image_size
    }
   // console.log(keydata)
    fetch(`http://${hosturl}:5600/api/keychain/addkeychain`,
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
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
 document.getElementById("k_name").value = ""
document.getElementById("k_volume").value = ""
document.getElementById("k_price").value = ""
 document.getElementById("k_description").value = ""
  document.getElementById("k_pick_image_size").value = ""
  // document.getElementById("keychain_success_id").innerHTML = "keychain Added Successfully !!!"
    
   uploadFile(keychainid)
  
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