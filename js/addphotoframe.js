 $(document).ready(function(){
  $('#add_photoframe').click(function(e) {
    //console.log("add_offer")
    //let addpropara = globalProduct
    let photoframe_name = document.getElementById("p_name").value
    let photoframe_type = document.getElementById("p_type").value
    let photoframe_size = document.getElementById("p_size").value
    let price = document.getElementById("p_price").value
    let description = document.getElementById("p_description").value
    let pick_image_size_ref = document.getElementById("p_pick_image_size").value
    var pick_image_size = pick_image_size_ref.replace("*", "x")
    var authtokend = localStorage.getItem('authorization')
          let photoframenameexists = validatephotoframenames(photoframe_name)
  if(photoframenameexists){
    console.log("validated false", photoframenameexists)
    document.getElementById("photoframe_name_exists").style.color = 'red'
    document.getElementById("photoframe_name_exists").innerHTML = `"${photoframe_name}" photoframe already exists !!!`
    return false
  }

  else {
    document.getElementById("photoframe_name_exists").innerHTML = ""
  }

    let validatemform = validatephotoframe()
    if(!validatemform){
      document.getElementById("photoframe_success_id").innerHTML = "All the fields are mandatory"
      return false
    }

    //let categories = ["phonecase", "keychain"]
  
    let photoframedata = {
      photoframe_name, photoframe_type, photoframe_size, price,description , pick_image_size
    }
   // console.log(keydata)
    fetch(`http://${hosturl}:5600/api/photoframe/addphotoframe`,
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': authtokend
    },
    method: "POST",
    body: JSON.stringify(photoframedata)
})
.then(function(res){ 
  return res.json()
  })
.then(function(result){
  console.log(result)
  let photoframeid = result._id
 document.getElementById("p_name").value = ""
document.getElementById("p_size").value = ""
document.getElementById("p_price").value = ""
 document.getElementById("p_description").value = ""
  document.getElementById("p_pick_image_size").value = ""
  // document.getElementById("photoframe_success_id").innerHTML = "photoframe Added Successfully !!!"
  
   uploadFile(photoframeid)
  
})
.catch(function(res){ console.log(res) })
        });
})

//   $("#incdisdiv").click(function (evt) {
//     $(this).hide()
//     document.getElementById("k_categories_inc").disabled = false
// });

function getphotoframenames(){
    fetch(`http://${hosturl}:5600/api/photoframe/getallphotoframenames`)
    .then(response => {
     // console.log(response)
     return response.json()})
    .then(data => {
      console.log(data)
      const photoframenames = data.map(photoframe => photoframe.name);
      globalphotoframenamesarray = photoframenames
      console.log(globalphotoframenamesarray)
     
    })
    .catch(err => console.log(err))
  }

getphotoframenames()


function validatephotoframenames(photoframename){
  console.log("validating function")
    let lowerphotoframearray = globalphotoframenamesarray.map(photoframe => photoframe.toLowerCase().trim()) 
  let lowerphotoframe = photoframename.toLowerCase().trim()
 let photoframenameexists = lowerphotoframearray.indexOf(lowerphotoframe) > -1
 console.log("photoframearray", globalphotoframenamesarray)
 console.log("photoframeexists", photoframenameexists)
  return photoframenameexists
}

 function validatephotoframe(){
      let photoframe_name = document.getElementById("p_name").value
   let photoframe_size = document.getElementById("p_size").value
    let price = document.getElementById("p_price").value
    let description = document.getElementById("p_description").value
    let pick_image_size = document.getElementById("p_pick_image_size").value
        let banner_image = $("#bannerImage").val();
    let inner_image = $("#innerImage").val();
    if(photoframe_name == "" || photoframe_size == "" || price == "" || description == "" || pick_image_size == "" || banner_image == "" || inner_image == ""  ){
       if (photoframe_name == "") {
       // document.getElementById("mval_name_err").innerHTML = "Name is required"
        document.getElementById("p_name").style.border = "1px solid red"
      }
       if (photoframe_size == "") {
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
        document.getElementById("pval_innerimage_err").innerHTML = ""
      }
      return false
    }
    else{
      $('#imageModalUploading').modal('show')
      return true
    }
 }

    function getphotoframetypes(){
    fetch(`http://${hosturl}:5600/api/photoframe/getallphotoframetypes`)
    .then(response => {
     // console.log(response)
     return response.json()})
    .then(data => {
      console.log(data)
      let photoframetypes = data.map(a => ({...a}));
     // globalcompanies = globalcompaniesold.reverse()
      // const tshirttypes = data.map(type => type.name);
      console.log(photoframetypes)
      //companylist(companies)
      populateoption(photoframetypes)
     // CreateTableFromJSONcompany(data)
    })
    .catch(err => console.log(err))
  }

  getphotoframetypes()

  function populateoption(options){

  var optionsd = ""
  var optionsdx = ""

  for (var i = 0; i < options.length; i++) {
   optionsd += '<option value="' + options[i]._id+ '">' + options[i].name + '</option>';

 }
 // optionsdx += '<option value="all">all</option>';
 // for (var i = 0; i < options.length; i++) {
 //   optionsdx += '<option value="' + options[i]+ '">' + options[i] + '</option>';

 // }
 $("#p_type").html(optionsd);
 // $("#sel_comp").html(optionsdx);
 // $("#modal_option").html(optionsd);
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


 function changephotoframeinputs(){
  let photoframe_type = document.getElementById("p_type").value
  //let inc_cat = $('#k_categories_inc').val();
 // let ex_cat = $('#k_categories_ex').val();
  //console.log(inc_cat)
  //console.log(ex_cat)
  if(photoframe_type === "Regular photoframe"){
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


  function uploadFile(photoframeid){
    console.log("uploads file")
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("photoframeImages");
    var formData = new FormData(form);

fetch(`http://${hosturl}:5600/api/photoframe/addimage/${photoframeid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  console.log(res)
  window.location  =  "photoframelist.html"
  //document.getElementById("photoframesuccessAdded").innerHTML = "Offer successfully added !!!"
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