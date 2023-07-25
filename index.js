
let selectRow = null;
let id = 0;
viewRecord();

function fuelPrice(event){
   document.getElementById("rupee").value=event.target.value*100;
}

function onFormSubmit() {
  
  let formData = readFormData();
  localStorage.setItem(new Date().toString(),JSON.stringify(formData));

  location.href=location.href;
}
// Getting value from User-----------------------------------------------------
function readFormData() {
  var formData = {};
  formData["vehicleNumber"] = document.getElementById("VehicleNumber").value;
   
  formData["fuel"]="";

  if(document.getElementById("petrol").checked)
  formData["fuel"]+="Petrol ";

  else if(document.getElementById("diesel").checked)
  formData["fuel"]+="Diesel ";

  else if(document.getElementById("gas").checked)
  formData["fuel"]+="Gas ";

  formData["date"] = document.getElementById("date").value;
  formData["litres"] = document.getElementById("litres").value;
  formData["rupees"] = document.getElementById("rupee").value;
  //   console.log(formData);
  return formData;
}

// Inserting & Showing Record in Another Table-----------------------------------------------
function viewRecord() {
  
for(let i=0;i<localStorage.length;i++){

  data = JSON.parse(localStorage.getItem(localStorage.key(i)));

  console.log(data)
  let table = document.getElementById("tab_body")
  
  let tr = document.createElement("tr");
  

  let details = [];

  for(let key in data){
    let td = document.createElement("td");
    td.innerText = data[key];
    tr.appendChild(td);
  }

  let edit = document.createElement("button");
  edit.id=localStorage.key(i);
  edit.innerText="Edit";

  edit.addEventListener("click",(event)=>{
       
    let data = JSON.parse(localStorage.getItem(event.target.id));

    document.getElementById("VehicleNumber").value=data["vehicleNumber"];
    document.getElementById("date").value=data["date"];
    document.getElementById("litres").value=data["litres"];
    document.getElementById("rupee").value=data["rupees"];

    if(data["fuel"].trim()=="Petrol")
    document.getElementById("petrol").checked=true;

    else if(data["fuel"].trim()=="Diesel")
    document.getElementById("diesel").checked=true;

    else if(data["fuel"].trim()=="Gas")
    document.getElementById("gas").checked=true;

    deleteItem(event.target.id);
    
  })

  let del = document.createElement("button");
  del.id=localStorage.key(i);
  del.innerText="Delete";


  del.addEventListener("click",(event)=>{
        deleteItem(event.target.id);
        location.href=location.href;
  });

  var td = document.createElement("td");
  td.appendChild(edit);
  tr.appendChild(td);

  var td = document.createElement("td");
  td.appendChild(del);
  tr.appendChild(td);


  table.appendChild(tr);
}
  /*let newRow = table.insertRow(table.length);
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.vehicleNumber;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.petrol;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.diesel;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.gas;
  cell3 = newRow.insertCell(3);
  cell3.innerHTML = data.date;
  cell2 = newRow.insertCell(4);
  cell2.innerHTML = data.litres;
  cell2 = newRow.insertCell(5);
  cell2.innerHTML = data.rupees;
  cell4 = newRow.insertCell(6);
  cell4.innerHTML = `<a onclick="onEdit(this)">Edit</a>`;
  cell5 = newRow.insertCell(7);
  cell5.innerHTML = `<a onclick="onDelete(this)">Delete</a>`;*/
}

// Reseting Form---------------------------------------------------------------------------
function resetForm() {
  document.getElementById("vehicleNumber").value = "";
  document.getElementById("petrol").value = "";
  document.getElementById("diesel").value = "";
  document.getElementById("gas").value = "";
  document.getElementById("date").value = "";
  document.getElementById("litres").value = "";
  document.getElementById("rupees").value = "";
  selectRow = null;
}
// Editing Record ----------------------------------------------------------------------------

function onEdit(td) {
  selectRow = td.parentElement.parentElement;
  document.getElementById("vehicleNumber").value = selectRow.cells[0].innerHTML;
  document.getElementById("petrol").value = selectRow.cells[1].innerHTML;
  document.getElementById("diesel").value = selectRow.cells[1].innerHTML;
  document.getElementById("gas").value = selectRow.cells[1].innerHTML;
  document.getElementById("date").value = selectRow.cells[2].innerHTML;
  document.getElementById("litres").value = selectRow.cells[3].innerHTML;
  document.getElementById("rupees").value = selectRow.cells[4].innerHTML;
}

// Update Record-----------------------------------------------------------------------------
function updateRecord(formData) {
  selectRow.cells[0].innerHTML = formData.vehicleNumber;
  selectRow.cells[1].innerHTML = formData.petrol;
  selectRow.cells[1].innerHTML = formData.diesel;
  selectRow.cells[1].innerHTML = formData.gas;
  selectRow.cells[2].innerHTML = formData.date;
  selectRow.cells[3].innerHTML = formData.litres;
  selectRow.cells[4].innerHTML = formData.rupees;
  
  
  
  

  
}

// Dleteing Record--------------------------------------------------------------------------
function deleteItem(id) {
   localStorage.removeItem(id)
}