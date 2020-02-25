function removeFromArray(original, remove) {
  return original.filter(value => !remove.includes(value));
}



  function logOutUser(){
    localStorage.clear();
    window.location  =  "login.html";
  }

function addphotoframe(){
  window.location = "addphotoframe.html";
}

function filterbytype(){
  console.log("filtering")
  let filtype = document.getElementById("p_type_filter").value
  //let teststatussta = okchains.map(a => ({...a}));
  if(filtype === "All"){
    //console.log(okchains)
    getphotoframesdatatable()
  }
  else {

photoframeTable.columns(2).search(filtype, true, false).draw();

  //     fetch(`http://${hosturl}:5600/api/phonecase/getallphonecases`)
  //   .then(response => {
  //    // console.log(response)
  //    return response.json()})
  //   .then(data => {
  //         let allphonecases = data.map(a => ({...a}));
  //     //console.log(okchains)
  // let result = allphonecases.filter(i => {
  //   console.log(i)
  //   return i.company === filcompany}) ; 
  // console.log(result)
  // let nresult = JSON.stringify(result)
  // console.log(result)
  // getfilteredphonecasesdatatable(result)
  //   })
  //   .catch(err => console.log(err))

  
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
      // const photoframetypes = data.map(type => type.name);
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
  optionsd += '<option value="All"> All </option>'
  for (var i = 0; i < options.length; i++) {
   optionsd += '<option value="' + options[i].name+ '">' + options[i].name + '</option>';

 }
 $("#p_type_filter").html(optionsd);
}


function filterbytype(){
  console.log("filtering")
  let filtype = document.getElementById("p_type_filter").value
  //let teststatussta = okchains.map(a => ({...a}));
  if(filtype === "All"){
    //console.log(okchains)
    getphotoframesdatatable()
  }
  else {

photoframeTable.columns(2).search(filtype, true, false).draw();

  //     fetch(`http://${hosturl}:5600/api/phonecase/getallphonecases`)
  //   .then(response => {
  //    // console.log(response)
  //    return response.json()})
  //   .then(data => {
  //         let allphonecases = data.map(a => ({...a}));
  //     //console.log(okchains)
  // let result = allphonecases.filter(i => {
  //   console.log(i)
  //   return i.company === filcompany}) ; 
  // console.log(result)
  // let nresult = JSON.stringify(result)
  // console.log(result)
  // getfilteredphonecasesdatatable(result)
  //   })
  //   .catch(err => console.log(err))

  
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
        document.getElementById("photoframe_list_notif").innerHTML = ""
      }
      else {
        document.getElementById("photoframe_list_notif").style.color = "red"
        document.getElementById("photoframe_list_notif").innerHTML = "Select atleast one photoframe !!!"
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

    function uploadFileEdit(photoframeid){
    console.log("uploads file")
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("photoframeImagesEdit");
    var formData = new FormData(form);

fetch(`http://${hosturl}:5600/api/photoframe/addimage/${photoframeid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  console.log(res)
  document.getElementById("photoframe_list_notif").style.color = "green"
        document.getElementById("photoframe_list_notif").innerHTML = "photoframe edited successfully !!!"
  getphotoframesdatatable()
  //document.getElementById("photoframesuccessAdded").innerHTML = "Offer successfully added !!!"
 // getoffers()
}).catch(err => console.log(err))

  }


      function detailsphotoframe(btnphotoframe){
    console.log(btnphotoframe)
    let photoframe_id = btnphotoframe.getAttribute('data-key') 
    console.log(photoframe_id)

          fetch(`http://${hosturl}:5600/api/photoframe/getphotoframebyidadmin/${photoframe_id}`)
      .then(response => {
     // console.log(response)
     return response.json()})
      .then(data => {
        console.log(data)
            document.getElementById("name_details_p").innerHTML = data.name
    document.getElementById("price_details_p").innerHTML = data.price
    document.getElementById("size_details_p").innerHTML = data.size
    document.getElementById("description_details_p").innerHTML = data.description
    let headerimagephotoframe = data.h_image
    let headerimagephotoframesrc = `http://${hosturl}:5600/admin/uploads/${headerimagephotoframe}`
    let shadowimagephotoframe = data.shadow_image
    let shadowimagephotoframesrc = `http://${hosturl}:5600/admin/uploads/${shadowimagephotoframe}`
    let overlayimagephotoframe = data.overlay_image
    let overlayimagesrc = `http://${hosturl}:5600/admin/uploads/${overlayimagephotoframe}`
    let maskimagephotoframe = data.mask_image
    let maskimagesrc = `http://${hosturl}:5600/admin/uploads/${maskimagephotoframe}`
    document.getElementById("image_details_h").src = headerimagephotoframesrc
    document.getElementById("image_details_shadow").src = shadowimagephotoframesrc
    document.getElementById("image_details_overlay").src = overlayimagesrc
    document.getElementById("image_details_mask").src = maskimagesrc

      })
      .catch(err => console.log(err))
  }


  function deletephotoframes(){
    console.log("delete")
   // let deleteprotoget = globalProduct
    let todeleteids = printChecked()
    let deleteArray = {
      todeleteids
    }
              fetch(`http://${hosturl}:5600/api/photoframe/deletephotoframe`,
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
              document.getElementById("photoframe_list_notif").style.color = "red"
            document.getElementById("photoframe_list_notif").innerHTML = "Selected photoframes deleted successfully !!!"
            getphotoframesdatatable()
            //getoffers() 
          })
          .catch(function(res){ console.log(res) })
  }

    function editphotoframemodal(test){
     // console.log(test)

     // console.log( $('#modal_categories_inc').val() )
     let arrayn = test.getAttribute("data-key")
     console.log("arrayn",arrayn)
      //console.log(okchains[arrayn])
      //console.log(okchains[arrayn].name)
      //document.getElementById("modal_offer_id").value = arrayn

      fetch(`http://${hosturl}:5600/api/photoframe/getphotoframebyidadmin/${arrayn}`)
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

       globalphotoframenamesarray = globalphotoframenamesarray.filter(name => name !== data.name)

      })
     
      .catch(err => console.log(err))
      //console.log(document.getElementById("modal_id").value)
}


    function editphotoframe(){
      let photoframe_id = document.getElementById("edit_p_id").value
    let photoframe_name = document.getElementById("edit_p_name").value
    let photoframe_size = document.getElementById("edit_p_size").value
    let price = document.getElementById("edit_p_price").value
    let description = document.getElementById("edit_p_description").value
    
              let photoframenameexists = validatephotoframenames(photoframe_name)
  if(photoframenameexists){
    console.log("validated false", photoframenameexists)
    document.getElementById("edit_photoframe_name_exists").style.color = 'red'
    document.getElementById("edit_photoframe_name_exists").innerHTML = `name already exists !!!`
    return false
  }

    else {
    document.getElementById("edit_photoframe_name_exists").innerHTML = ""
  }

    let pick_image_size = document.getElementById("edit_p_pick_image_size").value
     let photoframedata = {
      name : photoframe_name,
      size : photoframe_size,
     price,description , pick_image_size
    }
      // console.log(keyid)
      console.log("k edit data")
      // console.log(keditdata)

          fetch(`http://${hosturl}:5600/api/photoframe/editphotoframe/${photoframe_id}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(photoframedata)
          })
          .then(function(res){ 
            uploadFileEdit(photoframe_id)
            //getoffers()
            $("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    }

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

      function activephotoframe(activebtn){
    let photoframeref = activebtn.getAttribute("data-key")
    let photoframeid = photoframeref
    let ceditdata = {
     available_status : 1
    }
              fetch(`http://${hosturl}:5600/api/photoframe/editphotoframestatus/${photoframeid}`,
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
             $(activebtn).attr("onclick","deactivephotoframe(this)");
             let buttonUpdate = $(activebtn).parent().siblings(".btn")
             buttonUpdate.html("Active")
             buttonUpdate.attr("class","btn btn-success btn-sm dropdown-toggle");
          // getphotoframesdatatable()
           // $("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(photoframeid)
  }

  function deactivephotoframe(activebtn){
    let photoframeref = activebtn.getAttribute("data-key")
    let photoframeid = photoframeref
     let ceditdata = {
      available_status : 0
    }
              fetch(`http://${hosturl}:5600/api/photoframe/editphotoframestatus/${photoframeid}`,
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
            $(activebtn).attr("onclick","activephotoframe(this)");
            let buttonUpdate = $(activebtn).parent().siblings(".btn")
             buttonUpdate.html("Deactivated")
             buttonUpdate.attr("class","btn btn-danger btn-sm dropdown-toggle");
         //   getphotoframesdatatable()
           // uploadFileEdit(keyid)
           // getproducts()
            //$("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(photoframeid)
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

      function getphotoframesdatatable(){
          photoframeTable = $('#example1').DataTable({
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
            "url" : `http://${hosturl}:5600/api/photoframe/getallphotoframes`,
            dataSrc : ''
        },
        "columns" : [ {
            "data" : null
        }, {
            "data" : "name"
            
        },{
            "data" : "photoframe_type_name"
            
        },  {
            "data" : "price"
        },{
            "data" : "create_date",
            "visible":false
        },{
          "data": "_id",
            "mRender": function(data, type) {
             //return data
              return `<button onclick="detailsphotoframe(this)" style="padding: 1px 5px;" class="btn btn-info btn-sm" data-toggle= "modal" data-target="#detailsphotoframe" data-key="${data}">view</button>`;
            }
        },  {
          "data": null,
            "mRender": function(data, type) {
             //return data
             let outerbutton = ""
             let statuslink = ""
             if(data.available_status === 1){

            outerbutton = `<button type="button" style="padding: 1px 5px;" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">Active</button>`
            statuslink = `<a data-key=${data._id} onclick="deactivephotoframe(this)" class="dropdown-item">Inactive</a>`
             }
              else {
             outerbutton = `<button type="button" style="padding: 1px 5px;"  class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown">Deactivated</button>`
             statuslink = `<a data-key=${data._id} onclick="activephotoframe(this)"  class="dropdown-item">Active</a>`
             }

              return `<div class="dropdown">${outerbutton}<div class="dropdown-menu">${statuslink}<a onclick="editphotoframemodal(this)" data-key="${data._id}" class="dropdown-item">Edit</a></div></div>`;
            }
        }, {
          "data": "_id",
            "mRender": function(data, type) {
             
              return `<input name="todelete" value=${data} type="checkbox">`;
            }
        }]
      });
    }

    getphotoframesdatatable()