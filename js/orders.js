$('#cart_p_image').on('click', function () {
    $.ajax({
        url: `http://${hosturl}:5600/admin/uploads/${productGimagefull}`,
        method: 'GET',
        xhrFields: {
            responseType: 'blob'
        },
        success: function (data) {
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(data);
            a.href = url;
            a.download = productGimagefull;
            document.body.append(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        }
    });
});

$('#cart_p_c_image').on('click', function () {
    $.ajax({
        url: `http://${hosturl}:5600/admin/uploads/${productGimagecropped}`,
        method: 'GET',
        xhrFields: {
            responseType: 'blob'
        },
        success: function (data) {
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(data);
            a.href = url;
            a.download = productGimagecropped;
            document.body.append(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        }
    });
});

$('#cart_p_image_2').on('click', function () {
    $.ajax({
        url: `http://${hosturl}:5600/admin/uploads/${productGimagefull_2}`,
        method: 'GET',
        xhrFields: {
            responseType: 'blob'
        },
        success: function (data) {
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(data);
            a.href = url;
            a.download = productGimagefull_2;
            document.body.append(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        }
    });
});

$('#cart_p_c_image_2').on('click', function () {
    $.ajax({
        url: `http://${hosturl}:5600/admin/uploads/${productGimagecropped_2}`,
        method: 'GET',
        xhrFields: {
            responseType: 'blob'
        },
        success: function (data) {
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(data);
            a.href = url;
            a.download = productGimagecropped_2;
            document.body.append(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        }
    });
});

$('#cartProductModal').on('hidden.bs.modal', function () {
  console.log("it worked")
   document.getElementById("cart_p_image").src = `images/3dloader.gif`
        document.getElementById("cart_p_c_image").src = `images/3dloader.gif`

});


  function filterdatecustom(){
    let filterrange = document.getElementById("filter_range").value
    if(filterrange === "Custom"){
      document.getElementById("fromdatediv").style.display = "block"
      document.getElementById("todatediv").style.display = "block"
    }
    else {
            document.getElementById("fromdatediv").style.display = "none"
      document.getElementById("todatediv").style.display = "none"
    }
  }

  function filtercustomrange(){
let start_date_ref = document.getElementById("report_start").value
let end_date_ref = document.getElementById("report_end").value
let start_date = new Date(start_date_ref)
let end_date = new Date(end_date_ref)
end_date.setDate(end_date.getDate() + 1); 
    let reportref = okreport.map(a => ({...a}))
  let totalsales = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref >= start_date && dateref <= end_date
          }).map(a => a.amount).reduce((a,b) => a + b, 0  )
  let refundedamount = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref >= start_date && dateref <= end_date && a.order_status === "Refunded"
          }).map(a => a.amount).reduce((a,b) => a + b, 0  )
  let pendingamount = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref >= start_date && dateref <= end_date && a.order_status === "Pending Payment"
          }).map(a => a.amount).reduce((a,b) => a + b, 0  )
  let shippingcharge = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref >= start_date && dateref <= end_date
          }).map(a => a.shipping).reduce((a,b) => a + b, 0  )
  let ordersplaced = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref >= start_date && dateref <= end_date
          }).length
  let itemspurchased = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref >= start_date && dateref <= end_date
          }).map(a =>  a.products.length).reduce((a,b) => a + b, 0)
      let couponamount = reportref.filter(a => {
       let dateref = new Date(a.date_ordered);
       return dateref >= start_date && dateref <= end_date
     }).map(a => {
      let amountconsole = a.coupon_amount ? a.coupon_amount : 0
      console.log("amount coupon", amountconsole)
      return amountconsole}).reduce((a,b) => a + b, 0  )
  //let totalsalesred = totalsales.reduce((a,b) => a + b )
  //console.log(totalsalesred)
  document.getElementById('totalsales_r').innerHTML =  `₹ ${totalsales}`
  document.getElementById('couponamount_r').innerHTML =  `₹ ${couponamount}`
  document.getElementById('refunded_r').innerHTML =  `₹ ${refundedamount}`
  document.getElementById('pendingamount_r').innerHTML =  `₹ ${pendingamount}`
  document.getElementById('shippingcharges_r').innerHTML =  `₹ ${shippingcharge}`
  document.getElementById('ordersplaced_r').innerHTML = ordersplaced
  document.getElementById('itemspurchased_r').innerHTML = itemspurchased
  console.log(totalsales)
  console.log(refundedamount)
  console.log(pendingamount)
  console.log(shippingcharge)
}

function showcustomrange(){
document.getElementById("customdate-filter").style.display = "inline"
}


function reportlogics(duration){
  globalfiltertype = duration
 let filtertype = duration
 getordersdatatable(filtertype)
}

function filterbystatus(){
  console.log("filtering")
  let filstatus = document.getElementById("sel_status").value
  //let teststatussta = okchains.map(a => ({...a}));
  if(filstatus === "All"){
    //console.log(okchains)
    orderTable.columns(7).search('', true, false).draw();
  }
  else {

console.log("its in else", filstatus)

orderTable.columns(7).search(filstatus, true, false).draw();

  
  }

}



  function filterorders(){
    let filterdaterange = document.getElementById("filter_range").value
    let filterstatus = document.getElementById("sel_status").value
    let teststatus = okchains.map(a => ({...a}));
    if (filterdaterange === "All") {
      filterbystatus()
    }
    else if(filterstatus === "All") {
      filterbydate()
    }
    else {
          var ddate = new Date(2019, 7, 25);
          ddate.setFullYear(ddate.getFullYear() - 5);
          var dateNow = new Date()
          let startDate = ""
          let endDate = ""
          var Yesterdaydate = new Date(Date.now() - 86400000);
          let ldaybyes = 86400000*2
          let daybeforeyesterday = new Date(Date.now() - ldaybyes);
          let lastweekseconds = 86400000*7
          var lastweekdate = new Date(Date.now() - lastweekseconds);
          let lastmonthsecs = 8640000*30
          var lastmonthdate = new Date(Date.now() - lastmonthsecs);
          var tomorrowsdate = new Date(Date.now() + 86400000);
          let filterrange = document.getElementById("filter_range").value
          if(filterrange === "Today"){
            startDate = Yesterdaydate
            endDate = dateNow
          }
          else if(filterrange === "Yesterday"){
            startDate = daybeforeyesterday
            endDate = Yesterdaydate
          }
          else if(filterrange === "Last Week"){
            startDate = lastweekdate
            endDate = dateNow 
          }
          else if(filterrange === "Last Month"){
            startDate = lastmonthdate
            endDate = dateNow
          }
          else{
            let startdatecustom = document.getElementById("from_date_c").value
            let enddatecustom = document.getElementById("to_date_c").value
            startDate = new Date(startdatecustom)  
            endDate = new Date(enddatecustom) 

          }
          var aDate = new Date();
          var filteredData = teststatus.filter(function(a){
          let onlydateto = a.date_ordered.split('T')[0]
          aDate = new Date(onlydateto);
          console.log("aDate: "+aDate);
          console.log("startDate: "+Yesterdaydate);
          console.log("endDate: "+tomorrowsdate);
          return aDate >= startDate && aDate <= endDate && a.order_status === filterstatus;
          });
          console.log(filteredData)
          getfilteredordersdatatable(filteredData)
    }

  }

  function opendeletemodal(){
    $("#deleteModal").modal("show");
  }

      function filterbystatusold(){
  console.log("filtering")
  let filstatus = document.getElementById("sel_status").value
  //let teststatussta = okchains.map(a => ({...a}));
  if(filstatus === "All"){
    console.log(okchains)
    getfilteredordersdatatable(okchains)
  }
  else {
      let teststatussta = okchains.map(a => ({...a}));
      //console.log(okchains)
  let result = teststatussta.filter(i => {
    console.log(i)
    return i.order_status === filstatus}) ; 
  console.log(result)
  let nresult = JSON.stringify(result)
  console.log(result)
  getfilteredordersdatatable(result)
  }

}



  function filterbydate(){
    var ddate = new Date(2019, 7, 25);
ddate.setFullYear(ddate.getFullYear() - 5);
    var dateNow = new Date()
    let startDate = ""
    let endDate = ""
        var Yesterdaydate = new Date(Date.now() - 86400000);
    let ldaybyes = 86400000*2
    let daybeforeyesterday = new Date(Date.now() - ldaybyes);
    let lastweekseconds = 86400000*7
    var lastweekdate = new Date(Date.now() - lastweekseconds);
    let lastmonthsecs = 8640000*30
    var lastmonthdate = new Date(Date.now() - lastmonthsecs);
    var tomorrowsdate = new Date(Date.now() + 86400000);
    let filterrange = document.getElementById("filter_range").value
    if(filterrange === "Today"){
      startDate = Yesterdaydate
      endDate = dateNow
    }
    else if(filterrange === "Yesterday"){
      startDate = daybeforeyesterday
      endDate = Yesterdaydate
    }
    else if(filterrange === "Last Week"){
      startDate = lastweekdate
      endDate = dateNow 
    }
    else if(filterrange === "Last Month"){
      startDate = lastmonthdate
      endDate = dateNow
    }
    else if(filterrange === "All"){
      startDate = ddate
      endDate = dateNow
    }
    else{
      let startdatecustom = document.getElementById("from_date_c").value
      let enddatecustom = document.getElementById("to_date_c").value
      startDate = new Date(startdatecustom)  
      endDate = new Date(enddatecustom) 
    }
    var aDate = new Date();
    let teststatusdate = okchains.map(a => ({...a}));
    var filteredData = teststatusdate.filter(function(a){
    let onlydateto = a.date_ordered.split('T')[0]
    aDate = new Date(onlydateto);
    console.log("aDate: "+aDate);
    console.log("startDate: "+Yesterdaydate);
    console.log("endDate: "+tomorrowsdate);
    return aDate >= startDate && aDate <= endDate;
    });
  console.log(filteredData)
  getfilteredordersdatatable(filteredData)
  }

  function getYesterdaysDate() {
    var date = new Date();
    date.setDate(date.getDate()-1);
    return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
}




  function toDataURL(url) {
    return fetch(url).then((response) => {
            return response.blob();
        }).then(blob => {
            return URL.createObjectURL(blob);
        });
}


// async function download() {
//         const a = document.createElement("a");
//         a.href = await toDataURL("https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png");
//         a.download = "myImage.png";
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
// }

  function getQueryStringValue (key) {  
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}

  function logOutUser(){
    localStorage.clear();
    window.location  =  "login.html";
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



  function getordercsvdata(oldorderjson){
    let oldorderref = oldorderjson.map(a => ({...a}))
    let ordercsv = oldorderref.map(order => {
      let productsref = order.products
      let productsstr = ""
      for(let i =0; i < productsref.length; i++){
        let prostr = `${productsref[i].product_name} (${productsref[i].quantity}) | `
        productsstr += prostr
      }
      order.productsdata = productsstr
      order.first_name = order.user_id.first_name
      order.last_name = order.user_id.last_name
      order.contact = order.user_id.contact
      order.email_id = order.user_id.email_id
      order.state = order.user_id.state
      order.address = order.user_id.address.replace(/,/g, '-')
      order.city = order.user_id.city
      order.pincode = order.user_id.pincode

      //delete keychain._id
      delete order.__v
      delete order._id
      delete order.products
      delete order.user_id
      delete order.is_paid
      delete order.is_delivered
      return order
    })
    //console.log(newkeychains)
    var ordercsvordered = JSON.parse(JSON.stringify( ordercsv, ["order_id","productsdata","date_ordered","payment_type","first_name","last_name","email_id","contact","address","state","city","pincode","sub_total","gst_tax","shipping","amount"]));
    return ordercsvordered
  }


    function getordercsvdatanew(oldorderjson){
    let oldorderref = oldorderjson.map(a => ({...a}))
    let ordercsv = []
    for(i=0; i < oldorderref.length; i++){
      let products = oldorderref[i].products
      oldorderref[i].first_name = oldorderref[i].user_id.first_name
      oldorderref[i].last_name = oldorderref[i].user_id.last_name
      oldorderref[i].contact = oldorderref[i].user_id.contact
      oldorderref[i].email_id = oldorderref[i].user_id.email_id
      oldorderref[i].state = oldorderref[i].user_id.state
      oldorderref[i].address = oldorderref[i].user_id.address.replace(/,/g, '-')
      oldorderref[i].city = oldorderref[i].user_id.city
      oldorderref[i].pincode = oldorderref[i].user_id.pincode
      //delete oldorderref[i].user_id
      delete oldorderref[i].is_paid
      delete oldorderref[i].is_delivered
      for(j =0; j < products.length; j++){
     //   console.log(products[j].product_name)
     //   console.log(products[j])
        oldorderref[i].product_name = products[j].product_name
        oldorderref[i].quantity = products[j].quantity
        oldorderref[i].size = products[j].size
        oldorderref[i].print_name = products[j].print_name
        oldorderref[i].cover_type = products[j].cover_type
        oldorderref[i].subamount = products[j].subtotal
        oldorderref[i].product_name = products[j].product_name
        var ordercsvn = { ...oldorderref[i] };
        ordercsv.push(ordercsvn)
      }
    }
    // let ordercsv = oldorderref.map(order => {
    //   let productsref = order.products
    //   let productsstr = ""
    //   for(let i =0; i < productsref.length; i++){
    //     let prostr = `${productsref[i].product_name} (${productsref[i].quantity}) | `
    //     productsstr += prostr
    //   }
    //   order.productsdata = productsstr
    //   order.first_name = order.user_id.first_name
    //   order.last_name = order.user_id.last_name
    //   order.contact = order.user_id.contact
    //   order.email_id = order.user_id.email_id
    //   order.state = order.user_id.state
    //   order.address = order.user_id.address.replace(/,/g, '-')
    //   order.city = order.user_id.city
    //   order.pincode = order.user_id.pincode

    //   //delete keychain._id
    //   delete order.__v
    //   delete order._id
    //   delete order.products
    //   delete order.user_id
    //   delete order.is_paid
    //   delete order.is_delivered
    //   return order
    // })
    //console.log(newkeychains)
    var ordercsvordered = JSON.parse(JSON.stringify( ordercsv, ["order_id","date_ordered","payment_type","first_name","last_name","email_id","contact","address","state","city","pincode","product_name","size","print_name","cover_type","quantity", "subamount"]));
    console.log("ordercsv")
    console.log(ordercsv)
    return ordercsvordered
  }


  function getkeychains(oldkeychains){
    //let tokeyc = oldkeychains.reverse()
    // console.log(oldkeychains)
    let foruser = oldkeychains.map(a => ({...a}))
    let newkeychains = foruser.map(keychain => {
      //delete keychain._id
      delete keychain.__v
      delete keychain.available_status
      delete keychain.is_paid
      delete keychain.is_delivered
      return keychain
    })
    //console.log(newkeychains)
    return newkeychains
  }

  function canceldelete(){
    $("#deleteModal").modal("hide");
  }

  function deletekeychains(){
    //let deleteprotoget = globalProduct
    let todeleteids = printChecked()
    let deleteArray = {
      todeleteids
    }
              fetch(`http://${hosturl}:5600/api/order/deactivateorder`,
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
            getordersdatatable()
          })
          .catch(function(res){ console.log(res) })
  }

    function productdetailsmodal(probtn){
      let proid = probtn.getAttribute('data-pid')
      let orderid = probtn.getAttribute('data-oid')
      // console.log(proid)
      fetch(`http://${hosturl}:5600/api/order/getcartproductbyid/${proid}`)
      .then(response => {
        //console.log(result)
        //$("#deleteModal").modal("hide");
        return response.json()
      })
      .then(result => {
        // console.log(result)
        document.getElementById("cart_p_name").innerHTML = result.product_name
        document.getElementById("cart_order_id").innerHTML = orderid
        document.getElementById("cart_p_printname").innerHTML = result.print_name ? result.print_name : "N.A."
        document.getElementById("cart_p_size").innerHTML = result.size ? result.size : "N.A."
        document.getElementById("cart_p_quantity").innerHTML = result.quantity ? result.quantity : "N.A."
        document.getElementById("cart_p_covertype").innerHTML = result.cover_type ? result.cover_type : "N.A."
        productGimagefull = result.image && result.image !== "na" && result.image !== "noimage.png" ? result.image : "noimg22.png" 
        productGimagecropped = result.cropped_image && result.cropped_image !== "na" && result.cropped_image !== "noimage.png" ? result.cropped_image : "noimg22.png" 
        productGimagefull_2 = result.image_2 && result.image_2 !== "noimage.png" ? result.image_2 : "noimg22.png" 
        productGimagecropped_2 = result.cropped_image_2 && result.cropped_image_2 !== "noimage.png" ? result.cropped_image_2 : "noimg22.png" 
        let pdfimgurl = `http://${hosturl}:5600/admin/uploads/${productGimagecropped}`
        let pdfimgurlfull = `http://${hosturl}:5600/admin/uploads/${productGimagefull}`
        let pdfimgurl2 = `http://${hosturl}:5600/admin/uploads/${productGimagecropped_2}`
        let pdfimgurl2full = `http://${hosturl}:5600/admin/uploads/${productGimagefull_2}`
        document.getElementById("cart_p_image").src = `http://${hosturl}:5600/admin/uploads/${productGimagefull}`
        document.getElementById("cart_p_c_image").src = `http://${hosturl}:5600/admin/uploads/${productGimagecropped}`
        document.getElementById("pdf_cart_p_c_image").setAttribute("data-imgurl", pdfimgurl);
        document.getElementById("pdf_cart_p_c_image").setAttribute("data-imgurlfull", pdfimgurlfull);
        document.getElementById("pdf_cart_p_c_image_2").setAttribute("data-imgurl", pdfimgurl2);
        document.getElementById("pdf_cart_p_c_image_2").setAttribute("data-imgurlfull", pdfimgurl2full);

        document.getElementById("cart_p_image_2").src = `http://${hosturl}:5600/admin/uploads/${productGimagefull_2}`
        document.getElementById("cart_p_c_image_2").src = `http://${hosturl}:5600/admin/uploads/${productGimagecropped_2}`
        //   document.getElementById("cart_p_image").src = `images/noimg22.png`
        // document.getElementById("cart_p_c_image").src = `images/noimg22.png`
        // document.getElementById("cart_p_image_2").src = `images/noimg22.png`
        // document.getElementById("cart_p_c_image_2").src = `images/noimg22.png`

        // document.getElementById("cart_p_d_image").href = `http://${hosturl}:5600/admin/uploads/${result.image}`
        // document.getElementById("cart_p_d_image").download= `http://${hosturl}:5600/admin/uploads/${result.image}`
        $('#cartProductModal').modal('show');

      })
      .catch(err => {
        console.log(err)
      })
    }

        function userdetailsmodal(probtn){
      let proid = probtn.getAttribute('data-pid')
      // console.log(proid)
      fetch(`http://${hosturl}:5600/api/user/getuser/${proid}`)
      .then(response => {
        //console.log(result)
        return response.json()
      })
      .then(result => {
        // console.log(result)
        let full_name = result.first_name + " " + result.last_name
        let address = result.address

        document.getElementById("cart_u_name").innerHTML = full_name ? full_name : "N.A."
        document.getElementById("cart_u_contact").innerHTML = result.contact ? result.contact : "N.A."
        document.getElementById("cart_u_email").innerHTML = result.email_id ? result.email_id : "N.A."
        document.getElementById("cart_u_address").innerHTML = address ? address : "N.A."
        document.getElementById("cart_u_pincode").innerHTML = result.pincode ? result.pincode : "N.A."
        document.getElementById("cart_u_city").innerHTML = result.city ? result.city : "N.A."
        document.getElementById("cart_u_state").innerHTML = result.state ? result.state : "N.A."
        // document.getElementById("cart_u_country").innerHTML = result.country ? result.country : "N.A."
        // document.getElementById("cart_u_addresstype").innerHTML = result.address_type ? result.address_type : "N.A."
        
        $('#cartUserModal').modal('show');

      })
      .catch(err => {
        console.log(err)
      })
    }




    function changeorderstatus(selop){
      console.log(selop)
      let orderid = selop.getAttribute('data-oid')
      let orderid_user = selop.getAttribute('data-orid')
      let user_name = selop.getAttribute('data-user')
      let user_contact = selop.getAttribute('data-contact')
      let sms_content = `Dear, ${user_name}  Your order has been received Successfully.Your order no. ${orderid_user}.confirmation call will be received within 24-48 hours.Thank you`
      // console.log("orderef",orderref)
      // let orderid = okchains[orderref]._id
      console.log("orderid",orderid)
      let foridf = `order_status_ind_${orderid}`
      let newstatus = document.getElementById(foridf).value
      console.log("newstatus",newstatus)
      if(newstatus === "Processing"){
      let mobilenumber = user_contact
      let smscontent = sms_content
      let smsbody = {
        mobilenumber, orderid_user,user_name
      }
      console.log("smsbody")
      console.log(smsbody)
      fetch(`http://${hosturl}:5600/api/notification/postorderconfirm`,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(smsbody)
    })
    .then(function(res){ 
      return res.json()
    })
    .then(function(result){
      console.log(result)
      // document.getElementById("s_mobilenumber").value = ""
      // document.getElementById("s_text").value = ""
      // document.getElementById("sendsmsconfirm") = "sms sent successfully !!!" 
  //getproducts()
  
    })
    .catch(function(res){ console.log(res) })
      }
      let statusbody = {
        order_status : newstatus
      }
          fetch(`http://${hosturl}:5600/api/order/changeorderstatus/${orderid}`,
{
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "PUT",
    body: JSON.stringify(statusbody)
})
.then(function(res){ 
  return res.json()
  })
.then(function(result){
  // console.log(result)
  //let productId = result.product._id
 // console.log(productId)
 let spanstatusid = `#span_status_${orderid}`
  document.getElementById(foridf).value = ""
     if(newstatus === "Pending Payment"){
      $(spanstatusid).html("Pending Payment");
             $(spanstatusid).attr("class","badge badge-warning");
                  spantag = `<span id="span_status" class="badge badge-warning">Pending Payment</span>`
                 }
                   else if(newstatus === "Processing"){
                      $(spanstatusid).html("Processing");
             $(spanstatusid).attr("class","badge badge-success");
                 }
                 else if(newstatus === "Failed"){
                    $(spanstatusid).html("Failed");
             $(spanstatusid).attr("class","badge badge-danger");
                 }
                  else if(newstatus === "Delivered"){
                    $(spanstatusid).html("Delivered");
             $(spanstatusid).attr("class","badge badge-success");
                 }
                  else if(newstatus === "On Hold"){
                      $(spanstatusid).html("On Hold");
             $(spanstatusid).attr("class","badge badge-info");
                 
                 }
                  else if(newstatus === "Refunded"){
                      $(spanstatusid).html("Refunded");
             $(spanstatusid).attr("class","badge badge-warning");
                 
                 }
                   else if(newstatus === "Trash"){
                      $(spanstatusid).html("Trash");
             $(spanstatusid).attr("class","badge badge-danger");
               
                 }
                   else if(newstatus === "Completed"){
                      $(spanstatusid).html("Completed");
             $(spanstatusid).attr("class","badge badge-success");
                  
                 }
                 else{
                  console.log("something wrong")
                 }
  //getordersdatatable()
  //uploadFile(productId)
  //getord
  
})
.catch(function(res){ console.log(res) })

      console.log(newstatus)
    }

      function getproducts(){
        var authtokend = localStorage.getItem('authorization')
        //globalProduct = proname
        // document.getElementById("productAddHeading").innerHTML = "Add "+globalProduct
        // document.getElementById("productEditHeading").innerHTML = "Edit "+globalProduct
        // document.getElementById("productShowHeading").innerHTML = globalProduct
        // document.getElementById("add_keychain").value = "Add "+globalProduct
        // document.getElementById("productEditBtn").value = "Add "+globalProduct
        // let producttoget = proname
        // let getpropara = producttoget + "s"
    fetch(`http://${hosturl}:5600/api/order/getactiveorderswithdataopt`,
          {headers: {
      'Authorization': authtokend
    }})
    .then(response => {
     // console.log(response)
      return response.json()})
    .then(data => {
       let okchainsold = data.map(a => ({...a}));
       okchains = okchainsold.reverse()
     // filterorders()
      //CreateTableFromJSON(data)
   })
    .catch(err => console.log(err))
}

//getproducts()
      // let filters = ["name", "size", "price"]
      // let ndata = JSON.parse(unfiltered).map(function(currObj) {
      // var temp = {};
      // for identifier in filters:
      //   temp[identifier] = currObj[identifier];
      // return temp;
      // });

        function checkLogin(){
    
    if (localStorage.getItem("luser") === null) {
     // $('#loggedIn').css("display","none")
       // $('#logintosee').html("login to see the registered users")
       // $('#notloggedbtn').css("display","block")
        window.location = "login.html";
      //  console.log(ran)
    }
    else{
      // console.log(localStorage.getItem("luser"))
      //var loguser = JSON.parse(localStorage.getItem('luser'));
      //var username = loguser.name;

      var authtokend = localStorage.getItem('authorization')
      // console.log(authtokend)
      
      //console.log(username)   
       }
  }
  checkLogin()


    function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

function exportCSVFile(headers, items, fileTitle) {
    if (headers) {
        items.unshift(headers);
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = this.convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

 ["order_id","date_ordered","payment_type","first_name","last_name","email_id","contact","address","state","city","pincode","product_name","size","print_name","cover_type","quantity", "subamount"]

function download(){
  var headers = {
      order_id : "Order Id",
      date_ordered: "Date",
      payment_type: "Payment Method",
      first_name: "Customer First Name",
      last_name: "Customer Last Name",
      email_id :"Email",
      contact :"Contact",
      address :"Address", 
      state :"State",
      city  :"City",
      pincode: "Pincode",
      product_name: "Product Name",
      size: "Size",
      print_name: "print_name",
      cover_type :"Cover Type",
      quantity : "Quantity",
      subamount : "Subamount"
  };
var authtokend = localStorage.getItem('authorization')
      fetch(`http://${hosturl}:5600/api/order/getactiveorderswithdatafilt/${globalfiltertype}/none`,
          {headers: {
      'Authorization': authtokend
    }})
    .then(response => {
     // console.log(response)
      return response.json()})
    .then(data => {
       let okchainsold = data.map(a => ({...a}));
       let filterstatuswise = document.getElementById('sel_status').value
       if(filterstatuswise != "All"){
         okchainsold = okchainsold.filter(a => a.order_status == filterstatuswise)
       }
      
       okchains = okchainsold.reverse()
         itemsNotFormatted = getordercsvdatanew(okchains)

  var itemsFormatted = [];

  // format the data
  itemsNotFormatted.forEach((item) => {
      itemsFormatted.push({
          name: item.first_name, 
          contact: item.contact,
          email: item.email_id,
          city: item.city
      });
  });

  var fileTitle = 'orders'; // or 'my-unique-title'

  exportCSVFile(headers, itemsNotFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
     // filterorders()
      //CreateTableFromJSON(data)
   })
    .catch(err => console.log(err))




}


    function getordersdatatable(filtertype){
       var authtokend = localStorage.getItem('authorization')
      orderTable = $('#example1').DataTable({
            destroy: true,
        "processing" : true,
          "lengthMenu": [[50, 100, 500, -1], [50, 100, 500, "All"]],
        "aaSorting": [[ 4, "desc" ]],
          "rowCallback": function (nRow, aData, iDisplayIndex) {
               var oSettings = this.fnSettings ();
               $("td:first", nRow).html(oSettings._iDisplayStart+iDisplayIndex +1);
               return nRow;
          },
        "ajax" : {
               "url": `http://${hosturl}:5600/api/order/getactiveorderswithdataoptfilt/${filtertype}/none`,
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
            "data" : null,
            "mRender": function(data, type){
              let orderid = data._id
              let atag = `<a href='invoice.html#${orderid}'>${data.order_id}</a>`
              return atag
            }
        }, {
            "data" : null,
            "mRender" : function(data, type){
                let products_name = ''
                let productsref = data.products
                let order_id = data.order_id
                let colorproducts = ["green","blue","green","blue","green","blue","green","blue","green","blue","green","blue","green","blue","green","blue","green","blue","green","blue",]
                for(let i=0; i < productsref.length; i++){
                  // console.log()
                   if(i != 0){
                    products_name += `<hr style="padding:0; margin:0"> `
                  }
                  let colorsfpro = "green"
                  let btntag =  `<span id="product_name_dis" onclick="productdetailsmodal(this)" style="" data-oid=${order_id} data-pid="${productsref[i]._id}">${productsref[i].product_name}</span>`
                  products_name += `${btntag} `
                 
                }
              return products_name
            }
        },{
            "data" : "amount",
              "mRender" : function(data, type){
              let amou = `${data} ₹`
              return amou
            }
        },{
          "data":"date_ordered",
          "visible":false
        }
        ,{
            "data" : "date_ordered",
            "mRender" : function(data, type){
              let date = data.split("T")[0].split('-').reverse().join('-')
              return date
            }
        }, {
          "data": "user_id",
            "mRender": function(data, type) {
             
              return `<button onclick="userdetailsmodal(this)" style="padding: 1px 1px; margin:5px" class="btn btn-info btn-sm" data-pid="${data._id}">view</button>`;
            }
        },{
          "data":"order_status",
          "visible":false
        }

        ,{
          "data":null,
             "mRender": function(data,type){
              let orderreftable = data._id
           //   console.log(orderreftable)
           //   console.log(data.order_status)
              let mobilenumber = data.user_id.contact
              let username = `${data.user_id.first_name} ${data.user_id.last_name}`
              let orederrefid = data.order_id
                 let forid = `order_status_ind_${orderreftable}`
                 let status_id = `span_status_${orderreftable}`
                let btntag3 =  `<select data-oid=${orderreftable} data-user=${username} data-contact=${mobilenumber} data-orid=${orederrefid} onchange="changeorderstatus(this)" style="width:15%" value="Delivered" id="${forid}" class="form-control custom-select  custom-select-nn"><option value=""></option><option value="Pending Payment">Pending Payment</option><option value="Failed">Failed</option><option value="Delivered">Delivered</option><option value="On Hold">On Hold</option><option value="Processing">Processing</option><option value="Refunded">Refunded</option><option value="Trash">Trash</option><option value="Completed">Completed</option></select>`
          
              let spantag = ""
                 if(data.order_status === "Pending Payment"){
                  spantag = `<span id="${status_id}" class="badge badge-warning">Pending Payment</span>`
                 }
                   else if(data.order_status === "Processing"){
                  spantag = `<span id="${status_id}" class="badge badge-success">Processing</span>`
                 }
                 else if(data.order_status === "Failed"){
                  spantag = `<span id="${status_id}" class="badge badge-danger">Failed</span>`
                 }
                  else if(data.order_status === "Delivered"){
                  spantag = `<span id="${status_id}" class="badge badge-success">Delivered</span>`
                 }
                  else if(data.order_status === "On Hold"){
                  spantag = `<span id="${status_id}" class="badge badge-info">On Hold</span>`
                 }
                  else if(data.order_status === "Refunded"){
                  spantag = `<span id="${status_id}" class="badge badge-warning">Refunded</span>`
                 }
                   else if(data.order_status === "Trash"){
                  spantag = `<span id="${status_id}" class="badge badge-danger">Trash</span>`
                 }
                     else if(data.order_status === "Completed"){
                  spantag = `<span id="${status_id}" class="badge badge-success">Completed</span>`
                 }

                 else{
                  console.log(data.order_status)
                  spantag = `<span id="${status_id}" class="badge badge-info">old</span>`
                 }
                 spantag += btntag3
                 return spantag
            }
        }, {
          "data": "_id",
            "mRender": function(data, type) {
             
              return `<input name="todelete" value=${data} type="checkbox">`;
            }
        }]
    });
    }

        function getfilteredordersdatatable(newdata){
          let userTable = $('#example1').DataTable({
            destroy: true,
        "processing" : true,
          "lengthMenu": [[50, 100, 500, -1], [50, 100, 500, "All"]],
        "aaSorting": [[ 4, "desc" ]],
          "rowCallback": function (nRow, aData, iDisplayIndex) {
               var oSettings = this.fnSettings ();
               $("td:first", nRow).html(oSettings._iDisplayStart+iDisplayIndex +1);
               return nRow;
          },
         "aaData" : newdata,
        "columns" : [ {
            "data" : null
        }, {
            "data" : null,
            "mRender": function(data, type){
              let orderid = data._id
              let atag = `<a href='invoice.html#${orderid}'>${data.order_id}</a>`
              return atag
            }
        }, {
            "data" : null,
            "mRender" : function(data, type){
   let products_name = ''
                let productsref = data.products
                let order_id = data.order_id
                let colorproducts = ["green","blue","green","blue","green","blue","green","blue","green","blue","green","blue","green","blue","green","blue","green","blue","green","blue",]
                for(let i=0; i < productsref.length; i++){
                  // console.log()
                   if(i != 0){
                    products_name += `<hr style="padding:0; margin:0"> `
                  }
                  let colorsfpro = "green"
                  let btntag =  `<span id="product_name_dis" onclick="productdetailsmodal(this)" style="" data-oid=${order_id} data-pid="${productsref[i]._id}">${productsref[i].product_name}</span>`
                  products_name += `${btntag} `
                 
                }
              return products_name
            }
        },{
            "data" : "amount",
              "mRender" : function(data, type){
              let amou = `${data} ₹`
              return amou
            }
        },{
          "data":"date_ordered",
          "visible":false
        }
        ,{
            "data" : "date_ordered",
            "mRender" : function(data, type){
              let date = data.split("T")[0].split('-').reverse().join('-')
              return date
            }
        }, {
          "data": "user_id",
            "mRender": function(data, type) {
             
              return `<button onclick="userdetailsmodal(this)" style="padding: 1px 1px; margin:5px" class="btn btn-info btn-sm" data-pid="${data._id}">view</button>`;
            }
        },{
          "data":null,
             "mRender": function(data,type){
              let orderreftable = data._id
              console.log(orderreftable)
              console.log(data.order_status)
                 let forid = `order_status_ind_${orderreftable}`
                 let status_id = `span_status_${orderreftable}`
                let btntag3 =  `<select data-oid=${orderreftable} onchange="changeorderstatus(this)" style="width:15%" value="Delivered" id="${forid}" class="form-control custom-select  custom-select-nn"><option value=""></option><option value="Pending Payment">Pending Payment</option><option value="Failed">Failed</option><option value="Delivered">Delivered</option><option value="On Hold">On Hold</option><option value="Processing">Processing</option><option value="Refunded">Refunded</option><option value="Trash">Trash</option><option value="Completed">Completed</option></select>`
          
              let spantag = ""
                 if(data.order_status === "Pending Payment"){
                  spantag = `<span id="${status_id}" class="badge badge-warning">Pending Payment</span>`
                 }
                   else if(data.order_status === "Processing"){
                  spantag = `<span id="${status_id}" class="badge badge-success">Processing</span>`
                 }
                 else if(data.order_status === "Failed"){
                  spantag = `<span id="${status_id}" class="badge badge-danger">Failed</span>`
                 }
                  else if(data.order_status === "Delivered"){
                  spantag = `<span id="${status_id}" class="badge badge-success">Delivered</span>`
                 }
                  else if(data.order_status === "On Hold"){
                  spantag = `<span id="${status_id}" class="badge badge-info">On Hold</span>`
                 }
                  else if(data.order_status === "Refunded"){
                  spantag = `<span id="${status_id}" class="badge badge-warning">Refunded</span>`
                 }
                   else if(data.order_status === "Trash"){
                  spantag = `<span id="${status_id}" class="badge badge-danger">Trash</span>`
                 }
                     else if(data.order_status === "Completed"){
                  spantag = `<span id="${status_id}" class="badge badge-success">Completed</span>`
                 }

                 else{
                  console.log(data.order_status)
                  spantag = `<span id="${status_id}" class="badge badge-info">old</span>`
                 }
                 spantag += btntag3
                 return spantag
            }
        }, {
          "data": "_id",
            "mRender": function(data, type) {
             
              return `<input name="todelete" value=${data} type="checkbox">`;
            }
        }]
    });
    }

   

getordersdatatable('week')
globalfiltertype = 'week'