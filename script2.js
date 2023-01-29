var selectedRow = null

function onFormSubmit(e) {
    console.log(document.getElementById("teacherName").value);   
    if(document.getElementById("teacherName").value==="" || document.getElementById('dept').value==="" || document.getElementById('teacherId').value==="" || document.getElementById('salary').value==="" ){
        alert("Please Fill All  Data Fields")
        return
    }
    console.log("fuv");
	event.preventDefault();
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
            
		}
       
        else{
            updateRecord(formData);
		}
        resetForm();    
}

//Retrieve the data
function readFormData() {
    var formData = {};
    formData["teacherName"] = document.getElementById("teacherName").value;
    formData["dept"] = document.getElementById("dept").value;
    formData["teacherId"] = document.getElementById("teacherId").value;
    formData["salary"] = document.getElementById("salary").value;
    
    const previousSavedData = localStorage.getItem("allUserData");

    if(previousSavedData){
        localStorage.setItem('allUserData',JSON.stringify([formData, ...JSON.parse(previousSavedData)]))
    }
    else{
        localStorage.setItem('allUserData',JSON.stringify([formData]))
    }

    // localStorage.setItem('formData',JSON.stringify(formData))
    
    
    return formData;
}

//Insert the data
function insertNewRecord(data) {
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
		cell1.innerHTML = data.teacherName;
    cell2 = newRow.insertCell(1);
		cell2.innerHTML = data.dept;
    cell3 = newRow.insertCell(2);
		cell3.innerHTML = data.teacherId;
    cell4 = newRow.insertCell(3);
		cell4.innerHTML = data.salary;
    cell4 = newRow.insertCell(4);
        cell4.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
        
          
}

//Edit the data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("teacherName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("dept").value = selectedRow.cells[1].innerHTML;
    document.getElementById("teacherId").value = selectedRow.cells[2].innerHTML;
    document.getElementById("salary").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.teacherName;
    selectedRow.cells[1].innerHTML = formData.dept;
    selectedRow.cells[2].innerHTML = formData.teacherId;
    selectedRow.cells[3].innerHTML = formData.salary;
}

//Delete the data
function onDelete(td) {
    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
        resetForm();
    }
}

//Reset the data
function resetForm() {
    document.getElementById("teacherName").value = '';
    document.getElementById("dept").value = '';
    document.getElementById("teacherId").value = '';
    document.getElementById("salary").value = '';
    selectedRow = null;
}


function searchById() {
    event.preventDefault();
    document.getElementById("storeList").innerHTML=""
    let id = document.getElementById("idSearch").value.toUpperCase();
   

    const allData = localStorage.getItem('allUserData')
    const allDataInObjArray = JSON.parse(allData);
    
    console.log(allDataInObjArray);
    
    let filterData = [];
    if(allDataInObjArray){
        filterData = allDataInObjArray.filter((item)=>{
            return Number(item.teacherId) === Number(id)
        })
    }
    
    console.log("filtered data ", filterData);
    



    
       let searchData= JSON.stringify(filterData)
       document.getElementById("storeList").innerHTML=searchData
    // document.getElementById('searchedData').innerText=searchData;
    
        
        
    
    
}