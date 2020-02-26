 $(document).ready(function(){
  $('#add_tshirt').click(function(e) {
    //console.log("add_offer")
    //let addpropara = globalProduct
    let tshirt_name = document.getElementById("t_name").value
    let tshirt_type = document.getElementById("t_type").value
    let tshirt_subtype = document.getElementById("t_subtype").value
    // let tshirt_size = document.getElementById("t_size").value
    // let tshirt_size_2 = document.getElementById("t_size_2").value ? document.getElementById("t_size_2").value : []
    let price = document.getElementById("t_price").value
    let description = document.getElementById("t_description").value
    let pick_image_size_ref = document.getElementById("t_pick_image_size").value
    var pick_image_size = pick_image_size_ref.replace("*", "x")
    let size_ref = $('#t_size').val();
    let size_2_ref = $('#t_size_2').val();
    let tshirt_size = size_ref
    let tshirt_size_2 = size_2_ref
    var authtokend = localStorage.getItem('authorization')

          let tshirtnameexists = validatetshirtnames(tshirt_name)
  if(tshirtnameexists){
    console.log("validated false", tshirtnameexists)
    document.getElementById("tshirt_name_exists").style.color = 'red'
    document.getElementById("tshirt_name_exists").innerHTML = `"${tshirt_name}" tshirt already exists !!!`
    return false
  }

  else {
    document.getElementById("tshirt_name_exists").innerHTML = ""
  }

    // let validatemform = validatetshirt()
    // if(!validatemform){
    //   document.getElementById("tshirt_success_id").innerHTML = "All the fields are mandatory"
    //   return false
    // }

    //let categories = ["phonecase", "keychain"]
    console.log(tshirt_subtype)
    let tshirtdata = {
      tshirt_name, tshirt_type, tshirt_subtype, tshirt_size, tshirt_size_2, price,description , pick_image_size
    }

   // console.log(keydata)
    fetch(`http://${hosturl}:5600/api/tshirt/addtshirt`,
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': authtokend
    },
    method: "POST",
    body: JSON.stringify(tshirtdata)
})
.then(function(res){ 
  return res.json()
  })
.then(function(result){
  console.log(result)
  let tshirtid = result._id
//  document.getElementById("t_name").value = ""
// document.getElementById("t_size").value = ""
// document.getElementById("t_price").value = ""
//  document.getElementById("t_description").value = ""
//   document.getElementById("t_pick_image_size").value = ""
  // document.getElementById("tshirt_success_id").innerHTML = "tshirt Added Successfully !!!"
  if(tshirt_subtype !== "5e32cd728719bf459bfa93c7"){
    uploadtshirtimages(tshirtid)
  }
  
   uploadFile(tshirtid)
  
})
.catch(function(res){ console.log(res) })
        });
})

 $(function() {
    // Multiple images preview in browser
    var imagesPreview = function(input, placeToInsertImagePreview) {

        if (input.files) {
            var filesAmount = input.files.length;

            for (i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = function(event) {
                    $($.parseHTML('<img>')).attr('src', event.target.result).attr('width', '50px').appendTo(placeToInsertImagePreview);
                }

                reader.readAsDataURL(input.files[i]);
            }
        }

    };

    $('#tshirtImages').on('change', function() {
        imagesPreview(this, 'div.gallery');
    });
});



 function gettshirtnames(){
    fetch(`http://${hosturl}:5600/api/tshirt/getalltshirtnames`)
    .then(response => {
     // console.log(response)
     return response.json()})
    .then(data => {
      console.log(data)
      const tshirtnames = data.map(tshirt => tshirt.name);
      globaltshirtnamesarray = tshirtnames
      console.log(globaltshirtnamesarray)
     
    })
    .catch(err => console.log(err))
  }

gettshirtnames()


function validatetshirtnames(tshirtname){
  console.log("validating function")
    let lowertshirtarray = globaltshirtnamesarray.map(tshirt => tshirt.toLowerCase().trim()) 
  let lowertshirt = tshirtname.toLowerCase().trim()
 let tshirtnameexists = lowertshirtarray.indexOf(lowertshirt) > -1
 console.log("tshirtarray", globaltshirtnamesarray)
 console.log("tshirtexists", tshirtnameexists)
  return tshirtnameexists
}

//   $("#incdisdiv").click(function (evt) {
//     $(this).hide()
//     document.getElementById("k_categories_inc").disabled = false
// });
//random comments
 function validatetshirt(){
      let tshirt_name = document.getElementById("t_name").value
   let tshirt_size = document.getElementById("t_size").value
    let price = document.getElementById("t_price").value
    let description = document.getElementById("t_description").value
    let banner_image = $("#bannerImage").val();
    let inner_image = $("#innerImage").val();
    let pick_image_size = document.getElementById("t_pick_image_size").value
    if(tshirt_name == "" || tshirt_size == "" || price == "" || description == "" || pick_image_size == "" ){
      if (tshirt_name == "") {
       // document.getElementById("mval_name_err").innerHTML = "Name is required"
        document.getElementById("t_name").style.border = "1px solid red"
      }
       if (tshirt_size == "") {
        //document.getElementById("mval_volume_err").innerHTML = "Volume is required"
        document.getElementById("t_size").style.border = "1px solid red"
      }
       if (price == "") {
       // document.getElementById("mval_price_err").innerHTML = "Price is required"
        document.getElementById("t_price").style.border = "1px solid red"
      }
       if (description == "") {
       // document.getElementById("mval_description_err").innerHTML = "Description is required"
        document.getElementById("t_description").style.border = "1px solid red"
      }
       if (pick_image_size == "") {
       // document.getElementById("mval_pis_err").innerHTML = "Pick Image Size is required"
        document.getElementById("t_pick_image_size").style.border = "1px solid red"
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

   function gettshirttypes(){
    fetch(`http://${hosturl}:5600/api/tshirt/getalltshirttypes`)
    .then(response => {
     // console.log(response)
     return response.json()})
    .then(data => {
      console.log(data)
      let tshirttypes = data.map(a => ({...a}));
     // globalcompanies = globalcompaniesold.reverse()
      // const tshirttypes = data.map(type => type.name);
      console.log(tshirttypes)
      //companylist(companies)
      populateoption(tshirttypes)
     // CreateTableFromJSONcompany(data)
    })
    .catch(err => console.log(err))
  }

  gettshirttypes()

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
 $("#t_type").html(optionsd);
 // $("#sel_comp").html(optionsdx);
 // $("#modal_option").html(optionsd);
}

 function populatesubtypecustom(){

  var optionsd = ""
  var optionsdx = ""

  optionsd = ` <option value="5e32ccfb1d82674557b07784">Graphic Tshirt</option>`
 // optionsdx += '<option value="all">all</option>';
 // for (var i = 0; i < options.length; i++) {
 //   optionsdx += '<option value="' + options[i]+ '">' + options[i] + '</option>';

 // }
 $("#t_subtype").html(optionsd);
 // $("#sel_comp").html(optionsdx);
 // $("#modal_option").html(optionsd);
}

 function populatesubtypeall(){

  var optionsd = ""
  var optionsdx = ""

  optionsd = ` <option value="5e32ccfb1d82674557b07784">Graphic Tshirt</option>
                  <option value="5e32cd668719bf459bfa93c6">Solid Tshirt</option>
                  <option value="5e32cd728719bf459bfa93c7">Custom Tshirt</option>`
 // optionsdx += '<option value="all">all</option>';
 // for (var i = 0; i < options.length; i++) {
 //   optionsdx += '<option value="' + options[i]+ '">' + options[i] + '</option>';

 // }
 $("#t_subtype").html(optionsd);
 // $("#sel_comp").html(optionsdx);
 // $("#modal_option").html(optionsd);
}

 function changetshirtinputs(){
  let tshirt_type = document.getElementById("t_subtype").value
  //let inc_cat = $('#k_categories_inc').val();
 // let ex_cat = $('#k_categories_ex').val();
  //console.log(inc_cat)
  //console.log(ex_cat)
  if(tshirt_type === "5e2e77187d507f1a376667de"){
    document.getElementById("type_d_overlay").style.display = "none"
    document.getElementById("type_d_mask").style.display = "none"
    populatesubtypecustom()
  }
  else{
    document.getElementById("type_d_overlay").style.display = "block"
     document.getElementById("type_d_mask").style.display = "block"

  }
}

 function changetshirtinputsbytype(){
  console.log("it sdsds")
  let tshirt_type = document.getElementById("t_type").value
  let tshirt_subtype = document.getElementById("t_subtype").value
  console.log("it sdsds", tshirt_type)
  //let inc_cat = $('#k_categories_inc').val();
 // let ex_cat = $('#k_categories_ex').val();
  //console.log(inc_cat)
  //console.log(ex_cat)
  if(tshirt_type === "5e33edbfabdd2f537529c7f1"){
    console.log("couple")
    document.getElementById("couple_tshirt_size").style.display = "block"
    document.getElementById("tshirtImages").style.display = "block"
  //  document.getElementById("type_d_inner").style.display = "none"
     document.getElementById("type_d_overlay").style.display = "none"
     document.getElementById("type_d_mask").style.display = "none"
     populatesubtypecustom()
  }
  else{
    console.log("not couple")
     document.getElementById("couple_tshirt_size").style.display = "none"
     // document.getElementById("couple_overlay").style.display = "none"
     // document.getElementById("couple_mask").style.display = "none"
     populatesubtypeall()
  }
}

 function changetshirtinputsbysubtype(){
  console.log("it sdsds")
  let tshirt_type = document.getElementById("t_type").value
  let tshirt_subtype = document.getElementById("t_subtype").value
  console.log("it sdsds", tshirt_type)
  //let inc_cat = $('#k_categories_inc').val();
 // let ex_cat = $('#k_categories_ex').val();
  //console.log(inc_cat)
  //console.log(ex_cat)
  if(tshirt_subtype === "5e32cd728719bf459bfa93c7"){
    console.log("custom")
    //document.getElementById("couple_tshirt_size").style.display = "block"
    document.getElementById("type_d_tshirtimages").style.display = "none"
   // document.getElementById("type_d_inner").style.display = "block"
     document.getElementById("type_d_overlay").style.display = "block"
     document.getElementById("type_d_mask").style.display = "block"
    // populatesubtypecustom()
  }
  else{
    console.log("not custom")
      document.getElementById("type_d_tshirtimages").style.display = "block"
   // document.getElementById("type_d_inner").style.display = "none"
     document.getElementById("type_d_overlay").style.display = "none"
     document.getElementById("type_d_mask").style.display = "none"
    // populatesubtypeall()
  }
}

  function logOutUser(){
    localStorage.clear();
    window.location  =  "login.html";
  }


  function uploadFile(tshirtid){
    console.log("uploads file")
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("tshirtImagesCommon");
    var formData = new FormData(form);

fetch(`http://${hosturl}:5600/api/tshirt/addimage/${tshirtid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  console.log(res)
  window.location  =  "tshirtlist.html"
  //document.getElementById("tshirtsuccessAdded").innerHTML = "Offer successfully added !!!"
 // getoffers()
}).catch(err => console.log(err))

  }

    function uploadtshirtimages(tshirtid){
    console.log("uploads file")
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("tshirtImagesForm");
    var formData = new FormData(form);

fetch(`http://${hosturl}:5600/api/tshirt/tmtaddtshirtimages/${tshirtid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  console.log(res)
  //window.location  =  "tshirtlist.html"
  //document.getElementById("tshirtsuccessAdded").innerHTML = "Offer successfully added !!!"
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