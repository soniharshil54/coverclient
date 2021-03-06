
    function getusersdatatable(){
        var authtokend = localStorage.getItem('authorization')
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
                
        "ajax" : {
         "url": `http://${hosturl}:5600/api/user/activeusers`,
         dataSrc : '',
         "type": "GET",
         "beforeSend": function(xhr){
            xhr.setRequestHeader("Authorization",
               authtokend)
         }
        },
        "columns" : [{
            "data" : null
        },{
            "data" : "first_name"
        }, {
            "data" : "contact"
        }, {
            "data" : "email_id"
        }, {
            "data" : "datestamp",
            "visible":false
        },{
          "data": "_id",
            "mRender": function(data, type) {
      //        console.log(data)
              let checkid = `check_${data}`
              return `<input id='${checkid}' name="todelete" value=${data} type="checkbox">`;
            }
        }]
    });

               
   
// "url" : `http://${hosturl}:5600/api/user/activeusers`,
//             dataSrc : ''


    }

    getusersdatatable()


 function canceldelete(){
    $("#deleteModal").modal("hide");
  }

    function opendeletemodal(){
      let todeleteidsref = printChecked()
      if(todeleteidsref.length > 0){
        $("#deleteModal").modal("show");
        document.getElementById("confirmDelete").innerHTML = ""
      }
      else {
        document.getElementById("confirmDelete").style.color = "red"
        document.getElementById("confirmDelete").innerHTML = "Select atleast one user !!!"
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

  function removeusersfromdatatable(selectedItems){
    for(var i=0; i<selectedItems.length; i++){
      let selid = `#check_${selectedItems[i]}`
      $(selid).closest('tr').remove();
    }
  }

    function deleteusers(){
      console.log("delete users running")
   // let deleteprotoget = globalProduct
    // let userrow = 
    let todeactiveids = printChecked()
    let deleteArray = {
      todeactiveids
    }
              fetch(`http://${hosturl}:5600/api/user/deactivateusers`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(deleteArray)
          })
          .then(function(res){ 
         $("#deleteModal").modal("hide");
         removeusersfromdatatable(todeactiveids)
           // getusersdatatable()
            document.getElementById("confirmDelete").innerHTML = "Seleted users deleted successfully!!!"
            console.log(res)
          })
          .catch(function(res){ console.log(res) })
  }


      function logOutUser(){
    localStorage.clear();
    window.location  =  "login.html";
  }


  function getusers(){
        var authtokend = localStorage.getItem('authorization')
        fetch(`http://${hosturl}:5600/api/user/activeusers`,
          {headers: {
      'Authorization': authtokend
    }})
    .then(response => {
     // console.log(response)
      return response.json()})
    .then(data => {
      okoffers = data.map(a => ({...a}));
      globalusers = okoffers
   })
    .catch(err => console.log(err))
  }

  getusers()

          function checkLogin(){
    
    if (localStorage.getItem("luser") === null) {
     // $('#loggedIn').css("display","none")
       // $('#logintosee').html("login to see the registered users")
       // $('#notloggedbtn').css("display","block")
        window.location = "login.html";
      //  console.log(ran)
    }
    else{
      console.log(localStorage.getItem("luser"))
      //var loguser = JSON.parse(localStorage.getItem('luser'));
      //var username = loguser.name;

      var authtokend = localStorage.getItem('authorization')
      //getproducts()
      console.log(authtokend)
      
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

    var jsonObject = JSON.stringify(items);

    var csv = this.convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { 
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { 
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

function download(){
  var headers = {
      name: 'Name', 
      contact: "Contact",
      email: "Email",
      city: "City"
  };

  itemsNotFormatted = globalusers

  var itemsFormatted = [];

  itemsNotFormatted.forEach((item) => {
      itemsFormatted.push({
          name: item.first_name, 
          contact: item.contact,
          email: item.email_id,
          city: item.city
      });
  });

  var fileTitle = 'User list'; // or 'my-unique-title'

  exportCSVFile(headers, itemsFormatted, fileTitle); 
}