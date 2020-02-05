      function getmodelreqs(){
        fetch(`http://${hosturl}:5600/api/order/getmodelrequests`)
    .then(response => {
     // console.log(response)
      return response.json()})
    .then(data => {
      okoffers = data.map(a => ({...a}));
      globalmodelreqs = okoffers
      //let okchains = Object.assign({}, data);
      // console.log(okoffers)
  // okchains = Object.assign({}, data);
   //console.log(okchains)
   //let testkey = Object.assign({}, data);
      //okchains = data
      //let newkeychains = getkeychains(data)
      
     // CreateTableFromJSON(data)
   })
    .catch(err => console.log(err))
  }

  getmodelreqs()


    function getmodelreqsdatatable(){
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
            "url" : `http://${hosturl}:5600/api/order/getmodelrequests`,
            dataSrc : ''
        },
        "columns" : [{
            "data" : null
        },{
            "data" : "user_id",
            mRender : function(data, type) {
              let mname = data ? data.first_name + " " + data.last_name : " "
              return mname
            }
        }, {
            "data" : "user_id",
            mRender : function(data, type) {
              let mcontact = data ? data.contact : " "
              return mcontact
            }
        }, {
            "data" : "user_id",
            mRender : function(data, type) {
              let mmail = data ? data.email_id : " "
              return mmail
            }
        },{
          "data":"date",
          "visible":false
        },{
          "data" : "date",
          mRender : function(data, type){
            let mdate = data ? data.split("T")[0].split("-").reverse().join("-") : " "
            return mdate
          }
        }  

        ,{
            "data" : "model_name"
        },{
          "data": "_id",
            "mRender": function(data, type) {
              console.log(data)
              return `<input name="todelete" value=${data} type="checkbox">`;
            }
        }]
    });



    }

    getmodelreqsdatatable()


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
        document.getElementById("confirmDelete").innerHTML = "Select atleast one model !!!"
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

    function deletemodelreqs(){
      console.log("delete users running")
   // let deleteprotoget = globalProduct
    // let userrow = 
    let todeleteids = printChecked()
    let deleteArray = {
      todeleteids
    }
              fetch(`http://${hosturl}:5600/api/order/deletemodelrequests`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "DELETE",
            body: JSON.stringify(deleteArray)
          })
          .then(function(res){ 
        //         table
        // .row( $(this).parents('tr') )
        // .remove()
        // .draw();
         $("#deleteModal").modal("hide");
            getmodelreqsdatatable()
            document.getElementById("confirmDelete").innerHTML = "Seleted model requests deleted successfully!!!"
            console.log(res)
          })
          .catch(function(res){ console.log(res) })
  }


      function logOutUser(){
    localStorage.clear();
    window.location  =  "login.html";
  }


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
      date: "Date",
      model_name: "Model Name"
  };

  itemsNotFormatted = globalmodelreqs

  var itemsFormatted = [];

  itemsNotFormatted.forEach((item) => {
      itemsFormatted.push({
          name: item.user_id ? item.user_id.first_name : "NA" , 
          contact: item.user_id ? item.user_id.contact : "NA",
          email: item.user_id ? item.user_id.email_id : "NA",
          date : item.date.split("T")[0].split('-').reverse().join('-'),
          model_name: item.model_name
      });
  });

  var fileTitle = 'New Model'; // or 'my-unique-title'

  exportCSVFile(headers, itemsFormatted, fileTitle); 
}