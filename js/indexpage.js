{
getsummary()

  function logOutUser(){
  localStorage.clear();
  window.location  =  "login.html";
}


function getsummary(){
  fetch(`http://${hosturl}:5600/api/admin/countsummary`)
  .then(response => {
   // console.log(response)
    return response.json()})
  .then(data => {
    console.log(data)
    document.getElementById("orders_count").innerHTML = data.ordercount
    document.getElementById("products_count").innerHTML = data.productscount
    document.getElementById("users_count").innerHTML = data.usercount
    document.getElementById("sales_amount").innerHTML = "₹ " + data.salesamount
    
 
 })
  .catch(err => console.log(err))

}

function downloaddbzip(){
      $.ajax({
        url: `http://${hosturl}:5600/admin/dbbackup/dump.zip`,
        method: 'GET',
        xhrFields: {
            responseType: 'blob'
        },
        success: function (data) {
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(data);
            a.href = url;
            a.download = 'dump.zip';
            document.body.append(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        }
    });
}

function jsondownloaddbzip(){
      $.ajax({
        url: `http://${hosturl}:5600/admin/dbbackup/dbjson.zip`,
        method: 'GET',
        xhrFields: {
            responseType: 'blob'
        },
        success: function (data) {
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(data);
            a.href = url;
            a.download = 'dbjson.zip';
            document.body.append(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        }
    });
}

          function downloaddatabase(){
          var authtokend = localStorage.getItem('authorization')
  fetch(`http://${hosturl}:5600/api/zipdatabase/zipdatabase`,
        {headers: {
    'Authorization': authtokend
  }})
  .then(response => {
   // console.log(response)
    return response.json()})
  .then(data => {
    console.log(data)
    downloaddbzip()
    //console.log(data)
    
  
 })
  .catch(err => console.log(err))
}

          function jsondownloaddatabase(){
          var authtokend = localStorage.getItem('authorization')
  fetch(`http://${hosturl}:5600/api/zipdatabase/jsonzipdatabase`,
        {headers: {
    'Authorization': authtokend
  }})
  .then(response => {
   // console.log(response)
    return response.json()})
  .then(data => {
    console.log(data)
    jsondownloaddbzip()
    //console.log(data)
    
  
 })
  .catch(err => console.log(err))
}



function getkeychains(oldkeychains){
  let tokeyc = oldkeychains
  // console.log(oldkeychains)
  let newkeychains = oldkeychains.map(keychain => {
    delete keychain._id
    delete keychain.__v
    delete keychain.available_status
    delete keychain.is_paid
    delete keychain.is_delivered
    return keychain
  })
  //console.log(newkeychains)
  return newkeychains
}






        function updatecharges(){
  //let cod_charges = document.getElementById("n_cod").value
  let shipping_charges = document.getElementById("n_shipping").value
  //let shippingcharge = offerref
  let chargesdata = {
     shipping_charges
  }
            fetch(`http://${hosturl}:5600/api/admin/editcharges`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "PUT",
          body: JSON.stringify(chargesdata)
        })
        .then(function(res){ 
          console.log(res)
          getcharges()
          // console.log(res)
         // uploadFileEdit(keyid)
          //getoffers()
         // $("#myModal").modal("hide");

        })
        .catch(function(res){ console.log(res) })
  //console.log(offerid)
}

    function getcharges(){
  fetch(`http://${hosturl}:5600/api/admin/getcharges`)
  .then(response => {
    return response.json()})
  .then(data => {
    console.log(data)
    //okoffers = data.map(a => ({...a}));
    //document.getElementById("n_cod").value = data.cod_charges
    document.getElementById("n_shipping").value = data.shipping_charges
    
    //CreateTableFromJSON(data)
 })
  .catch(err => console.log(err))
}
getcharges()



function generatereport(){
    fetch(`http://${hosturl}:5600/api/admin/generatereport`)
  .then(response => {
   // console.log(response)
    return response.json()})
  .then(data => {
    okreport = data.map(a => ({...a}));
    reportlogics("today")
    //CreateTableFromJSON(data)
 })
  .catch(err => console.log(err))
}
generatereport()

function filterreport(duration){

}

function showcustomrange(){
document.getElementById("customdate-filter").style.display = "block"
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

function reportlogics(duration){
  if(duration === "today"){
  document.getElementById("customdate-filter").style.display = "none"
 // var dot = new Date();
  var d = new Date();
  d.setHours(0,0,0,0);
  var curyear = d.getFullYear();
  let reportref = okreport.map(a => ({...a}))
  let totalsales = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            let ndateref = dateref.getTime() + ( 5.5 * 60 * 60 * 1000 )

            let newdateref = new Date(ndateref);
            newdateref.setHours(0,0,0,0)
         //   console.log(newdateref)
         //   console.log(d)
            return newdateref.getTime() === d.getTime()
          }).map(a => a.amount).reduce((a,b) => a + b, 0  )
  let refundedamount = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            let ndateref = dateref.getTime() + ( 5.5 * 60 * 60 * 1000 )
            let newdateref = new Date(ndateref);
             newdateref.setHours(0,0,0,0)
           // console.log(newdateref)
            //console.log(d)
            return newdateref.getTime() === d.getTime() && a.order_status === "Refunded"
          }).map(a => a.amount).reduce((a,b) => a + b, 0  )
  let pendingamount = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
           let ndateref = dateref.getTime() + ( 5.5 * 60 * 60 * 1000 )
            let newdateref = new Date(ndateref);
             newdateref.setHours(0,0,0,0)
           // console.log(newdateref)
            //console.log(d)
            return newdateref.getTime() === d.getTime() && a.order_status === "Pending Payment"
          }).map(a => a.amount).reduce((a,b) => a + b, 0  )
  let shippingcharge = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            let ndateref = dateref.getTime() + ( 5.5 * 60 * 60 * 1000 )
            let newdateref = new Date(ndateref);
             newdateref.setHours(0,0,0,0)
            //console.log(newdateref)
            //console.log(d)
            return newdateref.getTime() === d.getTime()
          }).map(a => a.shipping).reduce((a,b) => a + b, 0  )
  let ordersplaced = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            let ndateref = dateref.getTime() + ( 5.5 * 60 * 60 * 1000 )
             let newdateref = new Date(ndateref);
             newdateref.setHours(0,0,0,0)
            //console.log(newdateref)
            //console.log(d)
            return newdateref.getTime() === d.getTime()
          }).length
  let itemspurchased = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            let ndateref = dateref.getTime() + ( 5.5 * 60 * 60 * 1000 )
            let newdateref = new Date(ndateref);
             newdateref.setHours(0,0,0,0)
            //console.log(newdateref)
           // console.log(d)
            return newdateref.getTime() === d.getTime()
          }).map(a =>  a.products.length).reduce((a,b) => a + b, 0)
  let couponamount = reportref.filter(a => {
       let dateref = new Date(a.date_ordered);
       let ndateref = dateref.getTime() + ( 5.5 * 60 * 60 * 1000 )
            let newdateref = new Date(ndateref);
            newdateref.setHours(0,0,0,0)
           // console.log(newdateref)
           // console.log(d)
            return newdateref.getTime() === d.getTime()
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

else if(duration === "year"){
  document.getElementById("customdate-filter").style.display = "none"
  var d = new Date();
  var curyear = d.getFullYear();
  let reportref = okreport.map(a => ({...a}))
  let totalsales = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref.getFullYear() === curyear
          }).map(a => a.amount).reduce((a,b) => a + b, 0  )
  let refundedamount = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref.getFullYear() === curyear && a.order_status === "Refunded"
          }).map(a => a.amount).reduce((a,b) => a + b, 0  )
  let pendingamount = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref.getFullYear() === curyear && a.order_status === "Pending Payment"
          }).map(a => a.amount).reduce((a,b) => a + b, 0  )
  let shippingcharge = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref.getFullYear() === curyear
          }).map(a => a.shipping).reduce((a,b) => a + b, 0  )
  let ordersplaced = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref.getFullYear() === curyear
          }).length
  let itemspurchased = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref.getFullYear() === curyear
          }).map(a =>  a.products.length).reduce((a,b) => a + b, 0)
  let couponamount = reportref.filter(a => {
       let dateref = new Date(a.date_ordered);
       return dateref.getFullYear() === curyear
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
else if(duration === "tmonth"){
  document.getElementById("customdate-filter").style.display = "none"
      var d = new Date();
  var curyear = d.getFullYear();
  var curmonth = d.getMonth()
  let reportref = okreport.map(a => ({...a}))
  let totalsales = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref.getFullYear() === curyear && dateref.getMonth() === curmonth
          }).map(a => a.amount).reduce((a,b) => a + b, 0  )
  let refundedamount = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref.getFullYear() === curyear && dateref.getMonth() === curmonth && a.order_status === "Refunded"
          }).map(a => a.amount).reduce((a,b) => a + b, 0  )
  let pendingamount = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref.getFullYear() === curyear && dateref.getMonth() === curmonth && a.order_status === "Pending Payment"
          }).map(a => a.amount).reduce((a,b) => a + b, 0  )
  let shippingcharge = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref.getFullYear() === curyear && dateref.getMonth() === curmonth
          }).map(a => a.shipping).reduce((a,b) => a + b, 0  )
  let ordersplaced = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref.getFullYear() === curyear && dateref.getMonth() === curmonth
          }).length
  let itemspurchased = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref.getFullYear() === curyear && dateref.getMonth() === curmonth
          }).map(a =>  a.products.length).reduce((a,b) => a + b, 0)
     let couponamount = reportref.filter(a => {
       let dateref = new Date(a.date_ordered);
       return dateref.getFullYear() === curyear && dateref.getMonth() === curmonth
     }).map(a => {
      let amountconsole = a.coupon_amount ? a.coupon_amount : 0
      console.log("amount coupon", amountconsole)
      return amountconsole}).reduce((a,b) => a + b, 0  )
  //let totalsalesred = totalsales.reduce((a,b) => a + b )
  //console.log(totalsalesred)
  console.log(totalsales)
  console.log(refundedamount)
  console.log(pendingamount)
  console.log(shippingcharge)
  document.getElementById('totalsales_r').innerHTML =  `₹ ${totalsales}`
  document.getElementById('couponamount_r').innerHTML =  `₹ ${couponamount}`
  document.getElementById('refunded_r').innerHTML =  `₹ ${refundedamount}`
  document.getElementById('pendingamount_r').innerHTML =  `₹ ${pendingamount}`
  document.getElementById('shippingcharges_r').innerHTML =  `₹ ${shippingcharge}`
  document.getElementById('ordersplaced_r').innerHTML = ordersplaced
  document.getElementById('itemspurchased_r').innerHTML = itemspurchased 
   }
  else if(duration === "lmonth"){
    document.getElementById("customdate-filter").style.display = "none"
      var d = new Date();
  var curyear = d.getFullYear();
  var curmonth = d.getMonth()
  var lastmonth = curmonth - 1
  let reportref = okreport.map(a => ({...a}))
  let totalsales = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref.getFullYear() === curyear && dateref.getMonth() === lastmonth
          }).map(a => a.amount).reduce((a,b) => a + b, 0 )
  let refundedamount = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref.getFullYear() === curyear && dateref.getMonth() === lastmonth && a.order_status === "Refunded"
          }).map(a => a.amount).reduce((a,b) => a + b, 0  )
  let pendingamount = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref.getFullYear() === curyear && dateref.getMonth() === lastmonth && a.order_status === "Pending Payment"
          }).map(a => a.amount).reduce((a,b) => a + b, 0  )
  let shippingcharge = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref.getFullYear() === curyear && dateref.getMonth() === lastmonth
          }).map(a => a.shipping).reduce((a,b) => a + b, 0 )
  let ordersplaced = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref.getFullYear() === curyear && dateref.getMonth() === lastmonth
          }).length
  let itemspurchased = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref.getFullYear() === curyear && dateref.getMonth() === lastmonth
          }).map(a =>  a.products.length).reduce((a,b) => a + b, 0)
         let couponamount = reportref.filter(a => {
       let dateref = new Date(a.date_ordered);
       return dateref.getFullYear() === curyear && dateref.getMonth() === lastmonth
     }).map(a => {
      let amountconsole = a.coupon_amount ? a.coupon_amount : 0
      console.log("amount coupon", amountconsole)
      return amountconsole}).reduce((a,b) => a + b, 0  )
  //let totalsalesred = totalsales.reduce((a,b) => a + b )
  //console.log(totalsalesred)
  console.log(totalsales)
  console.log(refundedamount)
  console.log(pendingamount)
  console.log(shippingcharge)
   document.getElementById('totalsales_r').innerHTML =  `₹ ${totalsales}`
  document.getElementById('couponamount_r').innerHTML =  `₹ ${couponamount}`
  document.getElementById('refunded_r').innerHTML =  `₹ ${refundedamount}`
  document.getElementById('pendingamount_r').innerHTML =  `₹ ${pendingamount}`
  document.getElementById('shippingcharges_r').innerHTML =  `₹ ${shippingcharge}`
  document.getElementById('ordersplaced_r').innerHTML = ordersplaced
  document.getElementById('itemspurchased_r').innerHTML = itemspurchased
}
else if( duration === "week"){
  document.getElementById("customdate-filter").style.display = "none"
          var d = new Date();
  var curyear = d.getFullYear();
  var curmonth = d.getMonth()
  var lastmonth = curmonth - 1
      let lastweekseconds = 86400000*7
        var lastweekdate = new Date(Date.now() - lastweekseconds);
  let reportref = okreport.map(a => ({...a}))
  let totalsales = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref >= lastweekdate  && dateref <= d
          }).map(a => a.amount).reduce((a,b) => a + b, 0 )
  let refundedamount = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref >= lastweekdate  && dateref <= d && a.order_status === "Refunded"
          }).map(a => a.amount).reduce((a,b) => a + b, 0  )
  let pendingamount = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref >= lastweekdate  && dateref <= d && a.order_status === "Pending Payment"
          }).map(a => a.amount).reduce((a,b) => a + b, 0  )
  let shippingcharge = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref >= lastweekdate  && dateref <= d
          }).map(a => a.shipping).reduce((a,b) => a + b, 0 )
  let ordersplaced = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref >= lastweekdate  && dateref <= d
          }).length
  let itemspurchased = reportref.filter(a => {
            let dateref = new Date(a.date_ordered);
            return dateref >= lastweekdate  && dateref <= d
          }).map(a =>  a.products.length).reduce((a,b) => a + b, 0)
 let couponamount = reportref.filter(a => {
       let dateref = new Date(a.date_ordered);
       return dateref >= lastweekdate  && dateref <= d
     }).map(a => {
      let amountconsole = a.coupon_amount ? a.coupon_amount : 0
      console.log("amount coupon", amountconsole)
      return amountconsole}).reduce((a,b) => a + b, 0  )
  //let totalsalesred = totalsales.reduce((a,b) => a + b )
  //console.log(totalsalesred)
  console.log(totalsales)
  console.log(refundedamount)
  console.log(pendingamount)
  console.log(shippingcharge)
 document.getElementById('totalsales_r').innerHTML =  `₹ ${totalsales}`
  document.getElementById('couponamount_r').innerHTML =  `₹ ${couponamount}`
  document.getElementById('refunded_r').innerHTML =  `₹ ${refundedamount}`
  document.getElementById('pendingamount_r').innerHTML =  `₹ ${pendingamount}`
  document.getElementById('shippingcharges_r').innerHTML =  `₹ ${shippingcharge}`
  document.getElementById('ordersplaced_r').innerHTML = ordersplaced
  document.getElementById('itemspurchased_r').innerHTML = itemspurchased
}
else {
  console.log("its in else")
}
}

//reportlogics("year")




      function checkLogin(){
      if (localStorage.getItem("luser") === null) {
      window.location = "login.html";
      }
  else{
    console.log(localStorage.getItem("luser"))
    //var loguser = JSON.parse(localStorage.getItem('luser'));
    //var username = loguser.name;

    var authtokend = localStorage.getItem('authorization')
    console.log(authtokend)
    
    //console.log(username)   
     }
}
checkLogin()
}