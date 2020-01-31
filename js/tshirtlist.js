function removeFromArray(original, remove) {
  return original.filter(value => !remove.includes(value));
}



  function logOutUser(){
    localStorage.clear();
    window.location  =  "login.html";
  }

function addtshirt(){
  window.location = "addtshirt.html";
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
    $("#deleteModal").modal("show");
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

    function uploadFileEdit(tshirtid){
    console.log("uploads file")
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("tshirtImagesEdit");
    var formData = new FormData(form);

fetch(`http://${hosturl}:5600/api/tshirt/addimage/${tshirtid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  console.log(res)
  gettshirtsdatatable()
  //document.getElementById("tshirtsuccessAdded").innerHTML = "Offer successfully added !!!"
 // getoffers()
}).catch(err => console.log(err))

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

    function filtertshirtmaintypes(){
    let filtertype = document.getElementById("w_type_filter").value

    let filtersubtype = document.getElementById("w_subtype_filter").value
    //let teststatus = okchains.map(a => ({...a}));
    console.log("filtertype", filtertype)
    console.log("filtersubtype", filtersubtype)

    if(filtertype === "All" && filtersubtype === "All"){
      gettshirtsdatatable()
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
      fetch(`http://${hosturl}:5600/api/tshirt/getalltshirts`)
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
  getfilteredtshirtsdatatable(result)
    })
    .catch(err => console.log(err))
  }

    function filterbysubtype(filtersubtyperef){
      fetch(`http://${hosturl}:5600/api/tshirt/getalltshirts`)
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
  getfilteredtshirtsdatatable(result)
    })
    .catch(err => console.log(err))
  }

      function filterbytypesubtype(filtertyperef ,filtersubtyperef){
      fetch(`http://${hosturl}:5600/api/tshirt/getalltshirts`)
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
  getfilteredtshirtsdatatable(result)
    })
    .catch(err => console.log(err))
  }


      function detailstshirt(btntshirt){
    console.log(btntshirt)
    let tshirt_id = btntshirt.getAttribute('data-key') 
    console.log(tshirt_id)

          fetch(`http://${hosturl}:5600/api/tshirt/gettshirtbyidadmin/${tshirt_id}`)
      .then(response => {
     // console.log(response)
     return response.json()})
      .then(data => {
        console.log(data)
            document.getElementById("name_details_p").innerHTML = data.name
    document.getElementById("price_details_p").innerHTML = data.price
    document.getElementById("size_details_p").innerHTML = data.size
    document.getElementById("description_details_p").innerHTML = data.description
    let headerimagetshirt = data.h_image
    let headerimagetshirtsrc = `http://${hosturl}:5600/admin/uploads/${headerimagetshirt}`
    let shadowimagetshirt = data.shadow_image
    let shadowimagetshirtsrc = `http://${hosturl}:5600/admin/uploads/${shadowimagetshirt}`
    let overlayimagetshirt = data.overlay_image
    let overlayimagesrc = `http://${hosturl}:5600/admin/uploads/${overlayimagetshirt}`
    let maskimagetshirt = data.mask_image
    let maskimagesrc = `http://${hosturl}:5600/admin/uploads/${maskimagetshirt}`
    document.getElementById("image_details_h").src = headerimagetshirtsrc
    document.getElementById("image_details_shadow").src = shadowimagetshirtsrc
    document.getElementById("image_details_overlay").src = overlayimagesrc
    document.getElementById("image_details_mask").src = maskimagesrc

      })
      .catch(err => console.log(err))
  }


  function deletetshirts(){
    console.log("delete")
   // let deleteprotoget = globalProduct
    let todeleteids = printChecked()
    let deleteArray = {
      todeleteids
    }
              fetch(`http://${hosturl}:5600/api/tshirt/deletetshirt`,
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
            gettshirtsdatatable()
            //getoffers() 
          })
          .catch(function(res){ console.log(res) })
  }

    function edittshirtmodal(test){
     // console.log(test)

     // console.log( $('#modal_categories_inc').val() )
     let arrayn = test.getAttribute("data-key")
     console.log("arrayn",arrayn)
      //console.log(okchains[arrayn])
      //console.log(okchains[arrayn].name)
      //document.getElementById("modal_offer_id").value = arrayn

      fetch(`http://${hosturl}:5600/api/tshirt/gettshirtbyidadmin/${arrayn}`)
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
       $("#myModal").modal('show')

      })
     
      .catch(err => console.log(err))
      //console.log(document.getElementById("modal_id").value)
}


    function edittshirt(){
      let tshirt_id = document.getElementById("edit_p_id").value
    let tshirt_name = document.getElementById("edit_p_name").value
    let tshirt_size = document.getElementById("edit_p_size").value
    let price = document.getElementById("edit_p_price").value
    let description = document.getElementById("edit_p_description").value
    let pick_image_size = document.getElementById("edit_p_pick_image_size").value
     let tshirtdata = {
      name : tshirt_name,
      size : tshirt_size,
     price,description , pick_image_size
    }
      // console.log(keyid)
      console.log("k edit data")
      // console.log(keditdata)

          fetch(`http://${hosturl}:5600/api/tshirt/edittshirt/${tshirt_id}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(tshirtdata)
          })
          .then(function(res){ 
            uploadFileEdit(tshirt_id)
            //getoffers()
            $("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
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

      function activetshirt(activebtn){
    let tshirtref = activebtn.getAttribute("data-key")
    let tshirtid = tshirtref
    let ceditdata = {
     available_status : 1
    }
              fetch(`http://${hosturl}:5600/api/tshirt/edittshirtstatus/${tshirtid}`,
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
           gettshirtsdatatable()
           // $("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(tshirtid)
  }

  function deactivetshirt(activebtn){
    let tshirtref = activebtn.getAttribute("data-key")
    let tshirtid = tshirtref
     let ceditdata = {
      available_status : 0
    }
              fetch(`http://${hosturl}:5600/api/tshirt/edittshirtstatus/${tshirtid}`,
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
            gettshirtsdatatable()
           // uploadFileEdit(keyid)
           // getproducts()
            //$("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(tshirtid)
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

      function gettshirtsdatatable(){
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
            "url" : `http://${hosturl}:5600/api/tshirt/getalltshirts`,
            dataSrc : ''
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
              return `<button onclick="detailstshirt(this)" style="padding: 1px 1px; margin:5px" class="btn btn-info" data-toggle= "modal" data-target="#detailstshirt" data-key="${data}">view</button>`;
            }
        },  {
          "data": null,
            "mRender": function(data, type) {
             //return data
             let outerbutton = ""
             let statuslink = ""
             if(data.available_status === 1){

            outerbutton = `<button type="button" style="margin:5px" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">Active</button>`
            statuslink = `<a data-key=${data._id} onclick="deactivetshirt(this)" class="dropdown-item">Inactive</a>`
             }
              else {
             outerbutton = `<button type="button" style="margin:5px"  class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown">Deactivated</button>`
             statuslink = `<a data-key=${data._id} onclick="activetshirt(this)"  class="dropdown-item">Active</a>`
             }

              return `<div class="dropdown">${outerbutton}<div class="dropdown-menu">${statuslink}<a onclick="edittshirtmodal(this)" data-key="${data._id}" class="dropdown-item">Edit</a></div></div>`;
            }
        }, {
          "data": "_id",
            "mRender": function(data, type) {
             
              return `<input name="todelete" value=${data} type="checkbox">`;
            }
        }]
      });
    }

          function getfilteredtshirtsdatatable(newData){
          let userTable = $('#example1').DataTable({
            destroy: true,
        "processing" : true,
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
              return `<button onclick="detailstshirt(this)" style="padding: 1px 1px; margin:5px" class="btn btn-info" data-toggle= "modal" data-target="#detailstshirt" data-key="${data}">view</button>`;
            }
        },  {
          "data": null,
            "mRender": function(data, type) {
             //return data
             let outerbutton = ""
             let statuslink = ""
             if(data.available_status === 1){

            outerbutton = `<button type="button" style="margin:5px" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">Active</button>`
            statuslink = `<a data-key=${data._id} onclick="deactivetshirt(this)" class="dropdown-item">Inactive</a>`
             }
              else {
             outerbutton = `<button type="button" style="margin:5px"  class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown">Deactivated</button>`
             statuslink = `<a data-key=${data._id} onclick="activetshirt(this)"  class="dropdown-item">Active</a>`
             }

              return `<div class="dropdown">${outerbutton}<div class="dropdown-menu">${statuslink}<a onclick="edittshirtmodal(this)" data-key="${data._id}" class="dropdown-item">Edit</a></div></div>`;
            }
        }, {
          "data": "_id",
            "mRender": function(data, type) {
             
              return `<input name="todelete" value=${data} type="checkbox">`;
            }
        }]
      });
    }

    gettshirtsdatatable()