 $(document).ready(function(){
  $('#add_tshirt_type').click(function(e) {
    console.log("add_tshirt_type")
    //let addpropara = globalProduct
    let tmt_name = document.getElementById("tmt_name").value

    //let categories = ["phonecase", "tshirt"]
  
    let keydata = {
      tmt_name
    }
    console.log(keydata)
    fetch(`http://${hosturl}:5600/api/tshirt/addtype`,
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
  let tmtid = result._id
  console.log(result._id)
  //getordersdatatable()
    document.getElementById("tmt_name").value = ""
    // document.getElementById("offer_success_id").innerHTML = "Offer Created Successfully"
      
   
   uploadFile(tmtid)
  
})
.catch(function(res){ console.log(res) })
        });
})


      function activetmtype(activebtn){
    let tmtyperef = activebtn.getAttribute("data-key")
    let tmtypeid = tmtyperef
    let ceditdata = {
      active_status : 1
    }
              fetch(`http://${hosturl}:5600/api/tshirt/edittmtypestatus/${tmtypeid}`,
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
           gettmtypesdatatable()
           // $("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(tmtypeid)
  }

  function deactivetmtype(activebtn){
    let tmtyperef = activebtn.getAttribute("data-key")
    let tmtypeid = tmtyperef
     let ceditdata = {
      active_status : 0
    }
              fetch(`http://${hosturl}:5600/api/tshirt/edittmtypestatus/${tmtypeid}`,
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
            gettmtypesdatatable()
           // uploadFileEdit(keyid)
           // getproducts()
            //$("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(tmtypeid)
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


    function edittshirttypemodal(test){
     // console.log(test)

     // console.log( $('#modal_categories_inc').val() )
     let arrayn = test.getAttribute("data-key")
     console.log("arrayn",arrayn)
      //console.log(okchains[arrayn])
      //console.log(okchains[arrayn].name)
      //document.getElementById("modal_offer_id").value = arrayn

      fetch(`http://${hosturl}:5600/api/tshirt/gettmtbyidadmin/${arrayn}`)
      .then(response => {
     // console.log(response)
     return response.json()})
      .then(data => {
        console.log(data)
      document.getElementById("edit_tmt_id").value = data._id
      document.getElementById("edit_tmt_name").value = data.name
      let sliderimage = data.slider_image
      document.getElementById("edit_tmt_slider_image").src = `http://${hosturl}:5600/admin/uploads/${sliderimage}`
    
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


    function edittshirttype(){
      let tmt_id = document.getElementById("edit_tmt_id").value
    let tmt_name = document.getElementById("edit_tmt_name").value
     let tmtdata = {
      name : tmt_name
    }
      // console.log(keyid)
      console.log("k edit data")
      // console.log(keditdata)

          fetch(`http://${hosturl}:5600/api/tshirt/edittshirtmaintype/${tmt_id}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(tmtdata)
          })
          .then(function(res){ 
            uploadFileEdit(tmt_id)
            //getoffers()
            $("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    }

//random comments
  function uploadFile(tmtid){
    console.log("uploads file")
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("tshirtTypeImage");
    var formData = new FormData(form);
    console.log(formData)

fetch(`http://${hosturl}:5600/api/tshirt/tmtaddimage/${tmtid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  console.log(res)
  gettmtypesdatatable()
  //document.getElementById("successAdded").innerHTML = "Offer successfully added !!!"
 // window.location = "offerlist.html"
 // getoffers()
}).catch(err => console.log(err))

  }


    function uploadFileEdit(tmtid){
    console.log("uploads file")
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("tmtImageEdit");
    var formData = new FormData(form);
    console.log(formData)

fetch(`http://${hosturl}:5600/api/tshirt/tmtaddimage/${tmtid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  console.log(res)
  gettmtypesdatatable()
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


  function filtertshirtmaintypes(){
    let filtertype = document.getElementById("w_type_filter").value

    let filtersubtype = document.getElementById("w_subtype_filter").value
    //let teststatus = okchains.map(a => ({...a}));
    console.log("filtertype", filtertype)
    console.log("filtersubtype", filtersubtype)

    if(filtertype === "All" && filtersubtype === "All"){
      gettmtypesdatatable()
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
      fetch(`http://${hosturl}:5600/api/tshirt/getalltshirtmaintypes`)
    .then(response => {
     // console.log(response)
     return response.json()})
    .then(data => {
          let tmtypes = data.map(a => ({...a}));
      //console.log(okchains)
  let result = tmtypes.filter(i => {
    console.log(i.type_id)
    console.log(filtertyperef)
    return i.type_id === filtertyperef}) ; 
  console.log(result)
  let nresult = JSON.stringify(result)
  console.log(result)
  getfilteredtmtypesdatatable(result)
    })
    .catch(err => console.log(err))
  }

    function filterbysubtype(filtersubtyperef){
      fetch(`http://${hosturl}:5600/api/tshirt/getalltshirtmaintypes`)
    .then(response => {
     // console.log(response)
     return response.json()})
    .then(data => {
          let tmtypes = data.map(a => ({...a}));
      //console.log(okchains)
  let result = tmtypes.filter(i => {
    console.log(i)
    return i.subtype_id === filtersubtyperef}) ; 
  console.log(result)
  let nresult = JSON.stringify(result)
  console.log(result)
  getfilteredtmtypesdatatable(result)
    })
    .catch(err => console.log(err))
  }

      function filterbytypesubtype(filtertyperef ,filtersubtyperef){
      fetch(`http://${hosturl}:5600/api/tshirt/getalltshirtmaintypes`)
    .then(response => {
     // console.log(response)
     return response.json()})
    .then(data => {
          let tmtypes = data.map(a => ({...a}));
      //console.log(okchains)
  let result = tmtypes.filter(i => {
    console.log(i)
    return i.type_id === filtertyperef && i.subtype_id === filtersubtyperef}) ; 
  console.log(result)
  let nresult = JSON.stringify(result)
  console.log(result)
  getfilteredtmtypesdatatable(result)
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

       function gettshirtsubtypes(){
    fetch(`http://${hosturl}:5600/api/tshirt/getalltshirtsubtypes`)
    .then(response => {
     // console.log(response)
     return response.json()})
    .then(data => {
      console.log(data)
      let tshirtsubtypes = data.map(a => ({...a}));
     // globalcompanies = globalcompaniesold.reverse()
      // const tshirttypes = data.map(type => type.name);
      console.log(tshirtsubtypes)
      //companylist(companies)
      populateoptionsub(tshirtsubtypes)
     // CreateTableFromJSONcompany(data)
    })
    .catch(err => console.log(err))
  }

  gettshirtsubtypes()

     function populateoptionsub(options){

  var optionsd = ""
  var optionsdx = ""
  optionsd += '<option value="All"> All </option>'
  for (var i = 0; i < options.length; i++) {
   optionsd += '<option value="' + options[i]._id+ '">' + options[i].name + '</option>';

 }
 $("#w_subtype_filter").html(optionsd);
}
//random comments
        function gettmtypesdatatable(){
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
            "url" : `http://${hosturl}:5600/api/tshirt/getalltshirtmaintypes`,
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
            statuslink = `<a data-key=${data._id} onclick="deactivetmtype(this)" class="dropdown-item">Inactive</a>`
             }
              else {
             outerbutton = `<button type="button" style="margin:5px"  class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown">Deactivated</button>`
             statuslink = `<a data-key=${data._id} onclick="activetmtype(this)"  class="dropdown-item">Active</a>`
             }

              return `<div class="dropdown">${outerbutton}<div class="dropdown-menu">${statuslink}<a onclick="edittshirttypemodal(this)" data-key="${data._id}" class="dropdown-item">Edit</a></div></div>`;
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


            function getfilteredtmtypesdatatable(newData){
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
            statuslink = `<a data-key=${data._id} onclick="deactivetmtype(this)" class="dropdown-item">Inactive</a>`
             }
              else {
             outerbutton = `<button type="button" style="margin:5px"  class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown">Deactivated</button>`
             statuslink = `<a data-key=${data._id} onclick="activetmtype(this)"  class="dropdown-item">Active</a>`
             }

              return `<div class="dropdown">${outerbutton}<div class="dropdown-menu">${statuslink}<a onclick="edittshirttypemodal(this)" data-key="${data._id}" class="dropdown-item">Edit</a></div></div>`;
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



    gettmtypesdatatable()

          
    

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