      function logOutUser(){
    localStorage.clear();
    location.href =  "login.html";
  }

 // getcompanies()
    function editproduct(test){
     // console.log(test)
      let arrayn = test.getAttribute("data-key")
      console.log(okchains[arrayn])
      //console.log(okchains[arrayn].name)
      document.getElementById("modal_name").value = okchains[arrayn].product_name
      document.getElementById("modal_id").value = okchains[arrayn]._id
      //console.log(document.getElementById("modal_id").value)
      let slider_image = okchains[arrayn].slider_image
      document.getElementById("modal_slider_image").src = `http://${hosturl}:5600/admin/uploads/${slider_image}`
      $('#myModal').modal('show')
    }

        function editproductsec(test){
     // console.log(test)
      let arrayn = test.getAttribute("data-key")
      console.log(secondarychains[arrayn])
      //console.log(okchains[arrayn].name)
      document.getElementById("modal_s_display_name").value = secondarychains[arrayn].slider_display_name
      document.getElementById("modal_s_name").value = secondarychains[arrayn].product_name
      document.getElementById("modal_s_product_name").value = secondarychains[arrayn].product_name
      document.getElementById("modal_s_id").value = secondarychains[arrayn]._id
      if (secondarychains[arrayn].slider_name === "mainbanner") {
        document.getElementById("image_size_suggest").innerHTML = "Size : 720x380"
      }
      else if (secondarychains[arrayn].slider_name === "mainofferbanner") {
        document.getElementById("image_size_suggest").innerHTML = "Size : 720x270"
      }
      else {
        document.getElementById("image_size_suggest").innerHTML = "Size : 720x324"
      }
      //console.log(document.getElementById("modal_id").value)
      let slider_image = secondarychains[arrayn].slider_image
      document.getElementById("modal_s_slider_image").src = `http://${hosturl}:5600/admin/uploads/${slider_image}`
      $('#mySecondaryModal').modal('show')
    }

    function editkeychain(){
      console.log("edit ran")
        let name = document.getElementById("modal_name").value
    let keyid = document.getElementById("modal_id").value
      console.log(keyid)
      console.log("k edit data")
      // console.log(keditdata)
      uploadFileEdit(keyid)
      $("#myModal").modal("hide");
    }

        function editsecondary(){
      console.log("edit ran")
        let name = document.getElementById("modal_s_name").value
    let keyid = document.getElementById("modal_s_id").value
      console.log(keyid)
      console.log("k edit data")
      // console.log(keditdata)
      uploadFileEditSecondary(keyid)
      $("#mySecondaryModal").modal("hide");
    }

    function imageModal(imgname){
      let source = `http://${hosturl}:5600/admin/uploads/${imgname}`
      document.getElementById("imgModal").src=source;

      setTimeout(function () { 
    $('#imageModal').modal('show');
}, 50);
      console.log(imgname)
      
    }

        function imageModalSec(imgname){
      let source = `http://${hosturl}:5600/admin/uploads/${imgname}`
      document.getElementById("imageModalSec").src=source;

      setTimeout(function () { 
    $('#imageSecondaryModal').modal('show');
}, 50);
      console.log(imgname)
      
    }



    function uploadFileEdit(productid){
      console.log("productId is",productid)
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("slider_images");
    var formData = new FormData(form);

fetch(`http://${hosturl}:5600/api/product/addslider/${productid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  console.log(res)
  getproducts()
}).catch(err => console.log(err))

  }

      function uploadFileEditSecondary(productid){
      console.log("productId is",productid)
    //var input = document.querySelector('input[type="file"]')
    var form = document.getElementById("slider_s_images");
    var formData = new FormData(form);

fetch(`http://${hosturl}:5600/api/product/addsecondaryslider/${productid}`, {
  method: 'PUT',
  body: formData
}).then(res => {
  console.log(res)
  getsecondary()
}).catch(err => console.log(err))

  }

//   $('.imgDownload').on('click', function () {
//     $.ajax({
//         url: this.src,
//         method: 'GET',
//         xhrFields: {
//             responseType: 'blob'
//         },
//         success: function (data) {
//             var a = document.createElement('a');
//             var url = window.URL.createObjectURL(data);
//             a.href = url;
//             a.download = this.getAttribute("data-download");
//             document.body.append(a);
//             a.click();
//             a.remove();
//             window.URL.revokeObjectURL(url);
//         }
//     });
// });


  function activeslider(activebtn){
    let sliderref = activebtn.getAttribute("data-key")
    let sliderid = okchains[sliderref]._id
    let ceditdata = {
      active_status : 1
    }
              fetch(`http://${hosturl}:5600/api/product/editsliderstatus/${sliderid}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(ceditdata)
          })
          .then(function(res){ 
            console.log(res)
           // uploadFileEdit(keyid)
            getproducts()
           // $("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(sliderid)
  }

  function updatesortorder(sortinput){
    let newsortvalue = sortinput.value
    let sliderid = sortinput.getAttribute("data-sid")
    if(newsortvalue === ""){
      console.log("hgj")
      sortinput.style.border = "1px solid red"
      return false
    }
     else {
      sortinput.style.border = "1px solid #80bdff"
     
    }
    let sortorderdata = {
      sort_order : newsortvalue
    }
                  fetch(`http://${hosturl}:5600/api/product/editslidersortorder/${sliderid}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(sortorderdata)
          })
          .then(function(res){ 
            console.log(res)
           // uploadFileEdit(keyid)
            getproducts()
           // $("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })

  }

    function updatesecsortorder(sortinput){
    let newsortvalue = sortinput.value
    let sliderid = sortinput.getAttribute("data-sid")
    if(newsortvalue === ""){
      console.log("hgj")
      sortinput.style.border = "1px solid red"
      return false
    }
     else {
      sortinput.style.border = "1px solid #80bdff"
     
    }
    let sortorderdata = {
      sort_order : newsortvalue
    }
                  fetch(`http://${hosturl}:5600/api/product/editsecslidersortorder/${sliderid}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(sortorderdata)
          })
          .then(function(res){ 
            console.log(res)
           // uploadFileEdit(keyid)
           getsecondary()
           // $("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })

  }

  function deactiveslider(activebtn){
    let sliderref = activebtn.getAttribute("data-key")
    let sliderid = okchains[sliderref]._id
     let ceditdata = {
      active_status : 0
    }
              fetch(`http://${hosturl}:5600/api/product/editsliderstatus/${sliderid}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(ceditdata)
          })
          .then(function(res){ 
             console.log(res)
            getproducts()
           // uploadFileEdit(keyid)
           // getproducts()
            //$("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(sliderid)
  }

    function activesecslider(activebtn){
    let sliderref = activebtn.getAttribute("data-key")
    let sliderid = secondarychains[sliderref]._id
    let ceditdata = {
      active_status : 1
    }
              fetch(`http://${hosturl}:5600/api/product/editsecsliderstatus/${sliderid}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(ceditdata)
          })
          .then(function(res){ 
            console.log(res)
           // uploadFileEdit(keyid)
            getsecondary()
           // $("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(sliderid)
  }

  function deactivesecslider(activebtn){
    let sliderref = activebtn.getAttribute("data-key")
    let sliderid = secondarychains[sliderref]._id
     let ceditdata = {
      active_status : 0
    }
              fetch(`http://${hosturl}:5600/api/product/editsecsliderstatus/${sliderid}`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(ceditdata)
          })
          .then(function(res){ 
             console.log(res)
            getsecondary()
           // uploadFileEdit(keyid)
           // getproducts()
            //$("#myModal").modal("hide");
 
          })
          .catch(function(res){ console.log(res) })
    console.log(sliderid)
  }


    function getkeychains(oldkeychains){
    let tokeyc = oldkeychains
    console.log(oldkeychains)
    let newkeychains = oldkeychains.map(keychain => {
      // delete keychain._id
      delete keychain.__v
      delete keychain.available_status
      return keychain
    })
    //console.log(newkeychains)
    return newkeychains
  }
    function CreateTableFromJSON(myBookso) {
      let myBookson = getkeychains(myBookso)
      var myBooks = JSON.parse(JSON.stringify( myBookson, ["product_display_name","slider_image","sort_order"]));
      var thsliders = ["Category Name", "Image", "Sort","Active"] 

        var col = [];
        for (var i = 0; i < myBooks.length; i++) {
            for (var key in myBooks[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
        var table = document.createElement("table");
        table.setAttribute("class", "table auto-index");
        table.setAttribute("id","keychaintable")

        var tr = table.insertRow(-1);  
        for (var i = -1; i < col.length; i++) {
            var th = document.createElement("th");  
                // TABLE HEADER.
                if(i === -1){
                  th.innerHTML = "No."
                }
                else {
                  th.innerHTML = thsliders[i];
                }
            
            tr.appendChild(th);

        }
        var thn =  document.createElement("th"); 
        thn.innerHTML = "Edit";
            //tr.appendChild(thn);
             var tha =  document.createElement("th"); 
        tha.innerHTML = "Action";
            tr.appendChild(tha);
        var ths = document.createElement("th")
        ths.innerHTML = "<div class='form-group'><div class='custom-control custom-checkbox'><input onclick=checkAll() class='custom-control-input' type='checkbox' id='customCheckbox2' value='option1'><label for='customCheckbox2' class='custom-control-label'>Select All</label></div></div>"
        for (var i = 0; i < myBooks.length; i++) {

            tr = table.insertRow(-1); 
            for (var j = -1; j < col.length; j++) {
              var tabCell = tr.insertCell(-1);
              if(j === -1){
                tabCell.innerHTML = ""
              }
              else if(j===1){
                let image = '"'+myBooks[i][col[j]]+'"'
                tabCell.innerHTML = `<button onclick='imageModal(${image})' style='padding:1px 4px'  class='btn btn-info btn-sm'>view</button>`
                console.log(myBooks[i][col[j]])
              }
                else if(j===2){
                let sort_order = myBooks[i][col[j]]
                  console.log("sort order", sort_order)
                let slider_sort_id = myBookson[i]._id
                console.log("slider id", myBookson[i]._id)
                tabCell.innerHTML = ` <input data-sid='${slider_sort_id}' style="width:60px;height:27px" max="999" onkeypress="if (this.value.length > 2) return false;" onkeyup="updatesortorder(this)" onchange="updatesortorder(this)" value="${sort_order}" id = "company_name" type="number" class="form-control">`
                console.log(myBooks[i][col[j]])
              }
              else{
                tabCell.innerHTML = myBooks[i][col[j]];
              }
                
                
                //console.log(i, j)
            }
            let outerbutton = ""
            let statuslink = ""
            if(okchains[i].active_status === 1 ){
            outerbutton =  `<button type="button" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">Active</button>`
            statuslink = `<a data-key=${i} onclick="deactiveslider(this)" class="dropdown-item">Inactive</a>`
            }
            else {
               outerbutton = `<button type="button" class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown">Deactivated</button>`
             statuslink = `<a data-key=${i} onclick="activeslider(this)"  class="dropdown-item">Active</a>`
            }
            

            let finalbtn = `<div class="dropdown">${outerbutton}<div class="dropdown-menu">${statuslink}<a onclick="editproduct(this)" data-key="${i}" class="dropdown-item">Edit</a></div></div>`

            let ntd = document.createElement("td")
            ntd.innerHTML = finalbtn
            tr.appendChild(ntd)
        }
        var divContainer = document.getElementById("samplejson");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    }


        function CreateSecondaryJSON(myBookso) {
      let myBookson = getkeychains(myBookso)
      var myBooks = JSON.parse(JSON.stringify( myBookson, ["slider_display_name","product_name","slider_image","sort_order"]));
      var thsliders = ["Slider Name", "Category Name","Image", "Sort", "Active"] 

        var col = [];
        for (var i = 0; i < myBooks.length; i++) {
            for (var key in myBooks[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }
        var table = document.createElement("table");
        table.setAttribute("class", "table auto-index");
        table.setAttribute("id","secondarytable")

        var tr = table.insertRow(-1);  
        for (var i = -1; i < col.length; i++) {
            var th = document.createElement("th");  
                // TABLE HEADER.
                if(i === -1){
                  th.innerHTML = "No."
                }
                else {
                  th.innerHTML = thsliders[i];
                }
            
            tr.appendChild(th);

        }
        var thn =  document.createElement("th"); 
        thn.innerHTML = "Edit";
           // tr.appendChild(thn);
             var tha =  document.createElement("th"); 
        tha.innerHTML = "Action";
            tr.appendChild(tha);
        var ths = document.createElement("th")
        ths.innerHTML = "<div class='form-group'><div class='custom-control custom-checkbox'><input onclick=checkAll() class='custom-control-input' type='checkbox' id='customCheckbox2' value='option1'><label for='customCheckbox2' class='custom-control-label'>Select All</label></div></div>"
        for (var i = 0; i < myBooks.length; i++) {

            tr = table.insertRow(-1); 
            for (var j = -1; j < col.length; j++) {
              var tabCell = tr.insertCell(-1);
              if(j === -1){
                tabCell.innerHTML = ""
              }
              else if(j===2){
                let image = '"'+myBooks[i][col[j]]+'"'
                tabCell.innerHTML = `<button onclick='imageModalSec(${image})' style='padding:1px 4px'  class='btn btn-info btn-sm'>view</button>`
                console.log(myBooks[i][col[j]])
              }
                 else if(j===3){
                let sort_order = myBooks[i][col[j]]
                  console.log("sort order", sort_order)
                let slider_sort_id = myBookson[i]._id
                console.log("slider id", myBookson[i]._id)
                tabCell.innerHTML = ` <input data-sid='${slider_sort_id}' style="width:60px;height:27px" onkeyup="updatesecsortorder(this)" onchange="updatesortorder(this)" value="${sort_order}" id = "company_name" type="number" class="form-control">`
                console.log(myBooks[i][col[j]])
              }

              else{
                tabCell.innerHTML = myBooks[i][col[j]];
              }
                
                
                //console.log(i, j)
            }
                        let outerbutton = ""
            let statuslink = ""
            if(secondarychains[i].active_status === 1 ){
            outerbutton =  `<button style="padding: 4px" button type="button" class="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown">Active</button>`
            statuslink = `<a data-key=${i} onclick="deactivesecslider(this)" class="dropdown-item">Inactive</a>`
            }
            else {
               outerbutton = `<button style="padding: 4px" button type="button" class="btn btn-danger btn-sm dropdown-toggle" data-toggle="dropdown">Deactivated</button>`
             statuslink = `<a data-key=${i} onclick="activesecslider(this)"  class="dropdown-item">Active</a>`
            }
            

            let finalbtn = `<div class="dropdown">${outerbutton}<div class="dropdown-menu">${statuslink}<a onclick="editproductsec(this)" data-key="${i}" class="dropdown-item">Edit</a></div></div>`

            let ntd = document.createElement("td")
            ntd.innerHTML = finalbtn
            tr.appendChild(ntd)
        }
        var divContainer = document.getElementById("extraSliders");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    }
    //CreateTableFromJSON() 

          function getproducts(){
    fetch(`http://${hosturl}:5600/api/product/allsliders`)
    .then(response => {
     // console.log(response)
      return response.json()})
    .then(data => {
      okchains = data.map(a => ({...a}));
      console.log(okchains)
      
      CreateTableFromJSON(data)
   })
    .catch(err => console.log(err))
}
getproducts()

          function getsecondary(){
    fetch(`http://${hosturl}:5600/api/product/allsecondarysliders`)
    .then(response => {
     // console.log(response)
      return response.json()})
    .then(data => {
      secondarychains = data.map(a => ({...a}));
      console.log(secondarychains)
      
      CreateSecondaryJSON(data)
   })
    .catch(err => console.log(err))
}
getsecondary()