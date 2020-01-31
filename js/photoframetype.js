 $(document).ready(function(){
  $('#add_photoframe_type').click(function(e) {
    console.log("add_photoframe_type")
    //let addpropara = globalProduct
    let pt_name = document.getElementById("pt_name").value
      let validatemform = validateaddphotoframetypeform()
    if(!validatemform){
      //document.getElementById("mug_success_id").innerHTML = ""
      return false
    }
    //let categories = ["phonecase", "photoframe"]
  
    let keydata = {
      pt_name
    }
    console.log(keydata)
    fetch(`http://${hosturl}:5600/api/photoframe/addtype`,
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
  let ptid = result._id
  console.log(result._id)
  //getordersdatatable()
    document.getElementById("pt_name").value = ""
    // document.getElementById("offer_success_id").innerHTML = "Offer Created Successfully"
      
   
   uploadFile(ptid)
  
})
.catch(function(res){ console.log(res) })
        });
})

   function validateaddphotoframetypeform(){
    let type_name = document.getElementById("pt_name").value
    let banner_image = $("#bannerImage").val();
    if(type_name == "" || banner_image == "" ){
      console.log("in validateaddphotoframetypeform")
      if (type_name == "") {
       // document.getElementById("mval_name_err").innerHTML = "Name is required"
        document.getElementById("pt_name").style.border = "1px solid red"
      }
       if (banner_image == "") {
        document.getElementById("photoframetypeval_banner").innerHTML = "Banner image is required"
        //document.getElementById("bannerImage").style.border = "1px solid red"
      }
      else{
        document.getElementById("photoframetypeval_banner").innerHTML = ""
      }
      return false
    }
    else{
       document.getElementById("photoframetypeval_banner").innerHTML = ""
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
  function deletephotoframetypes(){
    console.log("delete")
   // let deleteprotoget = globalProduct
    let todeleteids = printChecked()
    let deleteArray = {
      todeleteids
    }
              fetch(`http://${hosturl}:5600/api/photoframe/deletephotoframetypes`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify(deleteArray)
          })
          .then(function(res){ 
            getptypesdatatable()
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


      function activeptype(activebtn){
    let ptyperef = activebtn.getAttribute("data-key")
    let ptypeid = ptyperef
    let ceditdata = {
      active_status : 1
    }
              fetch(`http://${hosturl}:5600/api/photoframe/editptypestatus/${ptypeid}`,
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
           getptypesdatatable()
           // $("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(ptypeid)
  }

  function deactiveptype(activebtn){
    let ptyperef = activebtn.getAttribute("data-key")
    let ptypeid = ptyperef
     let ceditdata = {
      active_status : 0
    }
              fetch(`http://${hosturl}:5600/api/photoframe/editptypestatus/${ptypeid}`,
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
            getptypesdatatable()
           // uploadFileEdit(keyid)
           // getproducts()
            //$("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(ptypeid)
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


    function editphotoframetypemodal(test){
     // console.log(test)

     // console.log( $('#modal_categories_inc').val() )
     let arrayn = test.getAttribute("data-key")
     console.log("arrayn",arrayn)
      //console.log(okchains[arrayn])
      //console.log(okchains[arrayn].name)
      //document.getElementById("modal_offer_id").value = arrayn

      fetch(`http://${hosturl}:5600/api/photoframe/getptbyidadmin/${arrayn}`)
      .then(response => {
     // console.log(response)
     return response.json()})
      .then(data => {
        console.log(data)
      document.getElementById("edit_pt_id").value = data._id
      document.getElementById("edit_pt_name").value = data.name
      let sliderimage = data.slider_image
      document.getElementById("edit_pt_slider_image").src = `http://${hosturl}:5600/admin/uploads/${sliderimage}`
    
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


    function editphotoframetype(){
      let pt_id = document.getElementById("edit_pt_id").value
    let pt_name = document.getElementById("edit_pt_name").value
     let ptdata = {
      name : pt_name
    }
      // console.log(keyid)
      console.log("k edit data")
      // console.log(keditdata)

          fetch(`http://${hosturl}:5600/api/photoframe/editphotoframetype/${pt_id}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(ptdata)
          })
          .then(function(res){ 
            uploadFileEdit(pt_id)
            //getoffers()
            $("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    }


  function uploadFile(ptid){
    console.log("uploads file")
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("photoframeTypeImage");
    var formData = new FormData(form);
    console.log(formData)

fetch(`http://${hosturl}:5600/api/photoframe/ptaddimage/${ptid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  console.log(res)
  getptypesdatatable()
  //document.getElementById("successAdded").innerHTML = "Offer successfully added !!!"
 // window.location = "offerlist.html"
 // getoffers()
}).catch(err => console.log(err))

  }


    function uploadFileEdit(ptid){
    console.log("uploads file")
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("ptImageEdit");
    var formData = new FormData(form);
    console.log(formData)

fetch(`http://${hosturl}:5600/api/photoframe/ptaddimage/${ptid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  console.log(res)
  getptypesdatatable()
  //document.getElementById("successAdded").innerHTML = "Offer successfully added !!!"
 // window.location = "offerlist.html"
 // getoffers()
}).catch(err => console.log(err))

  }



        function getptypesdatatable(){
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
            "url" : `http://${hosturl}:5600/api/photoframe/getallphotoframetypes`,
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
            statuslink = `<a data-key=${data._id} onclick="deactiveptype(this)" class="dropdown-item">Inactive</a>`
             }
              else {
             outerbutton = `<button type="button" style="margin:5px"  class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown">Deactivated</button>`
             statuslink = `<a data-key=${data._id} onclick="activeptype(this)"  class="dropdown-item">Active</a>`
             }

              return `<div class="dropdown">${outerbutton}<div class="dropdown-menu">${statuslink}<a onclick="editphotoframetypemodal(this)" data-key="${data._id}" class="dropdown-item">Edit</a></div></div>`;
            }
        }
        , {
          "data": "_id",
            "mRender": function(data, type) {
             
              return `<input name="todelete" value=${data} type="checkbox">`;
            }
        }
        ]
      });
    }

    getptypesdatatable()

          
    

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