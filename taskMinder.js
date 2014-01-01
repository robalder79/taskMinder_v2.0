// init() - initialise the list
function initialise(){	
	var height = window.innerHeight;
	document.body.style.minHeight = height + "px";
	
	var addBtn = document.getElementById("addBtn");
	if(window.innerWidth > 520){
   		addBtn.value = "Add";
	}else{
		addBtn.value = "";
		addBtn.className = "button col col8 add";
	}
	
	loadTaskList();
}

// collectUserData() - take text input and add to taskDictionary object for use
function collectUserData(){
	var taskDictionary = {};
	
	var textInput = document.getElementById("taskText");
	var newTask = textInput.value;
	
	if(newTask == null || newTask == "" || newTask == "Add new task..."){
		var blackout = document.getElementById("blackout");
		blackout.style.display = "block";
		var popup = document.getElementById("popup");
		popup.style.display = "block";
		var heading = document.getElementById("popupH2");
		heading.innerHTML = "Alert";
		var contents = document.getElementById("contents");
		contents.innerHTML = "Please enter a task...";
	}else{
		taskDictionary = {check:0, text:newTask};
		addNewRow(taskDictionary);
	}
	textInput.value = "Add new task...";
}

// addNewRow() - create a new ul and add checkbox, textbox, 'view' button & 'delete' button
var rowID = 0;
function addNewRow(taskDictionary){
	rowID += 1;
	
	var table = document.getElementById("dataTable");
	var newList = document.createElement("ul");
	newList.className = "row";
	var elementArray = new Array;
	
	// create checkbox
	var element1 = document.createElement("input");
	element1.type = "checkbox";
	element1.checked = taskDictionary["check"];
    element1.setAttribute("onClick", "checkboxClicked()");
	elementArray[0] = element1;
	
	// create textbox to display the task
	var element2 = document.createElement("input");
	element2.type = "text";
	element2.value = taskDictionary["text"];
	element2.id = "text" + rowID;
	element2.className = "userText";
    element2.setAttribute("onChange", "saveTaskList()");
	elementArray[1] = element2;
	
	// create view button
	var element3 = document.createElement("input");
    element3.type = "button";
	element3.className = "button";
    element3.id = rowID;
	if(window.innerWidth > 520){
   		element3.value = "View";
	}else{
		element3.value = "";
		element3.className = "button eye";
	}
    element3.setAttribute("onClick", "viewSelectedRow(document.getElementById('text' + this.id))");
	elementArray[2] = element3;
	
	// create delete button
	var element4 = document.createElement("input");
    element4.type = "button";
	element4.className = "button";
    if(window.innerWidth > 520){
   		element4.value = "Delete";
	}else{
		element4.value = "";
		element4.className = "button delete";
	}
    element4.setAttribute("onClick", "deleteSelectedRow(this)");
	elementArray[3] = element4;
	
	// place all 4 elements in sparate 'li's
	for(var i=0; i<elementArray.length; i++){
		var newItem = document.createElement("li");
		if(i == 0){
			var span = document.createElement("span");
			span.className = "chk";
			span.appendChild(elementArray[i]);
		}else if(i == 1){
			newItem.className = "col col8-span-6";
			newItem.appendChild(span);
			newItem.appendChild(elementArray[i]);
		}else{
			newItem.className = "col col8";
			newItem.appendChild(elementArray[i]);
		}
		newList.appendChild(newItem);
	}
	
	// add the new row to the 'dataTable' div
	table.appendChild(newList);
	
	checkboxClicked();
	saveTaskList();
}

// checkboxClicked() - add the faded effect to checked items
function checkboxClicked(){
	var table = document.getElementById("dataTable");
	var rows = table.getElementsByTagName("ul");
	var rowCount = rows.length;

	// loop through all rows of the table
    for(var i=0; i<rowCount; i++){
		// assign each input element to a variable
        var chkbox = rows[i].childNodes[1].childNodes[0].childNodes[0];
		var txtbox = rows[i].childNodes[1].childNodes[1];
		var viewBtn = rows[i].childNodes[2].childNodes[0]
		var deleteBtn = rows[i].childNodes[3].childNodes[0];

		// if the checkbox is checked, add the fade-out styling
		if(null != chkbox && true == chkbox.checked){
			if(null != txtbox){
				chkbox.style.setProperty("opacity", 0.25);
				txtbox.style.setProperty("opacity", 0.25);
				viewBtn.style.setProperty("opacity", 0.25);
				deleteBtn.style.setProperty("opacity", 0.25);
				}
			}else{ // if the checkbox isn't checked, remove the fade-out styling
				chkbox.style.setProperty("opacity", 1);
				txtbox.style.setProperty("opacity", 1);
				viewBtn.style.setProperty("opacity", 1);
				deleteBtn.style.setProperty("opacity", 1);
			}
		}
	saveTaskList();
}

// viewSelectedRow(taskTextField) - view the content of the selected (view button pressed) row
function viewSelectedRow(taskTextField){
	var text = taskTextField.value;
	
	var blackout = document.getElementById("blackout");
	blackout.style.display = "block";
	var popup = document.getElementById("popup");
	popup.style.display = "block";
	var heading = document.getElementById("popupH2");
	heading.innerHTML = "Task Contents";
	var contents = document.getElementById("contents");
	contents.innerHTML = text;
}

// closePopup() - close the popup and remove the blackout effect
function closePopup(){
	var blackout = document.getElementById("blackout");
	blackout.style.display = "none";
	var popup = document.getElementById("popup");
	popup.style.display = "none";
	var contents = document.getElementById("contents");
	contents.innerHTML = "";
}

// deleteSelectedRow(deleteButton) - delete the selected (delete button pressed) row
function deleteSelectedRow(deleteButton){
    var toDelete = deleteButton.parentNode.parentNode;
    toDelete.parentNode.removeChild(toDelete);
    saveTaskList();
}

// saveTaskList() - save the contents of the data table to localStorage file
function saveTaskList()
{
    var taskArray = {};
    var checkBoxState = 0;
    var textValue = "";
 
    var table = document.getElementById("dataTable");
	var rows = table.getElementsByTagName("ul");
    var rowCount = rows.length;
 
    if(rowCount != 0){
        // loop through all rows of the table
        for(var i=0; i<rowCount; i++){
            var row = rows[i];
 
            // determine the state of the checkbox
            var chkbox = rows[i].childNodes[1].childNodes[0].childNodes[0];
            if(null != chkbox && true == chkbox.checked){
                checkBoxState = 1;
            }else{
                checkBoxState= 0;
            }
 
            // retrieve the content of the task
            var txtbox = rows[i].childNodes[1].childNodes[1];
            textValue = txtbox.value;
 
            // populate the array
            taskArray["row" + i] = {check:checkBoxState, text:textValue};
        }
    }else{
        taskArray = null;
    }
 
    // use the local storage API to save the data as JSON
    window.localStorage.setItem("taskMinder_v1-0-0", JSON.stringify(taskArray));
}

// loadTaskList() - read file in localStorage and populate the data table
function loadTaskList(){
    // use the local storage API to load the JSON formatted task list, and decode it
    var theList = JSON.parse(window.localStorage.getItem("taskMinder_v1-0-0"));
 
    if(null == theList || theList == "null"){
        deleteAllRows();
    }else{
        var count = 0;
        for (var obj in theList){
            count++;
        }
 
        // remove any existing rows from the table
        deleteAllRows();
 
        // loop through the tasks
        for(var i=0; i<count; i++){
            // add a row to the table for each one
            addNewRow(theList["row" + i], true);
        }
    }
}

// deleteAllRows() - remove all the rows from the DOM
function deleteAllRows(){
	var table = document.getElementById("dataTable");
	table.innerHTML = "";
	
    // save the to-do list
    saveTaskList();
}