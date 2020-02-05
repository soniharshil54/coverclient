function removeFromArray(original, remove) {
  return original.filter(value => !remove.includes(value));
}



  function logOutUser(){
    localStorage.clear();
    window.location  =  "login.html";
  }

function addsipperbottle(){
  window.location = "addsipperbottle.html";
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
        document.getElementById("sipperbottle_list_notif").innerHTML = ""
      }
      else {
        document.getElementById("sipperbottle_list_notif").style.color = "red"
        document.getElementById("sipperbottle_list_notif").innerHTML = "Select atleast one sipperbottle !!!"
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

    function uploadFileEdit(sipperbottleid){
    console.log("uploads file")
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("sipperbottleImagesEdit");
    var formData = new FormData(form);

fetch(`http://${hosturl}:5600/api/sipperbottle/addimage/${sipperbottleid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  console.log(res)
   document.getElementById("sipperbottle_list_notif").style.color = "green"
        document.getElementById("sipperbottle_list_notif").innerHTML = "sipperbottle edited successfully !!!"
  getsipperbottlesdatatable()
  //document.getElementById("sipperbottlesuccessAdded").innerHTML = "Offer successfully added !!!"
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

      function detailssipperbottle(btnsipperbottle){
    console.log(btnsipperbottle)
    let sipperbottle_id = btnsipperbottle.getAttribute('data-key') 
    console.log(sipperbottle_id)

          fetch(`http://${hosturl}:5600/api/sipperbottle/getsipperbottlebyidadmin/${sipperbottle_id}`)
      .then(response => {
     // console.log(response)
     return response.json()})
      .then(data => {
        console.log(data)
            document.getElementById("name_details_m").innerHTML = data.name
    document.getElementById("price_details_m").innerHTML = data.price
    document.getElementById("volume_details_m").innerHTML = data.volume
    document.getElementById("description_details_m").innerHTML = data.description
    let headerimagesipperbottle = data.h_image
    let headerimagesipperbottlesrc = `http://${hosturl}:5600/admin/uploads/${headerimagesipperbottle}`
    let innerimagesipperbottle = data.in_image
    let innerimagesipperbottlesrc = `http://${hosturl}:5600/admin/uploads/${innerimagesipperbottle}`
    let overlayimagesipperbottle = data.overlay_image
    let overlayimagesrc = `http://${hosturl}:5600/admin/uploads/${overlayimagesipperbottle}`
    let maskimagesipperbottle = data.mask_image
    let maskimagesrc = `http://${hosturl}:5600/admin/uploads/${maskimagesipperbottle}`
    document.getElementById("image_details_h").src = headerimagesipperbottlesrc
    document.getElementById("image_details_in").src = innerimagesipperbottlesrc
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


  function deletesipperbottles(){
    console.log("delete")
   // let deleteprotoget = globalProduct
    let todeleteids = printChecked()
    let deleteArray = {
      todeleteids
    }
              fetch(`http://${hosturl}:5600/api/sipperbottle/deletesipperbottle`,
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
              document.getElementById("sipperbottle_list_notif").style.color = "red"
            document.getElementById("sipperbottle_list_notif").innerHTML = "Selected sipperbottles deleted successfully !!!"
            getsipperbottlesdatatable()
            //getoffers() 
          })
          .catch(function(res){ console.log(res) })
  }

    function editsipperbottlemodal(test){
     // console.log(test)

     // console.log( $('#modal_categories_inc').val() )
     let arrayn = test.getAttribute("data-key")
     console.log("arrayn",arrayn)
      //console.log(okchains[arrayn])
      //console.log(okchains[arrayn].name)
      //document.getElementById("modal_offer_id").value = arrayn

      fetch(`http://${hosturl}:5600/api/sipperbottle/getsipperbottlebyidadmin/${arrayn}`)
      .then(response => {
     // console.log(response)
     return response.json()})
      .then(data => {
        console.log(data)
        document.getElementById("edit_m_id").value = data._id
    document.getElementById("edit_m_name").value = data.name
    document.getElementById("edit_m_volume").value = data.volume
    document.getElementById("edit_m_price").value = data.price
    document.getElementById("edit_m_description").value = data.description
    document.getElementById("edit_m_pick_image_size").value = data.pick_image_size
      let headerimage = data.h_image
      document.getElementById("edit_m_h_image").src = `http://${hosturl}:5600/admin/uploads/${headerimage}`
      let innerimage = data.in_image
      document.getElementById("edit_m_in_image").src = `http://${hosturl}:5600/admin/uploads/${innerimage}`
       let overlayimage = data.overlay_image
      document.getElementById("edit_m_overlay_image").src = `http://${hosturl}:5600/admin/uploads/${overlayimage}`
      let maskimage = data.mask_image
      document.getElementById("edit_m_mask_image").src = `http://${hosturl}:5600/admin/uploads/${maskimage}`
       $("#myModal").modal('show')

       globalsipperbottlenamesarray = globalsipperbottlenamesarray.filter(name => name !== data.name)

      })
     
      .catch(err => console.log(err))
      //console.log(document.getElementById("modal_id").value)
}


    function editsipperbottle(){
      let sipperbottle_id = document.getElementById("edit_m_id").value
    let sipperbottle_name = document.getElementById("edit_m_name").value
    let sipperbottle_volume = document.getElementById("edit_m_volume").value
    let price = document.getElementById("edit_m_price").value
    let description = document.getElementById("edit_m_description").value
    let pick_image_size = document.getElementById("edit_m_pick_image_size").value
               let sipperbottlenameexists = validatesipperbottlenames(sipperbottle_name)
  if(sipperbottlenameexists){
    console.log("validated false", sipperbottlenameexists)
    document.getElementById("edit_sipperbottle_name_exists").style.color = 'red'
    document.getElementById("edit_sipperbottle_name_exists").innerHTML = `"${sipperbottle_name}" sipperbottle already exists !!!`
    return false
  }

  else {
    document.getElementById("edit_sipperbottle_name_exists").innerHTML = ""
  }

     let sipperbottledata = {
      name : sipperbottle_name,
      volume : sipperbottle_volume,
     price,description , pick_image_size
    }
      // console.log(keyid)
      console.log("k edit data")
      // console.log(keditdata)

          fetch(`http://${hosturl}:5600/api/sipperbottle/editsipperbottle/${sipperbottle_id}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(sipperbottledata)
          })
          .then(function(res){ 
            uploadFileEdit(sipperbottle_id)
            //getoffers()
            $("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    }

    function getsipperbottlenames(){
    fetch(`http://${hosturl}:5600/api/sipperbottle/getallsipperbottlenames`)
    .then(response => {
     // console.log(response)
     return response.json()})
    .then(data => {
      console.log(data)
      const sipperbottlenames = data.map(sipperbottle => sipperbottle.name);
      globalsipperbottlenamesarray = sipperbottlenames
      console.log(globalsipperbottlenamesarray)
     
    })
    .catch(err => console.log(err))
  }

getsipperbottlenames()


function validatesipperbottlenames(sipperbottlename){
  console.log("validating function")
    let lowersipperbottlearray = globalsipperbottlenamesarray.map(sipperbottle => sipperbottle.toLowerCase()) 
  let lowersipperbottle = sipperbottlename.toLowerCase()
 let sipperbottlenameexists = lowersipperbottlearray.indexOf(lowersipperbottle) > -1
 console.log("sipperbottlearray", globalsipperbottlenamesarray)
 console.log("sipperbottleexists", sipperbottlenameexists)
  return sipperbottlenameexists
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

      function activesipperbottle(activebtn){
    let sipperbottleref = activebtn.getAttribute("data-key")
    let sipperbottleid = sipperbottleref
    let ceditdata = {
     available_status : 1
    }
              fetch(`http://${hosturl}:5600/api/sipperbottle/editsipperbottlestatus/${sipperbottleid}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(ceditdata)
          })
          .then(function(res){ 
            //let btnstatus = activebtn.previousSibling
             //let btnstatus2 = activebtn.previousSibling
            //let btnstatus = $(activebtn[0]).parent().find('button')
           // let btnstatus = $(activebtn[0]).closest('button')
            //console.log(btnstatus)
           // setTimeout(timeout(activebtn), 5000)
          //  btnstatus.html("Active")
            // console.log(res)
           // uploadFileEdit(keyid)
           // getoffers()
           getsipperbottlesdatatable()
           // $("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(sipperbottleid)
  }

  function deactivesipperbottle(activebtn){
    let sipperbottleref = activebtn.getAttribute("data-key")
    let sipperbottleid = sipperbottleref
     let ceditdata = {
      available_status : 0
    }
              fetch(`http://${hosturl}:5600/api/sipperbottle/editsipperbottlestatus/${sipperbottleid}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(ceditdata)
          })
          .then(function(res){ 
             // console.log(res)
            //getoffers()
            getsipperbottlesdatatable()
           // uploadFileEdit(keyid)
           // getproducts()
            //$("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(sipperbottleid)
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

      function getsipperbottlesdatatable(){
          let userTable = $('#example1').DataTable({
            destroy: true,
        "processing" : true,
        "aaSorting": [[ 4, "desc" ]],
          "rowCallback": function (nRow, aData, iDisplayIndex) {
               var oSettings = this.fnSettings ();
               $("td:first", nRow).html(oSettings._iDisplayStart+iDisplayIndex +1);
               return nRow;
          },
        "ajax" : {
            "url" : `http://${hosturl}:5600/api/sipperbottle/getallsipperbottles`,
            dataSrc : ''
        },
        "columns" : [ {
            "data" : null
        }, {
            "data" : "name"
            
        },{
            "data" : "volume"
            
        },  {
            "data" : "price"
        },{
            "data" : "create_date",
            "visible":false
        },{
          "data": "_id",
            "mRender": function(data, type) {
             //return data
              return `<button onclick="detailssipperbottle(this)" style="padding: 1px 1px; margin:5px" class="btn btn-info" data-toggle= "modal" data-target="#detailssipperbottle" data-key="${data}">view</button>`;
            }
        },  {
          "data": null,
            "mRender": function(data, type) {
             //return data
             let outerbutton = ""
             let statuslink = ""
             if(data.available_status === 1){

            outerbutton = `<button type="button" style="margin:5px" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">Active</button>`
            statuslink = `<a data-key=${data._id} onclick="deactivesipperbottle(this)" class="dropdown-item">Inactive</a>`
             }
              else {
             outerbutton = `<button type="button" style="margin:5px"  class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown">Deactivated</button>`
             statuslink = `<a data-key=${data._id} onclick="activesipperbottle(this)"  class="dropdown-item">Active</a>`
             }

              return `<div class="dropdown">${outerbutton}<div class="dropdown-menu">${statuslink}<a onclick="editsipperbottlemodal(this)" data-key="${data._id}" class="dropdown-item">Edit</a></div></div>`;
            }
        }, {
          "data": "_id",
            "mRender": function(data, type) {
             
              return `<input name="todelete" value=${data} type="checkbox">`;
            }
        }]
      });
    }

    getsipperbottlesdatatable()