 $(document).ready(function(){
  $('#add_watch').click(function(e) {
    //console.log("add_offer")
    //let addpropara = globalProduct
    let watch_name = document.getElementById("w_name").value
    let watch_type = document.getElementById("w_type").value
    let watch_size = document.getElementById("w_size").value
    let price = document.getElementById("w_price").value
    let description = document.getElementById("w_description").value
    let pick_image_size = document.getElementById("w_pick_image_size").value
    let validatemform = validatewatch()
    if(!validatemform){
      document.getElementById("watch_success_id").innerHTML = "All the fields are mandatory"
      return false
    }

    //let categories = ["phonecase", "keychain"]
  
    let watchdata = {
      watch_name, watch_type, watch_size, price,description , pick_image_size
    }
   // console.log(keydata)
    fetch(`http://${hosturl}:5600/api/watch/addwatch`,
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(watchdata)
})
.then(function(res){ 
  return res.json()
  })
.then(function(result){
  console.log(result)
  let watchid = result._id
 document.getElementById("w_name").value = ""
document.getElementById("w_size").value = ""
document.getElementById("w_price").value = ""
 document.getElementById("w_description").value = ""
  document.getElementById("w_pick_image_size").value = ""
  // document.getElementById("watch_success_id").innerHTML = "watch Added Successfully !!!"
  
   uploadFile(watchid)
  
})
.catch(function(res){ console.log(res) })
        });
})

//   $("#incdisdiv").click(function (evt) {
//     $(this).hide()
//     document.getElementById("k_categories_inc").disabled = false
// });

 function validatewatch(){
      let watch_name = document.getElementById("w_name").value
   let watch_size = document.getElementById("w_size").value
    let price = document.getElementById("w_price").value
    let description = document.getElementById("w_description").value
    let pick_image_size = document.getElementById("w_pick_image_size").value
    if(watch_name == "" || watch_size == "" || price == "" || description == "" || pick_image_size == "" ){
      return false
    }
    else{
      return true
    }
 }

 function changewatchinputs(){
  let watch_type = document.getElementById("w_type").value
  //let inc_cat = $('#k_categories_inc').val();
 // let ex_cat = $('#k_categories_ex').val();
  //console.log(inc_cat)
  //console.log(ex_cat)
  if(watch_type === "Regularwatch"){
    document.getElementById("type_d_overlay").style.display = "none"
     document.getElementById("type_d_mask").style.display = "none"
  }
  else{
    document.getElementById("type_d_overlay").style.display = "block"
     document.getElementById("type_d_mask").style.display = "block"
  }
}

  function logOutUser(){
    localStorage.clear();
    window.location  =  "login.html";
  }


  function uploadFile(watchid){
    console.log("uploads file")
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("watchImages");
    var formData = new FormData(form);

fetch(`http://${hosturl}:5600/api/watch/addimage/${watchid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  console.log(res)
  window.location  =  "watchlist.html"
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