 $(document).ready(function(){
  $('#add_popholder').click(function(e) {
    //console.log("add_offer")
    //let addpropara = globalProduct
    let popholder_name = document.getElementById("p_name").value
    let popholder_type = document.getElementById("p_type").value
    let popholder_size = document.getElementById("p_size").value
    let price = document.getElementById("p_price").value
    let description = document.getElementById("p_description").value
    let pick_image_size = document.getElementById("p_pick_image_size").value
    let validatemform = validatepopholder()
    if(!validatemform){
      document.getElementById("popholder_success_id").innerHTML = "All the fields are mandatory"
      return false
    }

    //let categories = ["phonecase", "keychain"]
  
    let popholderdata = {
      popholder_name, popholder_type, popholder_size, price,description , pick_image_size
    }
   // console.log(keydata)
    fetch(`http://${hosturl}:5600/api/popholder/addpopholder`,
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(popholderdata)
})
.then(function(res){ 
  return res.json()
  })
.then(function(result){
  console.log(result)
  let popholderid = result._id
 document.getElementById("p_name").value = ""
document.getElementById("p_size").value = ""
document.getElementById("p_price").value = ""
 document.getElementById("p_description").value = ""
  document.getElementById("p_pick_image_size").value = ""
  // document.getElementById("popholder_success_id").innerHTML = "Popholder Added Successfully !!!"
  
   uploadFile(popholderid)
  
})
.catch(function(res){ console.log(res) })
        });
})

//   $("#incdisdiv").click(function (evt) {
//     $(this).hide()
//     document.getElementById("k_categories_inc").disabled = false
// });

 function validatepopholder(){
      let popholder_name = document.getElementById("p_name").value
   let popholder_size = document.getElementById("p_size").value
    let price = document.getElementById("p_price").value
    let description = document.getElementById("p_description").value
    let pick_image_size = document.getElementById("p_pick_image_size").value
        let banner_image = $("#bannerImage").val();
    let inner_image = $("#innerImage").val();
    if(popholder_name == "" || popholder_size == "" || price == "" || description == "" || pick_image_size == "" || banner_image == "" || inner_image  ){
       if (popholder_name == "") {
       // document.getElementById("mval_name_err").innerHTML = "Name is required"
        document.getElementById("p_name").style.border = "1px solid red"
      }
       if (popholder_size == "") {
        //document.getElementById("mval_volume_err").innerHTML = "Volume is required"
        document.getElementById("p_size").style.border = "1px solid red"
      }
       if (price == "") {
       // document.getElementById("mval_price_err").innerHTML = "Price is required"
        document.getElementById("p_price").style.border = "1px solid red"
      }
       if (description == "") {
       // document.getElementById("mval_description_err").innerHTML = "Description is required"
        document.getElementById("p_description").style.border = "1px solid red"
      }
       if (pick_image_size == "") {
       // document.getElementById("mval_pis_err").innerHTML = "Pick Image Size is required"
        document.getElementById("p_pick_image_size").style.border = "1px solid red"
      }
       if (banner_image == "") {
        document.getElementById("pval_bannerimage_err").innerHTML = "Banner image is required"
        document.getElementById("bannerImage").style.border = "1px solid red"
      }
      else{
        document.getElementById("pval_bannerimage_err").innerHTML = ""
      }
         if (inner_image == "") {
        document.getElementById("pval_innerimage_err").innerHTML = "Inner image is required"
        document.getElementById("innerImage").style.border = "1px solid red"
      }
      else{
        document.getElementById("pval_innerimage_err").innerHTML = "Name is required"
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


 function changepopholderinputs(){
  let popholder_type = document.getElementById("p_type").value
  //let inc_cat = $('#k_categories_inc').val();
 // let ex_cat = $('#k_categories_ex').val();
  //console.log(inc_cat)
  //console.log(ex_cat)
  if(popholder_type === "RegularPopholder"){
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


  function uploadFile(popholderid){
    console.log("uploads file")
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("popholderImages");
    var formData = new FormData(form);

fetch(`http://${hosturl}:5600/api/popholder/addimage/${popholderid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  console.log(res)
  window.location  =  "popholderlist.html"
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