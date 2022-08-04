var insertRow = null;

// register Form data to store the values to the table using registerFormData function
function registerFormData() {

    //formdata value is store the retriveData function 
    var formDataValue = retriveData();
    var insertFormData = localStorageData(formDataValue);

    // window.location.href = "dataTable.html";
    // validation part 
    if (formDataValue == false) {
        document.getElementById("checkName").innerHTML = "please enter your Name";
        
        
    }
    else {
        if (insertRow === null) {
            insertRowValues(insertFormData);
        }
        else {

            update();
        }
    }
    document.getElementById("userForm").reset();
  
}


// get the user form data 
function retriveData() {
    var name = document.getElementById("userName").value;
    var email = document.getElementById("userEmail").value;
    var password = document.getElementById("userPassword").value;
    var ConfirmPassword = document.getElementById("confirmPassword").value;
 
    //check the email input box 

    if(email == ""){
        document.getElementById("checkMail").innerHTML = "enter Your email ID";
    }
    if(password == "" && ConfirmPassword == ""){
        document.getElementById("checkPasswordMessage").style.color="red";
        document.getElementById("checkPasswordMessage").innerHTML = "please Enter password";
    }

    if (password === ConfirmPassword) {
        document.getElementById("checkPasswordMessage").style.color = "black";
        document.getElementById("checkPasswordMessage").innerHTML = "password match";
    }
    else {
        document.getElementById("checkPasswordMessage").style.color="red";
        document.getElementById("checkPasswordMessage").innerHTML = "password not match";
      
        return false;
    }

    var storeLocalStorageValues = [name, email, password, ConfirmPassword];
    // return arr;
    if(storeLocalStorageValues.includes(""))
    {
        return false;

    }else{
        return storeLocalStorageValues;
    }


}
// store the user data to localStorage

function localStorageData(formDataValue) {
    //put the user data to local storage
    var firstValue = localStorage.setItem("userName", formDataValue[0]);
    var secondValue = localStorage.setItem("userEmail", formDataValue[1]);
    var thirdValue = localStorage.setItem("userPassword", formDataValue[2]);
    var fourthValue = localStorage.setItem("confirmPassword", formDataValue[3]);

    //get the user data 
    var storeNameData = localStorage.getItem("userName", firstValue);
    var storeEmailData = localStorage.getItem("userEmail", secondValue);
    var storePasswordData = localStorage.getItem("userPassword", thirdValue);
    var storeConformPasswordData = localStorage.getItem("confirmPassword", fourthValue);

    var storeLocalStorageValues = [storeNameData, storeEmailData, storePasswordData, storeConformPasswordData];
    console.log(storeLocalStorageValues);
    return storeLocalStorageValues;
}


//insert the user data to table
function insertRowValues(insertFormData) {
    var row = formDatatable.insertRow();
    var cel1 = row.insertCell(0);
    var cel2 = row.insertCell(1);
    var cel3 = row.insertCell(2);
    var cel4 = row.insertCell(3);
    var cel5 = row.insertCell(4);

    cel1.innerHTML = insertFormData[0];
    cel2.innerHTML = insertFormData[1];
    cel3.innerHTML = insertFormData[2];
    cel4.innerHTML = insertFormData[3];
    cel5.innerHTML = `<button onclick="edit(this)">edit</button>`;
}


//edit the user data to store in a table

function edit(td) {

    // document.getElementById("formData").classList.remove("displayOff");

    insertRow = td.parentElement.parentElement;
    document.getElementById("userName").value = insertRow.cells[0].innerHTML;
    document.getElementById("userEmail").value = insertRow.cells[1].innerHTML;
    document.getElementById("userPassword").value = insertRow.cells[2].innerHTML;
    document.getElementById("confirmPassword").value = insertRow.cells[3].innerHTML;
}

//after edit it will update to the table

function update() {
    insertRow.cells[0].innerHTML = document.getElementById("userName").value;
    insertRow.cells[1].innerHTML = document.getElementById("userEmail").value;
    insertRow.cells[2].innerHTML = document.getElementById("userPassword").value;
    insertRow.cells[3].innerHTML = document.getElementById("confirmPassword").value;
    insertRow = null;
}


//sort the table data ascending order to decending order

function registerFormTableSort(n) {
    var table, rows, whileCondition, i, firstName, secondName, switchAgain, tableDirection, switchcount = 0;

    table = document.getElementById("formDatatable");
    whileCondition = true;
    tableDirection = "ascendingOrder";

    while (whileCondition) {
        whileCondition = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            switchAgain = false;
            firstName = rows[i].getElementsByTagName("TD")[n];
            secondName = rows[i + 1].getElementsByTagName("TD")[n];
            if (tableDirection == "ascendingOrder") {
                if (firstName.innerHTML.toLowerCase() > secondName.innerHTML.toLowerCase()) {

                    switchAgain = true;
                    break;
                }

            }
            else if (tableDirection == "descendingOrder") {
                if (firstName.innerHTML.toLowerCase() < secondName.innerHTML.toLowerCase()) {

                    switchAgain = true;
                    break;
                }
            }
        }

        if (switchAgain) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            whileCondition = true;
            switchcount++;
        } else {
            if (switchcount == 0 && tableDirection == "ascendingOrder") {
                tableDirection = "descendingOrder";
                whileCondition = true;
            }
        }
    }
}
function pushValues(paseData) {

    var storeNameData = localStorage.getItem("userName");
    var storeEmailData = localStorage.getItem("userEmail");
    var storePassData = localStorage.getItem("userPassword");
    var storeCpassData = localStorage.getItem("confirmPassword");
    arr = [storeNameData, storeEmailData, storePassData, storeCpassData];
    console.log(arr);
    paseData(arr)
}
function getValues() {

    var row = formDatatable.insertRow();
    var cel1 = row.insertCell(0);
    var cel2 = row.insertCell(1);
    var cel3 = row.insertCell(2);
    var cel4 = row.insertCell(3);
    var cel5 = row.insertCell(4);


    cel1.innerHTML = arr[0];
    cel2.innerHTML = arr[1];
    cel3.innerHTML = arr[2];
    cel4.innerHTML = arr[3];
    cel5.innerHTML = `<button onclick="edit(this)">edit</button>`;
}
pushValues(getValues);