function removeFromArray(original, remove) {
  return original.filter(value => !remove.includes(value));
}



  function logOutUser(){
    localStorage.clear();
    window.location  =  "login.html";
  }

function addwatch(){
  window.location = "addwatch.html";
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
        document.getElementById("watch_list_notif").innerHTML = ""
      }
      else {
        document.getElementById("watch_list_notif").style.color = "red"
        document.getElementById("watch_list_notif").innerHTML = "Select atleast one watch !!!"
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

    function uploadFileEdit(watchid){
    console.log("uploads file")
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("watchImagesEdit");
    var formData = new FormData(form);

fetch(`http://${hosturl}:5600/api/watch/addimage/${watchid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  console.log(res)
  getwatchsdatatable()
  //document.getElementById("watchsuccessAdded").innerHTML = "Offer successfully added !!!"
 // getoffers()
}).catch(err => console.log(err))

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
  optionsd += '<option value="All"> All </option>'
  for (var i = 0; i < options.length; i++) {
   optionsd += '<option value="' + options[i]._id+ '">' + options[i].name + '</option>';

 }
 // optionsdx += '<option value="all">all</option>';
 // for (var i = 0; i < options.length; i++) {
 //   optionsdx += '<option value="' + options[i]+ '">' + options[i] + '</option>';

 // }
 $("#w_type_filter").html(optionsd);
 // $("#sel_comp").html(optionsdx);
 // $("#modal_option").html(optionsd);
}

    function filterwatchmaintypes(){
    let filtertype = document.getElementById("w_type_filter").value

    let filtersubtype = document.getElementById("w_subtype_filter").value
    //let teststatus = okchains.map(a => ({...a}));
    console.log("filtertype", filtertype)
    console.log("filtersubtype", filtersubtype)

    if(filtertype === "All" && filtersubtype === "All"){
      getwatchsdatatable()
    }
    else{
          if (filtertype === "All") {
      filterbysubtype(filtersubtype)
    }
    else if(filtersubtype === "All") {
      filterbytype(filtertype)
    }
    else {
         filterbytypesubtype(filtertype, filtersubtype)
    }
    }



  }

  function filterbytype(filtertyperef){
      var authtokend = localStorage.getItem('authorization')
      fetch(`http://${hosturl}:5600/api/watch/getallwatchs`,
          {headers: {
      'Authorization': authtokend
    }})
    .then(response => {
     // console.log(response)
     return response.json()})
    .then(data => {
          let wmtypes = data.map(a => ({...a}));
      //console.log(okchains)
  let result = wmtypes.filter(i => {
    console.log(i.type_id)
    console.log(filtertyperef)
    return i.type_id === filtertyperef}) ; 
  console.log(result)
  let nresult = JSON.stringify(result)
  console.log(result)
  getfilteredwatchsdatatable(result)
    })
    .catch(err => console.log(err))
  }

    function filterbysubtype(filtersubtyperef){
      fetch(`http://${hosturl}:5600/api/watch/getallwatchs`)
    .then(response => {
     // console.log(response)
     return response.json()})
    .then(data => {
          let wmtypes = data.map(a => ({...a}));
      //console.log(okchains)
  let result = wmtypes.filter(i => {
    console.log(i)
    return i.subtype_id === filtersubtyperef}) ; 
  console.log(result)
  let nresult = JSON.stringify(result)
  console.log(result)
  getfilteredwatchsdatatable(result)
    })
    .catch(err => console.log(err))
  }

      function filterbytypesubtype(filtertyperef ,filtersubtyperef){
      fetch(`http://${hosturl}:5600/api/watch/getallwatchs`)
    .then(response => {
     // console.log(response)
     return response.json()})
    .then(data => {
          let wmtypes = data.map(a => ({...a}));
      //console.log(okchains)
  let result = wmtypes.filter(i => {
    console.log(i)
    return i.type_id === filtertyperef && i.subtype_id === filtersubtyperef}) ; 
  console.log(result)
  let nresult = JSON.stringify(result)
  console.log(result)
  getfilteredwatchsdatatable(result)
    })
    .catch(err => console.log(err))
  }


      function detailswatch(btnwatch){
    console.log(btnwatch)
    let watch_id = btnwatch.getAttribute('data-key') 
    console.log(watch_id)

          fetch(`http://${hosturl}:5600/api/watch/getwatchbyidadmin/${watch_id}`)
      .then(response => {
     // console.log(response)
     return response.json()})
      .then(data => {
        console.log(data)
            document.getElementById("name_details_p").innerHTML = data.name
    document.getElementById("price_details_p").innerHTML = data.price
    document.getElementById("size_details_p").innerHTML = data.size
    document.getElementById("description_details_p").innerHTML = data.description
    let headerimagewatch = data.h_image
    let headerimagewatchsrc = `http://${hosturl}:5600/admin/uploads/${headerimagewatch}`
    let shadowimagewatch = data.shadow_image
    let shadowimagewatchsrc = `http://${hosturl}:5600/admin/uploads/${shadowimagewatch}`
    let overlayimagewatch = data.overlay_image
    let overlayimagesrc = `http://${hosturl}:5600/admin/uploads/${overlayimagewatch}`
    let maskimagewatch = data.mask_image
    let maskimagesrc = `http://${hosturl}:5600/admin/uploads/${maskimagewatch}`
    document.getElementById("image_details_h").src = headerimagewatchsrc
    document.getElementById("image_details_shadow").src = shadowimagewatchsrc
    document.getElementById("image_details_overlay").src = overlayimagesrc
    document.getElementById("image_details_mask").src = maskimagesrc
         

      if(data.maintype_id === "5e300399f16db81e325b69c8"){
         let shadowimagewatch2 = data.shadow_image_2
    let shadowimagewatchsrc2 = `http://${hosturl}:5600/admin/uploads/${shadowimagewatch2}`
    let overlayimagewatch2 = data.overlay_image_2
    let overlayimagesrc2 = `http://${hosturl}:5600/admin/uploads/${overlayimagewatch2}`
    let maskimagewatch2 = data.mask_image_2
    let maskimagesrc2 = `http://${hosturl}:5600/admin/uploads/${maskimagewatch2}`
        document.getElementById("image_details_shadow_2").src = shadowimagewatchsrc2
        document.getElementById("image_details_overlay_2").src = overlayimagesrc2
        document.getElementById("image_details_mask_2").src = maskimagesrc2
        document.getElementById("watch_details_couple_lady").style.display = "table-row"
       }
       else {
        document.getElementById("watch_details_couple_lady").style.display = "none"
       }



      })
      .catch(err => console.log(err))
  }


  function deletewatchs(){
    console.log("delete")
   // let deleteprotoget = globalProduct
    let todeleteids = printChecked()
    let deleteArray = {
      todeleteids
    }
              fetch(`http://${hosturl}:5600/api/watch/deletewatch`,
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
              document.getElementById("watch_list_notif").style.color = "red"
            document.getElementById("watch_list_notif").innerHTML = "Selected watches deleted successfully !!!"
            getwatchsdatatable()
            //getoffers() 
          })
          .catch(function(res){ console.log(res) })
  }

    function editwatchmodal(test){
     // console.log(test)

     // console.log( $('#modal_categories_inc').val() )
     let arrayn = test.getAttribute("data-key")
     console.log("arrayn",arrayn)
      //console.log(okchains[arrayn])
      //console.log(okchains[arrayn].name)
      //document.getElementById("modal_offer_id").value = arrayn

      fetch(`http://${hosturl}:5600/api/watch/getwatchbyidadmin/${arrayn}`)
      .then(response => {
     // console.log(response)
     return response.json()})
      .then(data => {
        console.log(data)
        document.getElementById("edit_p_id").value = data._id
    document.getElementById("edit_p_name").value = data.name
    document.getElementById("edit_p_type").value = data.maintype_name
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

       let shadowimage2 = data.shadow_image_2
      document.getElementById("edit_p_shadow_image_2").src = `http://${hosturl}:5600/admin/uploads/${shadowimage2}`
       let overlayimage2 = data.overlay_image_2
      document.getElementById("edit_p_overlay_image_2").src = `http://${hosturl}:5600/admin/uploads/${overlayimage2}`
      let maskimage2 = data.mask_image_2
      document.getElementById("edit_p_mask_image_2").src = `http://${hosturl}:5600/admin/uploads/${maskimage2}`
       if(data.maintype_id === "5e300399f16db81e325b69c8"){
        document.getElementById("shadow_image_edit_2").style.display = "block"
        document.getElementById("overlay_image_edit_2").style.display = "block"
        document.getElementById("mask_image_edit_2").style.display = "block"
       }
       else {
        document.getElementById("shadow_image_edit_2").style.display = "none"
        document.getElementById("overlay_image_edit_2").style.display = "none"
        document.getElementById("mask_image_edit_2").style.display = "none"
       }

       $("#myModal").modal('show')

       globalwatchnamesarray = globalwatchnamesarray.filter(name => name !== data.name)

      })
     
      .catch(err => console.log(err))
      //console.log(document.getElementById("modal_id").value)
}


    function editwatch(){
      let watch_id = document.getElementById("edit_p_id").value
    let watch_name = document.getElementById("edit_p_name").value
    let watch_size = document.getElementById("edit_p_size").value
    let price = document.getElementById("edit_p_price").value
    let description = document.getElementById("edit_p_description").value
    let pick_image_size = document.getElementById("edit_p_pick_image_size").value
              let watchnameexists = validatewatchnames(watch_name)
  if(watchnameexists){
    console.log("validated false", watchnameexists)
    document.getElementById("edit_watch_name_exists").style.color = 'red'
    document.getElementById("edit_watch_name_exists").innerHTML = `name already exists !!!`
    return false
  }

  else {
    document.getElementById("edit_watch_name_exists").innerHTML = ""
  }


     let watchdata = {
      name : watch_name,
      size : watch_size,
     price,description , pick_image_size
    }
      // console.log(keyid)
      console.log("k edit data")
      // console.log(keditdata)

          fetch(`http://${hosturl}:5600/api/watch/editwatch/${watch_id}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(watchdata)
          })
          .then(function(res){ 
            uploadFileEdit(watch_id)
            //getoffers()
            $("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    }

     function getwatchnames(){
    fetch(`http://${hosturl}:5600/api/watch/getallwatchnames`)
    .then(response => {
     // console.log(response)
     return response.json()})
    .then(data => {
     // console.log(data)
      const watchnames = data.map(watch => watch.name);
      globalwatchnamesarray = watchnames
     // console.log(globalwatchnamesarray)
     
    })
    .catch(err => console.log(err))
  }

getwatchnames()


function validatewatchnames(watchname){
  console.log("validating function")
    let lowerwatcharray = globalwatchnamesarray.map(watch => watch.toLowerCase().trim()) 
  let lowerwatch = watchname.toLowerCase().trim()
 let watchnameexists = lowerwatcharray.indexOf(lowerwatch) > -1
 console.log("watcharray", globalwatchnamesarray)
 console.log("watchexists", watchnameexists)
  return watchnameexists
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

      function activewatch(activebtn){
    let watchref = activebtn.getAttribute("data-key")
    let watchid = watchref
    let ceditdata = {
     available_status : 1
    }
              fetch(`http://${hosturl}:5600/api/watch/editwatchstatus/${watchid}`,
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
             $(activebtn).attr("onclick","deactivewatch(this)");
             let buttonUpdate = $(activebtn).parent().siblings(".btn")
             buttonUpdate.html("Active")
             buttonUpdate.attr("class","btn btn-success btn-sm dropdown-toggle");
       //    getwatchsdatatable()
           // $("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(watchid)
  }

  function deactivewatch(activebtn){
     $(activebtn).html("Active");
            $(activebtn).attr("onclick","activewatch(this)");
            let buttonUpdate = $(activebtn).parent().siblings(".btn")
             buttonUpdate.html("Deactivated")
             buttonUpdate.attr("class","btn btn-danger btn-sm dropdown-toggle");
    let watchref = activebtn.getAttribute("data-key")
    let watchid = watchref
     let ceditdata = {
      available_status : 0
    }
              fetch(`http://${hosturl}:5600/api/watch/editwatchstatus/${watchid}`,
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
            $(activebtn).attr("onclick","activewatch(this)");
            let buttonUpdate = $(activebtn).parent().siblings(".btn")
             buttonUpdate.html("Deactivated")
             buttonUpdate.attr("class","btn btn-danger btn-sm dropdown-toggle");
           //getwatchsdatatable()
           // uploadFileEdit(keyid)
           // getproducts()
            //$("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(watchid)
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

      function getwatchsdatatable(){
         var authtokend = localStorage.getItem('authorization')
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
           "url": `http://${hosturl}:5600/api/watch/getallwatchs`,
         dataSrc : '',
         "type": "GET",
         "beforeSend": function(xhr){
            xhr.setRequestHeader("Authorization",
               authtokend)
         }
        },
        "columns" : [ {
            "data" : null
        }, {
            "data" : "name"
            
        },{
            "data" : "maintype_name"
            
        },  {
            "data" : "price"
        },{
            "data" : "create_date",
            "visible":false
        },{
          "data": "_id",
            "mRender": function(data, type) {
             //return data
              return `<button onclick="detailswatch(this)" style="padding: 1px 5px;" class="btn btn-info btn-sm" data-toggle= "modal" data-target="#detailswatch" data-key="${data}">view</button>`;
            }
        },  {
          "data": null,
            "mRender": function(data, type) {
             //return data
             let outerbutton = ""
             let statuslink = ""
             if(data.available_status === 1){

            outerbutton = `<button type="button" style="padding: 1px 5px;" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">Active</button>`
            statuslink = `<a data-key=${data._id} onclick="deactivewatch(this)" class="dropdown-item">Inactive</a>`
             }
              else {
             outerbutton = `<button type="button" style="padding: 1px 5px;"  class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown">Deactivated</button>`
             statuslink = `<a data-key=${data._id} onclick="activewatch(this)"  class="dropdown-item">Active</a>`
             }

              return `<div class="dropdown">${outerbutton}<div class="dropdown-menu">${statuslink}<a onclick="editwatchmodal(this)" data-key="${data._id}" class="dropdown-item">Edit</a></div></div>`;
            }
        }, {
          "data": "_id",
            "mRender": function(data, type) {
             
              return `<input name="todelete" value=${data} type="checkbox">`;
            }
        }]
      });
    }

          function getfilteredwatchsdatatable(newData){
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
            
        },{
            "data" : "maintype_name"
            
        },  {
            "data" : "price"
        },{
            "data" : "create_date",
            "visible":false
        },{
          "data": "_id",
            "mRender": function(data, type) {
             //return data
              return `<button onclick="detailswatch(this)" style="padding: 1px 5px;" class="btn btn-info" data-toggle= "modal" data-target="#detailswatch" data-key="${data}">view</button>`;
            }
        },  {
          "data": null,
            "mRender": function(data, type) {
             //return data
             let outerbutton = ""
             let statuslink = ""
             if(data.available_status === 1){

            outerbutton = `<button type="button" style="padding: 1px 5px;" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">Active</button>`
            statuslink = `<a data-key=${data._id} onclick="deactivewatch(this)" class="dropdown-item">Inactive</a>`
             }
              else {
             outerbutton = `<button type="button" style="padding: 1px 5px;"  class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown">Deactivated</button>`
             statuslink = `<a data-key=${data._id} onclick="activewatch(this)"  class="dropdown-item">Active</a>`
             }

              return `<div class="dropdown">${outerbutton}<div class="dropdown-menu">${statuslink}<a onclick="editwatchmodal(this)" data-key="${data._id}" class="dropdown-item">Edit</a></div></div>`;
            }
        }, {
          "data": "_id",
            "mRender": function(data, type) {
             
              return `<input name="todelete" value=${data} type="checkbox">`;
            }
        }]
      });
    }

    getwatchsdatatable()