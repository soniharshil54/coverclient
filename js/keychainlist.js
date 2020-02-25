function removeFromArray(original, remove) {
  return original.filter(value => !remove.includes(value));
}



  function logOutUser(){
    localStorage.clear();
    window.location  =  "login.html";
  }

function addkeychain(){
  window.location = "addkeychain.html";
}

function modalkctypeinputs(offer_type){
  let keychain_type = document.getElementById("edit_k_type").value
  //let inc_cat = $('#k_categories_inc').val();
 // let ex_cat = $('#k_categories_ex').val();
  //console.log(inc_cat)
  //console.log(ex_cat)
  if(keychain_type === "RegularKeychain"){
    document.getElementById("edit_k_d_overlay").style.display = "block"
     document.getElementById("edit_k_d_mask").style.display = "block"
  }
  else{
    document.getElementById("edit_k_d_overlay").style.display = "none"
     document.getElementById("edit_k_d_mask").style.display = "none"
  }
}


  function checkAll()
 {
     var tablek = document.getElementById ('example1');
     var checkboxes = tablek.querySelectorAll ('input[type=checkbox]');
     var val = checkboxes[0].checked;
     for (var i = 0; i < checkboxes.length; i++) checkboxes[i].checked = val;
 }

  function printChecked(){
    var items=document.getElementsByName('todelete');
    var selectedItems=[];
    for(var i=0; i<items.length; i++){
      if(items[i].type=='checkbox' && items[i].checked==true)
        selectedItems.push(items[i].value);
    }
    // console.log(selectedItems);
    return selectedItems
  }    

   function canceldelete(){
    $("#deleteModal").modal("hide");
  }

    function opendeletemodal(){
        let todeleteidsref = printChecked()
      if(todeleteidsref.length > 0){
        $("#deleteModal").modal("show");
        document.getElementById("keychain_list_notif").innerHTML = ""
      }
      else {
        document.getElementById("keychain_list_notif").style.color = "red"
        document.getElementById("keychain_list_notif").innerHTML = "Select atleast one keychain !!!"
      }
  } 


    function uploadFileEditOld(productid){
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("ohEditImages");
    var formData = new FormData(form);

fetch(`http://${hosturl}:5600/api/offer/addimage/${productid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  getoffersdatatable()
  // console.log(res)
  //getoffers()
}).catch(err => console.log(err))

  }

    function uploadFileEdit(keychainid){
    console.log("uploads file")
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("keychainImagesEdit");
    var formData = new FormData(form);

fetch(`http://${hosturl}:5600/api/keychain/addimage/${keychainid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  console.log(res)
  document.getElementById("keychain_list_notif").style.color = "green"
        document.getElementById("keychain_list_notif").innerHTML = "Keychain edited successfully !!!"
  getkeychainsdatatable()
  //document.getElementById("keychainsuccessAdded").innerHTML = "Offer successfully added !!!"
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

        function filterbytype(){
  console.log("filtering")
  let filtype = document.getElementById("k_type_filter").value
  //let teststatussta = okchains.map(a => ({...a}));
  if(filtype === "All"){
    //console.log(okchains)
    getkeychainsdatatable()
  }
  else {


      fetch(`http://${hosturl}:5600/api/keychain/getallkeychains`)
    .then(response => {
     // console.log(response)
     return response.json()})
    .then(data => {
          let allkeychains = data.map(a => ({...a}));
      //console.log(okchains)
  let result = allkeychains.filter(i => {
    console.log(i)
    return i.type === filtype}) ; 
  console.log(result)
  let nresult = JSON.stringify(result)
  console.log(result)
  getfilteredkeychainsdatatable(result)
    })
    .catch(err => console.log(err))

  
  }

}

      function detailskeychain(btnkeychain){
    console.log(btnkeychain)
    let keychain_id = btnkeychain.getAttribute('data-key') 
    console.log(keychain_id)

          fetch(`http://${hosturl}:5600/api/keychain/getkeychainbyidadmin/${keychain_id}`)
      .then(response => {
     // console.log(response)
     return response.json()})
      .then(data => {
        console.log(data)
            document.getElementById("name_details_m").innerHTML = data.name
    document.getElementById("price_details_m").innerHTML = data.price
   // document.getElementById("volume_details_m").innerHTML = data.volume
    document.getElementById("description_details_m").innerHTML = data.description
    let headerimagekeychain = data.h_image
    let headerimagekeychainsrc = `http://${hosturl}:5600/admin/uploads/${headerimagekeychain}`
    let innerimagekeychain = data.shadow_image
    let innerimagekeychainsrc = `http://${hosturl}:5600/admin/uploads/${innerimagekeychain}`
    let overlayimagekeychain = data.overlay_image 
    let overlayimagesrc = `http://${hosturl}:5600/admin/uploads/${overlayimagekeychain}`
    let maskimagekeychain = data.mask_image
    let maskimagesrc = `http://${hosturl}:5600/admin/uploads/${maskimagekeychain}`
    document.getElementById("image_details_h").src = headerimagekeychainsrc
    document.getElementById("image_details_in").src = innerimagekeychainsrc
    document.getElementById("image_details_overlay").src = overlayimagesrc
    document.getElementById("image_details_mask").src = maskimagesrc

      })
      .catch(err => console.log(err))
  }

          function offerdetailsmodal(probtn){
      let offerid = probtn.getAttribute('data-pid')
      // console.log(proid)
      fetch(`http://${hosturl}:5600/api/offer/getofferbyid/${offerid}`)
      .then(response => {
        //console.log(result)
        return response.json()
      })
      .then(result => {
        // console.log(result)
        // let full_name = result.first_name + " " + result.last_name
        // let address = result.address
        let categories = result.categories.join(",")
        document.getElementById("offer_modal_name").innerHTML = result.offer_name ? result.offer_name : "N.A."
        document.getElementById("offer_modal_type").innerHTML = result.offer_type ? result.offer_type : "N.A."
        document.getElementById("offer_modal_categories").innerHTML = categories ? categories : "N.A."
        document.getElementById("offer_modal_minspend").innerHTML = result.min_spend ? `${result.min_spend} ₹` : "N.A."
        document.getElementById("offer_modal_maxspend").innerHTML = result.max_spend ? `${result.max_spend} ₹` : "N.A."
        document.getElementById("offer_modal_flatdis").innerHTML = result.flat_discount ? `${result.flat_discount} ₹` : "N.A."
        document.getElementById("offer_modal_freeship").innerHTML = result.freeshipping ? `${result.freeshipping} ₹` : "N.A."
        document.getElementById("offer_modal_firsttime").innerHTML = result.firsttime_dis ? `${result.firsttime_dis} ₹`: "N.A."
        //document.getElementById("offer_modal_buy").innerHTML = result.buy_product ? result.buy_product : "N.A."
        //document.getElementById("offer_modal_get").innerHTML = result.get_product ? result.get_product : "N.A."
        // document.getElementById("cart_u_country").innerHTML = result.country ? result.country : "N.A."
        // document.getElementById("cart_u_addresstype").innerHTML = result.address_type ? result.address_type : "N.A."
        
        $('#OfferDetailModal').modal('show');

      })
      .catch(err => {
        console.log(err)
      })
    }


  function deletekeychains(){
    console.log("delete")
   // let deleteprotoget = globalProduct
    let todeleteids = printChecked()
    let deleteArray = {
      todeleteids
    }
              fetch(`http://${hosturl}:5600/api/keychain/deletekeychain`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify(deleteArray)
          })
          .then(function(res){ 
            $("#deleteModal").modal("hide");
            document.getElementById("keychain_list_notif").style.color = "red"
            document.getElementById("keychain_list_notif").innerHTML = "Selected keychains deleted successfully !!!"
            getkeychainsdatatable()
            //getoffers() 
          })
          .catch(function(res){ console.log(res) })
  }

    function editkeychainmodal(test){
     // console.log(test)

     // console.log( $('#modal_categories_inc').val() )
     let arrayn = test.getAttribute("data-key")
     console.log("arrayn",arrayn)
      //console.log(okchains[arrayn])
      //console.log(okchains[arrayn].name)
      //document.getElementById("modal_offer_id").value = arrayn

      fetch(`http://${hosturl}:5600/api/keychain/getkeychainbyidadmin/${arrayn}`)
      .then(response => {
     // console.log(response)
     return response.json()})
      .then(data => {
        console.log(data)
        document.getElementById("edit_k_id").value = data._id
    document.getElementById("edit_k_name").value = data.name
   document.getElementById("edit_k_type").value = data.type
    document.getElementById("edit_k_price").value = data.price
    document.getElementById("edit_k_description").value = data.description
    document.getElementById("edit_k_pick_image_size").value = data.pick_image_size
      let headerimage = data.h_image
      document.getElementById("edit_k_h_image").src = `http://${hosturl}:5600/admin/uploads/${headerimage}`
      let innerimage = data.shadow_image
      document.getElementById("edit_k_in_image").src = `http://${hosturl}:5600/admin/uploads/${innerimage}`
       let overlayimage = data.overlay_image
      document.getElementById("edit_k_overlay_image").src = `http://${hosturl}:5600/admin/uploads/${overlayimage}`
      let maskimage = data.mask_image
      document.getElementById("edit_k_mask_image").src = `http://${hosturl}:5600/admin/uploads/${maskimage}`
      modalkctypeinputs()
       $("#myModal").modal('show')

       globalkeychainnamesarray = globalkeychainnamesarray.filter(name => name !== data.name)

      })
     
      .catch(err => console.log(err))
      //console.log(document.getElementById("modal_id").value)
}


    function editkeychain(){
      let keychain_id = document.getElementById("edit_k_id").value
    let keychain_name = document.getElementById("edit_k_name").value
    //let keychain_volume = document.getElementById("edit_m_volume").value
    let price = document.getElementById("edit_k_price").value
    let description = document.getElementById("edit_k_description").value
    let pick_image_size = document.getElementById("edit_k_pick_image_size").value
                let keychainnameexists = validatekeychainnames(keychain_name)
  if(keychainnameexists){
    console.log("validated false", keychainnameexists)
    document.getElementById("edit_keychain_name_exists").style.color = 'red'
    document.getElementById("edit_keychain_name_exists").innerHTML = `name already exists !!!`
    return false
  }

    else {
    document.getElementById("edit_keychain_name_exists").innerHTML = ""
  }
     let keychaindata = {
      name : keychain_name,
     price,description , pick_image_size
    }
      // console.log(keyid)
      console.log("k edit data")
      // console.log(keditdata)

          fetch(`http://${hosturl}:5600/api/keychain/editkeychain/${keychain_id}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(keychaindata)
          })
          .then(function(res){ 
            uploadFileEdit(keychain_id)
            //getoffers()
            $("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    }

        function getkeychainnames(){
    fetch(`http://${hosturl}:5600/api/keychain/getallkeychainnames`)
    .then(response => {
     // console.log(response)
     return response.json()})
    .then(data => {
      console.log(data)
      const keychainnames = data.map(keychain => keychain.name);
      globalkeychainnamesarray = keychainnames
      console.log(globalkeychainnamesarray)
     
    })
    .catch(err => console.log(err))
  }

getkeychainnames()


function validatekeychainnames(keychainname){
  console.log("validating function")
    let lowerkeychainarray = globalkeychainnamesarray.map(keychain => keychain.toLowerCase().trim()) 
  let lowerkeychain = keychainname.toLowerCase().trim()
 let keychainnameexists = lowerkeychainarray.indexOf(lowerkeychain) > -1
 console.log("keychainarray", globalkeychainnamesarray)
 console.log("keychainexists", keychainnameexists)
  return keychainnameexists
}

    function imageModal(imgname){
      let source = `http://${hosturl}:5600/admin/uploads/${imgname}`
      document.getElementById("imgModal").src=source;

        setTimeout(function () { 
    $('#imageModal').modal('show');
}, 50);
      // console.log(imgname)
      
    }

    // function timeout(activebtnref){
    //   let btnstatus = $(activebtnref[0]).closest('button')
    //   console.log(btnstatus)
    //   btnstatus.html("Active")
    // }

      function activekeychain(activebtn){
    let keychainref = activebtn.getAttribute("data-key")
    let keychainid = keychainref
    let ceditdata = {
     available_status : 1
    }
              fetch(`http://${hosturl}:5600/api/keychain/editkeychainstatus/${keychainid}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(ceditdata)
          })
          .then(function(res){ 
              $(activebtn).html("Inactive");
             $(activebtn).attr("onclick","deactivekeychain(this)");
             let buttonUpdate = $(activebtn).parent().siblings(".btn")
             buttonUpdate.html("Active")
             buttonUpdate.attr("class","btn btn-success btn-sm dropdown-toggle");
           //getkeychainsdatatable()
           // $("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(keychainid)
  }

  function deactivekeychain(activebtn){
    let keychainref = activebtn.getAttribute("data-key")
    let keychainid = keychainref
     let ceditdata = {
      available_status : 0
    }
              fetch(`http://${hosturl}:5600/api/keychain/editkeychainstatus/${keychainid}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(ceditdata)
          })
          .then(function(res){ 
             $(activebtn).html("Active");
            $(activebtn).attr("onclick","activekeychain(this)");
            let buttonUpdate = $(activebtn).parent().siblings(".btn")
             buttonUpdate.html("Deactivated")
             buttonUpdate.attr("class","btn btn-danger btn-sm dropdown-toggle");
          //  getkeychainsdatatable()
           // uploadFileEdit(keyid)
           // getproducts()
            //$("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(keychainid)
  }


//       function getoffers(){
//     fetch(`http://${hosturl}:5600/api/offer/getalloffers`)
//     .then(response => {
//      // console.log(response)
//       return response.json()})
//     .then(data => {
//       okoffers = data.map(a => ({...a}));
//    })
//     .catch(err => console.log(err))
// }
    

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
  //getoffers()

      function getfilteredkeychainsdatatable(newData){
          let userTable = $('#example1').DataTable({
            destroy: true,
        "processing" : true,
         "lengthMenu": [[30, 100, 500, -1], [30, 100, 500, "All"]],
        "aaSorting": [[ 4, "desc" ]],
          "rowCallback": function (nRow, aData, iDisplayIndex) {
               var oSettings = this.fnSettings ();
               $("td:first", nRow).html(oSettings._iDisplayStart+iDisplayIndex +1);
               return nRow;
          },
        "aaData" : newData,
        "columns" : [ {
            "data" : null
        }, {
            "data" : "name"
            
        }, {
            "data" : "type"
            
        },{
            "data" : "price"
        },{
            "data" : "create_date",
            "visible":false
        },{
          "data": "_id",
            "mRender": function(data, type) {
             //return data
              return `<button onclick="detailskeychain(this)" style="padding: 1px 5px;" class="btn btn-info btn-sm" data-toggle= "modal" data-target="#detailskeychain" data-key="${data}">view</button>`;
            }
        },  {
          "data": null,
            "mRender": function(data, type) {
             //return data
             let outerbutton = ""
             let statuslink = ""
             if(data.available_status === 1){

            outerbutton = `<button type="button" style="padding: 1px 5px;" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">Active</button>`
            statuslink = `<a data-key=${data._id} onclick="deactivekeychain(this)" class="dropdown-item">Inactive</a>`
             }
              else {
             outerbutton = `<button type="button" style="padding: 1px 5px;"  class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown">Deactivated</button>`
             statuslink = `<a data-key=${data._id} onclick="activekeychain(this)"  class="dropdown-item">Active</a>`
             }

              return `<div class="dropdown">${outerbutton}<div class="dropdown-menu">${statuslink}<a onclick="editkeychainmodal(this)" data-key="${data._id}" class="dropdown-item">Edit</a></div></div>`;
            }
        }, {
          "data": "_id",
            "mRender": function(data, type) {
             
              return `<input name="todelete" value=${data} type="checkbox">`;
            }
        }]
      });
         // userTable.columns(2).search('\b(\w*RegularKeychain\w*)\b', true, false).draw();
    }

          function getkeychainsdatatable(){
          let userTable = $('#example1').DataTable({
            destroy: true,
        "processing" : true,
         "lengthMenu": [[30, 100, 500, -1], [30, 100, 500, "All"]],
        "aaSorting": [[ 4, "desc" ]],
          "rowCallback": function (nRow, aData, iDisplayIndex) {
               var oSettings = this.fnSettings ();
               $("td:first", nRow).html(oSettings._iDisplayStart+iDisplayIndex +1);
               return nRow;
          },
        "ajax" : {
            "url" : `http://${hosturl}:5600/api/keychain/getallkeychains`,
            dataSrc : ''
        },
        "columns" : [ {
            "data" : null
        }, {
            "data" : "name"
            
        }, {
            "data" : "type"
            
        },{
            "data" : "price"
        },{
            "data" : "create_date",
            "visible":false
        },{
          "data": "_id",
            "mRender": function(data, type) {
             //return data
              return `<button onclick="detailskeychain(this)" style="padding: 1px 5px;" class="btn btn-info btn-sm" data-toggle= "modal" data-target="#detailskeychain" data-key="${data}">view</button>`;
            }
        },  {
          "data": null,
            "mRender": function(data, type) {
             //return data
             let outerbutton = ""
             let statuslink = ""
             if(data.available_status === 1){

            outerbutton = `<button type="button" style="padding: 1px 5px;" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">Active</button>`
            statuslink = `<a data-key=${data._id} onclick="deactivekeychain(this)" class="dropdown-item">Inactive</a>`
             }
              else {
             outerbutton = `<button type="button" style="padding: 1px 5px;"  class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown">Deactivated</button>`
             statuslink = `<a data-key=${data._id} onclick="activekeychain(this)"  class="dropdown-item">Active</a>`
             }

              return `<div class="dropdown">${outerbutton}<div class="dropdown-menu">${statuslink}<a onclick="editkeychainmodal(this)" data-key="${data._id}" class="dropdown-item">Edit</a></div></div>`;
            }
        }, {
          "data": "_id",
            "mRender": function(data, type) {
             
              return `<input name="todelete" value=${data} type="checkbox">`;
            }
        }]
      });
          
    }

    getkeychainsdatatable()