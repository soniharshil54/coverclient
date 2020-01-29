 $(document).ready(function(){
  $('#add_wallclock').click(function(e) {
    //console.log("add_offer")
    //let addpropara = globalProduct
    let wallclock_name = document.getElementById("w_name").value
    let wallclock_size = document.getElementById("w_size").value
    let price = document.getElementById("w_price").value
    let description = document.getElementById("w_description").value
    let pick_image_size = document.getElementById("w_pick_image_size").value
    let validatemform = validatewallclock()
    if(!validatemform){
      document.getElementById("wallclock_success_id").innerHTML = "All the fields are mandatory"
      return false
    }

    //let categories = ["phonecase", "keychain"]
  
    let wallclockdata = {
      wallclock_name, wallclock_size, price,description , pick_image_size
    }
   // console.log(keydata)
    fetch(`http://${hosturl}:5600/api/wallclock/addwallclock`,
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(wallclockdata)
})
.then(function(res){ 
  return res.json()
  })
.then(function(result){
  console.log(result)
  let wallclockid = result._id
 document.getElementById("w_name").value = ""
document.getElementById("w_size").value = ""
document.getElementById("w_price").value = ""
 document.getElementById("w_description").value = ""
  document.getElementById("w_pick_image_size").value = ""
  // document.getElementById("wallclock_success_id").innerHTML = "Popholder Added Successfully !!!"
  
   uploadFile(wallclockid)
  
})
.catch(function(res){ console.log(res) })
        });
})

//   $("#incdisdiv").click(function (evt) {
//     $(this).hide()
//     document.getElementById("k_categories_inc").disabled = false
// });

 function validatewallclock(){
      let wallclock_name = document.getElementById("w_name").value
   let wallclock_size = document.getElementById("w_size").value
    let price = document.getElementById("w_price").value
    let description = document.getElementById("w_description").value
    let pick_image_size = document.getElementById("w_pick_image_size").value
    if(wallclock_name == "" || wallclock_size == "" || price == "" || description == "" || pick_image_size == "" ){
       if (wallclock_name == "") {
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
      $('#imageModalUploading').modal('show')
      return true
    }
 }

  function logOutUser(){
    localStorage.clear();
    window.location  =  "login.html";
  }


  function uploadFile(wallclockid){
    console.log("uploads file")
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("wallclockImages");
    var formData = new FormData(form);

    

fetch(`http://${hosturl}:5600/api/wallclock/addimage/${wallclockid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  console.log(res)
  window.location  =  "wallclocklist.html"
  //document.getElementById("mugsuccessAdded").innerHTML = "Offer successfully added !!!"
 // getoffers()
}).catch(err => console.log(err))

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