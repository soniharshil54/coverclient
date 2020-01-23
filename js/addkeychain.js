 $(document).ready(function(){
  $('#add_mug').click(function(e) {
    //console.log("add_offer")
    //let addpropara = globalProduct
    let mug_name = document.getElementById("m_name").value
    let mug_volume = document.getElementById("m_volume").value
    let price = document.getElementById("m_price").value
    let description = document.getElementById("m_description").value
    let pick_image_size = document.getElementById("m_pick_image_size").value


    //let categories = ["phonecase", "keychain"]
  
    let mugdata = {
      mug_name, mug_volume, price,description , pick_image_size
    }
   // console.log(keydata)
    fetch(`http://${hosturl}:5600/api/mug/addmug`,
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(mugdata)
})
.then(function(res){ 
  return res.json()
  })
.then(function(result){
  console.log(result)
  let mugid = result._id
 document.getElementById("m_name").value = ""
document.getElementById("m_volume").value = ""
document.getElementById("m_price").value = ""
 document.getElementById("m_description").value = ""
  document.getElementById("m_pick_image_size").value = ""
  // document.getElementById("mug_success_id").innerHTML = "Mug Added Successfully !!!"
    
   uploadFile(mugid)
  
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


  function uploadFile(mugid){
    console.log("uploads file")
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("mugImages");
    var formData = new FormData(form);

fetch(`http://${hosturl}:5600/api/mug/addimage/${mugid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  console.log(res)
  //document.getElementById("mugsuccessAdded").innerHTML = "Offer successfully added !!!"
 // getoffers()
 window.location  =  "muglist.html"
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