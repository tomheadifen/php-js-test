var allContacts = [];
var request = new Api();

function init() {
	createContacts();
}

function createContacts() {
	var contact = {};
	//Populate the allContacts array
	for (var i = 0; i < request.contacts.length; i++) {
		contact = request.contacts[i];
		allContacts.push(new Contact(contact.name, contact.number));
	}

	// Populate the select box with all contacts array
	for(var i = 0; i < allContacts.length; i++) {
		populateSelect(allContacts[i]);
	}
}

function populateSelect(value) {
	var selectBox = document.getElementById("allContacts"), options;

	options = document.createElement("option");
	//Populate Id as an attribute so that we get correct item in array
	options.setAttribute('value', value.id);
	options.appendChild(document.createTextNode(value.name));
	selectBox.appendChild(options);
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

function addContact() {
	var name, number;
	name = document.getElementById("newName");
	number = document.getElementById("newNumber");

	if (name.length < 3 || number.length < 3) {
		throw("Name or Number too small")
	} else {
		allContacts.push(new Contact(name.value, number.value));
		// We need to get the element again to get the id.
		populateSelect(allContacts[allContacts.length - 1]);
	}

	//Set inputs back to empty
	name.value = '';
	number.value = '';
	
}

function Contact(name, number) {
	this.id = this.generateId();
	this.name = name;
	this.number = number;
}

/**
 * Removes the Contact from the allContacts array
 * @return {void}
 */
Contact.prototype.destroy = function() {
	allContacts.slice(this.id);
};

/**
 * Generate a random ID to stop conflicts
 * @return {number} a random Id
 */
Contact.prototype.generateId = function() {
	var randomNumber, isNumberFound = true;

	// If we find the number then another number gets generated. 
	while(isNumberFound === true) {
		randomNumber = Math.floor(Math.random()*100) + 1;
		isNumberFound = false;
		// Loop through other contacts to make sure we don't duplicate
		for(var i = 0; i < allContacts.length; i++) {
			if (allContacts[i].id == randomNumber) {
				isNumberFound = true;
				break;
			} else {
				isNumberFound = false;
			}
		}
	}
	return randomNumber;
}

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