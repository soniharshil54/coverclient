 $(document).ready(function(){
  $('#add_watch_type').click(function(e) {
    console.log("add_watch_type")
    //let addpropara = globalProduct
    let wt_name = document.getElementById("wt_name").value
    let validatemform = validateaddwatchtypeform()
    if(!validatemform){
      //document.getElementById("mug_success_id").innerHTML = ""
      return false
    }
    //let categories = ["phonecase", "watch"]
  
    let keydata = {
      wt_name
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
  let wtid = result._id
  console.log(result._id)
  //getordersdatatable()
    document.getElementById("wt_name").value = ""
    // document.getElementById("offer_success_id").innerHTML = "Offer Created Successfully"
      
   
   uploadFile(wtid)
  
})
.catch(function(res){ console.log(res) })
        });
})


  function validateaddwatchtypeform(){
    let type_name = document.getElementById("wt_name").value
    let banner_image = $("#bannerImage").val();
    if(type_name == "" || banner_image == "" ){
      console.log("in validateaddwatchtypeform")
      if (type_name == "") {
       // document.getElementById("mval_name_err").innerHTML = "Name is required"
        document.getElementById("wt_name").style.border = "1px solid red"
      }
       if (banner_image == "") {
        document.getElementById("watchtypeval_banner").innerHTML = "Banner image is required"
        //document.getElementById("bannerImage").style.border = "1px solid red"
      }
      else{
        document.getElementById("watchtypeval_banner").innerHTML = ""
      }
      return false
    }
    else{
       document.getElementById("watchtypeval_banner").innerHTML = "Banner image is required"
      return true
    }
 }

  $('input').focus(function(){
    $(this).css('border-color','#80bdff');
});
$('input').blur(function(){
  if (this.value == "") {
    $(this).css('border','1px solid red');
  }
  else{    
    $(this).css('border-color','#ced4da');
  }
});

 //random comments

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
  function deletewatchtypes(){
    console.log("delete")
   // let deleteprotoget = globalProduct
    let todeleteids = printChecked()
    let deleteArray = {
      todeleteids
    }
              fetch(`http://${hosturl}:5600/api/watch/deletewatchtypes`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify(deleteArray)
          })
          .then(function(res){ 
            getwtypesdatatable()
            $("#deleteModal").modal("hide");
            //getoffers() 
          })
          .catch(function(res){ console.log(res) })
  }

     function canceldelete(){
    $("#deleteModal").modal("hide");
  }

    function opendeletemodal(){
    $("#deleteModal").modal("show");
  }


      function activewtype(activebtn){
    let wtyperef = activebtn.getAttribute("data-key")
    let wtypeid = wtyperef
    let ceditdata = {
      active_status : 1
    }
              fetch(`http://${hosturl}:5600/api/watch/editwtypestatus/${wtypeid}`,
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
             $(activebtn).attr("onclick","deactivewtype(this)");
             let buttonUpdate = $(activebtn).parent().siblings(".btn")
             buttonUpdate.html("Active")
             buttonUpdate.attr("class","btn btn-success btn-sm dropdown-toggle");
           //getwtypesdatatable()
           // $("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(wtypeid)
  }

  function deactivewtype(activebtn){
    let wtyperef = activebtn.getAttribute("data-key")
    let wtypeid = wtyperef
     let ceditdata = {
      active_status : 0
    }
              fetch(`http://${hosturl}:5600/api/watch/editwtypestatus/${wtypeid}`,
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
            $(activebtn).attr("onclick","activewtype(this)");
            let buttonUpdate = $(activebtn).parent().siblings(".btn")
             buttonUpdate.html("Deactivated")
             buttonUpdate.attr("class","btn btn-danger btn-sm dropdown-toggle");
           // getwtypesdatatable()
           // uploadFileEdit(keyid)
           // getproducts()
            //$("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(wtypeid)
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

      fetch(`http://${hosturl}:5600/api/watch/getwtbyidadmin/${arrayn}`)
      .then(response => {
     // console.log(response)
     return response.json()})
      .then(data => {
        console.log(data)
      document.getElementById("edit_wt_id").value = data._id
      document.getElementById("edit_wt_name").value = data.name
      let sliderimage = data.slider_image
      document.getElementById("edit_wt_slider_image").src = `http://${hosturl}:5600/admin/uploads/${sliderimage}`
    
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
      let wt_id = document.getElementById("edit_wt_id").value
    let wt_name = document.getElementById("edit_wt_name").value
     let wtdata = {
      name : wt_name
    }
      // console.log(keyid)
      console.log("k edit data")
      // console.log(keditdata)

          fetch(`http://${hosturl}:5600/api/watch/editwatchtype/${wt_id}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(wtdata)
          })
          .then(function(res){ 
            uploadFileEdit(wt_id)
            //getoffers()
            $("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    }


  function uploadFile(wtid){
    console.log("uploads file")
    console.log("wtid",wtid)
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("watchTypeImage");
    var formData = new FormData(form);
    console.log(formData)

fetch(`http://${hosturl}:5600/api/watch/wtaddimage/${wtid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  console.log(res)
  getwtypesdatatable()
  //document.getElementById("successAdded").innerHTML = "Offer successfully added !!!"
 // window.location = "offerlist.html"
 // getoffers()
}).catch(err => console.log(err))

  }

//random comments
    function uploadFileEdit(wtid){
    console.log("uploads file")
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("wtImageEdit");
    var formData = new FormData(form);
    console.log(formData)

fetch(`http://${hosturl}:5600/api/watch/wtaddimage/${wtid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  console.log(res)
  getwtypesdatatable()
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

        function getwtypesdatatable(){
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
            "url" : `http://${hosturl}:5600/api/watch/getallwatchtypes`,
            dataSrc : ''
        },
        "columns" : [ {
            "data" : null
        }, {
            "data" : "name"
            
        }, {
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
            statuslink = `<a data-key=${data._id} onclick="deactivewtype(this)" class="dropdown-item">Inactive</a>`
             }
              else {
             outerbutton = `<button type="button" style="margin:5px"  class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown">Deactivated</button>`
             statuslink = `<a data-key=${data._id} onclick="activewtype(this)"  class="dropdown-item">Active</a>`
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

    getwtypesdatatable()

          
    

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