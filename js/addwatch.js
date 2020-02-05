 $(document).ready(function(){
  $('#add_watch').click(function(e) {
    //console.log("add_offer")
    //let addpropara = globalProduct
    let watch_name = document.getElementById("w_name").value
    let watch_type = document.getElementById("w_type").value
    let watch_subtype = document.getElementById("w_subtype").value
    let watch_size = document.getElementById("w_size").value
    let price = document.getElementById("w_price").value
    let description = document.getElementById("w_description").value
    let pick_image_size = document.getElementById("w_pick_image_size").value
          let watchnameexists = validatewatchnames(watch_name)
  if(watchnameexists){
    console.log("validated false", watchnameexists)
    document.getElementById("watch_name_exists").style.color = 'red'
    document.getElementById("watch_name_exists").innerHTML = `"${watch_name}" watch already exists !!!`
    return false
  }

  else {
    document.getElementById("watch_name_exists").innerHTML = ""
  }

    let validatemform = validatewatch()
    if(!validatemform){
      document.getElementById("watch_success_id").innerHTML = "All the fields are mandatory"
      return false
    }

    //let categories = ["phonecase", "keychain"]
    console.log(watch_subtype)
    let watchdata = {
      watch_name, watch_type, watch_subtype, watch_size, price,description , pick_image_size
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


 function getwatchnames(){
    fetch(`http://${hosturl}:5600/api/watch/getallwatchnames`)
    .then(response => {
     // console.log(response)
     return response.json()})
    .then(data => {
      console.log(data)
      const watchnames = data.map(watch => watch.name);
      globalwatchnamesarray = watchnames
      console.log(globalwatchnamesarray)
     
    })
    .catch(err => console.log(err))
  }

getwatchnames()


function validatewatchnames(watchname){
  console.log("validating function")
    let lowerwatcharray = globalwatchnamesarray.map(watch => watch.toLowerCase()) 
  let lowerwatch = watchname.toLowerCase()
 let watchnameexists = lowerwatcharray.indexOf(lowerwatch) > -1
 console.log("watcharray", globalwatchnamesarray)
 console.log("watchexists", watchnameexists)
  return watchnameexists
}

//   $("#incdisdiv").click(function (evt) {
//     $(this).hide()
//     document.getElementById("k_categories_inc").disabled = false
// });
//random comments
 function validatewatch(){
      let watch_name = document.getElementById("w_name").value
   let watch_size = document.getElementById("w_size").value
    let price = document.getElementById("w_price").value
    let description = document.getElementById("w_description").value
    let banner_image = $("#bannerImage").val();
    let inner_image = $("#innerImage").val();
    let pick_image_size = document.getElementById("w_pick_image_size").value
    if(watch_name == "" || watch_size == "" || price == "" || description == "" || pick_image_size == "" ){
      if (watch_name == "") {
       // document.getElementById("mval_name_err").innerHTML = "Name is required"
        document.getElementById("w_name").style.border = "1px solid red"
      }
       if (watch_size == "") {
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
        document.getElementById("bannerImage").style.border = "1px solid red"
      }
      else{
        document.getElementById("wval_bannerimage_err").innerHTML = ""
      }
         if (inner_image == "") {
        document.getElementById("wval_innerimage_err").innerHTML = "Shadow image is required"
        document.getElementById("innerImage").style.border = "1px solid red"
      }
      else{
        document.getElementById("wval_innerimage_err").innerHTML = "Name is required"
      }
      return false
      return false
    }
    else{
      $('#imageModalUploading').modal('show')
      return true
    }
 }

   function getwatchtypes(){
    fetch(`http://${hosturl}:5600/api/watch/getallwatchtypes`)
    .then(response => {
     // console.log(response)
     return response.json()})
    .then(data => {
      console.log(data)
      let watchtypes = data.map(a => ({...a}));
     // globalcompanies = globalcompaniesold.reverse()
      // const watchtypes = data.map(type => type.name);
      console.log(watchtypes)
      //companylist(companies)
      populateoption(watchtypes)
     // CreateTableFromJSONcompany(data)
    })
    .catch(err => console.log(err))
  }

  getwatchtypes()

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
 $("#w_type").html(optionsd);
 // $("#sel_comp").html(optionsdx);
 // $("#modal_option").html(optionsd);
}

 function changewatchinputs(){
  let watch_type = document.getElementById("w_subtype").value
  //let inc_cat = $('#k_categories_inc').val();
 // let ex_cat = $('#k_categories_ex').val();
  //console.log(inc_cat)
  //console.log(ex_cat)
  if(watch_type === "5e2e77187d507f1a376667de"){
    document.getElementById("type_d_overlay").style.display = "none"
     document.getElementById("type_d_mask").style.display = "none"
  }
  else{
    document.getElementById("type_d_overlay").style.display = "block"
     document.getElementById("type_d_mask").style.display = "block"
  }
}

 function changewatchinputsbytype(){
  console.log("it sdsds")
  let watch_type = document.getElementById("w_type").value
  let watch_subtype = document.getElementById("w_subtype").value
  console.log("it sdsds", watch_type)
  //let inc_cat = $('#k_categories_inc').val();
 // let ex_cat = $('#k_categories_ex').val();
  //console.log(inc_cat)
  //console.log(ex_cat)
  if(watch_type === "5e300399f16db81e325b69c7"){
    document.getElementById("couple_shadow").style.display = "block"
     document.getElementById("couple_overlay").style.display = "block"
     document.getElementById("couple_mask").style.display = "block"
  }
  else{
      document.getElementById("couple_shadow").style.display = "none"
     document.getElementById("couple_overlay").style.display = "none"
     document.getElementById("couple_mask").style.display = "none"
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
  //document.getElementById("watchsuccessAdded").innerHTML = "Offer successfully added !!!"
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