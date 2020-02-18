function removeFromArray(original, remove) {
  return original.filter(value => !remove.includes(value));
}



  function logOutUser(){
    localStorage.clear();
    window.location  =  "login.html";
  }



function modalofferinputs(offer_type){
  //let offer_type = document.getElementById("modal_offer_type").value
  switch(offer_type) {
  case 'flatdis':
    document.getElementById("modal_flat_discount_div").style.display = "block"
    document.getElementById("modal_categories_inc").disabled = true
    document.getElementById("modal_free_shipping_div").style.display = "none"
    document.getElementById("modal_first_time_div").style.display = "none"
    document.getElementById("modal_buy_div").style.display = "none"
    document.getElementById("modal_get_div").style.display = "none"
    // code block
    break;
  case 'bogo':
    document.getElementById("modal_flat_discount_div").style.display = "none"
    document.getElementById("modal_categories_inc").disabled = false
    document.getElementById("modal_free_shipping_div").style.display = "none"
    document.getElementById("modal_first_time_div").style.display = "none"
    // document.getElementById("modal_buy_div").style.display = "block"
    // document.getElementById("modal_get_div").style.display = "block"
    // code block
    break;
  case 'freeshipping':
    document.getElementById("modal_flat_discount_div").style.display = "none"
    document.getElementById("modal_categories_inc").disabled = true
    document.getElementById("modal_free_shipping_div").style.display = "block"
    document.getElementById("modal_first_time_div").style.display = "none"
    document.getElementById("modal_buy_div").style.display = "none"
    document.getElementById("modal_get_div").style.display = "none"
    // code block
    break;
  case 'firsttime':
    document.getElementById("modal_flat_discount_div").style.display = "none"
    document.getElementById("modal_categories_inc").disabled = true
    document.getElementById("modal_free_shipping_div").style.display = "none"
    document.getElementById("modal_first_time_div").style.display = "block"
    document.getElementById("modal_buy_div").style.display = "none"
    document.getElementById("modal_get_div").style.display = "none"
    // code block
    break;  
  default:
    // code block
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


  function addoffer(){
  window.location = "addoffer.html";
}


    function uploadFileEdit(productid){
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

   function canceldelete(){
    $("#deleteModal").modal("hide");
  }

    function opendeletemodal(){
     let todeleteidsref = printChecked()
      if(todeleteidsref.length > 0){
        $("#deleteModal").modal("show");
        document.getElementById("offer_list_notif").innerHTML = ""
      }
      else {
        document.getElementById("offer_list_notif").style.color = "red"
        document.getElementById("offer_list_notif").innerHTML = "Select atleast one offer !!!"
      }
  } 


  function deleteoffers(){
    console.log("delete")
   // let deleteprotoget = globalProduct
    let todeleteids = printChecked()
    let deleteArray = {
      todeleteids
    }
              fetch(`http://${hosturl}:5600/api/offer/deleteoffer`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify(deleteArray)
          })
          .then(function(res){ 
                document.getElementById("offer_list_notif").style.color = "red"
        document.getElementById("offer_list_notif").innerHTML = "Selected offers deleted !!!"
            getoffersdatatable()
            //getoffers() 
          })
          .catch(function(res){ console.log(res) })
  }

    function editoffermodal(test){
     // console.log(test)

     // console.log( $('#modal_categories_inc').val() )
     let arrayn = test.getAttribute("data-key")
     console.log("arrayn",arrayn)
      //console.log(okchains[arrayn])
      //console.log(okchains[arrayn].name)
      document.getElementById("modal_offer_id").value = arrayn

      fetch(`http://${hosturl}:5600/api/offer/getofferbyid/${arrayn}`)
      .then(response => {
     // console.log(response)
     return response.json()})
      .then(data => {
        console.log(data)

            document.getElementById("modal_offer_id").value = data._id
      //console.log(document.getElementById("modal_id").value)
        let categories = data.categories
      $('#modal_categories_inc').val(categories).trigger('change')
      modalofferinputs(data.offer_type)
      let allowfreeshipmod = data.free_shipping_allow === 1 ? true : false
      let onlyonlinemod = data.only_online === 1 ? true : false
      document.getElementById("modal_offer_type").value = data.offer_type
      document.getElementById("free_shipping_allow_modal").checked = allowfreeshipmod
      document.getElementById("online_payment_modal").checked = onlyonlinemod
      document.getElementById("modal_offer_name").value = data.offer_name
      document.getElementById("modal_max_spend").value = data.max_spend ? data.max_spend : ""
      document.getElementById("modal_min_spend").value = data.min_spend ? data.min_spend : ""
      //document.getElementById("modal_offer_product").value = data.product_name
      document.getElementById("modal_free_shipping").value = data.freeshipping ? data.freeshipping : ""
      document.getElementById("modal_flat_discount").value = data.flat_discount ? data.flat_discount : ""
      document.getElementById("modal_first_time").value = data.firsttime_dis ? data.firsttime_dis : ""
      document.getElementById("modal_buy").value = data.buy_product ? data.buy_product : ""
      document.getElementById("modal_get").value = data.get_product ? data.get_product : ""
      document.getElementById("modal_offer_code").value = data.code ? data.code : ""
      document.getElementById("modal_offer_usage_limit").value = data.usage_limit
        var date = new Date(data.expiry_date);
  field = document.querySelector('#modal_offer_date');
  var day = date.getDate();
  if(day<10){ day="0"+day;}

  var month = date.getMonth()+1;
  if(month<10){ month="0"+month;}

  field.value = date.getFullYear()+"-"+month+"-"+day;
     // document.getElementById("modal_offer_date").value = data.expiry_date
      document.getElementById("modal_offer_terms").value = data.termsnconditions
      let headerimage = data.h_image
      document.getElementById("modal_h_o_image").src = `http://${hosturl}:5600/admin/uploads/${headerimage}`
       $("#myModal").modal('show')

      })
     
      .catch(err => console.log(err))




      //console.log(document.getElementById("modal_id").value)

    }


    function editoffer(){
      // console.log("edit ran")
      //let editprotoget = globalProduct
      let keyid = document.getElementById("modal_offer_id").value
      let offer_name = document.getElementById("modal_offer_name").value
    let offer_type = document.getElementById("modal_offer_type").value
    let code = document.getElementById("modal_offer_code").value
    let expiry_date = document.getElementById("modal_offer_date").value
    let flat_discount = document.getElementById("modal_flat_discount").value
    let firsttime_dis = document.getElementById("modal_first_time").value
    let freeshipping = document.getElementById("modal_free_shipping").value
    let free_shipping_allow_ref = document.getElementById("free_shipping_allow_modal").checked
    let free_shipping_allow = free_shipping_allow_ref ? 1 : 0
    let online_payment_ref = document.getElementById("online_payment_modal").checked
    let online_payment = online_payment_ref ? 1 : 0
    only_online = online_payment
    //let buy_product = document.getElementById("modal_buy").value
    //let get_product = document.getElementById("modal_get").value
    let min_spend = document.getElementById("modal_min_spend").value
    let max_spend = document.getElementById("modal_max_spend").value
    let termsnconditions = document.getElementById("modal_offer_terms").value
    let usage_limit = document.getElementById("modal_offer_usage_limit").value
    //let include_products = document.getElementById("modal_categories_inc")
    let products_ref = $('#modal_categories_inc').val();
      categories = products_ref
   // let exclude_products = document.getElementById("modal_categories_ex")

      let keditdata = {
        offer_name, offer_type, code, expiry_date, flat_discount,firsttime_dis,  freeshipping
        ,min_spend,categories, max_spend,termsnconditions, usage_limit, free_shipping_allow, only_online
      }
      // console.log(keyid)
      console.log("k edit data")
      // console.log(keditdata)

          fetch(`http://${hosturl}:5600/api/offer/editoffer/${keyid}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(keditdata)
          })
          .then(function(res){ 
            uploadFileEdit(keyid)
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

      function activeoffer(activebtn){
    let offerref = activebtn.getAttribute("data-key")
    let offerid = offerref
    let ceditdata = {
      active_status : 1
    }
              fetch(`http://${hosturl}:5600/api/offer/editofferstatus/${offerid}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(ceditdata)
          })
          .then(function(res){ 
            // $(activebtn).html("Inactive");
            //  $(activebtn).attr("onclick","deactiveoffer(this)");
            //  let buttonUpdate = $(activebtn).parent().siblings(".btn")
            //  buttonUpdate.html("Active")
            //  buttonUpdate.attr("class","btn btn-success btn-sm dropdown-toggle");

           getoffersdatatable()
         
 
          })
          .catch(function(res){ console.log(res) })
    console.log(offerid)
  }

  function deactiveoffer(activebtn){
    let offerref = activebtn.getAttribute("data-key")
    let offerid = offerref
     let ceditdata = {
      active_status : 0
    }
              fetch(`http://${hosturl}:5600/api/offer/editofferstatus/${offerid}`,
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
            // $(activebtn).html("Active");
            // $(activebtn).attr("onclick","activeoffer(this)");
            // let buttonUpdate = $(activebtn).parent().siblings(".btn")
            //  buttonUpdate.html("Deactivated")
            //  buttonUpdate.attr("class","btn btn-danger btn-sm dropdown-toggle");
           getoffersdatatable()
           // uploadFileEdit(keyid)
           // getproducts()
            //$("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(offerid)
  }


      function getoffers(){
    fetch(`http://${hosturl}:5600/api/offer/getalloffers`)
    .then(response => {
     // console.log(response)
      return response.json()})
    .then(data => {
      okoffers = data.map(a => ({...a}));
   })
    .catch(err => console.log(err))
}
    

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

      function getoffersdatatable(){
          userTable = $('#example1').DataTable({
            destroy: true,
        "processing" : true,
        "aaSorting": [[ 4, "desc" ]],
          "rowCallback": function (nRow, aData, iDisplayIndex) {
               var oSettings = this.fnSettings ();
               $("td:first", nRow).html(oSettings._iDisplayStart+iDisplayIndex +1);
               return nRow;
          },
        "ajax" : {
            "url" : `http://${hosturl}:5600/api/offer/getalloffers`,
            dataSrc : ''
        },
        "columns" : [ {
            "data" : null
        }, {
            "data" : "offer_name"
            
        }, {
            "data" : "offer_type"
        },{
            "data" : "code"
        },{
            "data" : "create_date",
            "visible":false
        },{
            "data" : "expiry_date",
             "mRender" : function(data, type){
              let date = data.split("T")[0].split("-").reverse().join("-")
              return date
            }
        },{
            "data" : "usage_count"
        }, {
          "data": "_id",
            "mRender": function(data, type) {
             //return data
              return `<button onclick="offerdetailsmodal(this)" style="padding: 1px 5px;" class="btn btn-info btn-sm" data-pid="${data}">view</button>`;
            }
        },  {
          "data": null,
            "mRender": function(data, type) {
             //return data
             let outerbutton = ""
             let statuslink = ""
             if(data.active_status === 1){

            outerbutton = `<button type="button" style="padding: 1px 5px;" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">Active</button>`
            statuslink = `<a data-key=${data._id} onclick="deactiveoffer(this)" class="dropdown-item">Inactive</a>`
             }
              else {
             outerbutton = `<button type="button" style="padding: 1px 5px;"  class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown">Deactivated</button>`
             statuslink = `<a data-key=${data._id} onclick="activeoffer(this)"  class="dropdown-item">Active</a>`
             }

              return `<div class="dropdown">${outerbutton}<div class="dropdown-menu">${statuslink}<a onclick="editoffermodal(this)" data-key="${data._id}" class="dropdown-item">Edit</a></div></div>`;
            }
        }, {
          "data": "_id",
            "mRender": function(data, type) {
             
              return `<input name="todelete" value=${data} type="checkbox">`;
            }
        }]
      });
    }

    getoffersdatatable()