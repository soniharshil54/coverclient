 $(document).ready(function(){
  $('#add_watch_type').click(function(e) {
    console.log("add_watch_type")
    //let addpropara = globalProduct
    let wmt_name = document.getElementById("wmt_name").value

    //let categories = ["phonecase", "watch"]
  
    let keydata = {
      wmt_name
    }
    console.log(keydata)
    fetch(`http://${hosturl}:5600/api/watch/addtype`,
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(keydata)
})
.then(function(res){ 
  return res.json()
  })
.then(function(result){
  console.log(result)
  let wmtid = result._id
  console.log(result._id)
  //getordersdatatable()
    document.getElementById("wmt_name").value = ""
    // document.getElementById("offer_success_id").innerHTML = "Offer Created Successfully"
      
   
   uploadFile(wmtid)
  
})
.catch(function(res){ console.log(res) })
        });
})


      function activewmtype(activebtn){
    let wmtyperef = activebtn.getAttribute("data-key")
    let wmtypeid = wmtyperef
    let ceditdata = {
      active_status : 1
    }
              fetch(`http://${hosturl}:5600/api/watch/editwmtypestatus/${wmtypeid}`,
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
             $(activebtn).attr("onclick","deactivewmtype(this)");
             let buttonUpdate = $(activebtn).parent().siblings(".btn")
             buttonUpdate.html("Active")
             buttonUpdate.attr("class","btn btn-success btn-sm dropdown-toggle");
           //getwmtypesdatatable()
           // $("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(wmtypeid)
  }

  function deactivewmtype(activebtn){
    let wmtyperef = activebtn.getAttribute("data-key")
    let wmtypeid = wmtyperef
     let ceditdata = {
      active_status : 0
    }
              fetch(`http://${hosturl}:5600/api/watch/editwmtypestatus/${wmtypeid}`,
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
            $(activebtn).attr("onclick","activewmtype(this)");
            let buttonUpdate = $(activebtn).parent().siblings(".btn")
             buttonUpdate.html("Deactivated")
             buttonUpdate.attr("class","btn btn-danger btn-sm dropdown-toggle");
           // getwmtypesdatatable()
           // uploadFileEdit(keyid)
           // getproducts()
            //$("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(wmtypeid)
  }


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


    function editwatchtypemodal(test){
     // console.log(test)

     // console.log( $('#modal_categories_inc').val() )
     let arrayn = test.getAttribute("data-key")
     console.log("arrayn",arrayn)
      //console.log(okchains[arrayn])
      //console.log(okchains[arrayn].name)
      //document.getElementById("modal_offer_id").value = arrayn

      fetch(`http://${hosturl}:5600/api/watch/getwmtbyidadmin/${arrayn}`)
      .then(response => {
     // console.log(response)
     return response.json()})
      .then(data => {
        console.log(data)
      document.getElementById("edit_wmt_id").value = data._id
      document.getElementById("edit_wmt_name").value = data.name
      let sliderimage = data.slider_image
      document.getElementById("edit_wmt_slider_image").src = `http://${hosturl}:5600/admin/uploads/${sliderimage}`
    
       $("#myModal").modal('show')

      })
     
      .catch(err => console.log(err))
      //console.log(document.getElementById("modal_id").value)
}

function openimagemodal(imgpath){
  let sliderimgsource = `http://${hosturl}:5600/admin/uploads/${imgpath}`
  document.getElementById("imgModal").src = sliderimgsource
  $("#imageModal").modal('show')
}


    function editwatchtype(){
      let wmt_id = document.getElementById("edit_wmt_id").value
    let wmt_name = document.getElementById("edit_wmt_name").value
     let wmtdata = {
      name : wmt_name
    }
      // console.log(keyid)
      console.log("k edit data")
      // console.log(keditdata)

          fetch(`http://${hosturl}:5600/api/watch/editwatchmaintype/${wmt_id}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(wmtdata)
          })
          .then(function(res){ 
            uploadFileEdit(wmt_id)
            //getoffers()
            $("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    }

//random comments
  function uploadFile(wmtid){
    console.log("uploads file")
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("watchTypeImage");
    var formData = new FormData(form);
    console.log(formData)

fetch(`http://${hosturl}:5600/api/watch/wmtaddimage/${wmtid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  console.log(res)
  getwmtypesdatatable()
  //document.getElementById("successAdded").innerHTML = "Offer successfully added !!!"
 // window.location = "offerlist.html"
 // getoffers()
}).catch(err => console.log(err))

  }


    function uploadFileEdit(wmtid){
    console.log("uploads file")
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("wmtImageEdit");
    var formData = new FormData(form);
    console.log(formData)

fetch(`http://${hosturl}:5600/api/watch/wmtaddimage/${wmtid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  console.log(res)
  getwmtypesdatatable()
  //document.getElementById("successAdded").innerHTML = "Offer successfully added !!!"
 // window.location = "offerlist.html"
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


  function filterwatchmaintypes(){
    let filtertype = document.getElementById("w_type_filter").value

    let filtersubtype = document.getElementById("w_subtype_filter").value
    //let teststatus = okchains.map(a => ({...a}));
    console.log("filtertype", filtertype)
    console.log("filtersubtype", filtersubtype)

    if(filtertype === "All" && filtersubtype === "All"){
      getwmtypesdatatable()
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
      fetch(`http://${hosturl}:5600/api/watch/getallwatchmaintypes`)
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
  getfilteredwmtypesdatatable(result)
    })
    .catch(err => console.log(err))
  }

    function filterbysubtype(filtersubtyperef){
      fetch(`http://${hosturl}:5600/api/watch/getallwatchmaintypes`)
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
  getfilteredwmtypesdatatable(result)
    })
    .catch(err => console.log(err))
  }

      function filterbytypesubtype(filtertyperef ,filtersubtyperef){
      fetch(`http://${hosturl}:5600/api/watch/getallwatchmaintypes`)
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
  getfilteredwmtypesdatatable(result)
    })
    .catch(err => console.log(err))
  }

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
//random comments
        function getwmtypesdatatable(){
          let userTable = $('#example1').DataTable({
            destroy: true,
        "processing" : true,
        "aaSorting": [[ 5, "desc" ]],
          "rowCallback": function (nRow, aData, iDisplayIndex) {
               var oSettings = this.fnSettings ();
               $("td:first", nRow).html(oSettings._iDisplayStart+iDisplayIndex +1);
               return nRow;
          },
        "ajax" : {
            "url" : `http://${hosturl}:5600/api/watch/getallwatchmaintypes`,
            dataSrc : ''
        },
        "columns" : [ {
            "data" : null
        }, {
            "data" : "name"
            
        },  {
            "data" : "type_name"
            
        }, {
            "data" : "subtype_name"
            
        },{
            "data" : "slider_image",
               "mRender": function(data, type) {
             //return data
              return `<button onclick="openimagemodal('${data}')" style="padding: 1px 1px; margin:5px" class="btn btn-info btn-sm" data-pid="${data}">view</button>`;
            }
        },{
            "data" : "create_date",
            "visible":false
        }, {
          "data": null,
            "mRender": function(data, type) {
             //return data
             let outerbutton = ""
             let statuslink = ""
             if(data.active_status === 1){

            outerbutton = `<button type="button" style="margin:5px" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">Active</button>`
            statuslink = `<a data-key=${data._id} onclick="deactivewmtype(this)" class="dropdown-item">Inactive</a>`
             }
              else {
             outerbutton = `<button type="button" style="margin:5px"  class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown">Deactivated</button>`
             statuslink = `<a data-key=${data._id} onclick="activewmtype(this)"  class="dropdown-item">Active</a>`
             }

              return `<div class="dropdown">${outerbutton}<div class="dropdown-menu">${statuslink}<a onclick="editwatchtypemodal(this)" data-key="${data._id}" class="dropdown-item">Edit</a></div></div>`;
            }
        }
        // , {
        //   "data": "_id",
        //     "mRender": function(data, type) {
             
        //       return `<input name="todelete" value=${data} type="checkbox">`;
        //     }
        // }
        ]
      });
    }


            function getfilteredwmtypesdatatable(newData){
          let userTable = $('#example1').DataTable({
            destroy: true,
        "processing" : true,
        "aaSorting": [[ 5, "desc" ]],
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
            
        },  {
            "data" : "type_name"
            
        }, {
            "data" : "subtype_name"
            
        },{
            "data" : "slider_image",
               "mRender": function(data, type) {
             //return data
              return `<button onclick="openimagemodal('${data}')" style="padding: 1px 1px; margin:5px" class="btn btn-info" data-pid="${data}">view</button>`;
            }
        },{
            "data" : "create_date",
            "visible":false
        }, {
          "data": null,
            "mRender": function(data, type) {
             //return data
             let outerbutton = ""
             let statuslink = ""
             if(data.active_status === 1){

            outerbutton = `<button type="button" style="margin:5px" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">Active</button>`
            statuslink = `<a data-key=${data._id} onclick="deactivewmtype(this)" class="dropdown-item">Inactive</a>`
             }
              else {
             outerbutton = `<button type="button" style="margin:5px"  class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown">Deactivated</button>`
             statuslink = `<a data-key=${data._id} onclick="activewmtype(this)"  class="dropdown-item">Active</a>`
             }

              return `<div class="dropdown">${outerbutton}<div class="dropdown-menu">${statuslink}<a onclick="editwatchtypemodal(this)" data-key="${data._id}" class="dropdown-item">Edit</a></div></div>`;
            }
        }
        // , {
        //   "data": "_id",
        //     "mRender": function(data, type) {
             
        //       return `<input name="todelete" value=${data} type="checkbox">`;
        //     }
        // }
        ]
      });
    }



    getwmtypesdatatable()

          
    

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