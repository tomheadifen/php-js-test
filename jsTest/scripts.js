var allContacts = [];
var request = new Api();

function init() {
	createContacts();
}

function createContacts() {
	var contact = {};
	for (var i = 0; i < request.contacts.length; i++) {
		contact = request.contacts[i];
		allContacts.push(new Contact(contact.id, contact.name, contact.number));
	}
	populateSelect();
}

function populateSelect() {
	var selectBox = document.getElementById("allContacts"), options;

	//Loop to create options for select box
	for(var i = 0; i < allContacts.length; i++)
	{
	   options = document.createElement("option");
	   //Populate Id as an attribute so that we get correct item in array
	   options.setAttribute('value', allContacts[i].id);
	   options.appendChild(document.createTextNode(allContacts[i].name));
	   selectBox.appendChild(options);
	}
}

function getSelected() {
	var selectedContacts = [], selectedOptions = [];
	// Returns the options that are selected
	selectedOptions = document.getElementById("allContacts").selectedOptions;

	// Return objects we created by first looping through what we selected
	for (var i = 0; i < selectedOptions.length; i++) {
		// Filter from itself so that we get all items
		// Returns array so grab first object to push in
		selectedContacts.push(allContacts.filter(function(contact) {
		    return contact.id == selectedOptions[i].value;
		})[0]);
	}
	return selectedContacts;
}

function deleteSelected() {
	selectBox = document.getElementById("allContacts"),
	selectedOptions = selectBox.selectedOptions,
	selectedContact = {};
	for (var i = 0; i < selectedOptions.length; i++) {
		// Delete from Contact array
		selectedContact = allContacts.filter(function (contact) {
			return contact.id == selectedOptions[i].value;
		})[0];
		//Destroy in our Contact array
		selectedContact.destroy();
		// Remove from select box
		selectBox.removeChild(selectBox[selectedOptions[i].index]);
	}
}


function Contact(id, name, number) {
	this.id = id;
	this.name = name;
	this.number = number;
}

Contact.prototype.destroy = function() {
	allContacts.slice(this.id);
};

/**
 * Dummy API
 */
function Api() {
	this.contacts = [
		{'id': 1, 'name': 'Steve', 'number': '123 456 789'},
		{'id': 2, 'name': 'Mark', 'number': '555 448 692'},
		{'id': 3, 'name': 'Lucy', 'number': '255 147 359'}
	];
}

init();