 $(document).ready(function(){
  $('#add_wallclock').click(function(e) {
    //console.log("add_offer")
    //let addpropara = globalProduct
    let wallclock_name = document.getElementById("w_name").value
    let wallclock_size = document.getElementById("w_size").value
    let price = document.getElementById("w_price").value
    let description = document.getElementById("w_description").value
    let pick_image_size = document.getElementById("w_pick_image_size").value
    var authtokend = localStorage.getItem('authorization')

          let wallclocknameexists = validatewallclocknames(wallclock_name)
  if(wallclocknameexists){
    console.log("validated false", wallclocknameexists)
    document.getElementById("wallclock_name_exists").style.color = 'red'
    document.getElementById("wallclock_name_exists").innerHTML = `"${wallclock_name}" wallclock already exists !!!`
    return false
  }

  else {
    document.getElementById("wallclock_name_exists").innerHTML = ""
  }

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
      'Content-Type': 'application/json',
      'Authorization': authtokend
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

function getwallclocknames(){
    fetch(`http://${hosturl}:5600/api/wallclock/getallwallclocknames`)
    .then(response => {
     // console.log(response)
     return response.json()})
    .then(data => {
      console.log(data)
      const wallclocknames = data.map(wallclock => wallclock.name);
      globalwallclocknamesarray = wallclocknames
      console.log(globalwallclocknamesarray)
     
    })
    .catch(err => console.log(err))
  }

getwallclocknames()


function validatewallclocknames(wallclockname){
  console.log("validating function")
    let lowerwallclockarray = globalwallclocknamesarray.map(wallclock => wallclock.toLowerCase().trim()) 
  let lowerwallclock = wallclockname.toLowerCase().trim()
 let wallclocknameexists = lowerwallclockarray.indexOf(lowerwallclock) > -1
 console.log("wallclockarray", globalwallclocknamesarray)
 console.log("wallclockexists", wallclocknameexists)
  return wallclocknameexists
}



 function validatewallclock(){
      let wallclock_name = document.getElementById("w_name").value
   let wallclock_size = document.getElementById("w_size").value
    let price = document.getElementById("w_price").value
    let description = document.getElementById("w_description").value
    let pick_image_size = document.getElementById("w_pick_image_size").value
       let banner_image = $("#bannerImage").val();
    let inner_image = $("#innerImage").val();
       let overlay_image = $("#overlayImage").val();
    let mask_image = $("#maskImage").val();
    if(wallclock_name == "" || wallclock_size == "" || price == "" || description == "" || pick_image_size == "" ){
       if (wallclock_name == "") {
       // document.getElementById("mval_name_err").innerHTML = "Name is required"
        document.getElementById("w_name").style.border = "1px solid red"
      }
       if (wallclock_size == "") {
        //document.getElementById("mval_volume_err").innerHTML = "Volume is required"
        document.getElementById("w_size").style.border = "1px solid red"
      }
       if (price == "") {
       // document.getElementById("mval_price_err").innerHTML = "Price is required"
        document.getElementById("w_price").style.border = "1px solid red"
      }
       if (description == "") {
       // document.getElementById("mval_description_err").innerHTML = "Description is required"
        document.getElementById("w_description").style.border = "1px solid red"
      }
       if (pick_image_size == "") {
       // document.getElementById("mval_pis_err").innerHTML = "Pick Image Size is required"
        document.getElementById("w_pick_image_size").style.border = "1px solid red"
      }
       if (banner_image == "") {
        document.getElementById("wval_bannerimage_err").innerHTML = "Banner image is required"
        
      }
      else{
        document.getElementById("wval_bannerimage_err").innerHTML = ""
      }
         if (inner_image == "") {
        document.getElementById("wval_innerimage_err").innerHTML = "Shadow image is required"
       
      }
      else{
        document.getElementById("wval_innerimage_err").innerHTML = ""
      }
        if (overlay_image == "") {
        document.getElementById("wval_overlayimage_err").innerHTML = "Overlay image is required"
        
      }
      else{
        document.getElementById("wval_overlayimage_err").innerHTML = ""
      }
         if (mask_image == "") {
        document.getElementById("wval_maskimage_err").innerHTML = "Mask image is required"
       
      }
      else{
        document.getElementById("wval_maskimage_err").innerHTML = ""
      }
      return false
    }
    else{
      $('#imageModalUploading').modal('show')
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
  //document.getElementById("wallclocksuccessAdded").innerHTML = "Offer successfully added !!!"
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