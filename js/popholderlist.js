function removeFromArray(original, remove) {
  return original.filter(value => !remove.includes(value));
}



  function logOutUser(){
    localStorage.clear();
    window.location  =  "login.html";
  }

function addpopholder(){
  window.location = "addpopholder.html";
}

function filterbytype(){
  console.log("filtering")
  let filtype = document.getElementById("p_type_filter").value
  //let teststatussta = okchains.map(a => ({...a}));
  if(filtype === "All"){
    //console.log(okchains)
    getpopholdersdatatable()
  }
  else {

popholderTable.columns(2).search(filtype, true, false).draw();

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
        document.getElementById("popholder_list_notif").innerHTML = ""
      }
      else {
        document.getElementById("popholder_list_notif").style.color = "red"
        document.getElementById("popholder_list_notif").innerHTML = "Select atleast one popholder !!!"
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

    function uploadFileEdit(popholderid){
    console.log("uploads file")
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("popholderImagesEdit");
    var formData = new FormData(form);

fetch(`http://${hosturl}:5600/api/popholder/addimage/${popholderid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  console.log(res)
   document.getElementById("popholder_list_notif").style.color = "green"
        document.getElementById("popholder_list_notif").innerHTML = "popholder edited successfully !!!"
  getpopholdersdatatable()
  //document.getElementById("popholdersuccessAdded").innerHTML = "Offer successfully added !!!"
 // getoffers()
}).catch(err => console.log(err))

  }


      function detailspopholder(btnpopholder){
    console.log(btnpopholder)
    let popholder_id = btnpopholder.getAttribute('data-key') 
    console.log(popholder_id)

          fetch(`http://${hosturl}:5600/api/popholder/getpopholderbyidadmin/${popholder_id}`)
      .then(response => {
     // console.log(response)
     return response.json()})
      .then(data => {
        console.log(data)
            document.getElementById("name_details_p").innerHTML = data.name
    document.getElementById("price_details_p").innerHTML = data.price
    document.getElementById("size_details_p").innerHTML = data.size
    document.getElementById("description_details_p").innerHTML = data.description
    let headerimagepopholder = data.h_image
    let headerimagepopholdersrc = `http://${hosturl}:5600/admin/uploads/${headerimagepopholder}`
    let shadowimagepopholder = data.shadow_image
    let shadowimagepopholdersrc = `http://${hosturl}:5600/admin/uploads/${shadowimagepopholder}`
    let overlayimagepopholder = data.overlay_image
    let overlayimagesrc = `http://${hosturl}:5600/admin/uploads/${overlayimagepopholder}`
    let maskimagepopholder = data.mask_image
    let maskimagesrc = `http://${hosturl}:5600/admin/uploads/${maskimagepopholder}`
    document.getElementById("image_details_h").src = headerimagepopholdersrc
    document.getElementById("image_details_shadow").src = shadowimagepopholdersrc
    document.getElementById("image_details_overlay").src = overlayimagesrc
    document.getElementById("image_details_mask").src = maskimagesrc

      })
      .catch(err => console.log(err))
  }


  function deletepopholders(){
    console.log("delete")
   // let deleteprotoget = globalProduct
    let todeleteids = printChecked()
    let deleteArray = {
      todeleteids
    }
              fetch(`http://${hosturl}:5600/api/popholder/deletepopholder`,
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
              document.getElementById("popholder_list_notif").style.color = "red"
            document.getElementById("popholder_list_notif").innerHTML = "Selected popholders deleted successfully !!!"
            getpopholdersdatatable()
            //getoffers() 
          })
          .catch(function(res){ console.log(res) })
  }

    function editpopholdermodal(test){
     // console.log(test)

     // console.log( $('#modal_categories_inc').val() )
     let arrayn = test.getAttribute("data-key")
     console.log("arrayn",arrayn)
      //console.log(okchains[arrayn])
      //console.log(okchains[arrayn].name)
      //document.getElementById("modal_offer_id").value = arrayn

      fetch(`http://${hosturl}:5600/api/popholder/getpopholderbyidadmin/${arrayn}`)
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

       globalpopholdernamesarray = globalpopholdernamesarray.filter(name => name !== data.name)

      })
     
      .catch(err => console.log(err))
      //console.log(document.getElementById("modal_id").value)
}


    function editpopholder(){
      let popholder_id = document.getElementById("edit_p_id").value
    let popholder_name = document.getElementById("edit_p_name").value
    let popholder_size = document.getElementById("edit_p_size").value
    let price = document.getElementById("edit_p_price").value
    let description = document.getElementById("edit_p_description").value
    let pick_image_size = document.getElementById("edit_p_pick_image_size").value
   
              let popholdernameexists = validatepopholdernames(popholder_name)
  if(popholdernameexists){
    console.log("validated false", popholdernameexists)
    document.getElementById("edit_popholder_name_exists").style.color = 'red'
    document.getElementById("edit_popholder_name_exists").innerHTML = `name already exists !!!`
    return false
  }

  else {
    document.getElementById("edit_popholder_name_exists").innerHTML = ""
  }
     let popholderdata = {
      name : popholder_name,
      size : popholder_size,
     price,description , pick_image_size
    }
      // console.log(keyid)
      console.log("k edit data")
      // console.log(keditdata)

          fetch(`http://${hosturl}:5600/api/popholder/editpopholder/${popholder_id}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(popholderdata)
          })
          .then(function(res){ 
            uploadFileEdit(popholder_id)
            //getoffers()
            $("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    }


    function getpopholdernames(){
    fetch(`http://${hosturl}:5600/api/popholder/getallpopholdernames`)
    .then(response => {
     // console.log(response)
     return response.json()})
    .then(data => {
     // console.log(data)
      const popholdernames = data.map(popholder => popholder.name);
      globalpopholdernamesarray = popholdernames
     // console.log(globalpopholdernamesarray)
     
    })
    .catch(err => console.log(err))
  }

getpopholdernames()


function validatepopholdernames(popholdername){
  console.log("validating function")
    let lowerpopholderarray = globalpopholdernamesarray.map(popholder => popholder.toLowerCase().trim()) 
  let lowerpopholder = popholdername.toLowerCase().trim()
 let popholdernameexists = lowerpopholderarray.indexOf(lowerpopholder) > -1
 console.log("popholderarray", globalpopholdernamesarray)
 console.log("popholderexists", popholdernameexists)
  return popholdernameexists
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

      function activepopholder(activebtn){
    let popholderref = activebtn.getAttribute("data-key")
    let popholderid = popholderref
    let ceditdata = {
     available_status : 1
    }
              fetch(`http://${hosturl}:5600/api/popholder/editpopholderstatus/${popholderid}`,
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
             $(activebtn).attr("onclick","deactivepopholder(this)");
             let buttonUpdate = $(activebtn).parent().siblings(".btn")
             buttonUpdate.html("Active")
             buttonUpdate.attr("class","btn btn-success btn-sm dropdown-toggle");
        //   getpopholdersdatatable()
           // $("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(popholderid)
  }

  function deactivepopholder(activebtn){
    let popholderref = activebtn.getAttribute("data-key")
    let popholderid = popholderref
     let ceditdata = {
      available_status : 0
    }
              fetch(`http://${hosturl}:5600/api/popholder/editpopholderstatus/${popholderid}`,
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
            $(activebtn).attr("onclick","activepopholder(this)");
            let buttonUpdate = $(activebtn).parent().siblings(".btn")
             buttonUpdate.html("Deactivated")
             buttonUpdate.attr("class","btn btn-danger btn-sm dropdown-toggle");
          //  getpopholdersdatatable()
           // uploadFileEdit(keyid)
           // getproducts()
            //$("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(popholderid)
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

      function getpopholdersdatatable(){
          popholderTable = $('#example1').DataTable({
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
            "url" : `http://${hosturl}:5600/api/popholder/getallpopholders`,
            dataSrc : ''
        },
        "columns" : [ {
            "data" : null
        }, {
            "data" : "name"
            
        },{
            "data" : "popholder_type"
            
        },  {
            "data" : "price"
        },{
            "data" : "create_date",
            "visible":false
        },{
          "data": "_id",
            "mRender": function(data, type) {
             //return data
              return `<button onclick="detailspopholder(this)" style="padding: 1px 5px;" class="btn btn-info btn-sm" data-toggle= "modal" data-target="#detailspopholder" data-key="${data}">view</button>`;
            }
        },  {
          "data": null,
            "mRender": function(data, type) {
             //return data
             let outerbutton = ""
             let statuslink = ""
             if(data.available_status === 1){

            outerbutton = `<button type="button" style="padding: 1px 5px;" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">Active</button>`
            statuslink = `<a data-key=${data._id} onclick="deactivepopholder(this)" class="dropdown-item">Inactive</a>`
             }
              else {
             outerbutton = `<button type="button" style="padding: 1px 5px;"  class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown">Deactivated</button>`
             statuslink = `<a data-key=${data._id} onclick="activepopholder(this)"  class="dropdown-item">Active</a>`
             }

              return `<div class="dropdown">${outerbutton}<div class="dropdown-menu">${statuslink}<a onclick="editpopholdermodal(this)" data-key="${data._id}" class="dropdown-item">Edit</a></div></div>`;
            }
        }, {
          "data": "_id",
            "mRender": function(data, type) {
             
              return `<input name="todelete" value=${data} type="checkbox">`;
            }
        }]
      });
    }

    getpopholdersdatatable()