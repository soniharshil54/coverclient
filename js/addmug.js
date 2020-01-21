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



function changeofferinputs(){
  let offer_type = document.getElementById("k_offer_type").value
  let inc_cat = $('#k_categories_inc').val();
  let ex_cat = $('#k_categories_ex').val();
  console.log(inc_cat)
  console.log(ex_cat)
  switch(offer_type) {
  case 'flatdis':
    document.getElementById("flat_discount_div").style.display = "flex"
    document.getElementById("inexcategories").style.display = "none"
    document.getElementById('allow_freeshipping_check').style.display = "flex"
    document.getElementById("free_shipping_div").style.display = "none"
    document.getElementById("first_time_div").style.display = "none"
    //document.getElementById("get_buy_div").style.display = "none"
    //document.getElementById("get_div").style.display = "none"
    // code block
    break;
  case 'bogo':
    document.getElementById("flat_discount_div").style.display = "none"
    document.getElementById("inexcategories").style.display = "flex"
    document.getElementById('allow_freeshipping_check').style.display = "flex"
    document.getElementById("free_shipping_div").style.display = "none"
    document.getElementById("first_time_div").style.display = "none"
   // document.getElementById("get_buy_div").style.display = "flex"
    //document.getElementById("get_div").style.display = "block"
    // code block
    break;
  case 'freeshipping':
    document.getElementById("flat_discount_div").style.display = "none"
    document.getElementById("inexcategories").style.display = "none"
    document.getElementById('allow_freeshipping_check').style.display = "none"
    document.getElementById("free_shipping_div").style.display = "flex"
    document.getElementById("first_time_div").style.display = "none"
   // document.getElementById("get_buy_div").style.display = "none"
    //document.getElementById("get_div").style.display = "none"
    // code block
    break;
  case 'firsttime':
    document.getElementById("flat_discount_div").style.display = "none"
    document.getElementById("inexcategories").style.display = "none"
    document.getElementById('allow_freeshipping_check').style.display = "flex"
    document.getElementById("free_shipping_div").style.display = "none"
    document.getElementById("first_time_div").style.display = "flex"
   // document.getElementById("get_buy_div").style.display = "none"
    //document.getElementById("get_div").style.display = "none"
    // code block
    break;  
  default:
    // code block
}
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