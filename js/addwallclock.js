 $(document).ready(function(){
  $('#add_wallclock').click(function(e) {
    //console.log("add_offer")
    //let addpropara = globalProduct
    let wallclock_name = document.getElementById("p_name").value
    let wallclock_size = document.getElementById("p_size").value
    let price = document.getElementById("p_price").value
    let description = document.getElementById("p_description").value
    let pick_image_size = document.getElementById("p_pick_image_size").value
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
 document.getElementById("p_name").value = ""
document.getElementById("p_size").value = ""
document.getElementById("p_price").value = ""
 document.getElementById("p_description").value = ""
  document.getElementById("p_pick_image_size").value = ""
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
      let wallclock_name = document.getElementById("p_name").value
   let wallclock_size = document.getElementById("p_size").value
    let price = document.getElementById("p_price").value
    let description = document.getElementById("p_description").value
    let pick_image_size = document.getElementById("p_pick_image_size").value
    if(wallclock_name == "" || wallclock_size == "" || price == "" || description == "" || pick_image_size == "" ){
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