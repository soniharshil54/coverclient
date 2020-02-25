function removeFromArray(original, remove) {
  return original.filter(value => !remove.includes(value));
}



  function logOutUser(){
    localStorage.clear();
    window.location  =  "login.html";
  }

function addwallclock(){
  window.location = "addwallclock.html";
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
        document.getElementById("wallclock_list_notif").innerHTML = ""
      }
      else {
        document.getElementById("wallclock_list_notif").style.color = "red"
        document.getElementById("wallclock_list_notif").innerHTML = "Select atleast one wallclock !!!"
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

    function uploadFileEdit(wallclockid){
    console.log("uploads file")
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("wallclockImagesEdit");
    var formData = new FormData(form);

fetch(`http://${hosturl}:5600/api/wallclock/addimage/${wallclockid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  console.log(res)
   document.getElementById("wallclock_list_notif").style.color = "green"
        document.getElementById("wallclock_list_notif").innerHTML = "wallclock edited successfully !!!"
  getwallclocksdatatable()
  //document.getElementById("wallclocksuccessAdded").innerHTML = "Offer successfully added !!!"
 // getoffers()
}).catch(err => console.log(err))

  }


      function detailswallclock(btnwallclock){
    console.log(btnwallclock)
    let wallclock_id = btnwallclock.getAttribute('data-key') 
    console.log(wallclock_id)

          fetch(`http://${hosturl}:5600/api/wallclock/getwallclockbyidadmin/${wallclock_id}`)
      .then(response => {
     // console.log(response)
     return response.json()})
      .then(data => {
        console.log(data)
            document.getElementById("name_details_p").innerHTML = data.name
    document.getElementById("price_details_p").innerHTML = data.price
    document.getElementById("size_details_p").innerHTML = data.size
    document.getElementById("description_details_p").innerHTML = data.description
    let headerimagewallclock = data.h_image
    let headerimagewallclocksrc = `http://${hosturl}:5600/admin/uploads/${headerimagewallclock}`
    let shadowimagewallclock = data.shadow_image
    let shadowimagewallclocksrc = `http://${hosturl}:5600/admin/uploads/${shadowimagewallclock}`
    let overlayimagewallclock = data.overlay_image
    let overlayimagesrc = `http://${hosturl}:5600/admin/uploads/${overlayimagewallclock}`
    let maskimagewallclock = data.mask_image
    let maskimagesrc = `http://${hosturl}:5600/admin/uploads/${maskimagewallclock}`
    document.getElementById("image_details_h").src = headerimagewallclocksrc
    document.getElementById("image_details_shadow").src = shadowimagewallclocksrc
    document.getElementById("image_details_overlay").src = overlayimagesrc
    document.getElementById("image_details_mask").src = maskimagesrc

      })
      .catch(err => console.log(err))
  }


  function deletewallclocks(){
    console.log("delete")
   // let deleteprotoget = globalProduct
    let todeleteids = printChecked()
    let deleteArray = {
      todeleteids
    }
              fetch(`http://${hosturl}:5600/api/wallclock/deletewallclock`,
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
              document.getElementById("wallclock_list_notif").style.color = "red"
            document.getElementById("wallclock_list_notif").innerHTML = "Selected wallclocks deleted successfully !!!"
            getwallclocksdatatable()
            //getoffers() 
          })
          .catch(function(res){ console.log(res) })
  }

    function editwallclockmodal(test){
     // console.log(test)

     // console.log( $('#modal_categories_inc').val() )
     let arrayn = test.getAttribute("data-key")
     console.log("arrayn",arrayn)
      //console.log(okchains[arrayn])
      //console.log(okchains[arrayn].name)
      //document.getElementById("modal_offer_id").value = arrayn

      fetch(`http://${hosturl}:5600/api/wallclock/getwallclockbyidadmin/${arrayn}`)
      .then(response => {
     // console.log(response)
     return response.json()})
      .then(data => {
        console.log(data)
        document.getElementById("edit_p_id").value = data._id
    document.getElementById("edit_p_name").value = data.name
    document.getElementById("edit_p_size").value = data.size
    document.getElementById("edit_p_price").value = data.price
    document.getElementById("edit_p_description").value = data.description
    document.getElementById("edit_p_pick_image_size").value = data.pick_image_size
      let headerimage = data.h_image
      document.getElementById("edit_p_h_image").src = `http://${hosturl}:5600/admin/uploads/${headerimage}`
      let shadowimage = data.shadow_image
      document.getElementById("edit_p_shadow_image").src = `http://${hosturl}:5600/admin/uploads/${shadowimage}`
       let overlayimage = data.overlay_image
      document.getElementById("edit_p_overlay_image").src = `http://${hosturl}:5600/admin/uploads/${overlayimage}`
      let maskimage = data.mask_image
      document.getElementById("edit_p_mask_image").src = `http://${hosturl}:5600/admin/uploads/${maskimage}`
       $("#myModal").modal('show')

       globalwallclocknamesarray = globalwallclocknamesarray.filter(name => name !== data.name)

      })
     
      .catch(err => console.log(err))
      //console.log(document.getElementById("modal_id").value)
}


    function editwallclock(){
      let wallclock_id = document.getElementById("edit_p_id").value
    let wallclock_name = document.getElementById("edit_p_name").value
    let wallclock_size = document.getElementById("edit_p_size").value
    let price = document.getElementById("edit_p_price").value
    let description = document.getElementById("edit_p_description").value
    let pick_image_size = document.getElementById("edit_p_pick_image_size").value
    
              let wallclocknameexists = validatewallclocknames(wallclock_name)
  if(wallclocknameexists){
    console.log("validated false", wallclocknameexists)
    document.getElementById("edit_wallclock_name_exists").style.color = 'red'
    document.getElementById("edit_wallclock_name_exists").innerHTML = `name already exists !!!`
    return false
  }

  else {
    document.getElementById("edit_wallclock_name_exists").innerHTML = ""
  }
     let wallclockdata = {
      name : wallclock_name,
      size : wallclock_size,
     price,description , pick_image_size
    }
      // console.log(keyid)
      console.log("k edit data")
      // console.log(keditdata)

          fetch(`http://${hosturl}:5600/api/wallclock/editwallclock/${wallclock_id}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(wallclockdata)
          })
          .then(function(res){ 
            uploadFileEdit(wallclock_id)
            //getoffers()
            $("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    }

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

      function activewallclock(activebtn){
    let wallclockref = activebtn.getAttribute("data-key")
    let wallclockid = wallclockref
    let ceditdata = {
     available_status : 1
    }
              fetch(`http://${hosturl}:5600/api/wallclock/editwallclockstatus/${wallclockid}`,
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
             $(activebtn).attr("onclick","deactivewallclock(this)");
             let buttonUpdate = $(activebtn).parent().siblings(".btn")
             buttonUpdate.html("Active")
             buttonUpdate.attr("class","btn btn-success btn-sm dropdown-toggle");
          // getwallclocksdatatable()
           // $("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(wallclockid)
  }

  function deactivewallclock(activebtn){
    let wallclockref = activebtn.getAttribute("data-key")
    let wallclockid = wallclockref
     let ceditdata = {
      available_status : 0
    }
              fetch(`http://${hosturl}:5600/api/wallclock/editwallclockstatus/${wallclockid}`,
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
            $(activebtn).attr("onclick","activewallclock(this)");
            let buttonUpdate = $(activebtn).parent().siblings(".btn")
             buttonUpdate.html("Deactivated")
             buttonUpdate.attr("class","btn btn-danger btn-sm dropdown-toggle");
           // getwallclocksdatatable()
           // uploadFileEdit(keyid)
           // getproducts()
            //$("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(wallclockid)
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

      function getwallclocksdatatable(){
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
            "url" : `http://${hosturl}:5600/api/wallclock/getallwallclocks`,
            dataSrc : ''
        },
        "columns" : [ {
            "data" : null
        }, {
            "data" : "name"
            
        },{
            "data" : "size"
            
        },  {
            "data" : "price"
        },{
            "data" : "create_date",
            "visible":false
        },{
          "data": "_id",
            "mRender": function(data, type) {
             //return data
              return `<button onclick="detailswallclock(this)" style="padding: 1px 1px; margin:5px" class="btn btn-info btn-sm" data-toggle= "modal" data-target="#detailswallclock" data-key="${data}">view</button>`;
            }
        },  {
          "data": null,
            "mRender": function(data, type) {
             //return data
             let outerbutton = ""
             let statuslink = ""
             if(data.available_status === 1){

            outerbutton = `<button type="button" style="padding: 1px 5px;" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">Active</button>`
            statuslink = `<a data-key=${data._id} onclick="deactivewallclock(this)" class="dropdown-item">Inactive</a>`
             }
              else {
             outerbutton = `<button type="button" style="padding: 1px 5px;"  class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown">Deactivated</button>`
             statuslink = `<a data-key=${data._id} onclick="activewallclock(this)"  class="dropdown-item">Active</a>`
             }

              return `<div class="dropdown">${outerbutton}<div class="dropdown-menu">${statuslink}<a onclick="editwallclockmodal(this)" data-key="${data._id}" class="dropdown-item">Edit</a></div></div>`;
            }
        }, {
          "data": "_id",
            "mRender": function(data, type) {
             
              return `<input name="todelete" value=${data} type="checkbox">`;
            }
        }]
      });
    }

    getwallclocksdatatable()