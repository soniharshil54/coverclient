 $(document).ready(function(){
  $('#add_mug').click(function(e) {

    //console.log("add_offer")
    //let addpropara = globalProduct
    let mug_name = document.getElementById("m_name").value
    let mug_type = document.getElementById("m_type").value
    let mug_volume = document.getElementById("m_volume").value
    let price = document.getElementById("m_price").value
    let description = document.getElementById("m_description").value
    let pick_image_size = document.getElementById("m_pick_image_size").value

    let validatemform = validateaddmugform()
    if(!validatemform){
      //document.getElementById("mug_success_id").innerHTML = ""
      return false
    }
    //let categories = ["phonecase", "keychain"]
  
    let mugdata = {
      mug_name, mug_type, mug_volume, price, description , pick_image_size
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

function changemuginputs(){
  let mug_type = document.getElementById("m_type").value
  //let inc_cat = $('#k_categories_inc').val();
 // let ex_cat = $('#k_categories_ex').val();
  //console.log(inc_cat)
  //console.log(ex_cat)
  if(mug_type === "Custom Mug"){
    document.getElementById("type_d_overlay").style.display = "block"
     document.getElementById("type_d_mask").style.display = "block"
  }
  else{
    document.getElementById("type_d_overlay").style.display = "none"
     document.getElementById("type_d_mask").style.display = "none"
  }
}

 function validateaddmugform(){
      let mug_name = document.getElementById("m_name").value
   let mug_volume = document.getElementById("m_volume").value
    let price = document.getElementById("m_price").value
    let description = document.getElementById("m_description").value
    let pick_image_size = document.getElementById("m_pick_image_size").value
    let banner_image = $("#bannerImage").val();
    let inner_image = $("#innerImage").val();
    if(mug_name == "" || mug_volume == "" || price == "" || description == "" || pick_image_size == "" || banner_image == "" || inner_image == "" ){
      if (mug_name == "") {
       // document.getElementById("mval_name_err").innerHTML = "Name is required"
        document.getElementById("m_name").style.border = "1px solid red"
      }
       if (mug_volume == "") {
        //document.getElementById("mval_volume_err").innerHTML = "Volume is required"
        document.getElementById("m_volume").style.border = "1px solid red"
      }
       if (price == "") {
       // document.getElementById("mval_price_err").innerHTML = "Price is required"
        document.getElementById("m_price").style.border = "1px solid red"
      }
       if (description == "") {
       // document.getElementById("mval_description_err").innerHTML = "Description is required"
        document.getElementById("m_description").style.border = "1px solid red"
      }
       if (pick_image_size == "") {
       // document.getElementById("mval_pis_err").innerHTML = "Pick Image Size is required"
        document.getElementById("m_pick_image_size").style.border = "1px solid red"
      }
       if (banner_image == "") {
        document.getElementById("mval_bannerimage_err").innerHTML = "Banner image is required"
        document.getElementById("bannerImage").style.border = "1px solid red"
      }
      else{
        document.getElementById("mval_bannerimage_err").innerHTML = ""
      }
         if (inner_image == "") {
        document.getElementById("mval_innerimage_err").innerHTML = "Inner image is required"
        document.getElementById("innerImage").style.border = "1px solid red"
      }
      else{
        document.getElementById("mval_innerimage_err").innerHTML = ""
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

 // $('input').focus(
 //    function(){
 //        $(this).css('border-color','#80bdff');
 //    }).blur(
 //        function(){
 //            $(this).css('border','1px solid #ced4da');
 //        });​


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